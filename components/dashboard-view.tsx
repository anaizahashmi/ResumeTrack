'use client';

import { motion } from 'framer-motion';
import {
  FileStack,
  Briefcase,
  Users,
  Trophy,
  XCircle,
  CalendarClock,
  Plus,
  FileText,
  Building2,
  ArrowRight,
  Activity as ActivityIcon,
} from 'lucide-react';
import { useResumes, fmtRelative } from '@/lib/resume-context';
import { STATUS_STYLES, categoryStyle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface DashboardViewProps {
  onUploadClick: () => void;
  onNavigateLibrary: () => void;
}

const METRIC_CONFIG = [
  { key: 'totalResumes', label: 'Active Resumes', icon: FileStack, accent: 'text-violet-400', glow: 'shadow-violet-500/20' },
  { key: 'totalApplications', label: 'Job Applications', icon: Briefcase, accent: 'text-sky-400', glow: 'shadow-sky-500/20' },
  { key: 'activeInterviews', label: 'Active Interviews', icon: Users, accent: 'text-amber-400', glow: 'shadow-amber-500/20' },
  { key: 'offers', label: 'Offers Secured', icon: Trophy, accent: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  { key: 'rejections', label: 'Rejections', icon: XCircle, accent: 'text-rose-400', glow: 'shadow-rose-500/20' },
] as const;

export function DashboardView({ onUploadClick, onNavigateLibrary }: DashboardViewProps) {
  const { metrics, resumes, activity } = useResumes();

  return (
    <div className="space-y-8">
      {/* Metric Ribbon */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              Overview
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {METRIC_CONFIG.map((m, i) => {
            const Icon = m.icon;
            const value = metrics[m.key as keyof typeof metrics] as number;
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -2 }}
                className={cn(
                  'glass rounded-xl p-4 relative overflow-hidden group',
                )}
              >
                <div className={cn('absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-10 bg-current', m.accent)} />
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/60', m.accent)}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <p className="text-3xl font-semibold text-white tabular-nums">{value}</p>
                <p className="text-xs text-zinc-500 mt-1">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-3">
          <div className="glass rounded-xl">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800/80">
              <CalendarClock className="h-4 w-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-white">Upcoming Deadlines</h3>
              <span className="ml-auto text-xs text-zinc-500">
                {metrics.upcomingDeadlines.length} tracked
              </span>
            </div>
            <div className="p-2">
              {metrics.upcomingDeadlines.length === 0 ? (
                <div className="px-3 py-12 text-center">
                  <CalendarClock className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">No upcoming deadlines</p>
                </div>
              ) : (
                metrics.upcomingDeadlines.map(({ company, resume }) => {
                  const daysLeft = Math.ceil(
                    (new Date(company.deadline!).getTime() - Date.now()) / 86400000
                  );
                  const urgent = daysLeft <= 3;
                  const soon = daysLeft <= 7;
                  return (
                    <div
                      key={company.id}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-zinc-800/40 transition-colors group"
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                          urgent
                            ? 'bg-rose-500/10 text-rose-400'
                            : soon
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-zinc-800/60 text-zinc-400'
                        )}
                      >
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white truncate">
                            {company.companyName}
                          </p>
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full shrink-0',
                              STATUS_STYLES[company.status].dot
                            )}
                          />
                        </div>
                        <p className="text-xs text-zinc-500 truncate">
                          {company.jobRole} · {resume.resumeName}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={cn(
                            'text-sm font-semibold tabular-nums',
                            urgent ? 'text-rose-400' : soon ? 'text-amber-400' : 'text-zinc-300'
                          )}
                        >
                          {daysLeft === 0 ? 'Today' : daysLeft < 0 ? 'Overdue' : `${daysLeft}d`}
                        </p>
                        <p className="text-[11px] text-zinc-600">
                          {new Date(company.deadline!).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800/80">
              <ActivityIcon className="h-4 w-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-white">Activity Stream</h3>
            </div>
            <div className="p-2 max-h-[420px] overflow-y-auto scrollbar-thin">
              {activity.length === 0 ? (
                <div className="px-3 py-12 text-center">
                  <ActivityIcon className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">No recent activity</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Actions you take will appear here
                  </p>
                </div>
              ) : (
                activity.map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex gap-3 px-3 py-2.5"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'flex h-7 w-7 items-center justify-center rounded-full shrink-0',
                          evt.type === 'add-resume' && 'bg-violet-500/10 text-violet-400',
                          evt.type === 'add-company' && 'bg-sky-500/10 text-sky-400',
                          evt.type === 'update-status' && 'bg-amber-500/10 text-amber-400',
                          evt.type === 'delete-company' && 'bg-rose-500/10 text-rose-400',
                          evt.type === 'delete-resume' && 'bg-rose-500/10 text-rose-400',
                        )}
                      >
                        {evt.type === 'add-resume' && <FileText className="h-3.5 w-3.5" />}
                        {evt.type === 'add-company' && <Building2 className="h-3.5 w-3.5" />}
                        {evt.type === 'update-status' && <ArrowRight className="h-3.5 w-3.5" />}
                        {(evt.type === 'delete-company' || evt.type === 'delete-resume') && <XCircle className="h-3.5 w-3.5" />}
                      </div>
                      {i < activity.length - 1 && (
                        <div className="w-px flex-1 bg-zinc-800/60 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-sm text-zinc-200 leading-snug">{evt.message}</p>
                      <p className="text-[11px] text-zinc-600 mt-0.5">
                        {fmtRelative(evt.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Resume Breakdown
          </h3>
          <button
            onClick={onNavigateLibrary}
            className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {resumes.map((resume) => {
            const interviews = resume.companies.filter(
              (c) => c.status === 'Interview'
            ).length;
            const offers = resume.companies.filter(
              (c) => c.status === 'Offer'
            ).length;
            return (
              <motion.div
                key={resume.id}
                whileHover={{ y: -2 }}
                className="glass rounded-xl p-4 cursor-pointer"
                onClick={onNavigateLibrary}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                      <FileText className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{resume.resumeName}</p>
                      <p className="text-[11px] text-zinc-500">
                        {resume.companies.length} applications
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px]', categoryStyle(resume.category))}
                  >
                    {resume.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Users className="h-3 w-3" /> {interviews} interviews
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Trophy className="h-3 w-3" /> {offers} offers
                  </span>
                </div>
              </motion.div>
            );
          })}
          <button
            onClick={onUploadClick}
            className="glass rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-violet-400 hover:border-violet-500/30 transition-colors min-h-[110px]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/60">
              <Plus className="h-4 w-4" />
            </div>
            <span className="text-xs">Add new resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}
