'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Zap, Search, FileText, CheckCircle2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: <FileText size={20} />, text: 'Reading resume content...' },
    { icon: <Search size={20} />, text: 'Analyzing keywords...' },
    { icon: <Zap size={20} />, text: 'Calculating ATS score...' },
    { icon: <CheckCircle2 size={20} />, text: 'Finding job matches...' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="max-w-md w-full space-y-12 text-center">
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="text-indigo-600 animate-pulse" size={40} fill="currentColor" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analyzing your resume...</h2>
          <p className="text-gray-500 font-medium">This usually takes less than 10 seconds.</p>
        </div>

        <div className="space-y-4 text-left bg-white p-8 rounded-3xl shadow-xl shadow-indigo-50 border border-gray-100">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 transition-all duration-500 ${
                i <= step ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'
              }`}
            >
              <div className={`${i <= step ? 'text-indigo-600' : 'text-gray-400'}`}>
                {s.icon}
              </div>
              <span className={`text-sm font-bold ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>
                {s.text}
              </span>
              {i < step && (
                <CheckCircle2 className="ml-auto text-green-500" size={16} />
              )}
              {i === step && (
                <Loader2 className="ml-auto text-indigo-600 animate-spin" size={16} />
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};
