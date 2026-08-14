import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Certification } from '../types';

import {
  ACHIEVEMENTS,
  FEATURED_PROJECTS,
  GITHUB_SIMULATED_STATS,
  PERSONAL_INFO,
  SKILL_CATEGORIES,
  TYPING_WORDS,
} from './portfolioData';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api';

const fallback = {
  profile: PERSONAL_INFO,

  education: [PERSONAL_INFO.education],

  skills: SKILL_CATEGORIES,

  projects: FEATURED_PROJECTS,

  // Certificates are intentionally backend-only.
  // If the backend is unavailable, don't show stale certificates.
  certifications: [] as Certification[],

  achievements: ACHIEVEMENTS,

  experience: [],

  resume: {
    url: '',
  },

  social: {
    github: PERSONAL_INFO.github,
    linkedin: PERSONAL_INFO.linkedin,
  },

  githubSettings: GITHUB_SIMULATED_STATS,
};

type Content = typeof fallback & {
  profile: typeof PERSONAL_INFO & {
    profileImage?: string;
    typingWords?: string[];
  };
};

type ViewData = {
  content: Content;
  personalInfo: typeof PERSONAL_INFO;
  typingWords: string[];
};

const PortfolioContext = createContext<ViewData>({
  content: fallback,
  personalInfo: PERSONAL_INFO,
  typingWords: TYPING_WORDS,
});

export const PortfolioProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const [content, setContent] =
    useState<Content>(fallback);

  useEffect(() => {
    const portfolioUrl =
      `${API_BASE_URL.replace(/\/$/, '')}/portfolio`;

    console.log(
      '[Portfolio] Fetching:',
      portfolioUrl
    );

    fetch(portfolioUrl)
      .then(async (response) => {
        console.log(
          '[Portfolio] Response:',
          response.status
        );

        const contentType =
          response.headers.get('content-type') || '';

        if (!contentType.includes('application/json')) {
          throw new Error(
            `Portfolio API returned a non-JSON response (${response.status}).`
          );
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              'Portfolio data unavailable.'
          );
        }

        return data;
      })
      .then((remote) => {
        console.log(
          '[Portfolio] Data loaded successfully'
        );

        setContent((current) => ({
          ...current,
          ...remote,
        }));
      })
      .catch((error) => {
        console.error(
          '[Portfolio] Failed to load:',
          error
        );

        // Keep backend-only certificates empty
        // when the CMS/backend is unavailable.
      });
  }, []);

  const value = useMemo<ViewData>(
    () => ({
      content,

      personalInfo: {
        ...content.profile,

        github:
          content.social?.github ||
          PERSONAL_INFO.github,

        linkedin:
          content.social?.linkedin ||
          PERSONAL_INFO.linkedin,

        resumeUrl:
          content.resume?.url ||
          '#resume',

        education:
          content.education?.[0] ||
          PERSONAL_INFO.education,
      },

      typingWords:
        content.profile?.typingWords?.length
          ? content.profile.typingWords
          : TYPING_WORDS,
    }),
    [content]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () =>
  useContext(PortfolioContext);