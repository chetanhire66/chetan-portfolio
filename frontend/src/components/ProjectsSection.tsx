import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, ExternalLink, Github, Sparkles, Filter, Layers } from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const { content } = usePortfolio();
  const FEATURED_PROJECTS = content.projects;
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full-Stack' | 'Hackathon'>('All');

  const filteredProjects: Project[] = FEATURED_PROJECTS.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full-Stack') return proj.category === 'Full-Stack';
    if (activeFilter === 'Hackathon') return proj.category === 'Hackathon';
    return true;
  });

  return (
    <section id="projects" className="py-24 bg-slate-900/30 light:bg-slate-100/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-blue-400 border border-blue-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>04 // FEATURED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            Flagship <span className="text-gradient-primary">Project Showcase</span>
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Production-grade full-stack web applications and national hackathon prototypes architected from the ground up.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {(['All', 'Full-Stack', 'Hackathon'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'glass-card text-slate-400 hover:text-white border border-slate-800 light:border-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, pIdx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: pIdx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 light:border-slate-200 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-600/90 text-white shadow-md">
                      {proj.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-blue-300 border border-blue-500/30 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {proj.highlight}
                    </span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-7 space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100 light:text-slate-900 group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  
                  <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  {proj.longDescription && (
                    <p className="text-xs text-slate-400 light:text-slate-600 border-l-2 border-blue-500/40 pl-3 leading-relaxed italic">
                      {proj.longDescription}
                    </p>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="pt-3 flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-900/80 light:bg-slate-200 text-slate-300 light:text-slate-800 border border-slate-800 light:border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Footer */}
              <div className="p-7 pt-0 flex items-center justify-between mt-4">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 light:bg-slate-200 hover:bg-slate-800 text-slate-200 light:text-slate-800 transition-colors flex items-center gap-2 border border-slate-800 light:border-slate-300"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>

                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 hover:scale-105"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/chetanhire66"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-slate-800 text-xs font-mono font-bold text-slate-300 light:text-slate-700 border border-slate-700 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4 text-blue-400" />
            <span>View 20+ more repositories on Chetan's GitHub</span>
          </a>
        </div>

      </div>
    </section>
  );
};
