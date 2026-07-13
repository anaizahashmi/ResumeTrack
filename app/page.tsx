'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileStack, Plus, Search } from 'lucide-react';
import { ResumeProvider, useResumes } from '@/lib/resume-context';
import { Sidebar, View } from '@/components/sidebar';
import { Header } from '@/components/header';
import { DashboardView } from '@/components/dashboard-view';
import { ResumeCard } from '@/components/resume-card';
import { UploadResumeModal } from '@/components/upload-resume-modal';
import { CompanyModal } from '@/components/company-modal';
import { EditResumeModal } from '@/components/edit-resume-modal';
import { ResumeEntity, CompanyApplication } from '@/lib/types';

function Workspace() {
  const { resumes, metrics } = useResumes();
  const [view, setView] = useState<View>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editResume, setEditResume] = useState<ResumeEntity | null>(null);
  const [editResumeOpen, setEditResumeOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [companyTargetResume, setCompanyTargetResume] = useState<ResumeEntity | null>(null);
  const [editingCompany, setEditingCompany] = useState<CompanyApplication | null>(null);

  const openAddCompany = (resume: ResumeEntity) => {
    setEditingCompany(null);
    setCompanyTargetResume(resume);
    setCompanyModalOpen(true);
  };

  const openEditCompany = (resume: ResumeEntity, company: CompanyApplication) => {
    setEditingCompany(company);
    setCompanyTargetResume(resume);
    setCompanyModalOpen(true);
  };

  const openEditResume = (resume: ResumeEntity) => {
    setEditResume(resume);
    setEditResumeOpen(true);
  };

  const filteredResumes = useMemo(() => {
    const q = search.toLowerCase().trim();
    return resumes.filter((resume) => {
      if (categoryFilter !== 'all' && resume.category !== categoryFilter) return false;

      const hasMatchingCompany = resume.companies.some((c) => {
        if (statusFilter !== 'all' && c.status !== statusFilter) return false;
        if (q) {
          const haystack = `${c.companyName} ${c.jobRole} ${c.notes}`.toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });

      if (q && !hasMatchingCompany) {
        const resumeHaystack = `${resume.resumeName} ${resume.category}`.toLowerCase();
        if (!resumeHaystack.includes(q)) return false;
      }

      if (statusFilter !== 'all' && !hasMatchingCompany) return false;

      return true;
    });
  }, [resumes, search, categoryFilter, statusFilter]);

  const headerTitle =
    view === 'dashboard' ? 'Dashboard' : 'Resume Library';
  const headerSubtitle =
    view === 'dashboard'
      ? 'Real-time overview of your job search pipeline'
      : `${filteredResumes.length} resume${filteredResumes.length !== 1 ? 's' : ''} · ${metrics.totalApplications} total applications`;

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Sidebar
        view={view}
        onViewChange={setView}
        onUploadClick={() => setUploadOpen(true)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        totalResumes={metrics.totalResumes}
        totalApplications={metrics.totalApplications}
      />

      <div className="lg:pl-72">
        <Header
          search={search}
          onSearchChange={setSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onMenuClick={() => setMobileOpen(true)}
          title={headerTitle}
          subtitle={headerSubtitle}
        />

        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {view === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <DashboardView
                  onUploadClick={() => setUploadOpen(true)}
                  onNavigateLibrary={() => setView('library')}
                />
              </motion.div>
            ) : (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <LibraryView
                  filteredResumes={filteredResumes}
                  onUploadClick={() => setUploadOpen(true)}
                  onEditResume={openEditResume}
                  onAddCompany={openAddCompany}
                  onEditCompany={openEditCompany}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      <UploadResumeModal open={uploadOpen} onOpenChange={setUploadOpen} />
      <EditResumeModal
        open={editResumeOpen}
        onOpenChange={setEditResumeOpen}
        resume={editResume}
      />
      {companyTargetResume && (
        <CompanyModal
          open={companyModalOpen}
          onOpenChange={setCompanyModalOpen}
          resumeId={companyTargetResume.id}
          resumeName={companyTargetResume.resumeName}
          editingCompany={editingCompany}
        />
      )}
    </div>
  );
}

interface LibraryViewProps {
  filteredResumes: ResumeEntity[];
  onUploadClick: () => void;
  onEditResume: (r: ResumeEntity) => void;
  onAddCompany: (r: ResumeEntity) => void;
  onEditCompany: (r: ResumeEntity, c: CompanyApplication) => void;
}

function LibraryView({
  filteredResumes,
  onUploadClick,
  onEditResume,
  onAddCompany,
  onEditCompany,
}: LibraryViewProps) {
  if (filteredResumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900/60 border border-zinc-800 mb-4">
          <Search className="h-7 w-7 text-zinc-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">No matches found</h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileStack className="h-4 w-4 text-violet-400" />
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
            Resumes
          </h3>
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium"
        >
          <Plus className="h-3.5 w-3.5" />
          New Resume
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={onEditResume}
              onAddCompany={onAddCompany}
              onEditCompany={onEditCompany}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ResumeProvider>
      <Workspace />
    </ResumeProvider>
  );
}
