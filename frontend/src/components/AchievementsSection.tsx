import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Rocket, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const AchievementsSection: React.FC = () => {
  const { content } = usePortfolio();
  const ACHIEVEMENTS = content.achievements;
  return (
    <section id="achievements" className="py-24 bg-slate-900/40 light:bg-slate-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-pink-400 border border-pink-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>06 // HONORS & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Key <span className="text-gradient-primary">Achievements</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Recognitions earned in high-stakes national hackathons and independent full-stack product launches.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((ach, aIdx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: aIdx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: aIdx * 0.15 }}
              className={`glass-card p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.02] ${
                ach.status ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' : 'border-slate-800 light:border-slate-200 hover:border-purple-500/40'
              }`}
            >
              {ach.status && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-blue-600 to-indigo-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-bl-2xl shadow-lg">
                  {ach.status}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${ach.status ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    <Flame className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 light:text-slate-600 font-bold uppercase tracking-wider">{ach.event}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 light:text-slate-900 leading-tight">
                      {ach.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-2">
                  {ach.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-slate-900 light:bg-slate-200 text-slate-300 light:text-slate-700 font-semibold border border-slate-800 light:border-slate-300">
                  {ach.badge}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Impact</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
