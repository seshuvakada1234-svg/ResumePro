'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { UploadZone } from '@/components/ATSFlow/UploadZone';
import { LoadingScreen } from '@/components/ATSFlow/LoadingScreen';
import { ScoreDisplay } from '@/components/ATSFlow/ScoreDisplay';
import { JobMatches } from '@/components/ATSFlow/JobMatches';
import { motion, AnimatePresence } from 'motion/react';

export default function ATSScorePage() {
  const [status, setStatus] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [scoreData, setScoreData] = useState<any>(null);

  useEffect(() => {
    // Check localStorage for previous score
    const saved = localStorage.getItem('last_ats_score');
    if (saved) {
      // setScoreData(JSON.parse(saved));
      // setStatus('result');
    }
  }, []);

  const handleUpload = (file: File) => {
    setStatus('analyzing');
    
    // Simulate analysis
    setTimeout(() => {
      const dummyResult = {
        score: 78,
        breakdown: [
          { label: 'Keywords Match', value: 85, weight: 30, color: 'bg-green-500' },
          { label: 'Experience Quality', value: 72, weight: 25, color: 'bg-amber-500' },
          { label: 'Skills Relevance', value: 90, weight: 20, color: 'bg-green-500' },
          { label: 'Formatting', value: 65, weight: 15, color: 'bg-amber-500' },
          { label: 'Education Fit', value: 80, weight: 10, color: 'bg-green-500' },
        ],
        tips: [
          'Add more quantitative results in your experience section (e.g., "Increased sales by 20%").',
          'Include industry-specific keywords like "Agile Methodology" or "Cloud Computing".',
          'Ensure your contact information is clearly visible at the top.',
          'Use a standard, clean font like Inter or Arial for better ATS readability.',
          'List your skills in a clear, categorized section.'
        ],
        jobs: [
          {
            title: 'Frontend Developer',
            company: 'TechCorp India',
            location: 'Bangalore (Remote)',
            salary: '₹12L - ₹18L PA',
            match: 92,
            url: 'https://adzuna.com'
          },
          {
            title: 'React Engineer',
            company: 'Innovate Solutions',
            location: 'Hyderabad',
            salary: '₹15L - ₹22L PA',
            match: 88,
            url: 'https://adzuna.com'
          },
          {
            title: 'Software Developer',
            company: 'Global Systems',
            location: 'Pune',
            salary: '₹10L - ₹15L PA',
            match: 85,
            url: 'https://adzuna.com'
          }
        ]
      };
      
      setScoreData(dummyResult);
      localStorage.setItem('last_ats_score', JSON.stringify(dummyResult));
      setStatus('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 6000);
  };

  const handleReupload = () => {
    setStatus('upload');
    setScoreData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {status === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 text-center">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                  Get Your <span className="text-indigo-600">ATS Score</span> ⚡
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                  Optimize your resume for the world's top applicant tracking systems. Used by 50,000+ candidates.
                </p>
              </div>
              <UploadZone onUpload={handleUpload} isAnalyzing={false} />
            </motion.div>
          )}

          {status === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}

          {status === 'result' && scoreData && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 pb-24"
            >
              <ScoreDisplay 
                score={scoreData.score} 
                breakdown={scoreData.breakdown} 
                tips={scoreData.tips} 
                onReupload={handleReupload}
              />
              <JobMatches jobs={scoreData.jobs} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
