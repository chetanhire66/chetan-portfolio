import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Certification } from '../types';
import { ACHIEVEMENTS, FEATURED_PROJECTS, GITHUB_SIMULATED_STATS, PERSONAL_INFO, SKILL_CATEGORIES, TYPING_WORDS } from './portfolioData';

const fallback = {
  profile: PERSONAL_INFO,
  education: [PERSONAL_INFO.education],
  skills: SKILL_CATEGORIES,
  projects: FEATURED_PROJECTS,
  // Certificates are intentionally backend-only: a CMS outage must not show
  // stale static credentials.
  certifications: [] as Certification[],
  achievements: ACHIEVEMENTS,
  experience: [],
  resume: { url: '' },
  social: { github: PERSONAL_INFO.github, linkedin: PERSONAL_INFO.linkedin },
  githubSettings: GITHUB_SIMULATED_STATS,
};

type Content = typeof fallback & { profile: typeof PERSONAL_INFO & { profileImage?: string; typingWords?: string[] } };
type ViewData = { content: Content; personalInfo: typeof PERSONAL_INFO; typingWords: string[] };
const PortfolioContext = createContext<ViewData>({ content: fallback, personalInfo: PERSONAL_INFO, typingWords: TYPING_WORDS });

export const PortfolioProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<Content>(fallback);

  useEffect(() => {
    fetch('/api/portfolio').then(async (response) => {
      if (!response.ok) throw new Error('CMS unavailable');
      return response.json();
    }).then((remote) => setContent((current) => ({ ...current, ...remote }))).catch(() => {
      // Keep backend-only certificates empty when the CMS is unavailable.
    });
  }, []);

  const value = useMemo<ViewData>(() => ({
    content,
    personalInfo: { ...content.profile, github: content.social?.github || PERSONAL_INFO.github, linkedin: content.social?.linkedin || PERSONAL_INFO.linkedin, resumeUrl: content.resume?.url || '#resume', education: content.education?.[0] || PERSONAL_INFO.education },
    typingWords: content.profile?.typingWords?.length ? content.profile.typingWords : TYPING_WORDS,
  }), [content]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => useContext(PortfolioContext);
