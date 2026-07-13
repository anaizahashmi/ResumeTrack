export type ApplicationStatus =
  | 'Wishlist'
  | 'Preparing'
  | 'Applied'
  | 'Online Assessment'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface CompanyApplication {
  id: string;
  companyName: string;
  jobRole: string;
  url: string;
  appliedDate: string;
  deadline?: string;
  status: ApplicationStatus;
  notes: string;
  createdAt: number;
}

export interface ResumeEntity {
  id: string;
  resumeName: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  companies: CompanyApplication[];
}

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: number;
  resumeId: string;
  resumeName: string;
  type: 'add-resume' | 'add-company' | 'update-status' | 'delete-company' | 'delete-resume';
}

export const STATUS_ORDER: ApplicationStatus[] = [
  'Wishlist',
  'Preparing',
  'Applied',
  'Online Assessment',
  'Interview',
  'Offer',
  'Rejected',
];

export const STATUS_STYLES: Record<
  ApplicationStatus,
  { bg: string; text: string; dot: string; border: string }
> = {
  Wishlist: {
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-300',
    dot: 'bg-zinc-400',
    border: 'border-zinc-500/20',
  },
  Preparing: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
    dot: 'bg-sky-400',
    border: 'border-sky-500/20',
  },
  Applied: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-300',
    dot: 'bg-indigo-400',
    border: 'border-indigo-500/20',
  },
  'Online Assessment': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    dot: 'bg-amber-400',
    border: 'border-amber-500/20',
  },
  Interview: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-300',
    dot: 'bg-violet-400',
    border: 'border-violet-500/20',
  },
  Offer: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/20',
  },
  Rejected: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-300',
    dot: 'bg-rose-400',
    border: 'border-rose-500/20',
  },
};

export const CATEGORY_STYLES: Record<string, string> = {
  Frontend: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  Backend: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  'Full-Stack': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  DevOps: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'Product Manager': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  Data: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  Design: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
  Mobile: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
};

export const DEFAULT_CATEGORIES = [
  'Frontend',
  'Backend',
  'Full-Stack',
  'DevOps',
  'Product Manager',
  'Data',
  'Design',
  'Mobile',
];

export function categoryStyle(category: string): string {
  return (
    CATEGORY_STYLES[category] ?? 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20'
  );
}
