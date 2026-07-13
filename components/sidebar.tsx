'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileStack,
  Plus,
  FileText,
  TrendingUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type View = 'dashboard' | 'library';

interface SidebarProps {
  view: View;
  onViewChange: (v: View) => void;
  onUploadClick: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  totalResumes: number;
  totalApplications: number;
}

const NAV_ITEMS: {
  id: View;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'library', label: 'Resume Library', icon: FileStack },
];

export function Sidebar({
  view,
  onViewChange,
  onUploadClick,
  mobileOpen,
  onMobileClose,
  totalResumes,
  totalApplications,
}: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800/80 bg-[#0a0a0c]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/20">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                ResuTrack
              </h1>
              <p className="text-[11px] text-zinc-500">Reverse Job Tracker</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white"
            onClick={onMobileClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-3 py-2">
          <Button
            onClick={() => {
              onUploadClick();
              onMobileClose();
            }}
            className="w-full justify-start gap-2 bg-violet-600 text-white hover:bg-violet-500 border-0"
          >
            <Plus className="h-4 w-4" />
            Upload Resume
          </Button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-1">
          <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Workspace
          </p>
          {NAV_ITEMS.map((item) => {
            const active = view === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  onMobileClose();
                }}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-violet-500/10 border border-violet-500/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    'relative h-4 w-4 shrink-0',
                    active ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  )}
                />
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-violet-400" />
              <span className="text-xs font-medium text-zinc-300">Snapshot</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xl font-semibold text-white">{totalResumes}</p>
                <p className="text-[11px] text-zinc-500">Resumes</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">{totalApplications}</p>
                <p className="text-[11px] text-zinc-500">Applications</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
