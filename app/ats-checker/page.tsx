'use client';

import React from 'react';
import { AdBanner } from '@/components/AdBanner';
import { FileText, Home, Layout, Zap, Menu, X, Mail, Share2, CheckCircle2, Search, ShieldCheck, Target } from 'lucide-react';
import Link from 'next/link';
import { Auth } from '@/components/Auth';

export default function ATSCheckerPage() {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume ATS Checker',
        text: 'Check your resume ATS score for free!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Free <span className="text-indigo-600">ATS Checker</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our real-time ATS scoring system helps you identify gaps and optimize your resume for hiring systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Search className="text-indigo-600" size={32} />,
              title: "Keyword Analysis",
              desc: "We scan your resume for industry-specific keywords that recruiters look for."
            },
            {
              icon: <ShieldCheck className="text-indigo-600" size={32} />,
              title: "Format Validation",
              desc: "Ensure your resume layout is readable by all major Applicant Tracking Systems."
            },
            {
              icon: <Target className="text-indigo-600" size={32} />,
              title: "Real-time Scoring",
              desc: "Get instant feedback as you build your resume with our integrated scoring system."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Ready to check your score?</h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto">
              Start building your resume now and see your ATS score update in real-time. It's 100% free.
            </p>
            <div className="flex justify-center">
              <Link href="/" className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl">
                Start Building Now 🚀
              </Link>
            </div>
          </div>
        </div>
        
        <AdBanner adSlot="ats-checker-bottom" className="mt-16" />
      </main>
    </div>
  );
}
