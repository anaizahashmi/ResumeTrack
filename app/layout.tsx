import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ResuTrack — Reverse Job Tracker',
  description:
    'A resume-first job application tracker. Resumes are parents; applications live inside them.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#09090b] text-zinc-100`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(240 8% 6%)',
              border: '1px solid hsl(240 5% 14%)',
              color: 'hsl(0 0% 98%)',
            },
          }}
        />
      </body>
    </html>
  );
}
