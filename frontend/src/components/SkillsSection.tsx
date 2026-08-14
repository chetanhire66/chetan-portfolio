import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Layout, Server, Database, Cpu, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';
import { SkillCategory } from '../types';

export const SkillsSection: React.FC = () => {
  const { content } = usePortfolio();
  const SKILL_CATEGORIES = content.skills;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Layout': return Layout;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Wrench': return Wrench;
      default: return Code2;
    }
  };

  const activeCat: SkillCategory = SKILL_CATEGORIES[selectedCategoryIndex];
  const ActiveIcon = getIcon(activeCat.iconName);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-teal-400 border border-teal-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Enterprise <span className="text-gradient-primary">Skill Ecosystem</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            From low-level algorithms to scalable cloud-native MERN architectures and generative AI integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Category Selection Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = getIcon(cat.iconName);
              const isSelected = selectedCategoryIndex === idx;

              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategoryIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'glass-card border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02]'
                      : 'bg-slate-900/40 light:bg-slate-100/60 border-slate-800 light:border-slate-200 hover:border-slate-700 text-slate-400 hover:text-slate-200 light:text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isSelected ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' : 'bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm sm:text-base font-bold ${isSelected ? 'text-slate-100 light:text-slate-900' : ''}`}>
                      {cat.title}
                    </span>
                  </div>
                  
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 light:bg-slate-200 text-slate-400">
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>


          {/* Right Active Skills Detailed View with Progress Bars */}
          <motion.div
            key={activeCat.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 light:border-slate-200 space-y-8"
          >
            {/* Header of Active Tab */}
            <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400">
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 light:text-slate-900">{activeCat.title}</h3>
                  <p className="text-xs font-mono text-slate-400 light:text-slate-600">Verified Production Proficiency</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Industry Standard
              </span>
            </div>

            {/* Skill Progress Bars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {activeCat.skills.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-200 light:text-slate-800 flex items-center gap-2">
                      <span>{skill.name}</span>
                      {skill.badge && (
                        <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {skill.badge}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs font-semibold text-blue-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-900 light:bg-slate-200 overflow-hidden p-[1px] border border-slate-800 light:border-slate-300">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: sIdx * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="pt-4 border-t border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Continuously expanding through daily research & coding
              </span>
              <span>MERN + AI Native</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
