import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { GithubStatsSection } from './components/GithubStatsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiChatModal } from './components/AiChatModal';
import { Sparkles } from 'lucide-react';
import { PortfolioProvider } from './data/PortfolioContext';
import { AdminApp } from './components/AdminApp';

export default function App() {
  if (window.location.pathname === '/admin' || window.location.pathname === '/admin/login') return <AdminApp />;
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initial loading animation timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 text-white font-mono space-y-4">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="text-2xl font-extrabold text-gradient-primary">CH</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
          <span>Booting Chetan Hire's Portfolio Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <PortfolioProvider>
    <div className={`${theme} min-h-screen bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 transition-colors duration-300 selection:bg-blue-500 selection:text-white relative font-sans`}>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Main Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAiChat={() => setAiChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative overflow-hidden">
        <Hero
          onOpenAiChat={() => setAiChatOpen(true)}
        />
        <About />
        <Education />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
        <GithubStatsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AiChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
      />
    </div>
    </PortfolioProvider>
  );
}
