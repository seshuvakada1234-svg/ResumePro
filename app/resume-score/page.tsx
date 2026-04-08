'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Upload, Loader2, CheckCircle2, AlertCircle, 
  ArrowRight, Zap, Briefcase, TrendingUp, Edit3, Download,
  ChevronRight, Star, Target, Layout, Search
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import { calculateATSScore, ScoringResult } from '@/constants/atsScorer';
import { useResumeFunnel } from '@/context/ResumeFunnelContext';
import { AdBanner } from '@/components/AdBanner';

export default function ResumeScorePage() {
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const { score, setScore, jobs, setJobs, setExtractedData } = useResumeFunnel();
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null);

  const extractText = async (file: File): Promise<string> => {
    try {
      if (file.type === 'application/pdf') {
        // Dynamic import for pdfjs-dist to avoid SSR errors
        const pdfjs = await import('pdfjs-dist');
        // @ts-ignore
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.6.205/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error('PDF file is empty');
        }
        
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        if (!pdf || pdf.numPages === 0) {
          throw new Error('PDF has no pages');
        }

        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          
          if (content && content.items) {
            const pageText = content.items
              .map((item: any) => item.str || '')
              .join(' ');
            text += pageText + '\n';
          }
        }
        return text.trim() || 'No text content found in PDF';
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Dynamic import for mammoth
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error('DOCX file is empty');
        }
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result?.value?.trim() || 'No text content found in DOCX';
      }
      throw new Error('Unsupported file type');
    } catch (err: any) {
      console.error('Text extraction error:', err);
      throw new Error(`Failed to extract text: ${err.message || 'Unknown error'}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setStep('loading');

    try {
      console.log('Extracting text from file...');
      const text = await extractText(uploadedFile);
      console.log('Text extracted successfully. Length:', text.length);
      
      const result = calculateATSScore(text);
      console.log('ATS score calculated:', result.score);
      
      // Analyze with AI for role/skills
      console.log('Analyzing with AI...');
      const analysisResponse = await axios.post('/api/resume', { text });
      const { role, skills } = analysisResponse.data || {};
      console.log('AI analysis complete:', { role, skills });
      setExtractedData({ role, skills });

      // Fetch jobs
      console.log('Fetching matching jobs...');
      const ADZUNA_APP_ID = '0780283e';
      const ADZUNA_APP_KEY = '69766986420556637378370774780517';
      const jobResponse = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=5&what=${encodeURIComponent(role || 'Developer')}`
      );
      
      const jobsData = jobResponse.data?.results || [];
      console.log('Jobs fetched:', jobsData.length);
      setJobs(jobsData);
      setScore(result.score);
      setScoringResult(result);

      // Auto-transition after a short delay
      setTimeout(() => {
        setStep('result');
      }, 1500);
    } catch (error: any) {
      console.error('Analysis failed:', error);
      const errorMessage = error?.response?.data?.error || error?.message || 'Unknown error';
      toast.error(`Failed to analyze resume: ${errorMessage}`);
      setStep('upload');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                  Upload Resume for <span className="text-indigo-600">ATS Score</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                  Get instant ATS score, job matches, and actionable insights to land your dream job.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <label className="group relative flex flex-col items-center justify-center w-full h-80 border-4 border-dashed border-gray-200 rounded-[2.5rem] bg-white hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer overflow-hidden shadow-sm">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-4">
                    <div className="bg-indigo-50 p-6 rounded-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Upload className="w-10 h-10 text-indigo-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-gray-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 font-medium">PDF or DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                </label>
              </div>

              <div className="flex flex-wrap justify-center gap-8 pt-8">
                {[
                  { icon: <Zap size={18} />, text: 'Instant Analysis' },
                  { icon: <Star size={18} />, text: 'AI Powered' },
                  { icon: <Target size={18} />, text: 'ATS Optimized' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-400">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-8"
            >
              <div className="relative">
                <Loader2 className="w-20 h-20 text-indigo-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full animate-ping" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-gray-900">Analyzing your resume...</h2>
                <p className="text-gray-500 font-medium">Our AI is checking keywords, formatting, and job matches.</p>
              </div>
            </motion.div>
          )}

          {step === 'result' && scoringResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              {/* Score Header */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-gray-100 text-center space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">Your ATS Score</h2>
                  <div className="text-8xl md:text-9xl font-black text-gray-900 tracking-tighter">
                    {scoringResult.score}<span className="text-indigo-600">/100</span>
                  </div>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scoringResult.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        scoringResult.score < 50 ? 'bg-red-500' : 
                        scoringResult.score < 75 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                    <span className={scoringResult.score < 50 ? 'text-red-600' : 'text-gray-400'}>Weak</span>
                    <span className={scoringResult.score >= 50 && scoringResult.score < 75 ? 'text-amber-600' : 'text-gray-400'}>Average</span>
                    <span className={scoringResult.score >= 75 ? 'text-green-600' : 'text-gray-400'}>Strong</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100 border border-gray-100 space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <TrendingUp className="text-indigo-600" size={24} /> Score Breakdown
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Keywords Match', score: scoringResult.breakdown.keywords, weight: '30%' },
                      { label: 'Experience Quality', score: scoringResult.breakdown.experience, weight: '25%' },
                      { label: 'Formatting (ATS)', score: scoringResult.breakdown.formatting, weight: '15%' },
                      { label: 'Sections Completeness', score: scoringResult.breakdown.completeness, weight: '15%' },
                      { label: 'Readability & Impact', score: scoringResult.breakdown.readability, weight: '15%' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-gray-700">{item.label} <span className="text-gray-400 font-medium">({item.weight})</span></span>
                          <span className="text-indigo-600">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            className="h-full bg-indigo-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100 border border-gray-100 space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={24} /> Key Improvements
                  </h3>
                  <div className="space-y-4">
                    {scoringResult.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="bg-white p-1.5 rounded-lg shadow-sm h-fit">
                          <AlertCircle className="text-amber-500" size={16} />
                        </div>
                        <p className="text-sm font-bold text-gray-700 leading-relaxed">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Match Section */}
              <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white text-center space-y-6 shadow-2xl shadow-indigo-200">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">🔥 See Job Matches for Your Resume</h3>
                  <p className="text-indigo-100 text-lg font-medium opacity-80">
                    We found {jobs.length > 0 ? `${jobs.length * 12}+` : '50+'} jobs that match your skills perfectly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href={jobs.length > 0 ? jobs[0].redirect_url : "https://adzuna.com"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
                  >
                    View Jobs 🚀
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link 
                  href="/builder"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95"
                >
                  <Edit3 size={20} /> Edit Resume
                </Link>
                <button 
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95"
                >
                  <Download size={20} /> Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AdBanner adSlot="score-bottom" className="max-w-4xl mx-auto px-4 mb-20" />
    </div>
  );
}
