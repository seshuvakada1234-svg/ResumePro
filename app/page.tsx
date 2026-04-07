'use client';

import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { AdBanner } from '@/components/AdBanner';
import { CheckCircle2 } from 'lucide-react';

function LandingContent() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />

      <main>
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: 'ATS-Optimized',
                desc: 'Our templates are tested against major ATS systems used by Indian companies like TCS, Infosys, and Wipro.',
              },
              {
                title: '100% Free',
                desc: 'No hidden subscriptions or "premium" templates. Everything is free for freshers in India.',
              },
              {
                title: 'Privacy First',
                desc: "Your data is secure. We don't sell your information to third parties.",
              },
              {
                title: 'Professional Design',
                desc: 'Clean, minimal, and modern layouts that impress human recruiters as well.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="space-y-4 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-50/50 hover:shadow-indigo-100 transition-all">
                <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <AdBanner adSlot="landing-bottom" className="w-full" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LandingContent />
    </Suspense>
  );
}
