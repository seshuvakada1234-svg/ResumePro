import React from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Zap, ArrowRight, FileText, Search, Layout, Briefcase, HelpCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Your ATS Score is Low (And How to Fix It) | FreeResume",
  description: "Got a low ATS score? Learn how to improve your ATS score for freshers in India. Step-by-step guide to fixing keywords, formatting, and resume structure.",
  keywords: ["resume for freshers in India", "ATS resume for freshers", "improve ATS score", "resume format for freshers India", "resume mistakes freshers make", "free resume builder"],
  alternates: {
    canonical: 'https://freeresume.dev/ats-score-guide',
  },
};

export default function ATSScoreGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="bg-indigo-600 py-20 px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Why Your <span className="text-indigo-200">ATS Score is Low</span> (And How to Fix It)
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-indigo-100 font-medium">
              If you just checked your resume and got a low score like 15, don't panic. Here is exactly how to fix it and land more interviews.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/ats-score" 
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Check Your Score Again <ArrowRight size={20} />
              </Link>
              <Link 
                href="/builder" 
                className="bg-indigo-500 text-white border-2 border-indigo-400 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-2"
              >
                Use Free Resume Builder
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo lg:prose-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
          <p className="text-gray-600 mb-8">
            Finding a job as a fresher in India is already a huge challenge. You spend hours applying on LinkedIn, Naukri, and company portals, only to hear nothing back. Often, the reason isn't your lack of talent—it's your resume. If you've used an <strong>ATS resume for freshers</strong> checker and received a low score, it means the software used by recruiters can't read your profile properly. 
          </p>
          <p className="text-gray-600 mb-8">
            In this guide, we will show you exactly how to <strong>improve ATS score</strong> results from a disappointing 15 to a job-winning 80+. Whether you are looking for a <strong>resume for freshers in India</strong> or a global role, these steps are your roadmap to success.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is an ATS Score?</h2>
          <p className="text-gray-600 mb-6">
            ATS stands for Applicant Tracking System. It is a software used by almost every major company in India (like TCS, Google, or HDFC) to filter through thousands of applications. 
          </p>
          <p className="text-gray-600 mb-8">
            The "ATS Score" is a measure of how well your resume matches the job description and how easily the software can parse your data. A low score means the system thinks you are either unqualified or your resume is too messy to read.
          </p>

          <div className="bg-red-50 p-8 rounded-3xl border border-red-100 mb-12">
            <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-600" /> Why Your Resume Scored Low (Score: 15)
            </h3>
            <p className="text-red-800 mb-4 font-medium">
              Based on our analysis of resumes scoring around 15, here are the three biggest "deal-breakers":
            </p>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Missing Keywords:</strong> You haven't included the specific skills (like "Java", "Python", or "Digital Marketing") that recruiters are searching for.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Weak Formatting:</strong> You might be using tables, columns, or complex graphics that "confuse" the ATS software.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Low Experience Relevance:</strong> Your descriptions are too vague or don't show the "impact" of your work.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your ATS Score (Step-by-Step)</h2>
          
          <div className="space-y-12 mb-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-indigo-100 p-4 rounded-2xl h-fit w-fit shrink-0">
                <Search className="text-indigo-600" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Fix Your Keywords</h3>
                <p className="text-gray-600 mb-4">
                  Keywords are the most important part of an <strong>ATS resume for freshers</strong>. If the job description asks for "React.js" and you only wrote "Web Development," the system might miss you.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm italic text-gray-500">
                  <strong>Example:</strong> Instead of just saying "Coding," list specific languages like "C++, Java, and Python."
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-indigo-100 p-4 rounded-2xl h-fit w-fit shrink-0">
                <Layout className="text-indigo-600" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Improve Resume Formatting</h3>
                <p className="text-gray-600 mb-4">
                  The best <strong>resume format for freshers India</strong> is a simple, single-column layout. Avoid using images, charts, or fancy icons inside your text.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use standard headings like "Education" and "Work Experience."</li>
                  <li>Use a clean font like Inter, Arial, or Calibri.</li>
                  <li>Save your file as a PDF (our <strong>free resume builder</strong> does this automatically).</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-indigo-100 p-4 rounded-2xl h-fit w-fit shrink-0">
                <Briefcase className="text-indigo-600" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Add Relevant Experience or Projects</h3>
                <p className="text-gray-600 mb-4">
                  As a fresher, you might not have a job yet. That's okay! You can use your college projects, internships, or even online certifications. 
                </p>
                <p className="text-gray-600">
                  <strong>Pro Tip:</strong> Don't just list what you did. List what you <em>achieved</em>. 
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-indigo-100 p-4 rounded-2xl h-fit w-fit shrink-0">
                <Zap className="text-indigo-600" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Use Strong Action Words</h3>
                <p className="text-gray-600 mb-4">
                  One of the biggest <strong>resume mistakes freshers make</strong> is using passive language like "I was responsible for..." or "I helped in..."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-sm">
                    <span className="text-red-600 font-bold">Weak:</span> "Worked on a project."
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm">
                    <span className="text-green-600 font-bold">Strong:</span> "Developed a web app."
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Resume Mistakes Freshers Make</h2>
          <p className="text-gray-600 mb-6">
            Avoid these common traps to keep your ATS score high:
          </p>
          <ul className="list-disc pl-6 space-y-4 text-gray-600 mb-12">
            <li><strong>Using a Photo:</strong> Most Indian ATS systems struggle with images. Keep it text-only.</li>
            <li><strong>Spelling Errors:</strong> If you spell "Javascript" as "Javascritp," the ATS won't recognize the skill.</li>
            <li><strong>Too Much Fluff:</strong> Don't use words like "Hardworking" or "Team Player" without proof. Focus on skills.</li>
            <li><strong>Non-Standard Headings:</strong> Don't call your experience section "My Journey." Call it "Work Experience."</li>
          </ul>

          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 mb-16">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-indigo-600" /> Quick Checklist to Improve ATS Score
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Single-column layout used",
                "Keywords match the job description",
                "Standard section headings used",
                "No images or complex tables",
                "Action verbs used in bullets",
                "Metrics/Numbers included",
                "Contact info is clear",
                "Saved as a clean PDF"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-indigo-800 font-medium">
                  <CheckCircle2 size={18} className="text-indigo-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-8 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <HelpCircle size={20} className="text-indigo-500" /> What is a good ATS score for freshers?
              </h4>
              <p className="text-gray-600">A score above 75 is considered excellent. If you are below 50, you should definitely use our <strong>free resume builder</strong> to reformat your resume.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <HelpCircle size={20} className="text-indigo-500" /> How can I improve my ATS resume quickly?
              </h4>
              <p className="text-gray-600">The fastest way is to copy the keywords from the job description and paste them naturally into your "Skills" and "Experience" sections.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <HelpCircle size={20} className="text-indigo-500" /> Is this resume builder really free?
              </h4>
              <p className="text-gray-600">Yes! FreeResume.dev is 100% free for Indian students and freshers. No hidden fees, ever.</p>
            </div>
          </div>

          <div className="bg-indigo-600 text-white p-12 rounded-[3rem] text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Ready to Fix Your Resume?</h2>
            <p className="text-xl text-indigo-100">Stop getting rejected. Build an ATS-friendly resume in 5 minutes.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link 
                href="/builder" 
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-2xl hover:bg-indigo-50 transition-all shadow-xl"
              >
                Start Building Now 🚀
              </Link>
              <Link 
                href="/ats-score" 
                className="bg-indigo-500 text-white border-2 border-indigo-400 px-10 py-5 rounded-2xl font-bold text-2xl hover:bg-indigo-400 transition-all"
              >
                Re-check Score
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
