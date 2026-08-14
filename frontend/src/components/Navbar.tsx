import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Sparkles,
  Send,
} from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onOpenAiChat,
}) => {
  const { personalInfo: PERSONAL_INFO, content } = usePortfolio();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // API base URL
  // Local:
  // http://localhost:5000/api
  //
  // Production:
  // https://chetan-portfolio-iqvu.onrender.com/api
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000/api';

  // Resume URL
  const resumeUrl = `${API_BASE_URL.replace(
    /\/$/,
    ''
  )}/resume/file?view=1`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 glass-nav shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Animated CH Geometric Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="font-mono font-extrabold text-lg text-gradient-primary tracking-tighter">
                {PERSONAL_INFO.initials}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-slate-100 light:text-slate-900 flex items-center gap-1">
              {PERSONAL_INFO.shortName}

              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </span>

            <span className="text-[10px] font-mono text-slate-400 light:text-slate-600 uppercase tracking-widest">
              AI Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/50 light:bg-slate-100/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 light:border-slate-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 light:text-slate-700 hover:text-blue-400 light:hover:text-blue-600 transition-colors rounded-full hover:bg-slate-800/60 light:hover:bg-slate-200/60"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 light:text-purple-700 border border-purple-500/30 transition-all shadow-sm hover:scale-105"
          >
            <Sparkles
              className="w-3.5 h-3.5 text-purple-400 animate-spin"
              style={{ animationDuration: '4s' }}
            />

            <span>Ask AI</span>
          </button>

          {/* Uploaded Resume */}
          <a
            href={
              content.resume?.url
                ? resumeUrl
                : '#hero'
            }
            target={
              content.resume?.url
                ? '_blank'
                : undefined
            }
            rel={
              content.resume?.url
                ? 'noopener noreferrer'
                : undefined
            }
            className="text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
          >
            Resume
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-full bg-slate-800/80 light:bg-slate-200/80 text-slate-300 light:text-slate-700 hover:text-blue-400 transition-colors border border-slate-700 light:border-slate-300"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* GitHub Star Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full bg-slate-800/80 light:bg-slate-200/80 text-slate-300 light:text-slate-700 hover:text-white transition-colors border border-slate-700 light:border-slate-300"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Hire Me</span>

            <Send className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">

          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-lg bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            aria-label="Toggle Menu"
            className="p-2 rounded-lg bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: 'auto',
          }}
          className="md:hidden glass-nav border-b border-slate-800 light:border-slate-200 px-6 py-6 space-y-4"
        >
          <div className="flex flex-col space-y-3">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-sm font-medium text-slate-300 light:text-slate-700 hover:text-blue-400"
              >
                {link.name}
              </a>
            ))}

          </div>

          <div className="pt-4 border-t border-slate-800 light:border-slate-200 flex flex-col gap-3">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiChat();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 flex items-center justify-center gap-2 border border-purple-500/30"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />

              <span>
                Ask Chetan's AI Assistant
              </span>
            </button>

            {/* Mobile Resume */}
            <a
              href={
                content.resume?.url
                  ? resumeUrl
                  : '#hero'
              }
              target={
                content.resume?.url
                  ? '_blank'
                  : undefined
              }
              rel={
                content.resume?.url
                  ? 'noopener noreferrer'
                  : undefined
              }
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-800 flex items-center justify-center"
            >
              View Uploaded Resume
            </a>

            <a
              href="#contact"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <span>Hire Me Now</span>

              <Send className="w-3.5 h-3.5" />
            </a>

          </div>
        </motion.div>
      )}
    </motion.header>
  );
};