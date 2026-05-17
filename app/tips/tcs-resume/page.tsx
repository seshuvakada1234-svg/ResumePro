import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, AlertCircle, ArrowRight, Star, Briefcase, Award, Search, Layout, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "TCS Resume Format for Freshers 2026 | How to Get Hired at TCS",
  description: "Learn the exact resume format required for TCS Ninja and Digital roles. Get specialized ATS tips, keyword strategy, and a free resume template for TCS freshers.",
  alternates: { canonical: 'https://freeresume.dev/tips/tcs-resume' },
};

export default function TCSResumePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main>
        {/* Hero Section */}
        <div className="bg-[#5c2d91] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              TCS Resume Format <br/> <span className="text-indigo-300">for Freshers (2026)</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-medium">
              A comprehensive guide to building a resume that passes the TCS iON portal and lands you a Ninja or Digital role.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <article className="prose prose-slate lg:prose-xl max-w-none">
            <h2 className="text-3xl font-black text-slate-900 underline decoration-indigo-600 decoration-8 underline-offset-8">Introduction</h2>
            <p>
              Applying for a job at <strong>Tata Consultancy Services (TCS)</strong> is a dream for thousands of engineering graduates in India. Whether you are applying through the National Qualifier Test (NQT) or off-campus through the iON portal, your resume is the first thing that get scanned.
            </p>
            <p>
              TCS uses high-end Applicant Tracking Systems (ATS) to filter through the millions of applications they receive every year. To get shortlisted, your resume must be formatted in a very specific way. In this guide, we will show you exactly how to build a <strong>TCS resume for freshers</strong> that works.
            </p>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-12">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mt-0">
                <Star className="text-indigo-600" /> TCS Hiring Categories
              </h3>
              <p className="text-slate-600 mb-4">TCS usually hires for three main categories:</p>
              <ul className="space-y-2">
                <li><strong>TCS Ninja:</strong> Entry-level roles with a focus on core engineering and basic coding.</li>
                <li><strong>TCS Digital:</strong> Higher package roles focusing on advanced technologies like Cloud, AI, and Big Data.</li>
                <li><strong>TCS Prime:</strong> Top-tier roles for exceptional coders and researchers.</li>
              </ul>
              <p className="text-sm font-bold text-indigo-600">Your resume needs to be optimized based on which role you are targeting!</p>
            </div>

            <h2 className="text-3xl font-black text-slate-900">Essential Sections for a TCS Resume</h2>
            <p>
                When using our <strong>Free Resume Builder</strong>, ensure you include these sections to maximize your chances:
            </p>
            
            <ol className="space-y-8 my-10">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h4 className="font-bold text-xl">Contact Details & NQT ID</h4>
                  <p className="text-slate-600 text-base">Always include your full name, phone number, and a professional email. If you have already registered for NQT, mention your Reference ID / NQT ID prominently.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h4 className="font-bold text-xl">Educational Qualifications</h4>
                  <p className="text-slate-600 text-base">TCS is very strict about academic criteria. List your 10th, 12th, and B.Tech/B.Sc percentage/CGPA clearly. Mention your year of passing and ensure there are no active backlogs.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h4 className="font-bold text-xl">Technical Skills</h4>
                  <p className="text-slate-600 text-base">Include core skills like C, C++, Java, and Python. For Digital roles, add Cloud (AWS/Azure), Data Science (R/Python), or Cybersecurity.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h4 className="font-bold text-xl">Projects</h4>
                  <p className="text-slate-600 text-base">Detail your final year project. Explain the motivation, your role, and the technology stack used. This is your biggest talking point during the technical interview.</p>
                </div>
              </li>
            </ol>

            <h2 className="text-3xl font-black text-slate-900">How to Beat the TCS iON ATS</h2>
            <p>The iON portal is the "gatekeeper" of TCS. To ensure your resume gets through:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Use a Single-Column Layout:</strong> Multi-column layouts often fail when parsed by older ATS systems. Our "Classic Professional" template is perfect for this.</li>
              <li><strong>Text-Based Format:</strong> Avoid images of your certificates. The ATS can't read images. Use plain text to describe your achievements.</li>
              <li><strong>Keyword Matching:</strong> If you are applying for a "Data Analyst" role, ensure your resume contains words like "SQL," "Excel," and "Analysis" multiple times.</li>
            </ul>

            <div className="bg-red-50 p-8 rounded-3xl border border-red-100 my-16">
              <h3 className="text-2xl font-bold text-red-900 mt-0 flex items-center gap-2">
                <AlertCircle className="text-red-600" /> Common Mistakes to Avoid
              </h3>
              <ul className="text-red-800 space-y-2 mb-0">
                <li><strong>Gaps in Education:</strong> If you have a gap year, mention the reason briefly or be prepared to explain it in the interview.</li>
                <li><strong>Incorrect CGPA:</strong> Never round off your CGPA (e.g., 7.95 is 7.95, not 8.0). TCS verifies this strictly.</li>
                <li><strong>Formatting errors:</strong> Don't use fancy fonts. Stick to Inter, Arial, or Calibri.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-slate-900">What is the minimum CGPA for TCS?</h4>
                <p className="text-slate-600">Generally, TCS requires a minimum of 60% or 6 CGPA throughout your 10th, 12th, and Graduation.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Does TCS allow gaps in education?</h4>
                <p className="text-slate-600">TCS usually allows a maximum of 2 years of break in education for valid reasons.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Is a photo required on the TCS resume?</h4>
                <p className="text-slate-600">No, it is not required. However, you will need to upload a photo separately on the iON portal for your admit card.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-12 text-white text-center shadow-2xl my-20">
              <h3 className="text-3xl md:text-5xl font-black mb-6">Build Your TCS Resume Today</h3>
              <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                Use our specialized TCS resume template to get ahead of the competition. 100% Free.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/builder?template=classic" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Build My TCS Resume <ArrowRight size={20} />
                </Link>
                <Link href="/resume-examples" className="bg-indigo-500 text-white border-2 border-indigo-400 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-400 transition-all">
                  Browse Examples
                </Link>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link href="/" className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">
                ← Back to Home
              </Link>
            </div>
          </article>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} FreeResume.dev - Not affiliated with TCS. Built for students.
        </div>
      </footer>
    </div>
  );
}
