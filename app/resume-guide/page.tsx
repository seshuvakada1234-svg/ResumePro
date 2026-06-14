import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, Zap, ArrowRight, FileText, Star, Target, Award, Briefcase, ChevronRight, HelpCircle, UserCheck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "Resume for Freshers in India 2026 | Ultimate Beginner's Guide",
  description: "Download the best resume for freshers in India. 100% free ATS-friendly resume templates designed for students. Learn exactly what to put in your first CV.",
  keywords: ["resume for freshers in India", "fresher resume format", "ATS resume for students", "first job resume India", "CV for freshers"],
  alternates: {
    canonical: 'https://freeresume.dev/resume-guide',
  },
};

export default function ResumeForFreshersPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main>
        {/* Banner */}
        <div className="bg-indigo-700 py-4 px-4 text-center text-indigo-100 text-xs font-bold tracking-widest uppercase">
          New: Updated for 2026 Job Market in India
        </div>

        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200 py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
              A Complete Guide to <br/> <span className="text-indigo-600">Resume for Freshers</span> in India
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Everything you need to know to build your first professional CV that beats the ATS and lands you an interview at top MNCs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Link 
                href="/templates" 
                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Choose a Template <ArrowRight size={20} />
              </Link>
              <Link 
                href="/resume-examples" 
                className="bg-white text-slate-600 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Browse Examples
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-16">
            
            <article className="prose prose-slate lg:prose-xl max-w-none">
              <h2 className="text-3xl font-black text-slate-900">Why Your First Resume is Your Most Important Document</h2>
              <p>
                As a graduate in India, the transition from college to the workplace is a huge leap. Your resume is the first point of contact between you and a recruiter at <strong>TCS, Wipro, Infosys, or Google</strong>. In a market where 1 role gets 5,000+ applicants, your <strong>resume for freshers in India</strong> needs to be perfect.
              </p>
              <p>
                A high-quality resume doesn't just list your degree; it tells a story of your potential. Since you don't have years of experience, you must focus on your technical projects, certifications, and "soft skills" that show you are ready to learn.
              </p>

              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 my-12">
                <h3 className="text-2xl font-bold text-indigo-900 flex items-center gap-2 mt-0">
                  <Zap className="text-indigo-600" /> The "6-Second" Rule
                </h3>
                <p className="text-indigo-800 font-medium mb-0 leading-relaxed">
                  The average recruiter looks at a resume for just 6 seconds before deciding if it's worth reading. In India, where volume is massive, this window is even shorter. Your layout must be clean and "scannable."
                </p>
              </div>

              <h2 className="text-3xl font-black text-slate-900">The 5 Core Sections of a Fresher Resume</h2>
              <p>
                To create a high-impact CV, ensure you have these five sections in the following order:
              </p>

              <div className="space-y-10 my-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><UserCheck /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">1. Professional Header</h4>
                    <p className="text-slate-600 text-base">Include your name in a large font, followed by your city, phone, professional email (avoid coolboy12@...), and your LinkedIn profile.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Target /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">2. Career Objective</h4>
                    <p className="text-slate-600 text-base">Summarize who you are. Example: "B.Tech CSE graduate with an 8.5 CGPA and expertise in Java. Eager to apply problem-solving skills at [Company Name]."</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Award /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">3. Education</h4>
                    <p className="text-slate-600 text-base">List your highest degree first. Include your college, University, CGPA or Percentage, and the month/year of graduation.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Briefcase /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">4. Projects and Internships</h4>
                    <p className="text-slate-600 text-base">Detail 2-3 significant projects or any internship experience. Focus on what you used (Tech stack) and what the result was.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Star /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl">5. Skills Section</h4>
                    <p className="text-slate-600 text-base">List technical skills (C++, Python, SQL) and soft skills (Communication, Teamwork). Be honest about your proficiency.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900">How to Beat the ATS (Applicant Tracking System)</h2>
              <p>
                  In 2026, many Indian corporations use software to scan your resume before a human even sees it. To "score high," follow these rules:
              </p>
              <ul>
                  <li><strong>Standard File Names:</strong> Name your file <code>YourName_Resume.pdf</code>. Avoid names like <code>Res123.pdf</code>.</li>
                  <li><strong>Keyword Matching:</strong> If the JD mentions "React.js," ensure you have that exact text. Don't hide it inside an image or chart.</li>
                  <li><strong>Simple Layout:</strong> Single-column layouts (like our <strong>Classic Professional</strong> template) are much easier for software to parse.</li>
              </ul>

              <h2 className="text-3xl font-black text-slate-900">Common Mistakes Indian Freshers Make</h2>
              <div className="bg-slate-900 text-slate-300 p-10 rounded-[2.5rem] my-12 border-t-4 border-t-red-500">
                  <h4 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Mistake #1: Using a Photo</h4>
                  <p className="mb-8">Unless you're applying for a role in acting or media, photos are generally discouraged. They can lead to unconscious bias and confuse some older ATS software.</p>
                  
                  <h4 className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Mistake #2: Irrelevant Information</h4>
                  <p className="mb-0">You don't need to list your father's name, religion, date of birth, or your permanent home address. Keep your resume professional and focused on your skills.</p>
              </div>

              <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h4 className="font-bold text-slate-900 mb-2">How long should a fresher resume be?</h4>
                    <p className="text-slate-600 text-sm mb-0">For freshers, 1 page is the strictly recommended length. Recruiters only spend a few seconds per resume; keep only the most important parts.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Is the resume builder really free?</h4>
                    <p className="text-slate-600 text-sm mb-0">Yes, it's 100% free. We built this to help students in India who shouldn't have to pay to get their first job.</p>
                </div>
              </div>
            </article>

            {/* Final CTA */}
            <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Land Your Dream Job in 2026</h2>
                 <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-medium">Create a high-impact, professional resume in just 5 minutes with FreeResume.dev.</p>
                 <Link href="/builder" className="inline-block bg-white text-indigo-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-slate-50 transition-all shadow-xl">
                    Build My Resume Now 🚀
                 </Link>
            </div>

            <div className="text-center pt-8">
              <Link href="/" className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">
                ← Back to Homepage
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 underline decoration-indigo-600 decoration-4">Related Topics</h4>
                    <nav className="flex flex-col gap-4">
                        <Link href="/ats-format" className="text-slate-600 hover:text-indigo-600 flex items-center justify-between group">
                            <span className="font-medium">ATS Resume Format</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <Link href="/resume-examples" className="text-slate-600 hover:text-indigo-600 flex items-center justify-between group">
                            <span className="font-medium">Resume Examples</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <Link href="/ats-score-guide" className="text-slate-600 hover:text-indigo-600 flex items-center justify-between group">
                            <span className="font-medium">Fix Your ATS Score</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </nav>
                </div>

                <div className="bg-indigo-900 rounded-3xl p-8 text-white space-y-6">
                    <ShieldCheck className="text-indigo-400" size={40} />
                    <h4 className="text-2xl font-black">Privacy First</h4>
                    <p className="text-indigo-100 text-sm leading-relaxed opacity-80">
                        We don't collect or sell your personal data. Your resume stays on your device or in our secure cloud—never anywhere else.
                    </p>
                    <Link href="/privacy" className="text-indigo-400 text-xs font-bold uppercase hover:underline">Read Privacy Policy</Link>
                </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} FreeResume.dev - Proudly supporting the next generation of Indian Talent.
        </div>
      </footer>
    </div>
  );
}
