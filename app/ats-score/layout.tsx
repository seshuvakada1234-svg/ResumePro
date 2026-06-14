import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATS Resume Checker – Check Resume Score Online',
  description: 'Upload your resume and analyze ATS compatibility, formatting and keyword optimization.',
  alternates: {
    canonical: 'https://freeresume.dev/ats-score',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ATS Resume Checker – Check Resume Score Online',
    description: 'Upload your resume and analyze ATS compatibility, formatting and keyword optimization.',
    url: 'https://freeresume.dev/ats-score',
    siteName: 'FreeResume',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS Resume Checker – Check Resume Score Online',
    description: 'Upload your resume and analyze ATS compatibility, formatting and keyword optimization.',
  },
};

export default function AtsScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
