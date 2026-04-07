'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Zap, ArrowRight, RefreshCw } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  breakdown: {
    label: string;
    value: number;
    weight: number;
    color: string;
  }[];
  tips: string[];
  onReupload: () => void;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, breakdown, tips, onReupload }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (s: number) => {
    if (s >= 80) return 'bg-green-50 border-green-100';
    if (s >= 60) return 'bg-amber-50 border-amber-100';
    return 'bg-red-50 border-red-100';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl shadow-indigo-100 border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          {/* Big Score Circle */}
          <div className="relative flex-shrink-0">
            <svg className="w-48 h-48 md:w-56 md:h-56 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-gray-100 md:hidden"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-100 hidden md:block"
              />
              {/* Mobile Progress */}
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={552}
                initial={{ strokeDashoffset: 552 }}
                animate={{ strokeDashoffset: 552 - (552 * score) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className={`${getScoreColor(score)} md:hidden`}
              />
              {/* Desktop Progress */}
              <motion.circle
                cx="112"
                cy="112"
                r="100"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={628}
                initial={{ strokeDashoffset: 628 }}
                animate={{ strokeDashoffset: 628 - (628 * score) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className={`${getScoreColor(score)} hidden md:block`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl md:text-6xl font-black tracking-tighter ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">Score</span>
            </div>
          </div>

          {/* Score Info */}
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">ATS Analysis Complete ⚡</h2>
              <p className="text-lg md:text-xl text-gray-500 font-medium">
                Your resume is in the <span className="text-indigo-600 font-bold">top 30%</span> of candidates for this role.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <div className={`px-4 py-2 rounded-full border text-xs md:text-sm font-bold flex items-center gap-2 ${getScoreBg(score)} ${getScoreColor(score)}`}>
                {score >= 80 ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Good Potential' : 'Needs Improvement'}
              </div>
              <button
                onClick={onReupload}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} />
                Re-upload Resume
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Breakdown Section */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-indigo-50 border border-gray-100 space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Score Breakdown</h3>
            <div className="space-y-6 md:space-y-8">
              {breakdown.map((item, i) => (
                <div key={i} className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5 md:space-y-1">
                      <span className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                      <div className="text-base md:text-lg font-extrabold text-gray-900">{item.value}%</div>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400">Weight: {item.weight}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 md:h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-indigo-50 border border-gray-100 space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Improvement Tips</h3>
            <div className="space-y-3 md:space-y-4">
              {tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-indigo-50 hover:border-indigo-100 transition-all"
                >
                  <div className="bg-white w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap size={14} className="text-amber-500 group-hover:text-white md:hidden" fill="currentColor" />
                    <Zap size={16} className="text-amber-500 group-hover:text-white hidden md:block" fill="currentColor" />
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
