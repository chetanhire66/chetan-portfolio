import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const Footer: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 light:bg-slate-100 text-slate-400 light:text-slate-600 border-t border-slate-800 light:border-slate-300 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-lg text-gradient-primary">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              B.Tech AI & ML '28
            </span>
          </div>
          <p className="text-xs text-slate-500 light:text-slate-600 max-w-sm">
            {PERSONAL_INFO.tagline} Designed & engineered with modern React, Tailwind CSS, Node.js, and Google Gemini API.
          </p>
        </div>

        {/* Center Copyright & Heart */}
        <div className="flex flex-col items-center gap-1.5 text-xs font-mono">
          <p className="flex items-center gap-1 text-slate-300 light:text-slate-700 font-medium">
            <span>Crafted with passion by</span>
            <strong className="text-blue-400">{PERSONAL_INFO.name}</strong>
          </p>
          <p className="text-[11px] text-slate-500">
            Copyright © {new Date().getFullYear()} • All rights reserved
          </p>
        </div>

        {/* Right Actions & Socials */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-slate-300 transition-transform hover:scale-110 border border-slate-800"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-blue-400 transition-transform hover:scale-110 border border-slate-800"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="p-2.5 rounded-xl glass-card hover:bg-slate-800 text-purple-400 transition-transform hover:scale-110 border border-slate-800"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-110 ml-2 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
