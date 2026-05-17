import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, AlertCircle, FileText, Layout, Search, ArrowRight, Download, HelpCircle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "ATS Resume Format 2026 | Ultimate Guide for Indian Job Seekers",
  description: "Download the most effective ATS resume format for 2026. Optimized for Indian companies like TCS, Infosys, and startups. Learn exactly how to clear the tracking system.",
  alternates: { canonical: 'https://freeresume.dev/ats-format' },
};

export default function ATSResumeFormatPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main>
        {/* Header/Hero */}
        <div className="bg-white border-b border-gray-200 py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              ATS Resume Format <span className="text-indigo-600">2026 Edition</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Everything you need to know about building a resume that actually gets past the software and into human hands.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">On this page</h4>
              <nav className="flex flex-col gap-2">
                {['What is ATS?', 'Why Format Matters', 'The Ideal Layout', 'Keyword Strategy', 'Common Mistakes', 'FAQ'].map((item) => (
                  <button key={item} className="text-left text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-16">
            <article className="prose prose-slate lg:prose-xl max-w-none">
              <h2 className="text-3xl font-extrabold text-slate-900">What is an Applicant Tracking System (ATS)?</h2>
              <p>
                Before we dive into the format, you must understand what you are fighting. An <strong>ATS</strong> is a software used by companies (from startups to giants like TCS, Infosys, and Google) to collect, sort, and rank thousands of resumes.
              </p>
              <p>
                When you apply on a portal, your resume isn't seen by a human immediately. It is "parsed" by the ATS. If your file is a mess—using complex tables, missing keywords, or non-standard fonts—the software will fail to read your profile. This results in an automatic rejection, often within seconds.
              </p>

              <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 my-12 text-amber-900">
                <h3 className="text-amber-900 flex items-center gap-2 mt-0">
                  <AlertCircle className="text-amber-600" /> The "Dark Room" Fact
                </h3>
                <p className="text-amber-800 text-lg mb-0 leading-relaxed italic">
                  Roughly 75% of resumes are never seen by a human recruiter because they fail the initial ATS compliance check. Your format is the gatekeeper.
                </p>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900">Why Formatting is 80% of the Battle</h2>
              <p>
                Recruiters spend an average of <strong>6 seconds</strong> looking at a resume. The ATS spends even less. A complex design might look beautiful on Pinterest, but if the ATS can't identify your "Work Experience" because you called it "My Professional Odyssey," you lose.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 font-bold">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Layout className="text-indigo-600 mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2">Simplicity Wins</h4>
                  <p className="text-sm text-slate-600">Single-column layouts are parsed more accurately than complex multi-column grids.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Search className="text-indigo-600 mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2">Keyword Rich</h4>
                  <p className="text-sm text-slate-600">Standard formats allow the ATS to extract skills like "React," "Java," or "Marketing" effectively.</p>
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900">The Ideal ATS Resume Format for 2026</h2>
              <p>Follow these strict rules to ensure your resume is 100% readable:</p>
              
              <ul className="space-y-4">
                <li>
                  <strong>File Type:</strong> Use a PDF. Contrary to old advice, modern ATS systems handle PDFs perfectly, provided they are not "image-based" (OCR-only). Our builder generates selectable, high-quality PDFs.
                </li>
                <li>
                  <strong>Single Column:</strong> While our "Photo Classic" template is beautiful, our <strong>Classic Professional</strong> (single column) is the gold standard for high-volume corporate applications.
                </li>
                <li>
                  <strong>Standard Headings:</strong> Use "Education," "Work Experience," "Skills," and "Projects." Do not get creative with heading names.
                </li>
                <li>
                  <strong>Clean Fonts:</strong> Use Inter, Arial, Calibri, or Roboto. Avoid fancy cursive or serif fonts that might trigger "parsing errors."
                </li>
                <li>
                  <strong>No Headers/Footers:</strong> Do not place your contact info in the actual document header/footer section of a Word doc. Keep it in the body.
                </li>
              </ul>

              <h2 className="text-3xl font-extrabold text-slate-900">Step-by-Step Construction</h2>
              
              <div className="space-y-10 my-12">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Contact Information</h4>
                    <p className="text-slate-600">Include your full name, location (State, Country is enough), professional email, and LinkedIn profile. Phone number is optional but recommended for Indian companies.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Professional Summary</h4>
                    <p className="text-slate-600">2-3 sentences. Mention your total years of experience, core skills, and your biggest achievement. For freshers, focus on your degree and specific technical competence.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Skills Section</h4>
                    <p className="text-slate-600">Use a clean bulleted list. Categorize them if you have many (e.g., Programming: Java, Python. Tools: Git, Jenkins).</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900">Keyword Strategy for Freshers</h2>
              <p>
                An <strong>ATS resume for freshers</strong> lives or dies by keywords. If a Job Description (JD) mentions "Full Stack Developer," you must have that exact phrase. If it says "REST APIs," don't just say "Backend Experience."
              </p>
              <p>
                <strong>Pro Tip:</strong> Don't just stuff keywords at the bottom in tiny white text (this can get you flagged). Incorporate them naturally into your project descriptions and skills section.
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 text-red-600">Common "Format Killers" to Avoid</h2>
              <div className="bg-white p-8 rounded-2xl border border-red-100 italic text-red-900 shadow-sm border-l-4 border-l-red-500">
                <p className="mb-4 font-bold not-italic">If your resume has any of these, fix it immediately:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Progress bars or "stars" for skill levels (ATS can't read "4 stars")</li>
                  <li>Images of your certificates (upload them separately if asked)</li>
                  <li>Columns that overlap</li>
                  <li>Hyperlinks that contain tracking IDs</li>
                  <li>Text inside shapes or text boxes</li>
                </ul>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h4 className="font-bold text-slate-900 mb-3">Can I use a photo on an ATS resume?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-0">
                    Generally, no. In the US, UK, and most modern Indian corporate roles, photos are unnecessary and can confuse parsing software. Stay safe with a text-based professional layout.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h4 className="font-bold text-slate-900 mb-3">Which is better: Word or PDF?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-0">
                    PDF is better for maintaining your exact design. While ATS can read Word, formatting can "shift" when a recruiter opens it. A properly exported PDF (like the ones from FreeResume.dev) is the gold standard.
                  </p>
                </div>
              </div>
            </article>

            {/* CTA */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-12 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Master Local or Global <br/> Job Markets Today</h3>
              <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                Join 10,000+ Indian students successfully using FreeResume.dev to enter companies like TCS, Infosys, and high-growth startups.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/builder" className="bg-white text-indigo-600 hover:bg-slate-100 px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-2">
                  Create My ATS Resume <ArrowRight size={20} />
                </Link>
                <Link href="/templates" className="bg-indigo-500/30 backdrop-blur-sm border-2 border-indigo-200 text-white hover:bg-indigo-500/50 px-10 py-5 rounded-2xl font-bold text-xl transition-all">
                  Browse Free Templates
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} FreeResume.dev - Proudly helping Indian Students get hired.
        </div>
      </footer>
    </div>
  );
}
