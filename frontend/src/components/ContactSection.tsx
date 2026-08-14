import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Send, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMsg('Please complete all required fields.');
      return;
    }

    setStatus('submitting');
    setStatus('submitting');

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        'http://localhost:5000/api';

      const res = await fetch(
        `${API_BASE_URL.replace(/\/$/, '')}/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setStatusMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Contact Error:', err);
      setStatus('error');
      setStatusMsg('Unable to send your message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Glow orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-blue-400 border border-blue-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>08 // INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Let's Build <span className="text-gradient-primary">Together</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Actively seeking software engineering roles, internships, hackathon collaborations, and exciting freelance opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Contact Cards & Copy Email Bar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl border border-slate-800 light:border-slate-200 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-100 light:text-slate-900">Contact Channels</h3>
                <p className="text-sm text-slate-400 light:text-slate-600 mt-1">
                  Connect via direct email or social channels. I respond within 24 hours.
                </p>
              </div>

              {/* Direct Email Box with Copy CTA */}
              <div className="p-4 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Email Address</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800 truncate">{PERSONAL_INFO.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Copy Email"
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${copied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'glass-card hover:bg-slate-800 text-slate-300 light:text-slate-700 border border-slate-700'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-4 text-sm text-slate-300 light:text-slate-700">
                <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Base Location</p>
                  <p className="font-semibold">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              {/* Social Connects Row */}
              <div className="pt-4 border-t border-slate-800 light:border-slate-200 space-y-3">
                <p className="text-xs font-mono text-slate-400 uppercase font-bold">Verified Social Profiles</p>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl glass-card hover:bg-slate-800 light:hover:bg-slate-200 flex items-center justify-center gap-2 text-xs font-bold transition-all hover:scale-105 border border-slate-700"
                  >
                    <Github className="w-4 h-4 text-blue-400" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl glass-card hover:bg-slate-800 light:hover:bg-slate-200 flex items-center justify-center gap-2 text-xs font-bold transition-all hover:scale-105 border border-slate-700"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* AI Callout Banner */}
            <div className="glass-card p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/10 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="text-xs text-slate-300 light:text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-100 light:text-slate-900 mb-0.5">Prefer Instant Answers?</p>
                <span>Ask my built-in AI assistant about my MERN experience or graduation timeline.</span>
              </div>
            </div>
          </motion.div>


          {/* Right Column: Modern Glassmorphism Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 light:border-slate-200 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 light:border-slate-200 pb-4">
                <h3 className="text-2xl font-bold text-slate-100 light:text-slate-900">Send Direct Message</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">Fields marked with * are required</p>
              </div>

              {/* Status Alert */}
              {status !== 'idle' && status !== 'submitting' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${status === 'success'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/15 text-red-300 border border-red-500/30'
                    }`}
                >
                  <span>{statusMsg}</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-mono font-bold text-slate-300 light:text-slate-700 uppercase">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Sundar Pichai"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 focus:border-blue-500 focus:outline-none text-sm text-slate-100 light:text-slate-900 transition-colors placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-mono font-bold text-slate-300 light:text-slate-700 uppercase">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. recruiter@google.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 focus:border-blue-500 focus:outline-none text-sm text-slate-100 light:text-slate-900 transition-colors placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-mono font-bold text-slate-300 light:text-slate-700 uppercase">
                  Subject / Opportunity
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Software Engineer Internship 2026/2027"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 focus:border-blue-500 focus:outline-none text-sm text-slate-100 light:text-slate-900 transition-colors placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-mono font-bold text-slate-300 light:text-slate-700 uppercase">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Hello Chetan, we reviewed your WanderLust and Smart Parking projects and would love to connect..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 focus:border-blue-500 focus:outline-none text-sm text-slate-100 light:text-slate-900 transition-colors placeholder:text-slate-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message to Chetan</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
