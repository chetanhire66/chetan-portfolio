import React from 'react';
import { motion } from 'motion/react';
import { Award, Bot, Cpu, Code, Sparkles, Cloud, BrainCircuit, CheckCircle2, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const CertificationsSection: React.FC = () => {
  const { content } = usePortfolio();
  const CERTIFICATIONS = Array.isArray(content.certifications) ? content.certifications : [];
  const getCertIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'Bot': return Bot;
      case 'Cpu': return Cpu;
      case 'Code': return Code;
      case 'Sparkles': return Sparkles;
      case 'Cloud': return Cloud;
      case 'BrainCircuit': return BrainCircuit;
      default: return Award;
    }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-amber-400 border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>05 // CREDENTIAL GALLERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Verified <span className="text-gradient-primary">Certifications</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Continuous professional development across IBM Cloud, LangChain RAG, Full-Stack AI, and Python programming.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, cIdx) => {
            const Icon = getCertIcon(cert.icon);
            const certificateUrl = cert.assetUrl?.trim();
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800 light:border-slate-200 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
                onClick={certificateUrl ? () => window.open(`/api/certificates/${encodeURIComponent(cert.id)}/file`, '_blank', 'noopener,noreferrer') : undefined}
                onKeyDown={certificateUrl ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.open(`/api/certificates/${encodeURIComponent(cert.id)}/file`, '_blank', 'noopener,noreferrer');
                  }
                } : undefined}
                role={certificateUrl ? 'link' : undefined}
                tabIndex={certificateUrl ? 0 : undefined}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-900 light:bg-slate-200 text-slate-400 light:text-slate-700">
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 light:text-slate-900 group-hover:text-blue-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 light:text-slate-600 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {cert.issuer}
                  </span>
                  <span className="text-blue-400 font-bold flex items-center gap-1">
                    <span>Verified</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
