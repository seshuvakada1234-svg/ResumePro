import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { CheckCircle2, Zap, ArrowRight, FileText, Star, Target, Award, Briefcase } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Resume for Freshers in India | Best ATS Resume Format 2026",
  description: "Download the best resume for freshers in India. 100% free ATS-friendly resume templates designed for students and job seekers. Create your professional CV now.",
  keywords: ["resume for freshers in India", "fresher resume format", "ATS resume for students", "first job resume India"],
  alternates: {
    canonical: 'https://freeresume.dev/resume-for-freshers',
  },
};

export default function ResumeForFreshersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-indigo-600 py-20 px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              The Ultimate Guide to <span className="text-indigo-200">Resume for Freshers in India</span> (2026)
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-indigo-100 font-medium">
              Land your dream first job with an ATS-optimized resume designed specifically for the Indian job market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/builder" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Create Resume Now <ArrowRight size={20} />
              </Link>
              <Link 
                href="/" 
                className="bg-indigo-500 text-white border-2 border-indigo-400 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2"
              >
                Free Resume Builder
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo lg:prose-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Your First Resume Matters More Than You Think</h2>
          <p className="text-gray-600 mb-8">
            As a fresher in India, your resume is often the only thing standing between you and a life-changing interview at companies like TCS, Infosys, Wipro, or high-growth startups in Bangalore and Gurgaon. In a market where thousands of graduates apply for a single role, a generic resume simply won't cut it. You need a <strong>resume for freshers in India</strong> that speaks the language of both human recruiters and Applicant Tracking Systems (ATS).
          </p>

          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 mb-12">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Zap className="text-indigo-600" /> Quick Tip for Freshers
            </h3>
            <p className="text-indigo-800 font-medium">
              Did you know that 75% of resumes are rejected by ATS before a human even sees them? For Indian freshers, using a clean, single-column layout is the best way to ensure your resume gets parsed correctly.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Sections Every Fresher Resume Must Have</h2>
          <p className="text-gray-600 mb-6">
            When building your first CV using our <Link href="/" className="text-indigo-600 font-bold hover:underline">Free Resume Builder</Link>, make sure to include these critical sections:
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                <Target className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Professional Summary or Objective</h3>
                <p className="text-gray-600">For freshers, a "Career Objective" is standard. Focus on what you can bring to the company rather than just what you want from them. Mention your degree and top 2 skills.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                <Award className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Education (The Most Important Part)</h3>
                <p className="text-gray-600">List your highest degree first. Include your college name, University (e.g., Mumbai University, VTU, AKTU), CGPA/Percentage, and year of passing. Don't forget your 10th and 12th details if you're a recent graduate.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                <Star className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Skills (Technical & Soft)</h3>
                <p className="text-gray-600">Categorize your skills. For IT roles, list languages (Java, Python), frameworks (React, Node), and tools (Git, VS Code). For non-IT, focus on communication, MS Office, and domain knowledge.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl h-fit">
                <Briefcase className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Projects & Internships</h3>
                <p className="text-gray-600">This is where you prove your worth. Describe your final year project or any 2-month internship. Use action verbs like "Developed", "Analyzed", or "Coordinated".</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">ATS Resume Format for Freshers in India</h2>
          <p className="text-gray-600 mb-6">
            The Indian job market is unique. While Western resumes might be more creative, Indian HRs at MNCs prefer the <strong>Reverse Chronological Format</strong>. It's the most ATS-friendly format and highlights your most recent achievements (usually your degree or latest internship) first.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Resume Example for a Fresher Software Engineer</h3>
          <div className="bg-gray-900 text-gray-300 p-8 rounded-3xl font-mono text-sm mb-12 overflow-x-auto">
            <p className="text-indigo-400 font-bold mb-4">// Sample Objective</p>
            <p>"Enthusiastic B.Tech Computer Science graduate with a 8.5 CGPA from NIT Trichy. Proficient in Java and Spring Boot with a strong foundation in Data Structures and Algorithms. Seeking an entry-level Software Developer role at [Company Name] to contribute to scalable web applications."</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes Freshers Make on Resumes</h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-600 mb-12">
            <li><strong>Using Photos:</strong> Unless you're applying for acting or modeling, Indian MNCs do not require photos. It can actually cause bias or ATS parsing issues.</li>
            <li><strong>Irrelevant Personal Info:</strong> You don't need to list your father's name, religion, or permanent address in 2026. Keep it professional with just your LinkedIn, Phone, and Email.</li>
            <li><strong>Spelling Errors:</strong> A single typo in "Engineering" can get your resume tossed. Use our builder to ensure a clean, error-free layout.</li>
            <li><strong>Generic File Names:</strong> Never name your file "Resume.pdf". Use "FirstName_LastName_Resume.pdf".</li>
          </ul>

          <div className="bg-indigo-600 text-white p-12 rounded-[3rem] text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-black">Ready to Build Your Winning Resume?</h2>
            <p className="text-xl text-indigo-100">Join 50,000+ Indian freshers who have used our tool to land their first job.</p>
            <Link 
              href="/builder" 
              className="inline-block bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-2xl hover:bg-indigo-50 transition-all shadow-xl"
            >
              Start Building for Free 🚀
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Is this resume builder really free?</h4>
              <p className="text-gray-600">Yes, 100%. We built this specifically for students in India who shouldn't have to pay to get a job. No hidden charges, no "premium" locks.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">What is an ATS-friendly resume?</h4>
              <p className="text-gray-600">An ATS-friendly resume uses a simple layout, standard fonts, and keywords that match the job description, allowing software to read your data easily.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Can I download my resume in PDF?</h4>
              <p className="text-gray-600">Absolutely. Our tool generates a high-quality PDF that preserves formatting across all devices and systems.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium mb-4">© 2026 FreeResume.dev - Made for India</p>
          <div className="flex justify-center gap-6 text-sm font-bold text-indigo-600">
            <Link href="/" className="hover:underline">Free Resume Builder</Link>
            <Link href="/templates" className="hover:underline">ATS Templates</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
