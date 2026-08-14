import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitCommit,
  Star,
  GitPullRequest,
  Flame,
  Terminal,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { usePortfolio } from '../data/PortfolioContext';

type GithubContribution = {
  date: string;
  count: number;
  level: string;
  weekday?: number;
};

type GithubData = {
  username: string;
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
    periodLabel: string;
    longestStreak: number;
    pullRequests: number;
    issuesSolved: number;
    followers: number;
    following: number;
    languages: {
      name: string;
      percent: number;
      color: string;
    }[];
  };
  contributions: GithubContribution[];
};

type ContributionWeek = Array<GithubContribution | null>;

const getWeekday = (day: GithubContribution) => {
  if (typeof day.weekday === 'number' && day.weekday >= 0 && day.weekday <= 6) {
    return day.weekday;
  }

  return new Date(`${day.date}T00:00:00Z`).getUTCDay();
};

// GitHub supplies a weekday for every contribution day. Grouping by the
// Sunday that begins each week makes the grid resilient to partial weeks,
// missing dates, or an API response that is not already ordered.
const createContributionWeeks = (contributions: GithubContribution[]): ContributionWeek[] => {
  const weeks = new Map<string, ContributionWeek>();

  [...contributions]
    .sort((first, second) => first.date.localeCompare(second.date))
    .forEach((day) => {
      const weekday = getWeekday(day);
      const weekStart = new Date(`${day.date}T00:00:00Z`);
      weekStart.setUTCDate(weekStart.getUTCDate() - weekday);
      const weekKey = weekStart.toISOString().slice(0, 10);

      if (!weeks.has(weekKey)) weeks.set(weekKey, Array.from({ length: 7 }, () => null));
      weeks.get(weekKey)![weekday] = day;
    });

  return [...weeks.entries()]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([, week]) => week);
};

export const GithubStatsSection: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolio();

  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const githubUrl = new URL('/api/github', window.location.origin).toString();

    const fetchGithubData = async () => {
      try {
        setLoading(true);
        setError('');

        console.log('[GitHub activity] Fetching:', githubUrl);
        const response = await fetch(githubUrl);
        console.log('[GitHub activity] Response:', response.status, response);

        const contentType = response.headers.get('content-type') || '';

        if (!contentType.includes('application/json')) {
          throw new Error(
            `Backend returned a non-JSON response (${response.status}). Check that the backend is running on /api.`
          );
        }

        const data = await response.json();
        console.log('[GitHub activity] Parsed JSON:', data);

        if (!response.ok) {
          throw new Error(
            data?.error || 'GitHub activity is unavailable.'
          );
        }

        if (active) {
          console.log('[GitHub activity] Passing data to setGithubData:', data);
          setGithubData(data as GithubData);
        } else {
          console.log('[GitHub activity] Request completed after component unmounted.');
        }
      } catch (reason) {
        console.error('[GitHub activity] Fetch failed:', reason);
        if (active) {
          setError(
            reason instanceof Error
              ? reason.message
              : 'GitHub activity is unavailable.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchGithubData();

    return () => {
      active = false;
    };
  }, []);

  const stats = githubData?.stats;
  const languages = stats?.languages || [];
  const contributionCells = githubData?.contributions || [];
  const contributionWeeks = createContributionWeeks(contributionCells);

  const getCellColor = (level: string) => {
    switch (level) {
      case 'FIRST_QUARTILE':
        return 'bg-blue-900/60 border-blue-800/80';

      case 'SECOND_QUARTILE':
        return 'bg-blue-700/80 border-blue-600';

      case 'THIRD_QUARTILE':
        return 'bg-blue-500 border-blue-400';

      case 'FOURTH_QUARTILE':
        return 'bg-teal-400 border-teal-300 shadow-sm shadow-teal-500/50';

      default:
        return 'bg-slate-700 border-slate-500/80';
    }
  };

  const value = (item: number | undefined) => {
    if (loading) return '…';

    if (error) return '—';

    return item ?? '—';
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-blue-400 border border-blue-500/20">
            <Github className="w-3.5 h-3.5" />

            <span>07 // OPEN SOURCE METRICS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 light:text-slate-900">
            GitHub{' '}
            <span className="text-gradient-primary">
              Engineering Activity
            </span>
          </h2>

          <p className="text-slate-400 light:text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Consistently shipping clean code, contributing to repositories,
            and maintaining a steady daily commit rhythm.
          </p>

          {error && (
            <p
              role="alert"
              className="text-sm text-amber-400 mt-4"
            >
              GitHub data unavailable: {error}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

            {/* Repositories */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <Github className="w-5 h-5 text-slate-400 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.totalRepos)}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                Public Repos
              </p>
            </div>

            {/* Stars */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.totalStars)}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                GitHub Stars
              </p>
            </div>

            {/* Commits */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <GitCommit className="w-5 h-5 text-blue-400 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.totalCommits)}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                {stats?.periodLabel || 'Current year'} Commits
              </p>
            </div>

            {/* Streak */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.longestStreak)}
                {loading || error ? '' : ' Days'}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                Longest Streak
              </p>
            </div>

            {/* Pull Requests */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <GitPullRequest className="w-5 h-5 text-purple-400 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.pullRequests)}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                Merged PRs
              </p>
            </div>

            {/* Issues */}
            <div className="glass-card p-5 rounded-2xl border border-slate-800 light:border-slate-200 text-center">
              <Activity className="w-5 h-5 text-teal-400 mx-auto mb-2" />

              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                {value(stats?.issuesSolved)}
              </p>

              <p className="text-xs text-slate-400 light:text-slate-600 font-medium">
                Issues Solved
              </p>
            </div>
          </div>

          {/* Contribution Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 glass-card p-8 rounded-3xl border border-slate-800 light:border-slate-200 flex flex-col justify-between"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-blue-400" />

                <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                  Contribution Activity Matrix
                </h3>
              </div>

              <span className="text-xs font-mono text-slate-400 light:text-slate-600">
                Active Commit Frequency
              </span>
            </div>

            {/* Contribution Grid */}
            <div className="overflow-x-auto py-4">
              <div
                role="grid"
                aria-label="GitHub contribution activity"
                className="flex w-max gap-1.5"
              >
                {contributionWeeks.map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} role="rowgroup" className="grid grid-rows-7 gap-1.5">
                    {week.map((day, weekday) => day ? (
                      <div
                        key={day.date}
                        role="gridcell"
                        title={`${day.count} contributions on ${day.date}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                        className={`
                          h-4 w-4
                          rounded-sm
                          border
                          transition-all
                          duration-200
                          hover:scale-125
                          hover:z-10
                          ${getCellColor(day.level)}
                        `}
                      />
                    ) : (
                      <div key={`empty-${weekIndex}-${weekday}`} aria-hidden="true" className="h-4 w-4" />
                    ))}
                  </div>
                ))}
              </div>

            </div>

            {!loading &&
              !error &&
              contributionCells.length === 0 && (
                <p className="py-4 text-center text-sm text-slate-400">
                  No contribution activity returned.
                </p>
              )}

            {/* Legend */}
            <div className="pt-6 mt-4 border-t border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">

              <div className="flex items-center gap-2">

                <span>Less</span>

                <span className="w-3 h-3 rounded-sm bg-slate-900 light:bg-slate-200 border border-slate-800" />

                <span className="w-3 h-3 rounded-sm bg-blue-900/60" />

                <span className="w-3 h-3 rounded-sm bg-blue-700/80" />

                <span className="w-3 h-3 rounded-sm bg-blue-500" />

                <span className="w-3 h-3 rounded-sm bg-teal-400" />

                <span>More</span>

              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
              >
                <span>Live GitHub Profile</span>

                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 glass-card p-8 rounded-3xl border border-slate-800 light:border-slate-200 space-y-6 flex flex-col justify-between"
          >

            <div>

              <h3 className="text-lg font-bold text-slate-100 light:text-slate-900 mb-2">
                Most Used Languages
              </h3>

              <p className="text-xs text-slate-400 light:text-slate-600 font-normal leading-relaxed">
                Aggregated repository distribution demonstrating full-stack
                versatility across web and ML.
              </p>

            </div>

            {/* Language Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-900 light:bg-slate-200 border border-slate-800 light:border-slate-300">

              {languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percent}%`,
                    backgroundColor: lang.color,
                  }}
                  className="h-full transition-all duration-500"
                />
              ))}

            </div>

            {/* Language List */}
            <div className="space-y-3">

              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between text-xs sm:text-sm font-mono"
                >

                  <div className="flex items-center gap-2">

                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />

                    <span className="font-bold text-slate-200 light:text-slate-800">
                      {lang.name}
                    </span>

                  </div>

                  <span className="text-slate-400 light:text-slate-600 font-semibold">
                    {lang.percent}%
                  </span>

                </div>
              ))}

            </div>

            <div className="pt-4 border-t border-slate-800 light:border-slate-200 text-center">

              <span className="text-[11px] font-mono text-slate-400">
                Verified Git Commit Analytics
              </span>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
