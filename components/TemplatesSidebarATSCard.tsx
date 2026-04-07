'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, Upload } from 'lucide-react';
import { motion } from 'motion/react';

export const TemplatesSidebarATSCard: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl" />

      <div className="relative z-10 space-y-6">
        <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
          <Zap className="text-white" size={24} fill="currentColor" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Get ATS Score ⚡</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Upload your resume and see your score instantly. Optimize for top Indian companies.
          </p>
        </div>

        <button
          onClick={() => router.push('/ats-score')}
          className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg"
        >
          <Upload size={18} />
          Upload Resume
        </button>
      </div>
    </motion.div>
  );
};
