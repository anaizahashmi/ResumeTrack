'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Eye,
  Download,
  Pencil,
  Trash2,
  ChevronDown,
  Plus,
  Building2,
  ExternalLink,
  Calendar,
  StickyNote,
  MoreVertical,
} from 'lucide-react';
import {
  ResumeEntity,
  CompanyApplication,
  STATUS_ORDER,
  STATUS_STYLES,
  ApplicationStatus,
  categoryStyle,
} from '@/lib/types';
import { useResumes } from '@/lib/resume-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface ResumeCardProps {
  resume: ResumeEntity;
  onEdit: (resume: ResumeEntity) => void;
  onAddCompany: (resume: ResumeEntity) => void;
  onEditCompany: (resume: ResumeEntity, company: CompanyApplication) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function daysUntil(iso?: string): number | null {
  if (!iso) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
}

export function ResumeCard({
  resume,
  onEdit,
  onAddCompany,
  onEditCompany,
}: ResumeCardProps) {
  const { updateCompanyStatus, deleteCompany } = useResumes();
  const [expanded, setExpanded] = useState(false);

  const interviews = resume.companies.filter((c) => c.status === 'Interview').length;
  const offers = resume.companies.filter((c) => c.status === 'Offer').length;

  return (
    <motion.div
      layout
      className="glass rounded-xl overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-700/10 border border-violet-500/20">
              <FileText className="h-5 w-5 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white truncate">
                  {resume.resumeName}
                </h3>
                <Badge
                  variant="outline"
                  className={cn('text-[10px] px-2 py-0', categoryStyle(resume.category))}
                >
                  {resume.category}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Uploaded {formatDate(resume.uploadDate)} · {resume.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-zinc-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info('Preview', {
                        description: `Previewing "${resume.resumeName}"`,
                      });
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Preview</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-zinc-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success('Download started', {
                        description: `"${resume.resumeName}" is downloading`,
                      });
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-500 hover:text-zinc-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-zinc-900 border-zinc-800 w-40"
              >
                <DropdownMenuItem
                  className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(resume);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5 mr-2" />
                  Edit Metadata
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddCompany(resume);
                  }}
                >
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Add Company
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="text-rose-400 focus:text-rose-300 focus:bg-rose-500/10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(resume);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span className="font-medium text-zinc-300">{resume.companies.length}</span> applications
            {interviews > 0 && (
              <span className="text-amber-400">· {interviews} interviews</span>
            )}
            {offers > 0 && (
              <span className="text-emerald-400">· {offers} offers</span>
            )}
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Expandable Company List */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-zinc-800/80"
          >
            <div className="p-3">
              {resume.companies.length === 0 ? (
                <div className="py-8 text-center">
                  <Building2 className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">No applications yet</p>
                  <Button
                    size="sm"
                    onClick={() => onAddCompany(resume)}
                    className="mt-3 bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Add Company
                  </Button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {resume.companies.map((company) => (
                    <CompanyRow
                      key={company.id}
                      company={company}
                      resumeId={resume.id}
                      onStatusChange={(s) =>
                        updateCompanyStatus(resume.id, company.id, s)
                      }
                      onEdit={() => onEditCompany(resume, company)}
                      onDelete={() => {
                        deleteCompany(resume.id, company.id);
                        toast.success('Application removed', {
                          description: `${company.companyName} removed from ${resume.resumeName}`,
                        });
                      }}
                    />
                  ))}
                  <button
                    onClick={() => onAddCompany(resume)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-zinc-800 hover:border-violet-500/40 hover:bg-violet-500/5 text-zinc-500 hover:text-violet-400 py-2.5 text-xs font-medium transition-colors mt-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Company
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface CompanyRowProps {
  company: CompanyApplication;
  resumeId: string;
  onStatusChange: (status: ApplicationStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
}

function CompanyRow({
  company,
  onStatusChange,
  onEdit,
  onDelete,
}: CompanyRowProps) {
  const [showNotes, setShowNotes] = useState(false);
  const style = STATUS_STYLES[company.status];
  const days = daysUntil(company.deadline);

  return (
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
      <div className="flex items-center gap-3 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60">
          <Building2 className="h-4 w-4 text-zinc-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {company.url ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-white hover:text-violet-400 transition-colors flex items-center gap-1"
              >
                {company.companyName}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            ) : (
              <span className="text-sm font-medium text-white">
                {company.companyName}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 truncate">{company.jobRole}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {days !== null && days >= 0 && (
            <span
              className={cn(
                'text-[11px] tabular-nums hidden sm:inline',
                days <= 3 ? 'text-rose-400' : days <= 7 ? 'text-amber-400' : 'text-zinc-500'
              )}
            >
              {days === 0 ? 'Today' : `${days}d left`}
            </span>
          )}

          <Select
            value={company.status}
            onValueChange={(v) => onStatusChange(v as ApplicationStatus)}
          >
            <SelectTrigger
              className={cn(
                'h-7 w-auto min-w-[110px] text-xs border-0 font-medium cursor-pointer',
                style.bg,
                style.text,
                'hover:opacity-80'
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {STATUS_ORDER.map((s) => {
                const sStyle = STATUS_STYLES[s];
                return (
                  <SelectItem key={s} value={s}>
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', sStyle.dot)} />
                      {s}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-600 hover:text-zinc-300"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-zinc-900 border-zinc-800 w-36"
            >
              <DropdownMenuItem
                className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                onClick={onEdit}
              >
                <Pencil className="h-3.5 w-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              {company.notes && (
                <DropdownMenuItem
                  className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  <StickyNote className="h-3.5 w-3.5 mr-2" />
                  {showNotes ? 'Hide Notes' : 'View Notes'}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem
                className="text-rose-400 focus:text-rose-300 focus:bg-rose-500/10 cursor-pointer"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 pb-2 text-[11px] text-zinc-600">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Applied {formatDate(company.appliedDate)}
        </span>
        {company.deadline && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Deadline {formatDate(company.deadline)}
          </span>
        )}
      </div>

      <AnimatePresence>
        {showNotes && company.notes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mx-3 mb-3 rounded-lg border border-zinc-800/60 bg-zinc-950/50 p-3">
              <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {company.notes}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
