import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ATS Resume Format 2026 | Free Download for Indian Job Seekers",
  description: "Get the most effective ATS resume format for 2026. Optimized for Indian companies like TCS, Infosys, and startups. 100% free download.",
  alternates: { canonical: 'https://freeresume.dev/ats-resume-format' },
};

export default function ATSResumeFormatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-black mb-8">ATS Resume Format 2026</h1>
        <div className="prose prose-indigo lg:prose-xl">
          <p>The Applicant Tracking System (ATS) is the first hurdle in your job search. Our templates are designed to pass these systems with ease.</p>
          <h2>What makes a resume ATS-friendly?</h2>
          <ul>
            <li>Simple, single-column layout</li>
            <li>Standard fonts like Inter, Arial, or Calibri</li>
            <li>No images, icons, or complex graphics in critical sections</li>
            <li>Clear section headings</li>
          </ul>
          <div className="my-12 p-8 bg-indigo-600 rounded-3xl text-white text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Ready to use the best format?</h3>
            <Link href="/builder" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg">
              Start Building Now
            </Link>
          </div>
          <p>Go back to <Link href="/" className="text-indigo-600 font-bold hover:underline">Free Resume Builder</Link> home.</p>
        </div>
      </main>
    </div>
  );
}
