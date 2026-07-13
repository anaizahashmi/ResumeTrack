import type { ResumeEntity } from './types';

const now = Date.now();
const DAY = 86400000;

function daysAgo(n: number): string {
  return new Date(now - n * DAY).toISOString();
}

function daysFromNow(n: number): string {
  return new Date(now + n * DAY).toISOString();
}

export const INITIAL_RESUMES: ResumeEntity[] = [
  {
    id: 'res-1',
    resumeName: 'Frontend Engineer Resume',
    category: 'Frontend',
    uploadDate: daysAgo(45),
    fileSize: '248 KB',
    companies: [
      {
        id: 'app-1',
        companyName: 'Stripe',
        jobRole: 'Senior Frontend Engineer',
        url: 'https://stripe.com/jobs/listing/frontend-engineer',
        appliedDate: daysAgo(20),
        deadline: daysFromNow(3),
        status: 'Interview',
        notes:
          'Recruiter call went well. Technical round scheduled for next week — focus on React internals and system design.',
        createdAt: now - 20 * DAY,
      },
      {
        id: 'app-2',
        companyName: 'Vercel',
        jobRole: 'Frontend Platform Engineer',
        url: 'https://vercel.com/careers/frontend-platform-engineer',
        appliedDate: daysAgo(12),
        deadline: daysFromNow(7),
        status: 'Online Assessment',
        notes: 'OA received — 2 algorithmic problems, 90 minutes.',
        createdAt: now - 12 * DAY,
      },
      {
        id: 'app-3',
        companyName: 'Linear',
        jobRole: 'Product Engineer',
        url: 'https://linear.app/careers/product-engineer',
        appliedDate: daysAgo(35),
        status: 'Rejected',
        notes: 'Got rejected after the final round. Feedback: wanted more backend depth.',
        createdAt: now - 35 * DAY,
      },
      {
        id: 'app-4',
        companyName: 'Figma',
        jobRole: 'Frontend Engineer, Design Systems',
        url: 'https://figma.com/careers/frontend-engineer-design-systems',
        appliedDate: daysAgo(5),
        deadline: daysFromNow(14),
        status: 'Applied',
        notes: 'Applied via referral from Aanya. Hoping for a recruiter call soon.',
        createdAt: now - 5 * DAY,
      },
    ],
  },
  {
    id: 'res-2',
    resumeName: 'DevOps & Infrastructure Resume',
    category: 'DevOps',
    uploadDate: daysAgo(60),
    fileSize: '312 KB',
    companies: [
      {
        id: 'app-5',
        companyName: 'HashiCorp',
        jobRole: 'Infrastructure Engineer',
        url: 'https://hashicorp.com/careers/infrastructure-engineer',
        appliedDate: daysAgo(18),
        deadline: daysFromNow(5),
        status: 'Interview',
        notes: 'Terraform + Consul deep dive. They liked my homelab writeup.',
        createdAt: now - 18 * DAY,
      },
      {
        id: 'app-6',
        companyName: 'Datadog',
        jobRole: 'Site Reliability Engineer',
        url: 'https://datadoghq.com/careers/sre',
        appliedDate: daysAgo(8),
        deadline: daysFromNow(10),
        status: 'Applied',
        notes: 'Applied through the portal. No response yet.',
        createdAt: now - 8 * DAY,
      },
      {
        id: 'app-7',
        companyName: 'Cloudflare',
        jobRole: 'Edge Compute Engineer',
        url: 'https://cloudflare.com/careers/edge-compute-engineer',
        appliedDate: daysAgo(2),
        deadline: daysFromNow(21),
        status: 'Wishlist',
        notes: 'Found the listing — looks like a great fit. Need to tailor cover letter.',
        createdAt: now - 2 * DAY,
      },
    ],
  },
  {
    id: 'res-3',
    resumeName: 'Product Manager Resume',
    category: 'Product Manager',
    uploadDate: daysAgo(30),
    fileSize: '196 KB',
    companies: [
      {
        id: 'app-8',
        companyName: 'Notion',
        jobRole: 'Senior Product Manager, AI',
        url: 'https://notion.so/careers/pm-ai',
        appliedDate: daysAgo(22),
        deadline: daysFromNow(1),
        status: 'Offer',
        notes:
          'Verbal offer received! Negotiating comp. Base + equity package looks competitive.',
        createdAt: now - 22 * DAY,
      },
      {
        id: 'app-9',
        companyName: 'Airtable',
        jobRole: 'Group Product Manager',
        url: 'https://airtable.com/careers/gpm',
        appliedDate: daysAgo(15),
        deadline: daysFromNow(6),
        status: 'Preparing',
        notes: 'Need to prep the product critique round. Reviewing their recent launches.',
        createdAt: now - 15 * DAY,
      },
    ],
  },
  {
    id: 'res-4',
    resumeName: 'Full-Stack Engineer Resume',
    category: 'Full-Stack',
    uploadDate: daysAgo(10),
    fileSize: '274 KB',
    companies: [
      {
        id: 'app-10',
        companyName: 'Supabase',
        jobRole: 'Full-Stack Engineer',
        url: 'https://supabase.com/careers/full-stack-engineer',
        appliedDate: daysAgo(6),
        deadline: daysFromNow(9),
        status: 'Applied',
        notes: 'Applied via their website. Mentioned my open-source Postgres work.',
        createdAt: now - 6 * DAY,
      },
      {
        id: 'app-11',
        companyName: 'Retool',
        jobRole: 'Software Engineer, Platform',
        url: 'https://retool.com/careers/platform-engineer',
        appliedDate: daysAgo(3),
        deadline: daysFromNow(12),
        status: 'Preparing',
        notes: 'Need to brush up on TypeScript generics and React performance patterns.',
        createdAt: now - 3 * DAY,
      },
    ],
  },
];
