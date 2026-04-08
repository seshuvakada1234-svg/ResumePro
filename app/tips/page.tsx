'use client';

import React from 'react';
import { ATSTips } from '@/components/ATSTips';
import { AdBanner } from '@/components/AdBanner';
import { FileText, Home, Layout, Zap, Menu, X, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Auth } from '@/components/Auth';

export default function TipsPage() {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume ATS Tips',
        text: 'Check out these professional ATS resume tips!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            ATS <span className="text-indigo-600">Tips</span> & Tricks
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how to optimize your resume for Applicant Tracking Systems and land more interviews.
          </p>
        </div>

        <ATSTips />
        
        <AdBanner adSlot="ats-tips-bottom" className="mt-16" />
      </main>
    </div>
  );
}
