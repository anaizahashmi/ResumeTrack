/**
 * ResumeTrack.io - Modern Resume Management & Job Application Tracking Website
 * Built with React 18, JavaScript, HTML5, CSS3 & Tailwind CSS
 */

const { useState, useEffect, useMemo, useCallback, useRef } = React;

// ==========================================
// PORTAL CONFIGURATION & BRANDING
// ==========================================
const PORTALS = {
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    color: '#0a66c2',
    bgClass: 'portal-linkedin',
    badgeText: 'LinkedIn',
  },
  naukri: {
    id: 'naukri',
    name: 'Naukri.com',
    icon: 'fa-solid fa-briefcase',
    color: '#275df5',
    bgClass: 'portal-naukri',
    badgeText: 'Naukri.com',
  },
  indeed: {
    id: 'indeed',
    name: 'Indeed',
    icon: 'fa-solid fa-id-card-clip',
    color: '#2164f3',
    bgClass: 'portal-indeed',
    badgeText: 'Indeed',
  },
  internshala: {
    id: 'internshala',
    name: 'Internshala',
    icon: 'fa-solid fa-graduation-cap',
    color: '#12957f',
    bgClass: 'portal-internshala',
    badgeText: 'Internshala',
  },
  glassdoor: {
    id: 'glassdoor',
    name: 'Glassdoor',
    icon: 'fa-solid fa-building',
    color: '#0caa41',
    bgClass: 'portal-glassdoor',
    badgeText: 'Glassdoor',
  },
  wellfound: {
    id: 'wellfound',
    name: 'Wellfound (AngelList)',
    icon: 'fa-brands fa-angellist',
    color: '#e03e3e',
    bgClass: 'portal-wellfound',
    badgeText: 'Wellfound',
  },
  company: {
    id: 'company',
    name: 'Company Careers Portal',
    icon: 'fa-solid fa-globe',
    color: '#7c3aed',
    bgClass: 'portal-company',
    badgeText: 'Career Site',
  },
  other: {
    id: 'other',
    name: 'Referral / Other',
    icon: 'fa-solid fa-share-nodes',
    color: '#d97706',
    bgClass: 'portal-other',
    badgeText: 'Other',
  }
};

// ==========================================
// APPLICATION STATUSES
// ==========================================
const STATUSES = {
  Applied: {
    id: 'Applied',
    label: 'Applied',
    badgeClass: 'status-applied',
    icon: 'fa-paper-plane',
    dotColor: 'bg-blue-500',
  },
  Screening: {
    id: 'Screening',
    label: 'In Screening',
    badgeClass: 'status-screening',
    icon: 'fa-magnifying-glass',
    dotColor: 'bg-purple-500',
  },
  Interview: {
    id: 'Interview',
    label: 'Interview Scheduled',
    badgeClass: 'status-interview',
    icon: 'fa-calendar-check',
    dotColor: 'bg-amber-500',
  },
  Offer: {
    id: 'Offer',
    label: 'Offer Received',
    badgeClass: 'status-offer',
    icon: 'fa-trophy',
    dotColor: 'bg-emerald-500',
  },
  Rejected: {
    id: 'Rejected',
    label: 'Rejected',
    badgeClass: 'status-rejected',
    icon: 'fa-circle-xmark',
    dotColor: 'bg-rose-500',
  },
  Withdrawn: {
    id: 'Withdrawn',
    label: 'Withdrawn',
    badgeClass: 'status-withdrawn',
    icon: 'fa-ban',
    dotColor: 'bg-slate-400',
  }
};

const POPULAR_COMPANIES = [
  'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix',
  'TCS', 'Infosys', 'Wipro', 'HCLTech', 'Cognizant',
  'Zomato', 'Swiggy', 'Flipkart', 'Paytm', 'Razorpay', 'Cred',
  'Uber', 'Adobe', 'Oracle', 'Salesforce', 'Cisco', 'Unacademy'
];

// ==========================================
// INITIAL SAMPLE DATA
// ==========================================
const INITIAL_RESUMES = [
  {
    id: 'res-1',
    title: 'Full Stack Engineer Resume (React & Node.js)',
    targetRole: 'Senior Full Stack Developer',
    version: 'v3.2',
    updatedAt: '2026-08-20',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA / Remote',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev',
    summary: 'Results-driven Full Stack Software Engineer with 5+ years of experience designing and scaling high-performance web applications using React.js, Node.js, TypeScript, and cloud infrastructure. Passionate about clean code, scalable microservices, and intuitive UX.',
    skills: {
      frontend: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'],
      backend: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs', 'PostgreSQL', 'MongoDB'],
      tools: ['Docker', 'AWS (S3, Lambda)', 'Git', 'CI/CD', 'Jest', 'Webpack', 'Vite']
    },
    experiences: [
      {
        id: 'exp-1',
        company: 'TechFlow Solutions',
        role: 'Senior Full Stack Developer',
        period: '2023 - Present',
        location: 'Remote',
        highlights: [
          'Architected responsive React micro-frontends serving 250k+ daily active users.',
          'Reduced API latency by 38% through optimized PostgreSQL queries and Redis caching.',
          'Mentored 4 junior frontend developers and established automated CI/CD pipelines.'
        ]
      },
      {
        id: 'exp-2',
        company: 'Innovate Labs',
        role: 'Frontend Software Engineer',
        period: '2021 - 2023',
        location: 'San Jose, CA',
        highlights: [
          'Built modular component library with React and Tailwind CSS adopted by 6 product teams.',
          'Improved Core Web Vitals (LCP & FID), boosting conversion rates by 18%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        period: '2017 - 2021',
        grade: 'GPA: 3.85 / 4.0'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'CloudTask Manager',
        tech: 'React, Node.js, Socket.io, Tailwind CSS',
        description: 'Real-time collaborative project management application with live board synchronization and team analytics.'
      }
    ]
  },
  {
    id: 'res-2',
    title: 'Frontend React Specialist (Tailwind & Next.js)',
    targetRole: 'Frontend Developer / UI Engineer',
    version: 'v2.1',
    updatedAt: '2026-08-18',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Bengaluru, India / Hybrid',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev/frontend',
    summary: 'Creative and detail-oriented Frontend Engineer specialized in creating accessible, pixel-perfect, and ultra-responsive user interfaces with React, Next.js, and Modern CSS. Strong eye for design systems and frontend performance optimization.',
    skills: {
      frontend: ['React 18', 'Next.js App Router', 'JavaScript ES6+', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'CSS Grid/Flexbox'],
      backend: ['Node.js Basics', 'REST API Integration', 'Firebase', 'Supabase'],
      tools: ['Figma', 'Storybook', 'Git', 'Vite', 'Chrome DevTools', 'Lighthouse', 'Vercel']
    },
    experiences: [
      {
        id: 'exp-3',
        company: 'PixelCraft Studio',
        role: 'Frontend UI/UX Developer',
        period: '2022 - Present',
        location: 'Bengaluru',
        highlights: [
          'Implemented animated interactive UI dashboards using React, Tailwind CSS, and Framer Motion.',
          'Built accessible web forms and components achieving 99+ Lighthouse accessibility scores.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-2',
        degree: 'B.Tech in Information Technology',
        institution: 'National Institute of Technology',
        period: '2018 - 2022',
        grade: 'First Class with Distinction'
      }
    ],
    projects: [
      {
        id: 'proj-2',
        name: 'DesignSystem UI Kit',
        tech: 'React, Tailwind CSS, Storybook',
        description: 'Open-source accessible UI component kit downloaded over 15,000 times by frontend developers.'
      }
    ]
  },
  {
    id: 'res-3',
    title: 'Data Analyst & Python Specialist',
    targetRole: 'Data Analyst / Business Intelligence',
    version: 'v1.4',
    updatedAt: '2026-08-15',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX / Remote',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan-data',
    portfolio: 'alexmorgan.dev/data',
    summary: 'Analytically minded Data Professional with expertise in transforming complex multi-source datasets into actionable business intelligence, interactive dashboards, and predictive forecasting models using Python, SQL, Tableau, and PowerBI.',
    skills: {
      frontend: ['Streamlit', 'Dash', 'HTML/CSS Reporting', 'Data Visualization'],
      backend: ['Python (Pandas, NumPy, Scikit-Learn)', 'SQL (PostgreSQL, BigQuery)', 'R'],
      tools: ['Tableau', 'Power BI', 'Jupyter', 'Excel Advanced', 'Git', 'Airflow']
    },
    experiences: [
      {
        id: 'exp-4',
        company: 'DataMetrics Insights',
        role: 'Data Analyst',
        period: '2022 - 2025',
        location: 'Remote',
        highlights: [
          'Designed executive KPI dashboards in Tableau monitoring $12M+ monthly recurring revenue.',
          'Wrote optimized SQL queries processing 10M+ rows of customer interaction data daily.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-3',
        degree: 'B.S. in Statistics & Data Science',
        institution: 'University of Washington',
        period: '2018 - 2022',
        grade: 'GPA: 3.80'
      }
    ],
    projects: [
      {
        id: 'proj-3',
        name: 'Market Trend Analyzer',
        tech: 'Python, Pandas, Plotly, Streamlit',
        description: 'Automated web scraper and dashboard analyzing tech hiring trends across top job portals.'
      }
    ]
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    resumeId: 'res-1',
    company: 'Google',
    role: 'Senior Full Stack Engineer',
    appliedDate: '2026-08-10',
    portal: 'linkedin',
    status: 'Interview',
    location: 'Mountain View, CA (Hybrid)',
    salary: '$180,000 - $210,000',
    jobUrl: 'https://careers.google.com/jobs/results/12345',
    notes: 'Passed technical screening round on Aug 18. System design round scheduled for next Tuesday.',
    history: [{ date: '2026-08-10', status: 'Applied' }, { date: '2026-08-18', status: 'Interview' }]
  },
  {
    id: 'app-2',
    resumeId: 'res-1',
    company: 'Amazon',
    role: 'Software Development Engineer II',
    appliedDate: '2026-08-14',
    portal: 'indeed',
    status: 'Screening',
    location: 'Seattle, WA / Remote',
    salary: '$165,000 - $190,000',
    jobUrl: 'https://amazon.jobs/en/jobs/987654',
    notes: 'Submitted online assessment (OA) with 100% test cases passed. Awaiting recruiter contact.',
    history: [{ date: '2026-08-14', status: 'Applied' }, { date: '2026-08-19', status: 'Screening' }]
  },
  {
    id: 'app-3',
    resumeId: 'res-1',
    company: 'TCS',
    role: 'Lead Digital Software Engineer',
    appliedDate: '2026-08-02',
    portal: 'naukri',
    status: 'Offer',
    location: 'Bengaluru / Hyderabad',
    salary: '₹28,00,000 / annum',
    jobUrl: 'https://naukri.com/job-listings-lead-engineer',
    notes: 'Offer letter received! Decision needed before Sept 5. Good compensation package with joining bonus.',
    history: [{ date: '2026-08-02', status: 'Applied' }, { date: '2026-08-12', status: 'Interview' }, { date: '2026-08-22', status: 'Offer' }]
  },
  {
    id: 'app-4',
    resumeId: 'res-1',
    company: 'Razorpay',
    role: 'Staff UI / Full Stack Engineer',
    appliedDate: '2026-08-20',
    portal: 'company',
    status: 'Applied',
    location: 'Bengaluru (Hybrid)',
    salary: '₹40,00,000 - ₹50,00,000',
    jobUrl: 'https://razorpay.com/careers/staff-ui',
    notes: 'Applied directly via careers portal referral link from college alumnus.',
    history: [{ date: '2026-08-20', status: 'Applied' }]
  },
  {
    id: 'app-5',
    resumeId: 'res-2',
    company: 'Zomato',
    role: 'Frontend Engineer (React / Mobile Web)',
    appliedDate: '2026-08-12',
    portal: 'naukri',
    status: 'Interview',
    location: 'Gurugram / Remote',
    salary: '₹22,00,000 - ₹26,00,000',
    jobUrl: 'https://naukri.com/job-listings-zomato-frontend',
    notes: 'Machine coding round cleared with 10/10 code quality review. Culture fit round tomorrow.',
    history: [{ date: '2026-08-12', status: 'Applied' }, { date: '2026-08-19', status: 'Interview' }]
  },
  {
    id: 'app-6',
    resumeId: 'res-2',
    company: 'Swiggy',
    role: 'React Specialist / UI Developer',
    appliedDate: '2026-08-18',
    portal: 'linkedin',
    status: 'Applied',
    location: 'Bengaluru / Remote',
    salary: '₹20,00,000 - ₹25,00,000',
    jobUrl: 'https://linkedin.com/jobs/view/swiggy-react-dev',
    notes: 'Applied with customized React & Tailwind portfolio link in resume header.',
    history: [{ date: '2026-08-18', status: 'Applied' }]
  },
  {
    id: 'app-7',
    resumeId: 'res-2',
    company: 'Flipkart',
    role: 'UI Engineer I',
    appliedDate: '2026-07-28',
    portal: 'indeed',
    status: 'Rejected',
    location: 'Bengaluru',
    salary: '₹18,00,000',
    jobUrl: 'https://indeed.com/viewjob?jk=flipkart123',
    notes: 'Automated rejection email received due to hiring freeze on internal team.',
    history: [{ date: '2026-07-28', status: 'Applied' }, { date: '2026-08-08', status: 'Rejected' }]
  },
  {
    id: 'app-8',
    resumeId: 'res-2',
    company: 'Unacademy',
    role: 'Frontend Engineering Associate',
    appliedDate: '2026-08-15',
    portal: 'internshala',
    status: 'Screening',
    location: 'Bengaluru (Remote Friendly)',
    salary: '₹12,00,000 - ₹15,00,000',
    jobUrl: 'https://internshala.com/job/detail/unacademy-frontend',
    notes: 'HR responded via Internshala chat requesting GitHub repository links.',
    history: [{ date: '2026-08-15', status: 'Applied' }, { date: '2026-08-21', status: 'Screening' }]
  },
  {
    id: 'app-9',
    resumeId: 'res-3',
    company: 'Microsoft',
    role: 'Business Data Analyst',
    appliedDate: '2026-08-08',
    portal: 'linkedin',
    status: 'Screening',
    location: 'Redmond, WA / Remote',
    salary: '$120,000 - $145,000',
    jobUrl: 'https://careers.microsoft.com/us/en/job/msft-data',
    notes: 'Application under active review by Azure Data & Insights hiring team.',
    history: [{ date: '2026-08-08', status: 'Applied' }, { date: '2026-08-16', status: 'Screening' }]
  },
  {
    id: 'app-10',
    resumeId: 'res-3',
    company: 'Cred',
    role: 'Product Analytics Specialist',
    appliedDate: '2026-08-21',
    portal: 'wellfound',
    status: 'Applied',
    location: 'Bengaluru',
    salary: '₹24,00,000 - ₹30,00,000',
    jobUrl: 'https://wellfound.com/company/cred/jobs/analyst',
    notes: 'Sent personalized pitch emphasizing SQL query optimization experience.',
    history: [{ date: '2026-08-21', status: 'Applied' }]
  }
];

// Utility functions
function formatRelativeDate(dateStr) {
  if (!dateStr) return 'Unknown date';
  const appDate = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - appDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return appDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getPortalObj(portalKey) {
  return PORTALS[portalKey] || PORTALS.other;
}

function getStatusObj(statusKey) {
  return STATUSES[statusKey] || STATUSES.Applied;
}

// ==========================================
// MAIN WEBSITE COMPONENT
// ==========================================
function App() {
  // Persistent States
  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('resumetrack_resumes');
      return saved ? JSON.parse(saved) : INITIAL_RESUMES;
    } catch (e) {
      return INITIAL_RESUMES;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('resumetrack_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch (e) {
      return INITIAL_APPLICATIONS;
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('resumetrack_theme') === 'dark';
  });

  // UI States
  const [activeTab, setActiveTab] = useState('resumes'); // 'resumes', 'kanban', 'table', 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortalFilter, setSelectedPortalFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [expandedResumeIds, setExpandedResumeIds] = useState(() => ({ 'res-1': true }));

  // Modals States
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState(null);

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [defaultResumeIdForApp, setDefaultResumeIdForApp] = useState(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewResume, setPreviewResume] = useState(null);

  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('resumetrack_resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem('resumetrack_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('resumetrack_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleResumeAccordion = (resumeId) => {
    setExpandedResumeIds(prev => ({
      ...prev,
      [resumeId]: !prev[resumeId]
    }));
  };

  const handleCreateResume = () => {
    setEditingResume(null);
    setIsResumeModalOpen(true);
  };

  const handleEditResume = (resume) => {
    setEditingResume(resume);
    setIsResumeModalOpen(true);
  };

  const handleDuplicateResume = (resume) => {
    const newResume = {
      ...resume,
      id: 'res-' + Date.now(),
      title: `${resume.title} (Copy)`,
      version: `${resume.version || 'v1.0'}-copy`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setResumes(prev => [newResume, ...prev]);
    showToast(`Duplicated "${resume.title}" successfully!`);
  };

  const handleDeleteResume = (resumeId) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (!resume) return;
    const countApps = applications.filter(a => a.resumeId === resumeId).length;
    
    if (confirm(`Are you sure you want to delete "${resume.title}"? ${countApps > 0 ? `\n(Warning: ${countApps} linked job applications will also be removed)` : ''}`)) {
      setResumes(prev => prev.filter(r => r.id !== resumeId));
      setApplications(prev => prev.filter(a => a.resumeId !== resumeId));
      showToast(`Resume "${resume.title}" deleted`, 'info');
    }
  };

  const handleSaveResume = (savedData) => {
    if (editingResume) {
      setResumes(prev => prev.map(r => r.id === savedData.id ? savedData : r));
      showToast(`Resume "${savedData.title}" updated!`);
    } else {
      setResumes(prev => [savedData, ...prev]);
      setExpandedResumeIds(prev => ({ ...prev, [savedData.id]: true }));
      showToast(`New resume "${savedData.title}" created!`);
    }
    setIsResumeModalOpen(false);
  };

  const handleOpenNewAppModal = (preselectedResumeId = null) => {
    setEditingApp(null);
    setDefaultResumeIdForApp(preselectedResumeId || (resumes[0] ? resumes[0].id : ''));
    setIsAppModalOpen(true);
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setDefaultResumeIdForApp(app.resumeId);
    setIsAppModalOpen(true);
  };

  const handleDeleteApp = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    if (confirm(`Delete application for "${app.role}" at ${app.company}?`)) {
      setApplications(prev => prev.filter(a => a.id !== appId));
      showToast(`Application for ${app.company} deleted`, 'info');
    }
  };

  const handleQuickStatusChange = (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const history = app.history || [];
        return {
          ...app,
          status: newStatus,
          history: [...history, { date: new Date().toISOString().split('T')[0], status: newStatus }]
        };
      }
      return app;
    }));
    showToast(`Status updated to "${newStatus}"`);
  };

  const handleSaveApp = (savedApp) => {
    if (editingApp) {
      setApplications(prev => prev.map(a => a.id === savedApp.id ? savedApp : a));
      showToast(`Application for ${savedApp.company} updated!`);
    } else {
      setApplications(prev => [savedApp, ...prev]);
      if (savedApp.resumeId) {
        setExpandedResumeIds(prev => ({ ...prev, [savedApp.resumeId]: true }));
      }
      showToast(`Application for ${savedApp.company} logged successfully!`);
    }
    setIsAppModalOpen(false);
  };

  const handlePreviewResume = (resume) => {
    setPreviewResume(resume);
    setIsPreviewModalOpen(true);
  };

  // Scroll helper
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = searchQuery === '' || 
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (app.notes && app.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPortal = selectedPortalFilter === 'all' || app.portal === selectedPortalFilter;
      const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;

      return matchesSearch && matchesPortal && matchesStatus;
    });
  }, [applications, searchQuery, selectedPortalFilter, selectedStatusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalApps = applications.length;
    const interviews = applications.filter(a => a.status === 'Interview').length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const screening = applications.filter(a => a.status === 'Screening').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    
    const portalCounts = {};
    Object.keys(PORTALS).forEach(k => { portalCounts[k] = 0; });
    applications.forEach(a => {
      const p = a.portal || 'other';
      portalCounts[p] = (portalCounts[p] || 0) + 1;
    });

    return {
      totalResumes: resumes.length,
      totalApps,
      interviews,
      offers,
      screening,
      rejected,
      portalCounts,
      conversionRate: totalApps > 0 ? Math.round(((interviews + offers) / totalApps) * 100) : 0
    };
  }, [resumes, applications]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Company', 'Role', 'Resume Used', 'Portal', 'Date Applied', 'Status', 'Location', 'Salary', 'Job URL', 'Notes'];
    const rows = applications.map(app => {
      const resume = resumes.find(r => r.id === app.resumeId);
      const portal = getPortalObj(app.portal);
      return [
        `"${app.company.replace(/"/g, '""')}"`,
        `"${app.role.replace(/"/g, '""')}"`,
        `"${(resume ? resume.title : 'Deleted Resume').replace(/"/g, '""')}"`,
        `"${portal.name}"`,
        `"${app.appliedDate}"`,
        `"${app.status}"`,
        `"${(app.location || '').replace(/"/g, '""')}"`,
        `"${(app.salary || '').replace(/"/g, '""')}"`,
        `"${(app.jobUrl || '').replace(/"/g, '""')}"`,
        `"${(app.notes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Job_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported applications to CSV!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* ================= WEBSITE HEADER & NAVIGATION ================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Website Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-file-invoice text-lg"></i>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  ResumeTrack<span className="text-brand-600 dark:text-brand-400">.io</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block -mt-1">
                  Resume & Application Tracker
                </span>
              </div>
            </a>

            {/* Main Website Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <a href="#hero" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</a>
              <button onClick={() => { setActiveTab('resumes'); scrollToSection('tracker-section'); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Resumes & Dropdowns
              </button>
              <button onClick={() => { setActiveTab('kanban'); scrollToSection('tracker-section'); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Kanban Pipeline
              </button>
              <button onClick={() => { setActiveTab('table'); scrollToSection('tracker-section'); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Applications Table
              </button>
              <button onClick={() => { setActiveTab('analytics'); scrollToSection('tracker-section'); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Analytics
              </button>
              <a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">FAQ</a>
            </nav>

            {/* Quick Action Buttons & Theme */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleOpenNewAppModal()}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:shadow-md hover:shadow-indigo-500/20 active:scale-95"
              >
                <i className="fa-solid fa-paper-plane"></i>
                <span>Log Application</span>
              </button>

              <button
                onClick={() => { scrollToSection('tracker-section'); handleCreateResume(); }}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all hover:shadow-md hover:shadow-brand-500/20 active:scale-95"
              >
                <i className="fa-solid fa-plus"></i>
                <span className="hidden xs:inline">New Resume</span>
              </button>

              <button
                onClick={() => setIsBackupModalOpen(true)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Backup or Restore Data"
              >
                <i className="fa-solid fa-database text-sm"></i>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <i className={`fa-solid ${darkMode ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'} text-sm`}></i>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ================= WEBSITE HERO LANDING SECTION ================= */}
      <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden hero-glow border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span>All-In-One Resume & Job Application Tracking Website</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Track Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">Resume Version</span> & Applied Company in One Place
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Organize tailored resumes for different tech roles. Expand company dropdowns to view submission dates and job portals like <strong>LinkedIn</strong>, <strong>Naukri.com</strong>, <strong>Indeed</strong>, and <strong>Internshala</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('tracker-section')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <i className="fa-solid fa-layer-group mr-2"></i>
              Launch Live Tracker
            </button>

            <button
              onClick={() => handleOpenNewAppModal()}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-heading font-bold text-sm sm:text-base shadow-sm transition-all"
            >
              <i className="fa-solid fa-paper-plane text-indigo-500 mr-2"></i>
              Log Application
            </button>

            <button
              onClick={handleCreateResume}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-heading font-bold text-sm sm:text-base transition-all"
            >
              <i className="fa-solid fa-file-circle-plus text-brand-500 mr-2"></i>
              Create Resume
            </button>
          </div>

          {/* Key Value Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm flex-shrink-0">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">100% Client-Side Privacy</p>
                <p className="text-slate-500">Saved in browser storage</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm flex-shrink-0">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Multi-Portal Tagging</p>
                <p className="text-slate-500">LinkedIn, Naukri, Indeed...</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm flex-shrink-0">
                <i className="fa-solid fa-table-columns"></i>
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Interactive Pipeline</p>
                <p className="text-slate-500">Kanban & Master Table</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm flex-shrink-0">
                <i className="fa-solid fa-file-export"></i>
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Instant Export</p>
                <p className="text-slate-500">A4 PDF & CSV spreadsheets</p>
              </div>
            </div>
          </div>

          {/* Supported Portals Ticker */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Seamlessly tag applications from all major job portals
            </p>
            <div className="flex items-center justify-center flex-wrap gap-3">
              {Object.keys(PORTALS).map(k => {
                const p = PORTALS[k];
                return (
                  <div key={k} className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-transform hover:scale-105 ${p.bgClass}`}>
                    <i className={p.icon}></i>
                    <span>{p.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ================= CORE INTERACTIVE TRACKER SECTION ================= */}
      <section id="tracker-section" className="py-12 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                Live Web Application Dashboard
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-950 dark:text-white">
                Resume & Job Application Tracker
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Click any resume to expand the company application list, track dates, and manage statuses.
              </p>
            </div>

            {/* Tracker View Tabs */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('resumes')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'resumes'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-layer-group"></i>
                <span>Resumes & Dropdowns ({resumes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('kanban')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'kanban'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-table-columns"></i>
                <span>Kanban Pipeline</span>
              </button>

              <button
                onClick={() => setActiveTab('table')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'table'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-list-check"></i>
                <span>All Applications ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-chart-pie"></i>
                <span>Insights</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <DashboardStats stats={stats} />

          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies, roles, locations, notes..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              )}
            </div>

            {/* Portal & Status Filter Selectors */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                <i className="fa-solid fa-filter mr-1"></i> Portal:
              </span>
              <select
                value={selectedPortalFilter}
                onChange={(e) => setSelectedPortalFilter(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Portals ({applications.length})</option>
                {Object.keys(PORTALS).map(pKey => {
                  const count = applications.filter(a => a.portal === pKey).length;
                  return (
                    <option key={pKey} value={pKey}>
                      {PORTALS[pKey].name} ({count})
                    </option>
                  );
                })}
              </select>

              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Status:
              </span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="text-xs font-medium px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Statuses</option>
                {Object.keys(STATUSES).map(sKey => (
                  <option key={sKey} value={sKey}>
                    {STATUSES[sKey].label}
                  </option>
                ))}
              </select>

              {(selectedPortalFilter !== 'all' || selectedStatusFilter !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedPortalFilter('all');
                    setSelectedStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2 py-1 rounded"
                >
                  Reset
                </button>
              )}
            </div>

          </div>

          {/* TAB 1: RESUMES & EXPANDABLE COMPANY DROPDOWNS */}
          {activeTab === 'resumes' && (
            <div className="space-y-4 animate-fade-in">
              {resumes.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i className="fa-solid fa-folder-open"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Resumes Found</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
                    Create your first resume version to start tracking applications across LinkedIn, Naukri, Indeed, and Internshala.
                  </p>
                  <button
                    onClick={handleCreateResume}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md"
                  >
                    Create First Resume
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes.map(resume => {
                    const resumeApps = applications.filter(a => a.resumeId === resume.id);
                    const isExpanded = !!expandedResumeIds[resume.id];

                    const visibleApps = resumeApps.filter(app => {
                      const matchesSearch = searchQuery === '' || 
                        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (app.notes && app.notes.toLowerCase().includes(searchQuery.toLowerCase()));
                      const matchesPortal = selectedPortalFilter === 'all' || app.portal === selectedPortalFilter;
                      const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;
                      return matchesSearch && matchesPortal && matchesStatus;
                    });

                    return (
                      <ResumeCard
                        key={resume.id}
                        resume={resume}
                        applications={visibleApps}
                        totalLinkedApps={resumeApps.length}
                        isExpanded={isExpanded}
                        onToggleExpand={() => toggleResumeAccordion(resume.id)}
                        onPreview={() => handlePreviewResume(resume)}
                        onEdit={() => handleEditResume(resume)}
                        onDuplicate={() => handleDuplicateResume(resume)}
                        onDelete={() => handleDeleteResume(resume.id)}
                        onAddApplication={() => handleOpenNewAppModal(resume.id)}
                        onEditApplication={handleEditApp}
                        onDeleteApplication={handleDeleteApp}
                        onStatusChange={handleQuickStatusChange}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KANBAN PIPELINE */}
          {activeTab === 'kanban' && (
            <div className="animate-fade-in">
              <KanbanBoard
                applications={filteredApplications}
                resumes={resumes}
                onStatusChange={handleQuickStatusChange}
                onEditApplication={handleEditApp}
                onDeleteApplication={handleDeleteApp}
                onAddNewApplication={() => handleOpenNewAppModal()}
              />
            </div>
          )}

          {/* TAB 3: APPLICATIONS TABLE */}
          {activeTab === 'table' && (
            <div className="animate-fade-in">
              <ApplicationsTableView
                applications={filteredApplications}
                resumes={resumes}
                onEditApplication={handleEditApp}
                onDeleteApplication={handleDeleteApp}
                onStatusChange={handleQuickStatusChange}
                onAddNewApplication={() => handleOpenNewAppModal()}
                onExportCSV={handleExportCSV}
              />
            </div>
          )}

          {/* TAB 4: ANALYTICS & INSIGHTS */}
          {activeTab === 'analytics' && (
            <div className="animate-fade-in">
              <AnalyticsDashboard
                stats={stats}
                resumes={resumes}
                applications={applications}
              />
            </div>
          )}

        </div>
      </section>

      {/* ================= WEBSITE: HOW IT WORKS SECTION ================= */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              Step-By-Step Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-950 dark:text-white mt-1">
              How ResumeTrack.io Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              A streamlined system designed to help you stay structured, track every application, and land more interview offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xl font-bold font-heading">
                1
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Create & Tailor Resumes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Build tailored resume versions for different profiles (e.g. <em>Full Stack Engineer</em>, <em>Frontend Specialist</em>, <em>Data Analyst</em>) with real-time text formatting and live A4 printable preview.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold font-heading">
                2
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Log Applied Companies & Portals
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whenever you apply, log the company, exact submission date, and the online portal used (<strong>LinkedIn</strong>, <strong>Naukri.com</strong>, <strong>Indeed</strong>, or <strong>Internshala</strong>) right under that resume.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold font-heading">
                3
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Manage Pipeline & Export
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Move applications across your Kanban board (*Screening* &rarr; *Interview* &rarr; *Offer*), analyze portal performance, and export full reports as CSV spreadsheets or JSON backups.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= WEBSITE: FAQ SECTION ================= */}
      <section id="faq" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-950 dark:text-white mt-1">
              Got Questions? We Have Answers
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does the resume company dropdown work?',
                a: 'Each resume card on the website features an expandable "Applied Companies History" dropdown accordion. Clicking it expands a comprehensive list of all companies where you submitted that specific resume version, complete with submission dates, portal badges (LinkedIn, Naukri, Indeed, Internshala), and current status.'
              },
              {
                q: 'Is my resume and application data safe and private?',
                a: 'Yes! ResumeTrack.io is built completely on client-side technology (React, HTML5, CSS3, JavaScript). All your resumes, companies, notes, and dates are saved directly in your browser localStorage. No data is sent to external servers.'
              },
              {
                q: 'Can I export my applied job applications to Excel or CSV?',
                a: 'Absolutely. On the "All Applications" master table, click the "Export CSV" button to instantly download a clean spreadsheet containing Company Name, Job Role, Resume Used, Portal, Date Applied, Status, Salary, and Notes.'
              },
              {
                q: 'Can I print or save my resumes as PDF?',
                a: 'Yes. Every resume includes a "Preview" button that renders a clean, professional A4 formatted document. You can click "Print / Save as PDF" to export it directly via your browser print dialog.'
              },
              {
                q: 'How do I backup or transfer my data to another computer?',
                a: 'Click the database icon in the top navigation bar to open the "Backup & Data Management" modal. You can export a JSON backup file and restore it on any device with one click.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-800/40"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${openFaqIndex === idx ? 'rotate-180 text-brand-600' : 'text-slate-400'}`}></i>
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WEBSITE FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                <i className="fa-solid fa-file-invoice"></i>
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                ResumeTrack<span className="text-brand-400">.io</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <button onClick={() => scrollToSection('tracker-section')} className="hover:text-white transition-colors">Tracker</button>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <button onClick={() => setIsBackupModalOpen(true)} className="hover:text-white transition-colors">Data Backup</button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 ResumeTrack.io — Modern Resume & Job Application Management Platform. Built with React.js, JavaScript, HTML5, & CSS3.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Client-Side Local Storage Activated
            </p>
          </div>

        </div>
      </footer>

      {/* ================= MODALS ================= */}
      
      {/* 1. Resume Editor Modal */}
      {isResumeModalOpen && (
        <ResumeEditorModal
          resume={editingResume}
          onClose={() => setIsResumeModalOpen(false)}
          onSave={handleSaveResume}
        />
      )}

      {/* 2. Application Editor Modal */}
      {isAppModalOpen && (
        <ApplicationModal
          application={editingApp}
          resumes={resumes}
          defaultResumeId={defaultResumeIdForApp}
          onClose={() => setIsAppModalOpen(false)}
          onSave={handleSaveApp}
        />
      )}

      {/* 3. Resume Printable Preview Modal */}
      {isPreviewModalOpen && previewResume && (
        <ResumePreviewModal
          resume={previewResume}
          applications={applications.filter(a => a.resumeId === previewResume.id)}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}

      {/* 4. Data Backup / Restore Modal */}
      {isBackupModalOpen && (
        <DataBackupModal
          resumes={resumes}
          applications={applications}
          onRestore={(newResumes, newApps) => {
            setResumes(newResumes);
            setApplications(newApps);
            showToast('Data restored successfully!');
          }}
          onResetDefault={() => {
            setResumes(INITIAL_RESUMES);
            setApplications(INITIAL_APPLICATIONS);
            showToast('Reset to default sample data');
          }}
          onClose={() => setIsBackupModalOpen(false)}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

// ==========================================
// COMPONENT: DASHBOARD STATS BAR
// ==========================================
function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      
      {/* Card 1: Resumes */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl flex-shrink-0">
          <i className="fa-solid fa-file-lines"></i>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Resumes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">{stats.totalResumes}</span>
            <span className="text-xs text-slate-500 font-medium">Versions</span>
          </div>
        </div>
      </div>

      {/* Card 2: Total Applied */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl flex-shrink-0">
          <i className="fa-solid fa-paper-plane"></i>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Applied</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">{stats.totalApps}</span>
            <span className="text-xs text-slate-500 font-medium">Companies</span>
          </div>
        </div>
      </div>

      {/* Card 3: In Interviews */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
          <i className="fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Interviews</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">{stats.interviews}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* Card 4: Offers */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
          <i className="fa-solid fa-trophy"></i>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Offers & Wins</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{stats.offers}</span>
            <span className="text-xs text-slate-500 font-medium">({stats.conversionRate}% Rate)</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: RESUME CARD WITH COMPANY DROPDOWN
// ==========================================
function ResumeCard({
  resume,
  applications,
  totalLinkedApps,
  isExpanded,
  onToggleExpand,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete,
  onAddApplication,
  onEditApplication,
  onDeleteApplication,
  onStatusChange
}) {
  const allSkills = [
    ...(resume.skills?.frontend || []),
    ...(resume.skills?.backend || []),
    ...(resume.skills?.tools || [])
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden">
      
      {/* Resume Card Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
                <i className="fa-regular fa-file-lines"></i>
              </span>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                {resume.title}
              </h3>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {resume.version || 'v1.0'}
              </span>
              <span className="text-xs text-slate-400">
                Updated: {resume.updatedAt}
              </span>
            </div>

            <p className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-xs"></i>
              Target: {resume.targetRole}
            </p>

            {resume.summary && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {resume.summary}
              </p>
            )}

            {allSkills.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                {allSkills.slice(0, 6).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
                {allSkills.length > 6 && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    +{allSkills.length - 6} more
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
            <button
              onClick={onPreview}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Preview Printable Resume"
            >
              <i className="fa-solid fa-eye text-slate-500"></i>
              <span>Preview</span>
            </button>

            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Edit Resume Details"
            >
              <i className="fa-solid fa-pen text-slate-500"></i>
              <span>Edit</span>
            </button>

            <button
              onClick={onDuplicate}
              className="p-2 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Duplicate Resume"
            >
              <i className="fa-regular fa-copy"></i>
            </button>

            <button
              onClick={onDelete}
              className="p-2 text-xs rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition-colors"
              title="Delete Resume"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ================= COMPANY APPLICATIONS DROPDOWN HEADER ================= */}
      <div 
        onClick={onToggleExpand}
        className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 cursor-pointer flex items-center justify-between transition-colors border-b border-slate-100 dark:border-slate-800/60"
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-transform duration-200 ${
            isExpanded ? 'rotate-90 text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/50' : 'text-slate-400 bg-slate-200 dark:bg-slate-700'
          }`}>
            <i className="fa-solid fa-chevron-right"></i>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-heading font-bold text-slate-800 dark:text-slate-200">
              Applied Companies History
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              totalLinkedApps > 0 
                ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300' 
                : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
            }`}>
              {totalLinkedApps} {totalLinkedApps === 1 ? 'Company' : 'Companies'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onAddApplication}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            <span>Log Application</span>
          </button>
          
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isExpanded ? 'Click to collapse' : 'Click to expand dropdown'}
          </span>
        </div>
      </div>

      {/* ================= ACCORDION CONTENT: LIST OF APPLIED COMPANIES ================= */}
      {isExpanded && (
        <div className="p-5 bg-slate-50/50 dark:bg-slate-950/40 animate-slide-down space-y-3">
          {applications.length === 0 ? (
            <div className="py-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-2 text-sm">
                <i className="fa-solid fa-building-circle-arrow-right"></i>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No company applications recorded for this resume yet
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Did you apply to LinkedIn, Naukri, Indeed, or Internshala with this resume? Log it now to track dates and statuses!
              </p>
              <button
                onClick={onAddApplication}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm"
              >
                + Log First Company Application
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {applications.map(app => (
                <CompanyApplicationCard
                  key={app.id}
                  application={app}
                  onEdit={() => onEditApplication(app)}
                  onDelete={() => onDeleteApplication(app.id)}
                  onStatusChange={(newStatus) => onStatusChange(app.id, newStatus)}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

// ==========================================
// COMPONENT: INDIVIDUAL COMPANY APPLICATION CARD
// ==========================================
function CompanyApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
  const portal = getPortalObj(application.portal);
  const status = getStatusObj(application.status);

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700/60 transition-all flex flex-col justify-between gap-3 group">
      
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-2">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-inner">
              {application.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white leading-tight">
                {application.company}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {application.role}
              </p>
            </div>
          </div>

          {/* Portal Badge */}
          <div className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 ${portal.bgClass}`}>
            <i className={portal.icon}></i>
            <span>{portal.badgeText}</span>
          </div>
        </div>

        {/* Details Row: Applied Date, Location, Salary */}
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300" title={`Exact applied date: ${application.appliedDate}`}>
            <i className="fa-regular fa-calendar text-brand-500"></i>
            <span>{application.appliedDate}</span>
            <span className="text-[11px] text-slate-400">({formatRelativeDate(application.appliedDate)})</span>
          </span>

          {application.location && (
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-slate-400"></i>
              <span>{application.location}</span>
            </span>
          )}

          {application.salary && (
            <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
              <i className="fa-solid fa-money-bill-wave"></i>
              <span>{application.salary}</span>
            </span>
          )}
        </div>

        {application.notes && (
          <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800 line-clamp-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Note: </span>
            {application.notes}
          </div>
        )}
      </div>

      {/* Bottom row: Status selector & Action Icons */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status.dotColor}`}></span>
          <select
            value={application.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none transition-colors ${status.badgeClass}`}
          >
            {Object.keys(STATUSES).map(sKey => (
              <option key={sKey} value={sKey} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {STATUSES[sKey].label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-xs rounded-md text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open Job Link"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          )}
          <button
            onClick={onEdit}
            className="p-1.5 text-xs rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Application"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-xs rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Delete Application"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: APPLICATION MODAL (ADD / EDIT)
// ==========================================
function ApplicationModal({ application, resumes, defaultResumeId, onClose, onSave }) {
  const [resumeId, setResumeId] = useState(application ? application.resumeId : (defaultResumeId || (resumes[0] ? resumes[0].id : '')));
  const [company, setCompany] = useState(application ? application.company : '');
  const [role, setRole] = useState(application ? application.role : '');
  const [appliedDate, setAppliedDate] = useState(application ? application.appliedDate : new Date().toISOString().split('T')[0]);
  const [portal, setPortal] = useState(application ? application.portal : 'linkedin');
  const [status, setStatus] = useState(application ? application.status : 'Applied');
  const [location, setLocation] = useState(application ? application.location : '');
  const [salary, setSalary] = useState(application ? application.salary : '');
  const [jobUrl, setJobUrl] = useState(application ? application.jobUrl : '');
  const [notes, setNotes] = useState(application ? application.notes : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !resumeId) {
      alert('Please fill in Company Name, Job Role, and select a Resume.');
      return;
    }

    const savedApp = {
      id: application ? application.id : 'app-' + Date.now(),
      resumeId,
      company: company.trim(),
      role: role.trim(),
      appliedDate,
      portal,
      status,
      location: location.trim(),
      salary: salary.trim(),
      jobUrl: jobUrl.trim(),
      notes: notes.trim(),
      history: application ? (application.history || []) : [{ date: appliedDate, status }]
    };

    onSave(savedApp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <i className="fa-solid fa-paper-plane"></i>
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                {application ? 'Edit Job Application' : 'Log New Job Application'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track applied company, submission date, and online portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Select Resume */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Resume Used for Application <span className="text-rose-500">*</span>
            </label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            >
              {resumes.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.targetRole}) - {r.version || 'v1.0'}
                </option>
              ))}
            </select>
          </div>

          {/* Company Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Amazon, TCS, Zomato"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
              <div className="flex items-center gap-1 flex-wrap mt-1.5">
                <span className="text-[10px] text-slate-400">Quick:</span>
                {POPULAR_COMPANIES.slice(0, 5).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCompany(c)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/30"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Job Title / Role Applied <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Software Engineer, React Developer"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          {/* Online Portal Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Online Application Portal / Platform <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(PORTALS).map(pKey => {
                const p = PORTALS[pKey];
                const isSelected = portal === pKey;
                return (
                  <button
                    key={pKey}
                    type="button"
                    onClick={() => setPortal(pKey)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/80 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 shadow-sm ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <i className={`${p.icon} text-sm`} style={{ color: p.color }}></i>
                    <span className="truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Applied & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Date Applied <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Application Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {Object.keys(STATUSES).map(sKey => (
                  <option key={sKey} value={sKey}>
                    {STATUSES[sKey].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Salary Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Location / Work Mode
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote / Bengaluru / Hybrid"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Salary / Compensation
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. ₹18 LPA or $140,000"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Job URL Link */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Job Posting URL / Link
            </label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://linkedin.com/jobs/view/... or https://naukri.com/..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Notes / Follow-up Reminders / Contact Person
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add interview feedback, recruiter name, test date, or follow-up notes..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all active:scale-95"
            >
              {application ? 'Save Changes' : 'Log Application'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: RESUME EDITOR MODAL (REAL-TIME FORMATTING)
// ==========================================
function ResumeEditorModal({ resume, onClose, onSave }) {
  const [activeEditorTab, setActiveEditorTab] = useState('general');

  // Form states
  const [title, setTitle] = useState(resume ? resume.title : '');
  const [targetRole, setTargetRole] = useState(resume ? resume.targetRole : '');
  const [version, setVersion] = useState(resume ? resume.version : 'v1.0');
  const [fullName, setFullName] = useState(resume ? resume.fullName : '');
  const [email, setEmail] = useState(resume ? resume.email : '');
  const [phone, setPhone] = useState(resume ? resume.phone : '');
  const [location, setLocation] = useState(resume ? resume.location : '');
  const [linkedin, setLinkedin] = useState(resume ? resume.linkedin : '');
  const [github, setGithub] = useState(resume ? resume.github : '');
  const [portfolio, setPortfolio] = useState(resume ? resume.portfolio : '');
  const [summary, setSummary] = useState(resume ? resume.summary : '');

  // Skills
  const [frontendSkills, setFrontendSkills] = useState(resume?.skills?.frontend ? resume.skills.frontend.join(', ') : '');
  const [backendSkills, setBackendSkills] = useState(resume?.skills?.backend ? resume.skills.backend.join(', ') : '');
  const [toolSkills, setToolSkills] = useState(resume?.skills?.tools ? resume.skills.tools.join(', ') : '');

  // Dynamic lists
  const [experiences, setExperiences] = useState(resume?.experiences || [
    { id: 'exp-new-1', company: '', role: '', period: '', location: '', highlights: [''] }
  ]);

  const [education, setEducation] = useState(resume?.education || [
    { id: 'edu-new-1', degree: '', institution: '', period: '', grade: '' }
  ]);

  const [projects, setProjects] = useState(resume?.projects || [
    { id: 'proj-new-1', name: '', tech: '', description: '' }
  ]);

  const addExperience = () => {
    setExperiences(prev => [
      ...prev,
      { id: 'exp-' + Date.now(), company: '', role: '', period: '', location: '', highlights: [''] }
    ]);
  };

  const removeExperience = (idx) => {
    setExperiences(prev => prev.filter((_, i) => i !== idx));
  };

  const updateExperience = (idx, field, value) => {
    setExperiences(prev => prev.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp));
  };

  const updateExpHighlight = (expIdx, hIdx, val) => {
    setExperiences(prev => prev.map((exp, i) => {
      if (i === expIdx) {
        const newH = [...exp.highlights];
        newH[hIdx] = val;
        return { ...exp, highlights: newH };
      }
      return exp;
    }));
  };

  const addExpHighlight = (expIdx) => {
    setExperiences(prev => prev.map((exp, i) => i === expIdx ? { ...exp, highlights: [...exp.highlights, ''] } : exp));
  };

  const removeExpHighlight = (expIdx, hIdx) => {
    setExperiences(prev => prev.map((exp, i) => {
      if (i === expIdx) {
        return { ...exp, highlights: exp.highlights.filter((_, idx) => idx !== hIdx) };
      }
      return exp;
    }));
  };

  const addEducation = () => {
    setEducation(prev => [...prev, { id: 'edu-' + Date.now(), degree: '', institution: '', period: '', grade: '' }]);
  };

  const removeEducation = (idx) => {
    setEducation(prev => prev.filter((_, i) => i !== idx));
  };

  const updateEducation = (idx, field, value) => {
    setEducation(prev => prev.map((edu, i) => i === idx ? { ...edu, [field]: value } : edu));
  };

  const addProject = () => {
    setProjects(prev => [...prev, { id: 'proj-' + Date.now(), name: '', tech: '', description: '' }]);
  };

  const removeProject = (idx) => {
    setProjects(prev => prev.filter((_, i) => i !== idx));
  };

  const updateProject = (idx, field, value) => {
    setProjects(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetRole.trim()) {
      alert('Please provide a Resume Title and Target Role.');
      return;
    }

    const parseSkillList = (str) => str.split(',').map(s => s.trim()).filter(Boolean);

    const savedResume = {
      id: resume ? resume.id : 'res-' + Date.now(),
      title: title.trim(),
      targetRole: targetRole.trim(),
      version: version.trim() || 'v1.0',
      updatedAt: new Date().toISOString().split('T')[0],
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
      summary: summary.trim(),
      skills: {
        frontend: parseSkillList(frontendSkills),
        backend: parseSkillList(backendSkills),
        tools: parseSkillList(toolSkills)
      },
      experiences: experiences.filter(exp => exp.company.trim() || exp.role.trim()),
      education: education.filter(edu => edu.degree.trim() || edu.institution.trim()),
      projects: projects.filter(p => p.name.trim())
    };

    onSave(savedResume);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <i className="fa-solid fa-file-pen"></i>
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                {resume ? 'Edit Resume Version' : 'Create New Resume Version'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update professional details, real-time text formatting, and skills
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Section Tabs inside Editor */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/30 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'general', label: '1. Basic Info & Contact', icon: 'fa-user' },
            { id: 'summary', label: '2. Summary & Profile', icon: 'fa-align-left' },
            { id: 'skills', label: '3. Technical Skills', icon: 'fa-code' },
            { id: 'experience', label: '4. Work Experience', icon: 'fa-briefcase' },
            { id: 'education', label: '5. Education & Projects', icon: 'fa-graduation-cap' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveEditorTab(tab.id)}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                activeEditorTab === tab.id
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: GENERAL & CONTACT */}
          {activeEditorTab === 'general' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Resume Title / Tag <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Specialist (React/Next.js)"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Version Tag
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="e.g. v2.1 or Aug-2026"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Target Job Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer, Data Analyst"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-0199 / +91 9876543210"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA / Bengaluru"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    GitHub / Portfolio URL
                  </label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="github.com/username or yoursite.dev"
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUMMARY */}
          {activeEditorTab === 'summary' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Professional Summary / Career Objective
                </label>
                <textarea
                  rows="6"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="e.g. Dynamic Full-Stack Engineer with 4+ years of expertise in building enterprise web apps with React.js, TypeScript, and Node.js..."
                  className="w-full p-3.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white leading-relaxed"
                ></textarea>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Keep between 3 to 5 concise sentences.</span>
                  <span>{summary.length} characters</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeEditorTab === 'skills' && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter skills separated by commas (e.g. <code>React.js, Next.js, TypeScript, Tailwind CSS</code>).
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Frontend & UI Technologies
                </label>
                <input
                  type="text"
                  value={frontendSkills}
                  onChange={(e) => setFrontendSkills(e.target.value)}
                  placeholder="React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Backend, Databases & Cloud
                </label>
                <input
                  type="text"
                  value={backendSkills}
                  onChange={(e) => setBackendSkills(e.target.value)}
                  placeholder="Node.js, Express, Python, REST APIs, PostgreSQL, MongoDB, AWS"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Tools, Methodologies & DevOps
                </label>
                <input
                  type="text"
                  value={toolSkills}
                  onChange={(e) => setToolSkills(e.target.value)}
                  placeholder="Git, Docker, CI/CD, Vite, Webpack, Figma, Jest, Agile"
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 4: WORK EXPERIENCE */}
          {activeEditorTab === 'experience' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Work Experience History ({experiences.length})
                </span>
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400"
                >
                  + Add Position
                </button>
              </div>

              {experiences.map((exp, expIdx) => (
                <div key={exp.id || expIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                      Position #{expIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExperience(expIdx)}
                      className="text-xs text-rose-500 hover:text-rose-600"
                    >
                      <i className="fa-solid fa-trash-can mr-1"></i> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Company Name (e.g. Google)"
                      value={exp.company}
                      onChange={(e) => updateExperience(expIdx, 'company', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Role Title (e.g. Senior Frontend Dev)"
                      value={exp.role}
                      onChange={(e) => updateExperience(expIdx, 'role', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g. 2023 - Present)"
                      value={exp.period}
                      onChange={(e) => updateExperience(expIdx, 'period', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g. Bengaluru / Remote)"
                      value={exp.location}
                      onChange={(e) => updateExperience(expIdx, 'location', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Key Highlights / Bullet Points:
                    </label>
                    {(exp.highlights || ['']).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">•</span>
                        <input
                          type="text"
                          placeholder="e.g. Engineered responsive React UI components scaling to 100k users..."
                          value={hl}
                          onChange={(e) => updateExpHighlight(expIdx, hIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeExpHighlight(expIdx, hIdx)}
                          className="text-slate-400 hover:text-rose-500 p-1 text-xs"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addExpHighlight(expIdx)}
                      className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      + Add bullet highlight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: EDUCATION & PROJECTS */}
          {activeEditorTab === 'education' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Education & Degrees
                  </span>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400"
                  >
                    + Add Degree
                  </button>
                </div>

                {education.map((edu, eduIdx) => (
                  <div key={edu.id || eduIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    <input
                      type="text"
                      placeholder="Degree (e.g. B.Tech in Computer Science)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(eduIdx, 'degree', e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="University / College"
                      value={edu.institution}
                      onChange={(e) => updateEducation(eduIdx, 'institution', e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g. 2018 - 2022)"
                      value={edu.period}
                      onChange={(e) => updateEducation(eduIdx, 'period', e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Grade / GPA"
                        value={edu.grade}
                        onChange={(e) => updateEducation(eduIdx, 'grade', e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeEducation(eduIdx)}
                        className="text-slate-400 hover:text-rose-500 p-1.5"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Featured Projects
                  </span>
                  <button
                    type="button"
                    onClick={addProject}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400"
                  >
                    + Add Project
                  </button>
                </div>

                {projects.map((proj, projIdx) => (
                  <div key={proj.id || projIdx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 relative">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) => updateProject(projIdx, 'name', e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Technologies"
                        value={proj.tech}
                        onChange={(e) => updateProject(projIdx, 'tech', e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeProject(projIdx)}
                        className="text-slate-400 hover:text-rose-500 p-1.5"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                    <textarea
                      rows="2"
                      placeholder="Brief description of the project, features, and impact..."
                      value={proj.description}
                      onChange={(e) => updateProject(projIdx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                    ></textarea>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">* Required fields</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md"
              >
                {resume ? 'Save Resume' : 'Create Resume'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: KANBAN BOARD VIEW
// ==========================================
function KanbanBoard({ applications, resumes, onStatusChange, onEditApplication, onDeleteApplication, onAddNewApplication }) {
  const columns = [
    { key: 'Applied', title: 'Applied', icon: 'fa-paper-plane', color: 'border-blue-500 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20' },
    { key: 'Screening', title: 'In Screening', icon: 'fa-magnifying-glass', color: 'border-purple-500 text-purple-600 bg-purple-50/50 dark:bg-purple-950/20' },
    { key: 'Interview', title: 'Interviewing', icon: 'fa-calendar-check', color: 'border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-950/20' },
    { key: 'Offer', title: 'Offer Received', icon: 'fa-trophy', color: 'border-emerald-500 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20' },
    { key: 'Rejected', title: 'Rejected', icon: 'fa-circle-xmark', color: 'border-rose-500 text-rose-600 bg-rose-50/50 dark:bg-rose-950/20' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
            Job Applications Kanban Pipeline
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track hiring stages and move applications seamlessly across the hiring pipeline.
          </p>
        </div>
        <button
          onClick={onAddNewApplication}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          <span>Log Application</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {columns.map(col => {
          const colApps = applications.filter(a => a.status === col.key);

          return (
            <div
              key={col.key}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[460px]"
            >
              <div className={`p-3 border-b-2 flex items-center justify-between ${col.color}`}>
                <div className="flex items-center gap-2 font-heading font-bold text-xs">
                  <i className={`fa-solid ${col.icon}`}></i>
                  <span>{col.title}</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold shadow-xs">
                  {colApps.length}
                </span>
              </div>

              <div className="p-2.5 space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
                {colApps.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400">
                    No applications
                  </div>
                ) : (
                  colApps.map(app => {
                    const resume = resumes.find(r => r.id === app.resumeId);
                    const portal = getPortalObj(app.portal);

                    return (
                      <div
                        key={app.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-sm transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white leading-snug">
                            {app.company}
                          </h4>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 flex-shrink-0 ${portal.bgClass}`}>
                            <i className={portal.icon}></i>
                            <span>{portal.badgeText}</span>
                          </span>
                        </div>

                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                          {app.role}
                        </p>

                        <div className="text-[10px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 truncate" title={resume ? resume.title : 'Resume'}>
                          <i className="fa-regular fa-file-lines text-brand-500 mr-1"></i>
                          <span>{resume ? resume.title : 'General Resume'}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700/60">
                          <span>{app.appliedDate}</span>
                          <span>{formatRelativeDate(app.appliedDate)}</span>
                        </div>

                        <div className="pt-1 flex items-center justify-between gap-1">
                          <select
                            value={app.status}
                            onChange={(e) => onStatusChange(app.id, e.target.value)}
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {Object.keys(STATUSES).map(s => (
                              <option key={s} value={s}>{STATUSES[s].label}</option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={() => onEditApplication(app)}
                              className="p-1 text-slate-400 hover:text-indigo-500 text-xs"
                              title="Edit"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button
                              onClick={() => onDeleteApplication(app.id)}
                              className="p-1 text-slate-400 hover:text-rose-500 text-xs"
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: APPLICATIONS MASTER TABLE VIEW
// ==========================================
function ApplicationsTableView({
  applications,
  resumes,
  onEditApplication,
  onDeleteApplication,
  onStatusChange,
  onAddNewApplication,
  onExportCSV
}) {
  const [sortField, setSortField] = useState('appliedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedApps = useMemo(() => {
    return [...applications].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (sortField === 'appliedDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [applications, sortField, sortOrder]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
            All Job Applications Master Table ({applications.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprehensive spreadsheet view of all submitted resumes, dates, and online portals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-file-csv text-emerald-500 text-sm"></i>
            <span>Export CSV</span>
          </button>

          <button
            onClick={onAddNewApplication}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>Log Application</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold select-none">
              <tr>
                <th onClick={() => handleSort('company')} className="py-3.5 px-4 cursor-pointer hover:text-brand-600">
                  Company {sortField === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('role')} className="py-3.5 px-4 cursor-pointer hover:text-brand-600">
                  Job Role {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4">Resume Version</th>
                <th onClick={() => handleSort('portal')} className="py-3.5 px-4 cursor-pointer hover:text-brand-600">
                  Online Portal {sortField === 'portal' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('appliedDate')} className="py-3.5 px-4 cursor-pointer hover:text-brand-600">
                  Applied Date {sortField === 'appliedDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')} className="py-3.5 px-4 cursor-pointer hover:text-brand-600">
                  Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedApps.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No applications match the current search or filters.
                  </td>
                </tr>
              ) : (
                sortedApps.map(app => {
                  const resume = resumes.find(r => r.id === app.resumeId);
                  const portal = getPortalObj(app.portal);
                  const status = getStatusObj(app.status);

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-heading font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200">
                            {app.company.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <div>{app.company}</div>
                            {app.location && <div className="text-[11px] font-normal text-slate-400">{app.location}</div>}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                        <div>{app.role}</div>
                        {app.salary && <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{app.salary}</div>}
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 max-w-[200px]">
                        <span className="inline-block truncate max-w-full px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium" title={resume ? resume.title : ''}>
                          {resume ? resume.title : 'Unknown Resume'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 ${portal.bgClass}`}>
                          <i className={portal.icon}></i>
                          <span>{portal.name}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{app.appliedDate}</div>
                        <div className="text-[11px] text-slate-400">{formatRelativeDate(app.appliedDate)}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) => onStatusChange(app.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${status.badgeClass}`}
                        >
                          {Object.keys(STATUSES).map(s => (
                            <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                              {STATUSES[s].label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {app.jobUrl && (
                            <a
                              href={app.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-xs text-slate-400 hover:text-brand-600 rounded"
                              title="Open Job Link"
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                          )}
                          <button
                            onClick={() => onEditApplication(app)}
                            className="p-1.5 text-xs text-slate-400 hover:text-indigo-600 rounded"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button
                            onClick={() => onDeleteApplication(app.id)}
                            className="p-1.5 text-xs text-slate-400 hover:text-rose-600 rounded"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: INSIGHTS & ANALYTICS DASHBOARD
// ==========================================
function AnalyticsDashboard({ stats, resumes, applications }) {
  const sortedPortals = Object.keys(PORTALS).map(k => ({
    key: k,
    ...PORTALS[k],
    count: applications.filter(a => a.portal === k).length
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
          Job Search Analytics & Portal Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Gain visibility into which job portals and resume versions yield the highest interview conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-chart-column text-brand-500"></i>
              <span>Applications by Online Portal</span>
            </h4>
            <span className="text-xs font-semibold text-slate-400">Total: {applications.length}</span>
          </div>

          <div className="space-y-3 pt-2">
            {sortedPortals.map(p => {
              const percentage = applications.length > 0 ? Math.round((p.count / applications.length) * 100) : 0;
              return (
                <div key={p.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <i className={p.icon} style={{ color: p.color }}></i>
                      {p.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {p.count} apps ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: p.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-ranking-star text-amber-500"></i>
              <span>Resume Performance & Callback Rates</span>
            </h4>
          </div>

          <div className="space-y-3 pt-2">
            {resumes.map(r => {
              const linkedApps = applications.filter(a => a.resumeId === r.id);
              const interviewCount = linkedApps.filter(a => a.status === 'Interview' || a.status === 'Offer').length;
              const rate = linkedApps.length > 0 ? Math.round((interviewCount / linkedApps.length) * 100) : 0;

              return (
                <div key={r.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
                      {r.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {linkedApps.length} applied • {interviewCount} interviews/offers
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-bold font-heading text-brand-600 dark:text-brand-400">
                      {rate}%
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">Callback Rate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: RESUME PREVIEW MODAL (A4 PRINTABLE)
// ==========================================
function ResumePreviewModal({ resume, applications, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 no-print">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              Resume Preview: {resume.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-print"></i>
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-100 dark:bg-slate-950/80 flex justify-center">
          <div className="printable-resume-container w-full max-w-[210mm] bg-white text-slate-900 p-10 rounded-xl shadow-lg border border-slate-200 font-sans space-y-6">
            
            <div className="text-center border-b pb-5 border-slate-200">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase font-heading">
                {resume.fullName || 'Alex Morgan'}
              </h1>
              <p className="text-sm font-semibold text-brand-600 mt-0.5">
                {resume.targetRole}
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-slate-600 mt-3">
                {resume.email && <span><i className="fa-solid fa-envelope mr-1 text-slate-400"></i>{resume.email}</span>}
                {resume.phone && <span><i className="fa-solid fa-phone mr-1 text-slate-400"></i>{resume.phone}</span>}
                {resume.location && <span><i className="fa-solid fa-location-dot mr-1 text-slate-400"></i>{resume.location}</span>}
                {resume.linkedin && <span><i className="fa-brands fa-linkedin mr-1 text-blue-600"></i>{resume.linkedin}</span>}
                {resume.github && <span><i className="fa-brands fa-github mr-1 text-slate-800"></i>{resume.github}</span>}
              </div>
            </div>

            {resume.summary && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Professional Summary
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {resume.summary}
                </p>
              </div>
            )}

            {resume.skills && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Technical Skills
                </h3>
                <div className="text-xs text-slate-700 space-y-1">
                  {resume.skills.frontend?.length > 0 && (
                    <div><span className="font-semibold">Frontend:</span> {resume.skills.frontend.join(', ')}</div>
                  )}
                  {resume.skills.backend?.length > 0 && (
                    <div><span className="font-semibold">Backend & Data:</span> {resume.skills.backend.join(', ')}</div>
                  )}
                  {resume.skills.tools?.length > 0 && (
                    <div><span className="font-semibold">Tools & DevOps:</span> {resume.skills.tools.join(', ')}</div>
                  )}
                </div>
              </div>
            )}

            {resume.experiences?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Work Experience
                </h3>
                {resume.experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                      <span>{exp.role} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                      <span className="text-slate-500 font-normal">{exp.period}</span>
                    </div>
                    {exp.location && <div className="text-[11px] text-slate-500">{exp.location}</div>}
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 pt-0.5">
                      {exp.highlights?.map((hl, hIdx) => (
                        hl.trim() && <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {resume.education?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Education
                </h3>
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline text-xs text-slate-800">
                    <div>
                      <span className="font-bold">{edu.degree}</span> • {edu.institution}
                      {edu.grade && <span className="text-slate-500 ml-2">({edu.grade})</span>}
                    </div>
                    <span className="text-slate-500 text-[11px]">{edu.period}</span>
                  </div>
                ))}
              </div>
            )}

            {resume.projects?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Projects
                </h3>
                {resume.projects.map((p, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900">
                      {p.name} <span className="font-normal text-slate-500 text-[11px]">({p.tech})</span>
                    </div>
                    <p className="text-slate-700">{p.description}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: DATA BACKUP / RESTORE MODAL
// ==========================================
function DataBackupModal({ resumes, applications, onRestore, onResetDefault, onClose }) {
  const [jsonText, setJsonText] = useState('');

  const handleExportJSON = () => {
    const data = {
      app: 'ResumeTrack.io',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      resumes,
      applications
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ResumeTrack_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed.resumes) && Array.isArray(parsed.applications)) {
        onRestore(parsed.resumes, parsed.applications);
        onClose();
      } else {
        alert('Invalid JSON format. File must contain "resumes" and "applications" arrays.');
      }
    } catch (e) {
      alert('Error parsing JSON text: ' + e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-database text-brand-500"></i>
            <span>Backup & Data Management</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Export Local Backup</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Download all your resumes and applications as a JSON file.</p>
            </div>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold whitespace-nowrap shadow-sm"
            >
              <i className="fa-solid fa-download mr-1.5"></i> Export JSON
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Restore from JSON Data
            </label>
            <textarea
              rows="4"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste previously exported JSON backup here..."
              className="w-full p-3 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            ></textarea>
            <button
              onClick={handleImportJSON}
              disabled={!jsonText.trim()}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm"
            >
              Restore Data
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Want to test with sample data?</span>
            <button
              onClick={() => {
                if (confirm('Reset to initial sample data with pre-filled resumes and applications?')) {
                  onResetDefault();
                  onClose();
                }
              }}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline"
            >
              Reset to Sample Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: TOAST NOTIFICATIONS
// ==========================================
function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2.5 animate-slide-down ${
            toast.type === 'info'
              ? 'bg-slate-900 text-white dark:bg-slate-800 border border-slate-700'
              : 'bg-emerald-600 text-white shadow-emerald-500/20'
          }`}
        >
          <i className={`fa-solid ${toast.type === 'info' ? 'fa-circle-info' : 'fa-circle-check'}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// MOUNT REACT APPLICATION
// ==========================================
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
