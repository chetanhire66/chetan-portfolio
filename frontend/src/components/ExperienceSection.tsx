import React from 'react';
import { motion } from 'motion/react';
import { BriefcaseBusiness, Building2, CalendarDays, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

type Experience = {
  id: string;
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  current?: boolean;
};

const formatDate = (date?: string) => {
  if (!date) return '';
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
};

export const ExperienceSection: React.FC = () => {
  const { content } = usePortfolio();
  const experiences = (content.experience || []) as Experience[];

  if (!experiences.length) return null;

  return (
    <section id="experience" className="py-24 bg-slate-900/40 light:bg-slate-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-emerald-400 border border-emerald-500/20">
            <BriefcaseBusiness className="w-3.5 h-3.5" />
            <span>05 // PROFESSIONAL JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Experience &amp; <span className="text-gradient-primary">Internships</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Hands-on work and learning experiences that shaped my engineering practice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5">
          {experiences.map((experience, index) => {
            const dateRange = [formatDate(experience.startDate), experience.current ? 'Present' : formatDate(experience.endDate)].filter(Boolean).join(' — ');
            return (
              <motion.article
                key={experience.id || `${experience.company}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 light:border-slate-200 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <BriefcaseBusiness className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 light:text-slate-900">{experience.role || 'Professional Experience'}</h3>
                        {experience.company && <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-blue-400"><Building2 className="w-4 h-4" />{experience.company}</p>}
                      </div>
                      {(dateRange || experience.current) && <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-800/80 light:bg-slate-200 px-3 py-1.5 text-xs font-mono font-semibold text-slate-300 light:text-slate-700"><CalendarDays className="w-3.5 h-3.5 text-emerald-400" />{dateRange || 'Present'}</span>}
                    </div>
                    {experience.description && <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300 light:text-slate-700">{experience.description}</p>}
                    {experience.current && <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400"><CheckCircle2 className="w-4 h-4" />Current role</p>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
