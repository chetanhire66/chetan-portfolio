// Seed content mirrors the current public portfolio. New CMS-only fields are additive.
export const defaultPortfolio = {
  profile: {
    name: 'Chetan Motilal Hire', shortName: 'Chetan Hire', initials: 'CH',
    title: 'AI & Machine Learning Engineer | Full-Stack Developer | MERN Stack Enthusiast',
    tagline: 'Transforming ideas into intelligent, scalable, and impactful digital experiences.',
    location: 'Pune, Maharashtra, India', email: 'chetanhire818@gmail.com',
    profileImage: '', typingWords: ['Full Stack Developer', 'AI Engineer', 'Problem Solver', 'Tech Enthusiast', 'MERN Architect'],
    aboutIntro: [
      'I am an Artificial Intelligence and Machine Learning student with a relentless passion for Full-Stack Web Development.',
      'I thrive on building production-ready web applications using the MERN Stack, seamlessly integrating cutting-edge AI models into practical, scalable solutions.',
      'My overarching goal is to become a world-class Full-Stack Developer and AI Engineer, engineering intelligent, high-performance digital products that solve genuine user problems.',
      'When I’m not crafting clean code or architecting backend systems, you can find me pushing my limits at the gym, competing in fast-paced hackathons, exploring emerging cloud native tech, or capturing serene moments in nature through photography.'
    ],
    stats: { yearsOfExperience: '2+', projectsCompleted: '15+', hackathonsParticipated: '4+', certificationsEarned: '7+' },
  },
  education: [{ id: 'pes-modern', degree: 'Bachelor of Technology (B.Tech)', major: 'Artificial Intelligence & Machine Learning', institution: 'P.E.S. Modern College of Engineering, Pune', expectedGraduation: '2028', currentYear: 'Third Year', status: 'Active Student' }],
  skills: [
    { title: 'Programming Languages', iconName: 'Code2', skills: [{ name: 'JavaScript (ES6+)', level: 90, badge: 'Expert' }, { name: 'Python', level: 88, badge: 'Advanced' }, { name: 'TypeScript', level: 85, badge: 'Advanced' }, { name: 'Java', level: 82, badge: 'Proficient' }, { name: 'C++', level: 78, badge: 'Solid' }, { name: 'C', level: 80, badge: 'Proficient' }] },
    { title: 'Frontend Engineering', iconName: 'Layout', skills: [{ name: 'React.js', level: 92, badge: 'Core' }, { name: 'Tailwind CSS', level: 95, badge: 'Master' }, { name: 'HTML5 & Semantic Web', level: 95 }, { name: 'CSS3 & Animations', level: 88 }, { name: 'Bootstrap', level: 85 }] },
    { title: 'Backend & Systems', iconName: 'Server', skills: [{ name: 'Node.js', level: 88, badge: 'Core' }, { name: 'Express.js', level: 90, badge: 'Core' }, { name: 'RESTful APIs', level: 92 }, { name: 'Flask', level: 80 }, { name: 'Passport.js & Auth', level: 85 }] },
    { title: 'Databases & Cloud Storage', iconName: 'Database', skills: [{ name: 'MongoDB & Mongoose', level: 90, badge: 'Primary' }, { name: 'MySQL / SQL', level: 82 }, { name: 'SQLite', level: 80 }, { name: 'Cloudinary CDN', level: 88 }] },
    { title: 'AI & Machine Learning', iconName: 'Cpu', skills: [{ name: 'Google Gemini API', level: 90, badge: 'Featured' }, { name: 'Prompt Engineering', level: 94, badge: 'Expert' }, { name: 'LangChain & RAG', level: 85 }, { name: 'Artificial Intelligence Core', level: 88 }] },
    { title: 'Developer Tools & DevOps', iconName: 'Wrench', skills: [{ name: 'Git & GitHub Workflow', level: 92 }, { name: 'VS Code', level: 96 }, { name: 'Postman API Testing', level: 90 }, { name: 'Render Cloud Deployment', level: 88 }, { name: 'Vercel Serverless', level: 90 }] },
  ],
  projects: [
    { id: 'wanderlust', title: 'WanderLust', description: 'A flagship full-stack Airbnb-inspired travel platform where users can explore, create, review, and manage luxury accommodation listings.', longDescription: 'Architected a full-featured marketplace platform featuring secure user authentication with Passport.js, interactive booking workflows, image upload pipeline integrated with Cloudinary CDN, and robust MongoDB schemas for listings and customer reviews.', techStack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Bootstrap', 'Cloudinary', 'Passport.js'], category: 'Full-Stack', githubUrl: 'https://github.com/chetanhire66/wanderlust-project', liveUrl: 'https://wanderlust-project-3fl8.onrender.com/', featured: true, highlight: 'Flagship MERN Travel Marketplace', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80' },
    { id: 'smart-parking', title: 'Smart Parking Finder', description: 'Developed for Smart India Hackathon. An intelligent location-aware web application helping urban drivers pinpoint nearby parking spaces in real-time.', longDescription: 'Engineered a responsive interactive geolocation map interface utilizing Leaflet and OpenStreetMap APIs. Built seamless search filtering algorithms to reduce urban traffic congestion and guide drivers directly to vacant parking zones.', techStack: ['React.js', 'Node.js', 'JavaScript', 'Leaflet', 'OpenStreetMap', 'Tailwind CSS'], category: 'Hackathon', githubUrl: 'https://github.com/chetanhire66/Smart-parking-SIH', liveUrl: 'https://smart-parking-sih.onrender.com/', featured: true, highlight: 'Smart India Hackathon Innovation', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80' },
    { id: 'chobify', title: 'Chobify', description: 'Modern full-stack e-commerce web application featuring ultra-responsive client interfaces and scalable REST API backend architecture.', longDescription: 'Designed an enterprise-ready retail platform equipped with shopping cart state management, product catalog filtering, secure order placement, and persistent database modeling powered by MongoDB and Express.', techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API'], category: 'Full-Stack', githubUrl: 'https://github.com/chetanhire66/chobify-app', liveUrl: 'https://chobify-app.onrender.com/', featured: true, highlight: 'Enterprise E-Commerce Engine', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80' },
  ],
  certifications: [
    ['ibm-skillsbuild', 'IBM SkillsBuild Certification', 'IBM', 'Award', 'Cloud & Systems'], ['langchain-rag', 'Retrieval Augmented Generation with LangChain', 'LangChain / DeepLearning.AI', 'Bot', 'Generative AI'], ['master-ai-webapp', 'Master AI for Web App Development', 'Tech Academy', 'Cpu', 'Full-Stack AI'], ['python-prog', 'Python Programming Mastery', 'Certified Institute', 'Code', 'Programming'], ['genai-workshop', 'Generative AI Workshop Intensive', 'AI Research Guild', 'Sparkles', 'Generative AI'], ['journey-cloud', 'Journey to Cloud Fundamentals', 'Cloud Consortium', 'Cloud', 'Cloud Computing'], ['ai-fundamentals', 'Artificial Intelligence Fundamentals', 'Global AI Council', 'BrainCircuit', 'AI Core'],
  ].map(([id, title, issuer, icon, category]) => ({ id, title, issuer, icon, category, assetUrl: '' })),
  achievements: [
    { id: 'sih-2025', title: 'Smart India Hackathon 2025', event: 'Government of India National Hackathon', description: 'Currently Waitlisted for the Grand Finale of Smart India Hackathon 2025 out of thousands of nationwide engineering teams.', status: 'Waitlisted for Grand Finale', badge: 'National Hackathon', image: '' },
    { id: 'tenet-hackathon', title: 'TENET Hackathon Participant', event: 'TENET Tech Fest', description: 'Architected rapid prototype solutions under intense 24-hour hackathon constraints, focusing on high scalability and slick UX.', badge: 'Competitive Coding', image: '' },
    { id: 'pragati-hackathon', title: 'Pragati Build-It On Hackathon', event: 'Pragati Tech Symposia', description: 'Selected participant competing in building impactful web products addressing pressing societal and environmental challenges.', badge: 'Innovation Award', image: '' },
    { id: 'production-deployments', title: 'Full-Stack Production Deployments', event: 'Independent Engineering', description: 'Successfully built, tested, and deployed multiple production full-stack web applications on Render and Vercel with zero downtime.', badge: 'Milestone', image: '' },
  ],
  experience: [],
  resume: { url: '', fileName: 'Chetan_Hire_Resume_2026.pdf' },
  social: { github: 'https://github.com/chetanhire66', linkedin: 'https://www.linkedin.com/in/chetan-hire-002047371/' },
  githubSettings: { username: 'chetanhire66', totalRepos: 24, totalStars: 48, totalCommits2026: 412, longestStreak: 18, pullRequests: 32, issuesSolved: 19, languages: [{ name: 'JavaScript', percent: 42, color: '#F7DF1E' }, { name: 'TypeScript', percent: 28, color: '#3178C6' }, { name: 'Python', percent: 18, color: '#3776AB' }, { name: 'HTML/CSS', percent: 12, color: '#E34F26' }] },
};
