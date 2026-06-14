import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Examples for Freshers and Professionals | FreeResume',
  description: 'Explore a wide range of professional ATS-friendly resume examples designed for freshers, software engineers, and senior career professionals.',
  alternates: {
    canonical: 'https://freeresume.dev/resume-examples',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Resume Examples for Freshers and Professionals | FreeResume',
    description: 'Explore a wide range of professional ATS-friendly resume examples designed for freshers, software engineers, and senior career professionals.',
    url: 'https://freeresume.dev/resume-examples',
    siteName: 'FreeResume',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Examples for Freshers and Professionals | FreeResume',
    description: 'Explore a wide range of professional ATS-friendly resume examples designed for freshers, software engineers, and senior career professionals.',
  },
};

export default function ResumeExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
