import React from 'react';
import { motion } from 'motion/react';
import { User, Dumbbell, Trophy, Camera, Sparkles, Code, Cpu, Heart } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const About: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const hobbies = [
    { name: "Gym & Fitness Training", icon: Dumbbell, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "Competitive Hackathons", icon: Trophy, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { name: "Nature Photography", icon: Camera, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { name: "Cloud Native Exploration", icon: Cpu, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-blue-400 border border-blue-500/20">
            <User className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Bridging <span className="text-gradient-primary">AI & Full-Stack Craft</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Learn more about my background, engineering philosophy, and what fuels my curiosity outside the code editor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Story Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 light:border-slate-200 relative flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 text-slate-300 light:text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              <div className="flex items-center gap-3 border-b border-slate-800 light:border-slate-200 pb-4">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 light:text-slate-900">Engineering Purpose</h3>
                  <p className="text-xs font-mono text-slate-400 light:text-slate-600">Driven by innovation and clean architecture</p>
                </div>
              </div>

              {PERSONAL_INFO.aboutIntro.map((paragraph, index) => (
                <p key={index} className="text-slate-300 light:text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom Highlights */}
            <div className="pt-8 mt-8 border-t border-slate-800 light:border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-blue-400 font-mono">MERN</p>
                <p className="text-xs text-slate-400 light:text-slate-600">Enterprise Full-Stack Architecture</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-purple-400 font-mono">GenAI RAG</p>
                <p className="text-xs text-slate-400 light:text-slate-600">LangChain & Gemini API Integration</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-teal-400 font-mono">Clean Code</p>
                <p className="text-xs text-slate-400 light:text-slate-600">Scalable & Maintainable Principles</p>
              </div>
            </div>

          </motion.div>


          {/* Right Column: Key Stats & Hobbies Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 light:border-slate-200 flex-1 flex flex-col justify-center space-y-6"
            >
              <h4 className="text-sm font-mono text-slate-400 light:text-slate-600 uppercase tracking-wider font-bold">Key Milestones</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-center">
                  <span className="text-3xl font-extrabold text-gradient-primary font-mono">{PERSONAL_INFO.stats.yearsOfExperience}</span>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1 font-medium">Years Coding</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-center">
                  <span className="text-3xl font-extrabold text-gradient-primary font-mono">{PERSONAL_INFO.stats.projectsCompleted}</span>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1 font-medium">Apps Built</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-center">
                  <span className="text-3xl font-extrabold text-gradient-primary font-mono">{PERSONAL_INFO.stats.hackathonsParticipated}</span>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1 font-medium">Hackathons</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-center">
                  <span className="text-3xl font-extrabold text-gradient-primary font-mono">{PERSONAL_INFO.stats.certificationsEarned}</span>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-1 font-medium">Certificates</p>
                </div>
              </div>
            </motion.div>

            {/* Beyond Coding Hobbies Bento */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 light:border-slate-200 space-y-4"
            >
              <div className="flex items-center gap-2 text-sm font-mono text-slate-400 light:text-slate-600 uppercase font-bold">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Life Outside Code</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {hobbies.map((hobby, idx) => {
                  const Icon = hobby.icon;
                  return (
                    <div key={idx} className={`p-3 rounded-xl border flex items-center gap-3 transition-transform hover:scale-[1.02] ${hobby.color}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 light:text-slate-800">{hobby.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
