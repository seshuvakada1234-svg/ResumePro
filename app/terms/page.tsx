import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | FreeResume.dev Official Platform",
  description: "Read the Terms & Conditions and Terms of Service of FreeResume.dev. Learn the usage rules, user responsibilities, and limitation of liabilities of our free ATS resume maker.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wider uppercase">
            <Scale size={14} /> Legal Terms Approved
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-slate-400">
            Last Updated: May 27, 2026 | Effective Date: May 27, 2026
          </p>
        </div>
        
        <div className="space-y-10 text-slate-600 leading-relaxed text-base md:text-lg">
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Welcome to FreeResume.dev</h2>
            <p className="text-sm text-slate-500">
              By accessing, browsing, or utilizing the web products, features, databases, or API systems on <strong>FreeResume.dev</strong> (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be contractually bound by these Terms of Service. If you do not accept these policies, you are strictly prohibited from using our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1. Eligibility</h2>
            <p>
              To use FreeResume.dev, you must be of legal age under local country regulations (or under parental supervision) to enter into binding legal agreements. The system is designed for students, freshers, job-seekers, and career professionals.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2. Description of Free Services</h2>
            <p>
              We provide digital toolsets that enable applicants to format, align, style, score, and download resume documents in high-fidelity PDF layouts.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ATS Optimizations:</strong> The page layout matches best-practices for computerized recruiting systems.</li>
              <li><strong>Zero Premium Barriers:</strong> There are no hidden trial periods, watermarks, or locked templates which are commonly used to coerce fees out of applicants.</li>
              <li><strong>System Availability:</strong> FreeResume.dev makes everyday efforts to keep construction tools active and operating without interruptions, but accepts no liability for hosting downs or data losses due to connection anomalies.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3. User Commitments & Content</h2>
            <p>
              When utilizing our online client builders, you retain intellectual ownership of any resume copy, profile entries, and details you input.
            </p>
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 text-rose-950 space-y-3">
              <h4 className="font-bold text-rose-900 flex items-center gap-2 my-0">
                <AlertOctagon size={18} className="text-rose-600" /> Prohibited Operations:
              </h4>
              <p className="text-sm my-0">
                You represent and warrant that all statements, job records, academic percentages, and certifications are true and correct to the best of your knowledge. You agree you will not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-rose-800 text-sm">
                <li>Submit misleading, fraudulent, or impersonated identity records to hiring portals.</li>
                <li>Utilize automated crawlers, scrapers, data-mining scripts, or API override mechanisms on our infrastructure.</li>
                <li>Inject cross-site scripting (XSS), SQL payloads, viruses, malware, or destructive code.</li>
                <li>Attempt to modify, reverse-engineer, or host carbon copies of our builder code packages.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4. Intellectual Property</h2>
            <p>
              All application software, graphical palettes, website architectures, visual headers, customized CSS alignments, design vectors, educational articles, and structural tip models are the sole proprietary property of <strong>FreeResume.dev</strong> and are protected by international copyrights, trademarks, and intellectual property arrangements. You are granted a personal, non-commercial, revocable license to utilize the resume templates for your own career search.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h2>
            <p>
              Our resume construction advice and digital generators are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether expressed or implied. FreeResume.dev does not guarantee employment, callback ratios, interview success, or compatibility with specific internal applicant tracking systems of employers. We shall not be liable for any direct, indirect, general, special, or consequential damages resulting from errors, omissions, or malfunctions of generated PDFs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">6. Platform Revisions</h2>
            <p>
              We may continuously add new template models, optimize current systems, adjust fonts, modify text layouts, or reorganize menus without prior announcement. We reserve the comprehensive authority to update these Terms of Service at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">7. Official Legal Address and Inquiries</h2>
            <p>
              For legal support, terms arbitration, queries about intellectual property copyrights, or institutional concerns on FreeResume.dev, please submit your query directly:
            </p>
            <p className="text-lg font-black text-indigo-600 bg-indigo-50 inline-block px-4 py-2 rounded-xl">
              legal@freeresume.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
