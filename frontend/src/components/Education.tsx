import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

export const Education: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();
  const { degree, major, institution, expectedGraduation, currentYear, status } = PERSONAL_INFO.education;

  const courseworkHighlights = [
    "Deep Learning & Neural Networks",
    "Data Structures & Algorithms",
    "Database Management Systems (SQL/NoSQL)",
    "Object-Oriented Programming",
    "Cloud Computing & Distributed Systems",
    "Natural Language Processing & RAG"
  ];

  return (
    <section id="education" className="py-24 bg-slate-900/40 light:bg-slate-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-purple-400 border border-purple-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02 // ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Formal <span className="text-gradient-primary">Engineering Education</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Rigorous undergraduate studies in Artificial Intelligence & Machine Learning preparing for enterprise software scale.
          </p>
        </div>

        {/* Education Hero Bento Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 light:border-slate-200 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Main Degree Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {status}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Class of {expectedGraduation}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {currentYear}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
                  {degree}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-gradient-primary">
                  {major}
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-300 light:text-slate-700 font-medium text-sm sm:text-base">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{institution}</span>
              </div>

              <p className="text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
                Focused on mathematical foundations of machine learning, modern backend engineering, cloud computing architectures, and software engineering methodologies.
              </p>

            </div>


            {/* Right Relevant Coursework Bento Box */}
            <div className="lg:col-span-5 bg-slate-900/80 light:bg-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 light:border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-600 font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Core Engineering Coursework</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {courseworkHighlights.map((course, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 light:text-slate-800 font-medium p-2 rounded-lg bg-slate-800/50 light:bg-slate-200/50 border border-slate-700/50 light:border-slate-300/50">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 light:border-slate-300 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Accredited Engineering Degree</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
