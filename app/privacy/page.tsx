import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cookie, Lock, Scale, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | FreeResume.dev Official Partner",
  description: "Read the Privacy Policy of FreeResume.dev. Learn how we handle your resume data, our usage of cookies, Google AdSense integration, and compliance with GDPR, CCPA, and privacy laws.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wider uppercase">
            <ShieldCheck size={14} /> Security Verified
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-slate-400">
            Last Updated: May 27, 2026 | Effective Date: May 27, 2026
          </p>
        </div>
        
        <div className="space-y-10 text-slate-600 leading-relaxed text-base md:text-lg">
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Notice to Our Users</h2>
            <p className="text-sm">
              At <strong>FreeResume.dev</strong> (the "Website"), we are deeply committed to protecting your privacy. This document outlines exactly what information we collect, how it is secured, how we use third-party services like Google AdSense, and your rights as a job-seeking candidate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <UserCheck size={22} className="text-indigo-600" /> 1. Information We Collect
            </h2>
            <p>
              We collect information to help you construct optimized ATS-friendly resumes. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Candidate Profiles:</strong> Name, professional email addresses, phone numbers, localized geological address (city, state, country), and links to professional platforms such as LinkedIn, GitHub, or portfolios.</li>
              <li><strong>Academic History:</strong> Institutions attended, degrees obtained, fields of study, aggregate scores (CGPA, SGPA, grades, or percentages), and completion timelines.</li>
              <li><strong>Professional Experience:</strong> Job titles, designations, company names, employment durations, concrete task descriptions, achievements, and structural skill listings.</li>
              <li><strong>Technical Competencies:</strong> Categorized listings of development frameworks, software toolsets, languages, and technical platforms.</li>
              <li><strong>Anonymized Metadata:</strong> IP addresses, browser agents, operating system categories, and referral paths constructed via server interactions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Cookie size={22} className="text-indigo-600" /> 2. Google AdSense & Third-Party Advertising
            </h2>
            <p>
              We serve advertisements using <strong>Google AdSense</strong> to fund the ongoing operation and maintenance of FreeResume.dev. Google, as a third-party advertisement vendor, utilizes specialized tracking systems to show relevant programmatic ads on our platform.
            </p>
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-4">
              <p className="font-semibold text-amber-900 my-0">Important AdSense Disclosures:</p>
              <ul className="list-disc pl-6 space-y-2 text-amber-800 text-sm">
                <li>Google utilizes cookies to serve targeted advertisements based on a user's prior visits to this Website and other locations across the world wide web.</li>
                <li>The use of tracking tools, specifically the <strong>DoubleClick DART cookie</strong>, enables Google and its authorized partners to showcase ads tailored perfectly to your professional or general interests.</li>
                <li>You may immediately opt out of personalized AdSense advertising by visiting the official <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline font-bold text-indigo-600 hover:text-indigo-800">Google Ads Settings</a>.</li>
                <li>Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the official <a href="https://aboutads.info" target="_blank" rel="noopener noreferrer" className="underline font-bold text-indigo-600 hover:text-indigo-800">Network Advertising Initiative Opt-Out Page</a>.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Lock size={22} className="text-indigo-600" /> 3. Data Protection and Client Privacy
            </h2>
            <p>
              Your security is our paramount priority. Unlike standard builders that scrape and sell candidate profiles, <strong>FreeResume.dev keeps your data in your control</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>All resume formulations are saved locally inside your browser's persistent sandbox storage (local storage or IndexedDB).</li>
              <li>Information is only securely packaged and sent to our production servers momentarily during high-performance PDF rendering/export operations or if you opt-in to register or store resumes inside our optional database integrations.</li>
              <li>We utilize high-grade industry encryption (SSL/TLS) for all transactions of raw data to prevent interception or modification.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Scale size={22} className="text-indigo-600" /> 4. GDPR & CCPA Compliance
            </h2>
            <p>
              We operate under global standards of data autonomy. Depending on your regulatory location (specifically under current GDPR and CCPA rules), you have clear, legal consumer options:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>The Right to Access:</strong> You can query us to verify exactly what data is held within any digital storage systems we use.</li>
              <li><strong>The Right to Erasure:</strong> You can request full, immediate removal of your credentials and account metadata.</li>
              <li><strong>The Right to Rectification:</strong> You retain complete liberty to instantly modify or correct any records on demand.</li>
              <li><strong>The Right to Restrict Processing:</strong> You can request that we immediately suspend any computational analysis of your patterns.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5. Continuous Revisions</h2>
            <p>
              We reserve the comprehensive right to modify this structural policy document to remain strictly compliant with global internet laws and evolving Google AdSense rules. We encourage users to habitually check this policy to stay abreast of privacy measures.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">6. Customer Contact Details</h2>
            <p>
              For concerns regarding the usage of cookies, privacy protections, data storage parameters, or Google AdSense agreements on FreeResume.dev, please submit an official inquiry:
            </p>
            <p className="text-lg font-black text-indigo-600 bg-indigo-50 inline-block px-4 py-2 rounded-xl">
              privacy@freeresume.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
