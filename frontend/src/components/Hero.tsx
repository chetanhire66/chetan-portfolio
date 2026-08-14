import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Linkedin, Send, Sparkles, Terminal, Code2, Cpu, Database } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';
import chetanHeroImg from '../assets/images/chetan_profile_hero_1782383152595.jpg';

interface HeroProps {
  onOpenAiChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiChat }) => {
  const { personalInfo: PERSONAL_INFO, typingWords: TYPING_WORDS, content } = usePortfolio();
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (wordIndex >= TYPING_WORDS.length) {
      setWordIndex(0);
      setCurrentText('');
      setIsDeleting(false);
      return;
    }

    const targetWord = TYPING_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      } else {
        const nextText = isDeleting
          ? targetWord.substring(0, currentText.length - 1)
          : targetWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex, TYPING_WORDS]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-pink-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-blue-500/30 text-xs font-mono text-blue-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Available for Software Engineering Roles & Internships</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 leading-[1.1]">
                Hi, I'm <span className="text-gradient-primary">{PERSONAL_INFO.shortName}</span>
              </h1>
              
              {/* Typing Animated Subtitle */}
              <div className="h-12 sm:h-16 flex items-center justify-center lg:justify-start font-mono text-xl sm:text-3xl font-semibold text-slate-300 light:text-slate-700">
                <span className="text-blue-500 mr-2">&gt;</span>
                <span>{currentText}</span>
                <span className="w-0.5 sm:w-1 h-7 sm:h-9 bg-blue-500 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Tagline & Pitch */}
            <p className="text-base sm:text-lg text-slate-400 light:text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {PERSONAL_INFO.tagline} Architecting scalable <strong className="text-slate-200 light:text-slate-800">MERN Stack</strong> applications and integrating intelligent <strong className="text-slate-200 light:text-slate-800">AI & Machine Learning</strong> models into high-impact products.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-bold text-sm glass-card hover:bg-slate-800/80 light:hover:bg-slate-200 text-slate-200 light:text-slate-800 border border-slate-700 light:border-slate-300 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>View Projects</span>
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>Hire Me</span>
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Social Icons Quick Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-slate-400 light:text-slate-600 text-xs font-mono">
              <span>Connect:</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <span className="text-slate-700">•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <span className="text-slate-700">•</span>
              <button onClick={onOpenAiChat} className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 underline underline-offset-4">
                <Sparkles className="w-3.5 h-3.5" /> Ask AI Bot
              </button>
            </div>

          </motion.div>


          {/* Right 3D Linear-style Avatar & Floating Nodes Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Glowing Ring */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-blue-500/20">
              <div className="w-full h-full rounded-[23px] overflow-hidden bg-slate-950 relative group">
                <img
                  src={content.profile.profileImage || chetanHeroImg}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                {/* Bottom Overlay Info inside Avatar */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="text-left font-mono">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">PES Modern College</p>
                    <p className="text-xs text-white font-semibold">B.Tech AI & ML '28</p>
                  </div>
                  <div className="px-2 py-1 bg-blue-500/20 rounded text-[10px] font-mono text-blue-300 font-bold">
                    3rd Year
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Tech Badges (Linear Aesthetic) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 sm:-left-10 glass-card p-3.5 rounded-2xl border border-blue-500/30 shadow-xl flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-slate-400">GenAI Engine</p>
                <p className="text-xs font-bold text-slate-100 light:text-slate-900">Gemini API RAG</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -right-6 sm:-right-8 glass-card p-3.5 rounded-2xl border border-purple-500/30 shadow-xl flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-slate-400">Full Stack</p>
                <p className="text-xs font-bold text-slate-100 light:text-slate-900">MERN Architecture</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -right-10 hidden sm:flex glass-card p-3 rounded-2xl border border-teal-500/30 shadow-xl items-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono font-bold text-teal-300">Python & TS</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
