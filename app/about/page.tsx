import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About FreeResume - Free ATS Resume Builder India",
  description: "Learn about FreeResume, a free ATS resume builder designed for Indian students and freshers.",
};

export default function AboutPage() {
  return <AboutClient />;
}
