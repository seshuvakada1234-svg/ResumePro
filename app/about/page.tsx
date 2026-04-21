import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About FreeResume | Official Free ATS Resume Builder",
  description: "Learn about the mission behind the official FreeResume.dev, the #1 free ATS resume builder designed for Indian students and freshers.",
};

export default function AboutPage() {
  return <AboutClient />;
}
