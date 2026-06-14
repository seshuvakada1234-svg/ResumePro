import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Resume Templates | FreeResume',
  description: 'Choose from professional ATS resume templates for freshers, software engineers, teachers, HR and marketing professionals.',
  alternates: {
    canonical: 'https://freeresume.dev/templates',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Professional Resume Templates | FreeResume',
    description: 'Choose from professional ATS resume templates for freshers, software engineers, teachers, HR and marketing professionals.',
    url: 'https://freeresume.dev/templates',
    siteName: 'FreeResume',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Resume Templates | FreeResume',
    description: 'Choose from professional ATS resume templates for freshers, software engineers, teachers, HR and marketing professionals.',
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
