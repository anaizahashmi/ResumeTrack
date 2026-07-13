'use client';

import { useState, useEffect } from 'react';
import { Building2, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResumes, NewCompanyInput } from '@/lib/resume-context';
import {
  ApplicationStatus,
  STATUS_ORDER,
  STATUS_STYLES,
  CompanyApplication,
} from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CompanyModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resumeId: string;
  resumeName: string;
  editingCompany?: CompanyApplication | null;
}

function toDateInput(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 10);
}

export function CompanyModal({
  open,
  onOpenChange,
  resumeId,
  resumeName,
  editingCompany,
}: CompanyModalProps) {
  const { addCompany, updateCompany } = useResumes();
  const isEditing = !!editingCompany;

  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [url, setUrl] = useState('');
  const [appliedDate, setAppliedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Wishlist');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      if (editingCompany) {
        setCompanyName(editingCompany.companyName);
        setJobRole(editingCompany.jobRole);
        setUrl(editingCompany.url);
        setAppliedDate(toDateInput(editingCompany.appliedDate));
        setDeadline(toDateInput(editingCompany.deadline));
        setStatus(editingCompany.status);
        setNotes(editingCompany.notes);
      } else {
        setCompanyName('');
        setJobRole('');
        setUrl('');
        setAppliedDate(new Date().toISOString().slice(0, 10));
        setDeadline('');
        setStatus('Wishlist');
        setNotes('');
      }
      setError('');
    }
  }, [open, editingCompany]);

  const handleSubmit = () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }
    if (!jobRole.trim()) {
      setError('Job role is required');
      return;
    }

    const input: NewCompanyInput = {
      companyName: companyName.trim(),
      jobRole: jobRole.trim(),
      url: url.trim(),
      appliedDate: appliedDate
        ? new Date(appliedDate).toISOString()
        : new Date().toISOString(),
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      status,
      notes: notes.trim(),
    };

    if (isEditing && editingCompany) {
      updateCompany(resumeId, editingCompany.id, input);
      toast.success('Application updated', {
        description: `${companyName.trim()} — ${jobRole.trim()}`,
      });
    } else {
      addCompany(resumeId, input);
      toast.success('Application added', {
        description: `${companyName.trim()} added to ${resumeName}`,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
              <Building2 className="h-4 w-4 text-violet-400" />
            </div>
            <div>
              <DialogTitle className="text-white">
                {isEditing ? 'Edit Application' : 'Add Application'}
              </DialogTitle>
              <DialogDescription className="text-zinc-500">
                {isEditing
                  ? `Update details for ${editingCompany?.companyName}`
                  : `Track a new company under ${resumeName}`}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-zinc-300">
                Company Name <span className="text-rose-400">*</span>
              </Label>
              <Input
                id="company-name"
                placeholder="Stripe"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-zinc-900/60 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-role" className="text-zinc-300">
                Job Role <span className="text-rose-400">*</span>
              </Label>
              <Input
                id="job-role"
                placeholder="Senior Frontend Engineer"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="bg-zinc-900/60 border-zinc-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-url" className="text-zinc-300">
              Job Spec / URL
            </Label>
            <Input
              id="job-url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-zinc-900/60 border-zinc-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="applied-date" className="text-zinc-300">
                Date Applied
              </Label>
              <Input
                id="applied-date"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="bg-zinc-900/60 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-zinc-300">
                Deadline (optional)
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-zinc-900/60 border-zinc-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as ApplicationStatus)}>
              <SelectTrigger className="bg-zinc-900/60 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                {STATUS_ORDER.map((s) => {
                  const style = STATUS_STYLES[s];
                  return (
                    <SelectItem key={s} value={s}>
                      <div className="flex items-center gap-2">
                        <span className={cn('h-2 w-2 rounded-full', style.dot)} />
                        {s}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-zinc-300">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Recruiter contact, prep notes, interview feedback..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-zinc-900/60 border-zinc-800 min-h-[100px] resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <X className="h-3 w-3" /> {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-zinc-800 text-zinc-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-500 text-white"
          >
            <Check className="h-4 w-4 mr-1.5" />
            {isEditing ? 'Save Changes' : 'Add Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
