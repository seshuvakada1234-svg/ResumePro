import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, Star, ArrowRight, BookOpen, PenTool, Search, Layout, Target, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: "Resume Writing Guide for Freshers 2026 | Step-by-Step CV Tips",
  description: "The ultimate resume writing guide for freshers in India. Learn how to write a job-winning CV from scratch. Professional tips for students and graduates.",
  keywords: ["resume writing for freshers", "how to write a resume India", "CV writing tips for students", "first resume guide", "fresher career advice"],
  alternates: {
    canonical: 'https://freeresume.dev/tips/resume-writing',
  },
};

export default function ResumeWritingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main>
        {/* Header */}
        <div className="bg-white border-b border-slate-200 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide uppercase">
              <BookOpen size={16} /> 2026 Ultimate Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Resume Writing <span className="text-indigo-600">for Freshers</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              A comprehensive, step-by-step masterclass on building your first professional resume from a blank page to a job-winning document.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-20">
          <article className="prose prose-slate lg:prose-xl max-w-none">
            <h2 className="text-3xl font-black text-slate-900">Step 1: Choose the Right Layout</h2>
            <p>
                As a student or fresher in India, your resume should strictly be <strong>one page</strong>. Unless you have 5+ years of experience, there is no reason to have a double-page CV. Recruiters at MNCs like <strong>TCS or Infosys</strong> scan thousands of profiles; a single, punchy page is always more effective.
            </p>
            <p>
                Use a single-column layout. While double-column designs can look modern, they often cause "parsing errors" in older Applicant Tracking Systems. Our <Link href="/ats-format" className="text-indigo-600 font-bold">ATS Resume Format</Link> guide explains this in detail.
            </p>

            <h2 className="text-3xl font-black text-slate-900">Step 2: The "Hook" - Professional Summary</h2>
            <p>
                Don't just use a generic objective like "Seeking a challenging role in a reputed organization." Everyone says that. Instead, use a <strong>Professional Summary</strong> that highlights your value.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm font-medium italic text-slate-700 my-8 border-l-4 border-l-indigo-600">
                "Computer Science graduate with a 9.0 CGPA and expertise in Full-Stack Development. Developed a real-time hospital management system using React and Node.js. Eager to contribute technical skills to a growth-oriented team at [Company Name]."
            </div>

            <h2 className="text-3xl font-black text-slate-900">Step 3: Education (The Indian Context)</h2>
            <p>
                For an Indian fresher, education is your strongest asset. List it clearly:
            </p>
            <ul className="space-y-4">
                <li><strong>Degree Name:</strong> B.Tech in Computer Science, B.Com, MBA, etc.</li>
                <li><strong>University/College:</strong> Mention the full name.</li>
                <li><strong>CGPA/Percentage:</strong> Be honest. Mention your aggregate percentage or CGPA.</li>
                <li><strong>Year of Passing:</strong> e.g., June 2026.</li>
            </ul>

            <h2 className="text-3xl font-black text-slate-900">Step 4: Showcasing Projects & Internships</h2>
            <p>
                This is where you prove you can actually do the work. Don't just list the project name. Use the <strong>STAR Method</strong> (Situation, Task, Action, Result):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 font-bold">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <Target className="text-indigo-600 mb-4" size={32} />
                    <h4 className="font-bold text-slate-900 mb-2">Technical Skills</h4>
                    <p className="text-sm text-slate-600">List tools you've actually used. Don't just list "Java" if you only know the basics.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <Award className="text-indigo-600 mb-4" size={32} />
                    <h4 className="font-bold text-slate-900 mb-2">Certifications</h4>
                    <p className="text-sm text-slate-600">Showcase NPTEL, Coursera, or Udemy certificates to show you're a self-learner.</p>
                </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900">Step 5: The Finishing Touches</h2>
            <p>
                Before you hit download, check for these "Silent Killers":
            </p>
            <ol className="space-y-4">
                <li><strong>Typos:</strong> Check your email and phone number twice.</li>
                <li><strong>Formatting:</strong> Are your bullet points aligned? Is the font size consistent?</li>
                <li><strong>File Name:</strong> Name it <code>FirstName_LastName_Resume.pdf</code>.</li>
            </ol>

            <div className="bg-indigo-900 text-white p-12 rounded-[3.5rem] my-20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Ready to Land Your First Interview?</h3>
                <p className="text-xl text-indigo-100 mb-10 max-w-2xl">
                    Stop wasting time with complex Word documents. Use FreeResume.dev to generate a professional, ATS-score-beating CV in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/builder" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all text-center">
                        Build Free Resume Now
                    </Link>
                    <Link href="/resume-examples" className="bg-indigo-500/30 border-2 border-indigo-300 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500/50 transition-all text-center">
                        Browse Examples
                    </Link>
                </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-200">
              <Link href="/" className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">
                ← Back to Home
              </Link>
            </div>
          </article>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} FreeResume.dev - Empowering Indian Graduates to Land Their First Job.
        </div>
      </footer>
    </div>
  );
}
