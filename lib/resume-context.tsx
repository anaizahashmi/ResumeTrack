'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import {
  ResumeEntity,
  CompanyApplication,
  ApplicationStatus,
  ActivityEvent,
} from './types';
import { INITIAL_RESUMES } from './mock-data';

export interface NewCompanyInput {
  companyName: string;
  jobRole: string;
  url: string;
  appliedDate: string;
  deadline?: string;
  status: ApplicationStatus;
  notes: string;
}

export interface NewResumeInput {
  resumeName: string;
  category: string;
  fileSize: string;
}

export interface ResumeContextValue {
  resumes: ResumeEntity[];
  activity: ActivityEvent[];
  metrics: {
    totalResumes: number;
    totalApplications: number;
    activeInterviews: number;
    offers: number;
    rejections: number;
    upcomingDeadlines: { company: CompanyApplication; resume: ResumeEntity }[];
  };
  addResume: (input: NewResumeInput) => void;
  updateResume: (id: string, input: Partial<NewResumeInput>) => void;
  deleteResume: (id: string) => void;
  addCompany: (resumeId: string, input: NewCompanyInput) => void;
  updateCompany: (
    resumeId: string,
    companyId: string,
    input: NewCompanyInput
  ) => void;
  deleteCompany: (resumeId: string, companyId: string) => void;
  updateCompanyStatus: (
    resumeId: string,
    companyId: string,
    status: ApplicationStatus
  ) => void;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function fmtRelative(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumes, setResumes] = useState<ResumeEntity[]>(INITIAL_RESUMES);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);

  const pushActivity = useCallback(
    (
      type: ActivityEvent['type'],
      message: string,
      resumeId: string,
      resumeName: string
    ) => {
      setActivity((prev) =>
        [
          {
            id: uid('act'),
            type,
            message,
            timestamp: Date.now(),
            resumeId,
            resumeName,
          },
          ...prev,
        ].slice(0, 40)
      );
    },
    []
  );

  const addResume = useCallback(
    (input: NewResumeInput) => {
      const id = uid('res');
      const newResume: ResumeEntity = {
        id,
        resumeName: input.resumeName,
        category: input.category,
        uploadDate: new Date().toISOString(),
        fileSize: input.fileSize,
        companies: [],
      };
      setResumes((prev) => [newResume, ...prev]);
      pushActivity(
        'add-resume',
        `Added "${input.resumeName}" resume`,
        id,
        input.resumeName
      );
    },
    [pushActivity]
  );

  const updateResume = useCallback(
    (id: string, input: Partial<NewResumeInput>) => {
      setResumes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...input } : r))
      );
    },
    []
  );

  const deleteResume = useCallback(
    (id: string) => {
      setResumes((prev) => {
        const target = prev.find((r) => r.id === id);
        if (target) {
          pushActivity(
            'delete-resume',
            `Deleted "${target.resumeName}" resume`,
            id,
            target.resumeName
          );
        }
        return prev.filter((r) => r.id !== id);
      });
    },
    [pushActivity]
  );

  const addCompany = useCallback(
    (resumeId: string, input: NewCompanyInput) => {
      const newCompany: CompanyApplication = {
        id: uid('app'),
        ...input,
        createdAt: Date.now(),
      };
      setResumes((prev) =>
        prev.map((r) =>
          r.id === resumeId
            ? { ...r, companies: [...r.companies, newCompany] }
            : r
        )
      );
      const resume = resumes.find((r) => r.id === resumeId);
      if (resume) {
        pushActivity(
          'add-company',
          `Added ${input.companyName} under ${resume.resumeName}`,
          resumeId,
          resume.resumeName
        );
      }
    },
    [pushActivity, resumes]
  );

  const updateCompany = useCallback(
    (resumeId: string, companyId: string, input: NewCompanyInput) => {
      setResumes((prev) =>
        prev.map((r) =>
          r.id === resumeId
            ? {
                ...r,
                companies: r.companies.map((c) =>
                  c.id === companyId ? { ...c, ...input } : c
                ),
              }
            : r
        )
      );
    },
    []
  );

  const deleteCompany = useCallback(
    (resumeId: string, companyId: string) => {
      setResumes((prev) =>
        prev.map((r) =>
          r.id === resumeId
            ? { ...r, companies: r.companies.filter((c) => c.id !== companyId) }
            : r
        )
      );
      const resume = resumes.find((r) => r.id === resumeId);
      const company = resume?.companies.find((c) => c.id === companyId);
      if (resume && company) {
        pushActivity(
          'delete-company',
          `Removed ${company.companyName} from ${resume.resumeName}`,
          resumeId,
          resume.resumeName
        );
      }
    },
    [pushActivity, resumes]
  );

  const updateCompanyStatus = useCallback(
    (resumeId: string, companyId: string, status: ApplicationStatus) => {
      setResumes((prev) =>
        prev.map((r) =>
          r.id === resumeId
            ? {
                ...r,
                companies: r.companies.map((c) =>
                  c.id === companyId ? { ...c, status } : c
                ),
              }
            : r
        )
      );
      const resume = resumes.find((r) => r.id === resumeId);
      const company = resume?.companies.find((c) => c.id === companyId);
      if (resume && company) {
        pushActivity(
          'update-status',
          `${company.companyName} moved to ${status}`,
          resumeId,
          resume.resumeName
        );
      }
    },
    [pushActivity, resumes]
  );

  const metrics = useMemo(() => {
    let totalApplications = 0;
    let activeInterviews = 0;
    let offers = 0;
    let rejections = 0;
    const upcoming: { company: CompanyApplication; resume: ResumeEntity }[] = [];

    for (const resume of resumes) {
      for (const company of resume.companies) {
        totalApplications++;
        if (company.status === 'Interview') activeInterviews++;
        if (company.status === 'Offer') offers++;
        if (company.status === 'Rejected') rejections++;
        if (company.deadline) {
          upcoming.push({ company, resume });
        }
      }
    }

    upcoming.sort((a, b) => {
      const da = new Date(a.company.deadline!).getTime();
      const db = new Date(b.company.deadline!).getTime();
      return da - db;
    });

    return {
      totalResumes: resumes.length,
      totalApplications,
      activeInterviews,
      offers,
      rejections,
      upcomingDeadlines: upcoming.slice(0, 5),
    };
  }, [resumes]);

  const value: ResumeContextValue = {
    resumes,
    activity,
    metrics,
    addResume,
    updateResume,
    deleteResume,
    addCompany,
    updateCompany,
    deleteCompany,
    updateCompanyStatus,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResumes(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResumes must be used within ResumeProvider');
  return ctx;
}

export { fmtRelative };
