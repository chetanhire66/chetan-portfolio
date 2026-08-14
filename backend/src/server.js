import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { Portfolio } from './models/Portfolio.js';
import { Message } from './models/Message.js';
import { requireAdmin } from './middleware/auth.js';
import { defaultPortfolio } from './defaultPortfolio.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const editableSections = new Set(['profile', 'education', 'skills', 'projects', 'experience', 'certifications', 'achievements', 'resume', 'social', 'githubSettings']);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const githubCache = { expiresAt: 0, value: null, promise: null };
const GITHUB_CACHE_MS = 5 * 60 * 1000;

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
}

async function connectDatabase() {
  if (!process.env.MONGODB_URI) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

async function getPortfolio() {
  if (mongoose.connection.readyState !== 1) return null;
  let portfolio = await Portfolio.findOne({ key: 'primary' });
  if (!portfolio) portfolio = await Portfolio.create({ key: 'primary', content: defaultPortfolio });
  return portfolio;
}

function portfolioReply(message, content) {
  const question = message.toLowerCase();
  const profile = content.profile || defaultPortfolio.profile;
  const education = content.education?.[0] || defaultPortfolio.education[0];
  const projects = content.projects || defaultPortfolio.projects;
  const skills = content.skills || defaultPortfolio.skills;

  if (/contact|email|reach|hire/.test(question)) {
    return `You can contact ${profile.shortName || profile.name} at ${profile.email}.`;
  }
  if (/graduat|college|education|degree|study|stud(y|ies)/.test(question)) {
    return `${profile.shortName || profile.name} is pursuing ${education.degree} in ${education.major} at ${education.institution}, with an expected graduation year of ${education.expectedGraduation}.`;
  }
  if (/skill|stack|technolog|mern|language/.test(question)) {
    const skillNames = skills.flatMap((category) => category.skills || []).map((skill) => skill.name).slice(0, 10);
    return `${profile.shortName || profile.name}'s stack includes ${skillNames.join(', ')}.`;
  }
  if (/project|wanderlust|parking|chobify/.test(question)) {
    const project = projects.find((item) => question.includes(item.title.toLowerCase())) || projects[0];
    if (project) return `${project.title}: ${project.longDescription || project.description} Tech used: ${(project.techStack || []).join(', ')}.`;
  }
  if (/certif/.test(question)) {
    const certifications = content.certifications || defaultPortfolio.certifications;
    return `${profile.shortName || profile.name}'s certifications include ${certifications.map((item) => item.title).slice(0, 4).join(', ')}.`;
  }
  if (/resume|experience|background|about/.test(question)) {
    return (profile.aboutIntro || []).slice(0, 2).join(' ');
  }
  return `I can help with ${profile.shortName || profile.name}'s skills, education, projects, certifications, and contact details. What would you like to know?`;
}

async function githubRequest(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'chetan-portfolio',
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || `GitHub request failed (${response.status})`);
  return body;
}

async function getGithubData() {
  const username = process.env.GITHUB_USERNAME?.trim();
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!username || !token) throw new Error('GITHUB_USERNAME and GITHUB_TOKEN are not configured.');
  const now = new Date();
  const year = now.getUTCFullYear();
  const from = `${year}-01-01T00:00:00Z`;
  const to = now.toISOString();
  const query = `query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){followers{totalCount} following{totalCount} contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{contributionCount contributionLevel date weekday}}}}}}`;
  const user = await githubRequest(`https://api.github.com/users/${encodeURIComponent(username)}`, token);
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const batch = await githubRequest(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100&page=${page}`, token);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const [graphResponse, pullRequests, issues] = await Promise.all([
    githubRequest('https://api.github.com/graphql', token, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables: { login: username, from, to } }) }),
    githubRequest(`https://api.github.com/search/issues?q=user:${encodeURIComponent(username)}+type:pr+is:merged`, token),
    githubRequest(`https://api.github.com/search/issues?q=user:${encodeURIComponent(username)}+type:issue+is:closed`, token),
  ]);
  if (graphResponse.errors?.length) throw new Error(graphResponse.errors[0].message || 'GitHub contribution query failed.');
  const calendar = graphResponse.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error(`GitHub user "${username}" was not found.`);
  const contributions = calendar.weeks.flatMap((week) => week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount, level: day.contributionLevel, weekday: day.weekday })));
  let longestStreak = 0;
  let currentStreak = 0;
  contributions.forEach((day) => { currentStreak = day.count > 0 ? currentStreak + 1 : 0; longestStreak = Math.max(longestStreak, currentStreak); });
  const languageCounts = repos.reduce((result, repo) => { if (repo.language) result[repo.language] = (result[repo.language] || 0) + 1; return result; }, {});
  const languageColors = { JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB', Java: '#ED8B00', 'C++': '#00599C', HTML: '#E34F26', CSS: '#1572B6' };
  const languageTotal = Object.values(languageCounts).reduce((sum, count) => sum + count, 0) || 1;
  const languages = Object.entries(languageCounts).sort(([, a], [, b]) => b - a).slice(0, 6).map(([name, count]) => ({ name, percent: Math.round((count / languageTotal) * 100), color: languageColors[name] || '#94A3B8' }));
  return { username, stats: { totalRepos: user.public_repos, totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0), totalCommits: calendar.totalContributions, periodLabel: String(year), longestStreak, pullRequests: pullRequests.total_count, issuesSolved: issues.total_count, followers: user.followers, following: user.following, languages }, contributions, fetchedAt: new Date().toISOString() };
}

app.get('/api/github', async (_req, res) => {
  try {
    if (githubCache.value && githubCache.expiresAt > Date.now()) return res.json(githubCache.value);
    if (!githubCache.promise) githubCache.promise = getGithubData().then((value) => { githubCache.value = value; githubCache.expiresAt = Date.now() + GITHUB_CACHE_MS; return value; }).finally(() => { githubCache.promise = null; });
    res.json(await githubCache.promise);
  } catch (error) {
    res.status(502).json({ error: error.message || 'Unable to load GitHub activity.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'unconfigured' }));

// Public content never exposes CMS messages or admin-only configuration.
app.get('/api/portfolio', async (_req, res) => {
  try {
    const portfolio = await getPortfolio();
    if (!portfolio) return res.status(503).json({ error: 'Portfolio database is unavailable.' });
    res.json(portfolio.content);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load portfolio content.' });
  }
});

app.post('/api/chat', async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'A message is required.' });
  if (message.length > 1_000) return res.status(400).json({ error: 'Messages must be 1,000 characters or fewer.' });

  try {
    const portfolio = await getPortfolio();
    res.json({ reply: portfolioReply(message, portfolio?.content || defaultPortfolio) });
  } catch (error) {
    console.error('Portfolio chat failed:', error);
    res.status(500).json({ error: 'Unable to answer that question right now.' });
  }
});

// Delivers the original Cloudinary certificate bytes inline. This is not a
// details page or generated preview; it only avoids Cloudinary raw/PDF
// attachment and account-level PDF delivery restrictions in the browser.
app.get('/api/certificates/:id/file', async (req, res) => {
  try {
    const portfolio = await getPortfolio();
    const certificate = portfolio?.content?.certifications?.find((item) => item.id === req.params.id);
    if (!certificate?.assetUrl) return res.status(404).json({ error: 'Certificate file not found.' });
    const response = await fetch(certificate.assetUrl);
    if (!response.ok) return res.status(502).json({ error: 'Certificate file is unavailable.' });
    const buffer = Buffer.from(await response.arrayBuffer());
    const isPdf = buffer.subarray(0, 5).toString() === '%PDF-';
    res.set({
      'Content-Type': isPdf ? 'application/pdf' : (response.headers.get('content-type') || 'application/octet-stream'),
      'Content-Disposition': `inline; filename="${certificate.title.replace(/[^a-z0-9._ -]/gi, '_')}${isPdf ? '.pdf' : ''}"`,
      'Cache-Control': 'public, max-age=3600',
    });
    res.send(buffer);
  } catch (error) {
    console.error('Certificate delivery failed:', error);
    res.status(500).json({ error: 'Unable to open certificate file.' });
  }
});

app.get('/api/resume/file', async (_req, res) => {
  try {
    const portfolio = await getPortfolio();
    const resume = portfolio?.content?.resume;
    if (!resume?.url) return res.status(404).json({ error: 'Resume file not found.' });
    let response = await fetch(resume.url);
    // Cloudinary Free environments can block public PDF image delivery. Use a
    // signed download URL only for this server-to-server fetch when needed.
    if (!response.ok && process.env.CLOUDINARY_API_SECRET) {
      const match = resume.url.match(/\/(image|raw)\/upload\/v\d+\/(.+?)(?:\.pdf)?$/);
      if (match) {
        const signedUrl = cloudinary.utils.private_download_url(match[2], 'pdf', { resource_type: match[1], type: 'upload', attachment: false });
        response = await fetch(signedUrl);
      }
    }
    if (!response.ok) return res.status(502).json({ error: 'Resume file is unavailable.' });
    const buffer = Buffer.from(await response.arrayBuffer());
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${(resume.fileName || 'resume.pdf').replace(/[^a-z0-9._ -]/gi, '_')}"`,
      'Cache-Control': 'no-store',
    });
    res.send(buffer);
  } catch (error) {
    console.error('Resume delivery failed:', error);
    res.status(500).json({ error: 'Unable to download resume.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) return res.status(400).json({ error: 'Please complete all required fields.' });

  // Persisting a message is additive; email delivery below remains the original flow.
  if (mongoose.connection.readyState === 1) {
    try { await Message.create({ name, email, subject, message }); } catch (error) { console.error('Message storage failed:', error.message); }
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.CONTACT_EMAIL) return res.status(503).json({ error: 'Email delivery is not configured yet.' });
  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
    const safeSubject = (subject?.trim() || 'New portfolio message').replace(/[\r\n]/g, ' ');
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: process.env.CONTACT_EMAIL, replyTo: email.trim(), subject: `Portfolio contact: ${safeSubject}`, text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${safeSubject}\n\nMessage:\n${message.trim()}` });
    return res.json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return res.status(500).json({ error: 'Unable to send your message. Please try again later.' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) return res.status(503).json({ error: 'Admin authentication is not configured.' });
  const usernameMatches = username === process.env.ADMIN_USERNAME;
  const passwordMatches = await bcrypt.compare(password || '', process.env.ADMIN_PASSWORD);
  if (!usernameMatches || !passwordMatches) return res.status(401).json({ error: 'Invalid username or password.' });
  const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.cookie('portfolio_admin', token, { httpOnly: true, secure: isProduction, sameSite: 'lax', maxAge: 8 * 60 * 60 * 1000, path: '/' });
  res.json({ success: true, username });
});

app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie('portfolio_admin', { httpOnly: true, secure: isProduction, sameSite: 'lax', path: '/' });
  res.json({ success: true });
});

app.get('/api/admin/session', requireAdmin, (req, res) => res.json({ authenticated: true, username: req.admin.username }));
app.get('/api/admin/content', requireAdmin, async (_req, res) => {
  try { const portfolio = await getPortfolio(); if (!portfolio) return res.status(503).json({ error: 'MongoDB is not configured.' }); res.json(portfolio.content); }
  catch { res.status(500).json({ error: 'Unable to load CMS content.' }); }
});
app.put('/api/admin/content/:section', requireAdmin, async (req, res) => {
  const { section } = req.params;
  if (!editableSections.has(section)) return res.status(400).json({ error: 'Unknown content section.' });
  if (req.body?.value === undefined) return res.status(400).json({ error: 'A section value is required.' });
  try {
    const portfolio = await getPortfolio();
    if (!portfolio) return res.status(503).json({ error: 'MongoDB is not configured.' });
    portfolio.content[section] = req.body.value;
    portfolio.markModified('content');
    await portfolio.save();
    res.json({ success: true, value: portfolio.content[section], updatedAt: portfolio.updatedAt });
  } catch { res.status(500).json({ error: 'Unable to save CMS content.' }); }
});
app.get('/api/admin/messages', requireAdmin, async (_req, res) => {
  try { if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'MongoDB is not configured.' }); res.json(await Message.find().sort({ createdAt: -1 }).lean()); }
  catch { res.status(500).json({ error: 'Unable to load messages.' }); }
});
app.patch('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  if (!['new', 'read', 'archived'].includes(req.body?.status)) return res.status(400).json({ error: 'Invalid message status.' });
  const message = await Message.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  res.json(message);
});
app.post('/api/admin/upload', requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Select a file to upload.' });
  if (!process.env.CLOUDINARY_CLOUD_NAME) return res.status(503).json({ error: 'Cloudinary is not configured.' });
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowed.includes(req.file.mimetype)) return res.status(400).json({ error: 'Only JPG, PNG, WebP, and PDF files are allowed.' });
  // PDFs are stored as raw originals and delivered through the server endpoints
  // above, avoiding Cloudinary PDF delivery restrictions on this environment.
  const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';
  const folder = `portfolio/${req.body?.kind || 'assets'}`;
  try {
    const result = await new Promise((resolve, reject) => streamifier.createReadStream(req.file.buffer).pipe(cloudinary.uploader.upload_stream({ folder, resource_type: resourceType }, (error, uploadResult) => error ? reject(error) : resolve(uploadResult))));
    res.json({ url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type, originalName: req.file.originalname });
  } catch { res.status(500).json({ error: 'Cloudinary upload failed.' }); }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) return res.status(400).json({ error: error.message });
  res.status(500).json({ error: 'Unexpected server error.' });
});

connectDatabase().finally(() => app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`)));
