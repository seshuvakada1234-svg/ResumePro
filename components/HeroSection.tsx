'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Zap, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-100 py-20 md:py-32 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
            <Zap size={12} /> #1 Free Resume Builder in India
          </div>
          <h1 className="text-3xl md:text-7xl font-extrabold text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight">
            Build a Free ATS Resume <br className="hidden md:block" />
            That Gets You Hired
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Create job-ready resumes in minutes with ATS-optimized templates for freshers in India.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            <button 
              onClick={() => router.push('/builder')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-10 md:py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg md:text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1"
            >
              Build Resume Now 🚀
            </button>
            <button 
              onClick={() => router.push('/ats-score')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 md:px-10 md:py-5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold text-lg md:text-xl hover:bg-indigo-50 transition-all hover:-translate-y-1"
            >
              Check Resume ATS Score ⚡
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {['No Hidden Costs', 'ATS Optimized', 'PDF Download'].map((text) => (
              <div key={text} className="flex items-center gap-2.5 text-base font-bold text-gray-700">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <CheckCircle2 size={18} className="text-green-600" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
