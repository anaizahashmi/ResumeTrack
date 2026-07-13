'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, X, Check } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useResumes } from '@/lib/resume-context';
import { DEFAULT_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UploadResumeModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadResumeModal({ open, onOpenChange }: UploadResumeModalProps) {
  const { addResume } = useResumes();
  const [resumeName, setResumeName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setResumeName('');
    setCategory('Frontend');
    setFile(null);
    setError('');
  };

  const handleClose = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleFile = useCallback((f: File) => {
    const valid = f.type === 'application/pdf' ||
      f.name.endsWith('.pdf') ||
      f.name.endsWith('.docx') ||
      f.name.endsWith('.doc');
    if (!valid) {
      setError('Please upload a .pdf or .docx file');
      return;
    }
    setError('');
    setFile(f);
    if (!resumeName) {
      const base = f.name.replace(/\.(pdf|docx?|PDF|DOCX?)$/, '');
      setResumeName(base);
    }
  }, [resumeName]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleSubmit = () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    if (!resumeName.trim()) {
      setError('Resume name is required');
      return;
    }
    addResume({
      resumeName: resumeName.trim(),
      category,
      fileSize: formatBytes(file.size),
    });
    toast.success('Resume uploaded', {
      description: `"${resumeName.trim()}" added to your library`,
    });
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Resume</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Add a new resume to your library. Applications will be tracked under it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all',
              dragging
                ? 'border-violet-500 bg-violet-500/5'
                : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {file ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-zinc-500">{formatBytes(file.size)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-xs text-zinc-500 hover:text-rose-400 flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Remove
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800/60">
                  <UploadCloud className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Drop your resume here
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    or click to browse — .pdf or .docx
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume-name" className="text-zinc-300">
              Resume Name
            </Label>
            <Input
              id="resume-name"
              placeholder="e.g. Frontend Engineer Resume"
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

          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <X className="h-3 w-3" /> {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="bg-transparent border-zinc-800 text-zinc-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-500 text-white"
          >
            <Check className="h-4 w-4 mr-1.5" />
            Upload Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
