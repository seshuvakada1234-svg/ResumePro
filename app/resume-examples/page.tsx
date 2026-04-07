import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Resume Examples for Freshers & Professionals | FreeResume.dev",
  description: "Browse 50+ professional resume examples for various roles in India. Software Engineer, Marketing, Sales, and more. Free to copy and use.",
  alternates: { canonical: 'https://freeresume.dev/resume-examples' },
};

export default function ResumeExamplesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-black mb-8">Resume Examples</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Software Engineer', 'Data Analyst', 'Marketing Executive', 'Sales Manager', 'HR Generalist', 'Content Writer'].map(role => (
            <div key={role} className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-2">{role}</h3>
              <p className="text-gray-500 text-sm mb-4">Professional ATS-optimized example for {role} roles in India.</p>
              <Link href="/builder" className="text-indigo-600 font-bold hover:underline">Use this example →</Link>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p>Need a custom one? Use our <Link href="/" className="text-indigo-600 font-bold underline">Free Resume Builder</Link>.</p>
        </div>
      </main>
    </div>
  );
}
