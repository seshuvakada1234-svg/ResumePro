'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { UploadZone } from '@/components/ATSFlow/UploadZone';
import { LoadingScreen } from '@/components/ATSFlow/LoadingScreen';
import { ScoreDisplay } from '@/components/ATSFlow/ScoreDisplay';
import { JobMatches } from '@/components/ATSFlow/JobMatches';
import { AIFeedbackPanel } from '@/components/AIFeedbackPanel';
import { calculateATSScore } from '@/constants/atsScorer';
import { generateAIFeedback } from '@/constants/generateAIFeedback';
import { motion, AnimatePresence } from 'motion/react';
import { createWorker } from 'tesseract.js';

async function extractTextFromPDF(file: File, onProgress?: (msg: string) => void): Promise<string> {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');

  const pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  let isScanned = true;

  onProgress?.('Extracting text layers...');

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');

    if (pageText.trim().length > 20) {
      isScanned = false;
    }

    fullText += pageText + '\n';
  }

  if (isScanned || fullText.trim().length < 100) {
    onProgress?.('⚡ Scanned resume detected — running OCR...');

    fullText = '';
    const worker = await createWorker('eng');

    for (let i = 1; i <= pdf.numPages; i++) {
      onProgress?.(`OCR: Processing page ${i} of ${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context!, viewport }).promise;

      const { data: { text } } = await worker.recognize(canvas);
      fullText += text + '\n';
    }

    await worker.terminate();
  }

  return fullText;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

const DUMMY_JOBS = [
  { title: 'Frontend Developer', company: 'TechCorp India', location: 'Bangalore (Remote)', salary: '₹12L - ₹18L PA', match: 92, url: 'https://adzuna.com' },
  { title: 'React Engineer', company: 'Innovate Solutions', location: 'Hyderabad', salary: '₹15L - ₹22L PA', match: 88, url: 'https://adzuna.com' },
  { title: 'Software Developer', company: 'Global Systems', location: 'Pune', salary: '₹10L - ₹15L PA', match: 85, url: 'https://adzuna.com' },
];

export default function ATSScorePage() {
  const [status, setStatus] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [scoreData, setScoreData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analyzingStep, setAnalyzingStep] = useState<string>('Initializing...');

  const handleUpload = async (file: File) => {
    setStatus('analyzing');
    setErrorMsg(null);
    setAnalyzingStep('Reading file...');

    try {
      let extractedText = '';

      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file, (msg) => setAnalyzingStep(msg));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setAnalyzingStep('Reading Word document...');
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      } else {
        extractedText = await file.text();
      }

      setAnalyzingStep('Analyzing content...');

      if (!extractedText.trim() || extractedText.length < 100) {
        throw new Error("We couldn't read your resume clearly. Please upload a better file.");
      }

      const scored = calculateATSScore(extractedText);
      const aiFeedback = generateAIFeedback(extractedText);

      const breakdown = [
        { label: 'Keywords Match', value: scored.breakdown.keywords, weight: 30, color: scored.breakdown.keywords >= 70 ? 'bg-green-500' : 'bg-amber-500' },
        { label: 'Experience Quality', value: scored.breakdown.experience, weight: 25, color: scored.breakdown.experience >= 70 ? 'bg-green-500' : 'bg-amber-500' },
        { label: 'Skills Relevance', value: scored.breakdown.formatting, weight: 20, color: scored.breakdown.formatting >= 70 ? 'bg-green-500' : 'bg-amber-500' },
        { label: 'Formatting', value: scored.breakdown.completeness, weight: 15, color: scored.breakdown.completeness >= 70 ? 'bg-green-500' : 'bg-amber-500' },
        { label: 'Education Fit', value: scored.breakdown.readability, weight: 10, color: scored.breakdown.readability >= 70 ? 'bg-green-500' : 'bg-amber-500' },
      ];

      const result = {
        score: scored.score,
        breakdown,
        tips: scored.improvements,
        aiFeedback,
        jobs: DUMMY_JOBS,
      };

      setScoreData(result);
      localStorage.setItem('last_ats_score', JSON.stringify(result));
      setStatus('result');

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error('Resume analysis failed:', error);
      setErrorMsg(error.message || 'Failed to read your resume.');
      setStatus('upload');
    }
  };

  const handleReupload = () => {
    setStatus('upload');
    setScoreData(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">

          {status === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 text-center">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                  Get Your <span className="text-indigo-600">ATS Score</span> ⚡
                </h1>

                {errorMsg && (
                  <div className="mt-6 max-w-xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm font-medium">
                    ⚠️ {errorMsg}
                  </div>
                )}
              </div>

              <UploadZone onUpload={handleUpload} isAnalyzing={false} />
            </motion.div>
          )}

          {status === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <LoadingScreen />
                <p className="mt-8 text-indigo-600 font-bold text-lg animate-pulse">
                  {analyzingStep}
                </p>
              </div>
            </motion.div>
          )}

          {status === 'result' && scoreData && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16 pb-24">

              <ScoreDisplay score={scoreData.score} breakdown={scoreData.breakdown} tips={scoreData.tips} onReupload={handleReupload} />

              <AIFeedbackPanel feedback={scoreData.aiFeedback} />

              <JobMatches jobs={scoreData.jobs} />

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}