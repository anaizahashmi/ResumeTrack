'use client';

import { useState, useEffect } from 'react';
import { FileText, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResumes } from '@/lib/resume-context';
import { DEFAULT_CATEGORIES, ResumeEntity } from '@/lib/types';
import { toast } from 'sonner';

interface EditResumeModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resume: ResumeEntity | null;
}

export function EditResumeModal({ open, onOpenChange, resume }: EditResumeModalProps) {
  const { updateResume, deleteResume } = useResumes();
  const [resumeName, setResumeName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (open && resume) {
      setResumeName(resume.resumeName);
      setCategory(resume.category);
      setError('');
      setShowDelete(false);
    }
  }, [open, resume]);

  const handleSubmit = () => {
    if (!resumeName.trim()) {
      setError('Resume name is required');
      return;
    }
    if (!resume) return;
    updateResume(resume.id, { resumeName: resumeName.trim(), category });
    toast.success('Resume updated', {
      description: `"${resumeName.trim()}" metadata saved`,
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!resume) return;
    deleteResume(resume.id);
    toast.success('Resume deleted', {
      description: `"${resume.resumeName}" and all its applications removed`,
    });
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <FileText className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <DialogTitle className="text-white">Edit Resume</DialogTitle>
                <DialogDescription className="text-zinc-500">
                  Update metadata or remove this resume
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-zinc-300">
                Resume Name
              </Label>
              <Input
                id="edit-name"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="bg-zinc-900/60 border-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-zinc-900/60 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {resume && (
              <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-2.5">
                <div>
                  <p className="text-xs text-zinc-500">File size</p>
                  <p className="text-sm text-zinc-300">{resume.fileSize}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Applications</p>
                  <p className="text-sm text-zinc-300">{resume.companies.length}</p>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <X className="h-3 w-3" /> {error}
              </p>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowDelete(true)}
              className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 mr-auto"
            >
              Delete Resume
            </Button>
            <div className="flex gap-2">
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
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent className="bg-zinc-950 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500">
              This will permanently remove &ldquo;{resume?.resumeName}&rdquo; and all{' '}
              {resume?.companies.length ?? 0} applications tracked under it. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-zinc-800 text-zinc-400 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-rose-600 hover:bg-rose-500 text-white border-0"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
