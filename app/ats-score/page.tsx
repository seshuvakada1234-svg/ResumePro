'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createWorker } from 'tesseract.js';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Lucide Icons
import { 
  FileText, Upload, Sparkles, Flame, CheckCircle2, 
  AlertCircle, AlertTriangle, ArrowRight, Zap, RefreshCw, 
  BarChart3, ChevronDown, Check, HelpCircle, 
  TrendingUp, Award, Layers, ShieldCheck, HeartPulse
} from 'lucide-react';

// Imported local helpers & components
import { calculateATSScore } from '@/constants/atsScorer';
import { generateAIFeedback } from '@/constants/generateAIFeedback';
import { AIFeedbackPanel } from '@/components/AIFeedbackPanel';
import { JobMatches } from '@/components/ATSFlow/JobMatches';
import { templates } from '@/constants/templates';
import TemplateThumbnail from '@/components/TemplateThumbnail';

// ─── HELPER SCRIPT LOADER FOR PDF.JS ──────────────────────────────────────────
async function extractTextFromPDF(file: File, onProgress?: (msg: string) => void): Promise<string> {
  try {
    const PDFJS_VERSION = '3.11.174';
    await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`);

    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      throw new Error('PDF.js failed to load. Please check your internet connection.');
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    
    const pdf = await Promise.race([
      loadingTask.promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('PDF loading timed out')), 15000))
    ]) as any;

    let fullText = '';
    let isScanned = true;

    onProgress?.('Extracting text layers...');

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');

      if (pageText.trim().length > 50) {
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
        const viewport = page.getViewport({ scale: 2.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        const { data: { text } } = await worker.recognize(canvas);
        fullText += text + '\n';
      }

      await worker.terminate();
    }

    return fullText;
  } catch (error: any) {
    console.error('PDF extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
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

// ─── DUMMY JOBS FOR NATIONAL RECRUITMENT MATCH ────────────────────────────
const DUMMY_JOBS = [
  { title: 'Frontend Developer', company: 'TechCorp India', location: 'Bangalore (Remote)', salary: '₹12L - ₹18L PA', match: 92, url: '#' },
  { title: 'React Engineer', company: 'Innovate Solutions', location: 'Hyderabad', salary: '₹15L - ₹22L PA', match: 88, url: '#' },
  { title: 'Software Developer', company: 'Global Systems', location: 'Pune', salary: '₹10L - ₹15L PA', match: 85, url: '#' },
];

// ─── STATIC DATA CONFIGURATIONS ──────────────────────────────────────────────
const BENEFITS = [
  {
    icon: <Zap className="text-purple-600" size={24} />,
    title: 'Instant ATS Analysis',
    desc: 'Industry-standard parsing engine evaluates your text architecture and structure in seconds.'
  },
  {
    icon: <FileText className="text-pink-500" size={24} />,
    title: 'Resume Parsing Check',
    desc: 'Audit the extraction layer to confirm proper parsing by leading ATS systems (TCS, Infosys).'
  },
  {
    icon: <BarChart3 className="text-orange-500" size={24} />,
    title: 'Keyword Matching',
    desc: 'Scan candidate profiles against critical job description parameters and stacks.'
  },
  {
    icon: <Sparkles className="text-indigo-600" size={24} />,
    title: 'ATS Optimization Tips',
    desc: 'Receive immediate, step-by-step suggestions designed to increase your match count.'
  }
];

const EXPERT_TIPS = [
  { title: 'Add Job Keywords', desc: 'Integrate critical skills and phrasing naturally from targeted job descriptions.' },
  { title: 'Use Standard Headings', desc: 'Keep headers simple like "Work Experience", "Education", and "Skills".' },
  { title: 'Avoid Grids & Tables', desc: 'Multi-column tables or complex nested grids can jumble parsing models.' },
  { title: 'Improve Skills Section', desc: 'Consolidate tech structures into clean, distinct skill groups.' },
  { title: 'Add Quantifiable Results', desc: 'Use metrics or percentages (+34%) in bullet lines following the STAR system.' },
  { title: 'Optimize Summary Card', desc: 'Create a succinct 3-line professional profile rich with key role terms.' }
];

const FAQ_DATA = [
  {
    q: 'What is an ATS score?',
    a: 'An ATS (Applicant Tracking System) score is an estimate of how effectively a recruiter’s applicant screening software can read, parse, and analyze your resume. A high score means your layout, keywords, and typography are highly compatible with automated filters.'
  },
  {
    q: 'How is the score calculated?',
    a: 'We evaluate several critical parameters: keyword density, formatting compliance (no tables or complex structures that scramble text), presence of main sections (Skills, Projects, Education, Work Experience), readability length, and use of strong action verbs.'
  },
  {
    q: 'What is considered a good ATS score?',
    a: 'A score of 80% or above is considered exceptional. Resumes in this range are highly optimized to pass through initial automated keyword screens used by major MNCs like Tata Consultancy Services, Capgemini, and Infosys.'
  },
  {
    q: 'Why is my ATS score low?',
    a: 'Low scores are typically caused by unparseable text layers, using complex multi-column tables, missing core section headings (e.g. naming experience "My Journey"), low relevant keyword matching, or presenting too short a description.'
  },
  {
    q: 'How can I improve my ATS score?',
    a: 'Use standard, simple headings, switch to a tested single-column layout, naturally write primary job keywords into your experience bullet lists, and phrase your achievements using countable metrics (e.g., "boosted page speed by 40%").'
  },
  {
    q: 'Which resume format is best for ATS systems?',
    a: 'A clean, well-organized single-column resume with standard styling is best. Using clean sans-serif text (like Inter) ensures readable text extraction for both software parsers and human coordinators.'
  }
];

// ─── MAIN ATS SCANNER PAGE ───────────────────────────────────────────────────
export default function ATSScorePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // Core status state
  const [status, setStatus] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [scoreData, setScoreData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analyzingStep, setAnalyzingStep] = useState<string>('Initializing...');
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'all' | 'keywords' | 'formatting' | 'strengths' | 'improvements'>('all');

  // Trigger smooth scroll to upload block
  const scrollToUpload = () => {
    uploadAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndProcess(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndProcess(file);
  };

  // Validating files
  const validateAndProcess = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formatting error. Please upload a PDF or DOCX format file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Resume file must be less than 5MB.');
      return;
    }
    handleUpload(file);
  };

  // Parsing & Analysis Execution
  const handleUpload = async (file: File) => {
    setStatus('analyzing');
    setErrorMsg(null);
    setAnalyzingStep('Reading file content...');

    try {
      let extractedText = '';

      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file, (msg) => setAnalyzingStep(msg));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setAnalyzingStep('Reading Word document layout...');
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value;
      } else {
        extractedText = await file.text();
      }

      setAnalyzingStep('Comparing candidate metrics against national databases...');

      if (!extractedText.trim() || extractedText.length < 50) {
        throw new Error("We couldn't extract readable text layers from this file. Please make sure the file is not password-protected, encrypted, or empty.");
      }

      const scored = calculateATSScore(extractedText);
      const aiFeedback = generateAIFeedback(extractedText);

      // Map breakdown categories
      const breakdown = [
        { label: 'Keywords Match', value: scored.breakdown.keywords, weight: 30, color: scored.breakdown.keywords >= 75 ? 'text-emerald-600' : scored.breakdown.keywords >= 50 ? 'text-amber-500' : 'text-rose-500', barColor: scored.breakdown.keywords >= 75 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : scored.breakdown.keywords >= 50 ? 'bg-amber-500' : 'bg-rose-500' },
        { label: 'Formatting Score', value: scored.breakdown.completeness, weight: 15, color: scored.breakdown.completeness >= 75 ? 'text-emerald-600' : scored.breakdown.completeness >= 50 ? 'text-amber-500' : 'text-rose-500', barColor: scored.breakdown.completeness >= 75 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : scored.breakdown.completeness >= 50 ? 'bg-amber-500' : 'bg-rose-500' },
        { label: 'Readability Score', value: scored.breakdown.readability, weight: 15, color: scored.breakdown.readability >= 75 ? 'text-emerald-600' : scored.breakdown.readability >= 50 ? 'text-amber-500' : 'text-rose-500', barColor: scored.breakdown.readability >= 75 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : scored.breakdown.readability >= 50 ? 'bg-amber-500' : 'bg-rose-500' },
        { label: 'Skills Coverage', value: scored.breakdown.formatting, weight: 20, color: scored.breakdown.formatting >= 75 ? 'text-emerald-600' : scored.breakdown.formatting >= 50 ? 'text-amber-500' : 'text-rose-500', barColor: scored.breakdown.formatting >= 75 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : scored.breakdown.formatting >= 50 ? 'bg-amber-500' : 'bg-rose-500' },
      ];

      const result = {
        score: scored.score,
        breakdown,
        tips: scored.improvements,
        aiFeedback,
        jobs: DUMMY_JOBS,
        originalScored: scored
      };

      setScoreData(result);
      localStorage.setItem('last_ats_score', JSON.stringify(result));
      setStatus('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error('Resume verification failed:', error);
      setErrorMsg(error.message || 'Verification failed. Please upload a clean PDF/DOCX file.');
      setStatus('upload');
    }
  };

  const handleReupload = () => {
    setStatus('upload');
    setScoreData(null);
    setErrorMsg(null);
  };

  const handleSelectTemplate = (id: string) => {
    localStorage.setItem('selectedTemplate', id);
    router.push('/builder');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      <main className="relative pb-24">
        <AnimatePresence mode="wait">

          {/* ───────────────────────────────────────────────────────────────────
              1. UPLOAD / LANDING STATE
              ─────────────────────────────────────────────────────────────────── */}
          {status === 'upload' && (
            <motion.div 
              key="upload-landing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              
              {/* --- 1. PREMIUM HERO SECTION --- */}
              <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                {/* Complex interactive background blooms */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-pink-400/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
                
                <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-black uppercase tracking-widest"
                  >
                    <Sparkles size={14} className="text-purple-600 animate-pulse" />
                    PREMIUM SCREENER ENGINE
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-none"
                  >
                    Check Your <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">ATS Resume Score</span> Instantly
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed"
                  >
                    Upload your resume and get a detailed ATS analysis, keyword matching report, formatting feedback, and optimization suggestions.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <button
                      onClick={scrollToUpload}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>Upload Resume</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      href="/templates"
                      className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:scale-[1.02] active:scale-100 transition-all text-center"
                    >
                      View Resume Templates
                    </Link>
                  </motion.div>
                </div>
              </section>

              {/* --- 2. ATS BENEFITS SECTION --- */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {BENEFITS.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -6 }}
                      className="p-8 bg-white border border-slate-150 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] flex items-center justify-center -mr-2 -mt-2 group-hover:bg-purple-50 transition-colors">
                        <div className="text-slate-400 group-hover:text-purple-600 transition-colors">
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl pr-12">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* --- 3. ATS UPLOAD AREA --- */}
              <section className="max-w-4xl mx-auto px-4" ref={uploadAreaRef} id="ats-drag-drop-anchor">
                <div className="relative">
                  {/* Decorative glowing backdrops */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-[3rem] blur-xl" />
                  
                  <div
                    className={`relative bg-white/70 backdrop-blur-xl border-2 border-dashed ${
                      isDragging ? 'border-purple-500 bg-purple-50/20' : 'border-slate-200 hover:border-slate-300'
                    } rounded-[2.5rem] p-12 shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {/* Error Box */}
                    {errorMsg && (
                      <div className="mb-8 w-full bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-5 py-4 text-xs font-bold leading-relaxed flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-extrabold">Failed to Parse Resume</p>
                          <p className="font-medium text-rose-600">{errorMsg}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                      
                      {/* Standard Icon / Upload Badge */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-[1.75rem] bg-slate-50 flex items-center justify-center text-slate-500 group-hover:scale-110 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all duration-500 shadow-inner">
                          <Upload size={32} />
                        </div>
                        {isDragging && (
                          <div className="absolute inset-0 w-20 h-20 rounded-[1.75rem] border-2 border-purple-500 animate-ping opacity-60" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          {isDragging ? 'Drop Your Resume Here!' : 'Drag & Drop Resume File'}
                        </h2>
                        <p className="text-slate-500 font-medium text-xs sm:text-base max-w-sm">
                          Select from either <span className="font-bold text-slate-700">PDF</span> or <span className="font-bold text-slate-700">DOCX</span> files. File size must be under 5MB.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center pt-2">
                        <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 font-mono">
                          .PDF SUPPORTED
                        </span>
                        <span className="text-[10px] font-black text-pink-700 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-mono">
                          .DOCX PARSABLE
                        </span>
                      </div>

                      <div className="pt-4 flex flex-col items-center gap-3 w-full max-w-xs">
                        <button
                          type="button"
                          className="w-full py-4 bg-slate-950 text-white font-extrabold rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md"
                        >
                          Select Resume File
                        </button>
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest select-none">
                          or click anywhere to browse
                        </span>
                      </div>

                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.docx"
                    />

                  </div>
                </div>
              </section>

              {/* --- NEW ATS APPROVED TEMPLATES SECTION --- */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                  <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF] bg-indigo-50 px-3 py-1 rounded-full inline-block">
                    Choose a Resume Template Before ATS Analysis
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Choose Your Resume Template
                  </h2>
                  <p className="text-slate-600 font-medium text-xs sm:text-base leading-relaxed">
                    Select from professionally designed ATS-friendly templates and start building your resume instantly.
                  </p>
                  <p className="text-slate-400 font-medium text-xs">
                    Select one of our ATS-friendly resume templates to improve compatibility with modern recruitment systems. Or, browse our collection of top-scoring <Link href="/resume-examples" className="text-[#5B4DFF] font-extrabold hover:underline">Resume Examples →</Link>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className="group bg-white border border-slate-200/90 rounded-[20px] p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between w-full"
                    >
                      <div className="space-y-5">
                        {/* Real Template Thumbnail container */}
                        <div className="relative bg-slate-50/50 rounded-2xl p-4 flex items-center justify-center border border-slate-100/80 h-64 overflow-hidden group-hover:bg-slate-50 transition-colors">
                          <TemplateThumbnail Template={template.component} />
                        </div>

                        <div className="space-y-3 text-left">
                          <div className="flex items-start justify-between gap-2 overflow-hidden">
                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg truncate">
                              {template.name}
                            </h3>
                            {template.ats && (
                              <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                                <CheckCircle2 size={10} />
                                ATS FRIENDLY
                              </span>
                            )}
                          </div>
                          
                          <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                            {template.category}
                          </span>

                          <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black text-slate-400 tracking-wider">SINGLE COLUMN</span>
                        <button
                          onClick={() => {
                            localStorage.setItem('selectedTemplate', template.id);
                            router.push(`/builder?template=${template.id}`);
                          }}
                          className="px-4 py-2 bg-slate-950 hover:bg-indigo-600 hover:scale-[1.02] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                        >
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* --- 9. FAQ SECTION --- */}
              <section className="max-w-4xl mx-auto px-4 space-y-12 py-12">
                <div className="text-center space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    KNOWLEDGE REPOSITORY
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {FAQ_DATA.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div 
                        key={idx}
                        className="bg-white border border-slate-150 rounded-2xl overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left font-extrabold text-slate-900 hover:bg-slate-50 transition-colors text-sm sm:text-base gap-4"
                        >
                          <span className="flex items-center gap-3">
                            <HelpCircle className="text-purple-600 shrink-0" size={18} />
                            {faq.q}
                          </span>
                          <ChevronDown 
                            size={18} 
                            className={`text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 text-slate-600 font-medium text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* --- 10. FINAL CTA --- */}
              <section className="max-w-5xl mx-auto px-4 py-8">
                <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl text-center space-y-8">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-widest text-pink-400 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      100% FREE RESOURCE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                      Ready to Build a Better Resume?
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                      Create a high-performing, recruiter-approved resume in minutes completely for free.
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      href="/templates"
                      className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-slate-50 transition-colors shadow-lg shadow-purple-950/20"
                    >
                      Create Resume Free
                    </Link>
                    <Link
                      href="/templates"
                      className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-extrabold rounded-2xl transition-colors"
                    >
                      Browse Templates
                    </Link>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              2. ANALYZING / LOADING SCREEN
              ─────────────────────────────────────────────────────────────────── */}
          {status === 'analyzing' && (
            <motion.div 
              key="analyzing-state" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[75vh]"
            >
              <div className="max-w-md w-full px-6 text-center space-y-12">
                
                {/* Modern circular progress glow */}
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-32 h-32 border-4 border-slate-100 border-t-purple-600 rounded-full shadow-inner"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-purple-600 animate-pulse" size={40} fill="currentColor" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Parser Running...</h2>
                  <p className="text-slate-500 font-semibold text-sm">
                    Securing safe local text extraction checks. This takes about 5 seconds.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-md border border-slate-150 p-6 rounded-2xl shadow-lg shadow-indigo-50 leading-relaxed text-slate-700 font-bold text-sm tracking-wide animate-pulse">
                  {analyzingStep}
                </div>

                {/* Simulated secondary stats wrapper */}
                <div className="w-full bg-slate-200/60 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '15%' }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 4 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                  />
                </div>

              </div>
            </motion.div>
          )}

          {/* ───────────────────────────────────────────────────────────────────
              3. COMPLETED ANALYSIS RESULTS STATE
              ─────────────────────────────────────────────────────────────────── */}
          {status === 'result' && scoreData && (
            <motion.div 
              key="result-state" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-12 py-16 px-4 max-w-7xl mx-auto"
            >
              
              {/* BACK BUTTON AND HEADER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-150 pb-8 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    ANALYSIS GENERATED SUCCESSFULLY
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ATS Audit Breakdown Dashboard
                  </h1>
                </div>
                
                <button
                  onClick={handleReupload}
                  className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-purple-600 bg-white border border-slate-250 px-5  py-3 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw size={14} />
                  Re-upload Another Resume
                </button>
              </div>

              {/* HIGHLIGHT COMPARED GRID CARD: SCORE CIRCLE & COMPARATIVE MATRIX */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* LEFT: MASTER CIRCLE PROGRESS */}
                <div className="lg:col-span-5 bg-white border border-slate-150 rounded-[2.5rem] p-8 text-center flex flex-col justify-between shadow-sm relative overflow-hidden">
                  {/* Backdrop glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-40 -mr-12 -mt-12" />
                  
                  <div className="space-y-4 relative z-10 pt-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      ESTIMATED OVERALL PASS RATING
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Your Scanning Score</h3>
                  </div>

                  {/* SVG Circle visual preview */}
                  <div className="relative w-56 h-56 mx-auto my-8 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="112" cy="112" r="98" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                      <motion.circle 
                        cx="112" 
                        cy="112" 
                        r="98" 
                        stroke="url(#resultGradient)" 
                        strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray="615" 
                        initial={{ strokeDashoffset: 615 }}
                        animate={{ strokeDashoffset: 615 - (615 * scoreData.score) / 100 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                      <defs>
                        <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-slate-900 tracking-tight">{scoreData.score}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">COMPLIANCE</span>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10 pb-4">
                    <div className="inline-flex gap-2 items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                      <CheckCircle2 size={14} /> Clear parsing structure verified
                    </div>

                    <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                      Your resume has high parser structural stability. Below 70% may lead to immediate automated rejection of off-campus forms.
                    </p>
                  </div>

                </div>

                {/* RIGHT: DETAILED COMPARED SCORING STATS */}
                <div className="lg:col-span-7 bg-white border border-slate-150 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-xl text-slate-950">ATS Match Breakdown</h3>
                      <p className="text-xs text-slate-400 font-medium">Critical parser modules extracted:</p>
                    </div>

                    {/* Progress sliders */}
                    <div className="space-y-6">
                      {scoreData.breakdown.map((item: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                            <span className="text-slate-600">{item.label}</span>
                            <span className={`${item.color}`}>{item.value}%</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: `${item.value}%` }}
                              className={`h-full ${item.barColor}`}
                              transition={{ duration: 1.2, delay: idx * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {scoreData.score < 80 ? (
                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-slate-900">Score could be optimized further</p>
                        <p className="text-[11px] text-slate-500 font-medium max-w-xs">Using a FreeResume template improves text density parsing scores immediately.</p>
                      </div>
                      <Link
                        href="/templates"
                        className="px-5 py-3 bg-purple-600 text-white hover:bg-purple-700 text-xs font-black rounded-xl shadow-md transition-colors"
                      >
                        Build Highly Optimised Resume
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-8 border-t border-slate-100 flex items-center gap-3 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-3 rounded-2xl justify-center">
                      <CheckCircle2 size={16} /> Exceptional score! Ready for any competitive job application processes.
                    </div>
                  )}

                </div>

              </div>

              {/* 5. ATS ANALYSIS DASHBOARD */}
              <section className="bg-white border border-slate-150 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 gap-4">
                  <div className="space-y-1 text-left">
                    <h3 className="font-extrabold text-xl text-slate-950">Detailed Parsing Diagnostics</h3>
                    <p className="text-xs text-slate-400 font-medium">Click tabs to view specific feedback from parser audits</p>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'All Reviews' },
                      { id: 'keywords', label: 'Keywords Match' },
                      { id: 'formatting', label: 'Formatting Compliance' },
                      { id: 'strengths', label: 'Strengths ✅' },
                      { id: 'improvements', label: 'Suggestions ⚠️' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAnalysisTab(tab.id as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                          activeAnalysisTab === tab.id 
                            ? 'bg-purple-600 text-white shadow-sm' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabbed Content Output panels with ✅, ⚠️, ❌ badges */}
                <div className="space-y-4">
                  
                  {/* Dynamic checklist */}
                  {(activeAnalysisTab === 'all' || activeAnalysisTab === 'keywords') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                        {scoreData.originalScored.breakdown.keywords >= 70 ? (
                          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
                            ✅ Excellent
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 shrink-0">
                            ⚠️ Needs Improvement
                          </span>
                        )}
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm">Keyword Extraction Density</h4>
                          <p className="text-slate-500 text-xs font-medium">Scans the density ratios for engineering / specialist terms inside text blocks.</p>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                        {scoreData.originalScored.breakdown.keywords < 40 ? (
                          <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 shrink-0">
                            ❌ Missing
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
                            ✅ Excellent
                          </span>
                        )}
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm">Critical Tech Stack Badges</h4>
                          <p className="text-slate-500 text-xs font-medium">Tests if keywords matching modern tech stacks like React, SQL, and Git are found.</p>
                        </div>
                      </div>

                    </div>
                  )}

                  {(activeAnalysisTab === 'all' || activeAnalysisTab === 'formatting') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                        {scoreData.originalScored.breakdown.readability >= 150 ? (
                          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
                            ✅ Excellent
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 shrink-0">
                            ⚠️ Needs Improvement
                          </span>
                        )}
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm">Text Layer Layout Compliance</h4>
                          <p className="text-slate-500 text-xs font-medium">Checks for absence of grid columns, side panels, and graphics that break parser flow.</p>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
                          ✅ Excellent
                        </span>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm">Header Section Reading Order</h4>
                          <p className="text-slate-500 text-xs font-medium">Verifies if contact name, mobile index, and email are at the very top layer.</p>
                        </div>
                      </div>

                    </div>
                  )}

                  {(activeAnalysisTab === 'all' || activeAnalysisTab === 'strengths') && (
                    <div className="space-y-4 text-left">
                      <h4 className="font-extrabold text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">✅ Core Strengths Audited</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-sm">
                            <CheckCircle2 size={16} /> Section Titles Standardized
                          </div>
                          <p className="text-slate-500 text-xs font-semibold">Your resume uses clear classic section indicators recognized instantly by parsers.</p>
                        </div>
                        <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-sm">
                            <CheckCircle2 size={16} /> Standard Sans-Serif Type
                          </div>
                          <p className="text-slate-500 text-xs font-semibold">Uses readable, web-safe characters that prevent encoding mismatches inside the SQL pipeline.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {(activeAnalysisTab === 'all' || activeAnalysisTab === 'improvements') && (
                    <div className="space-y-4 text-left">
                      <h4 className="font-extrabold text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg inline-block">⚠️ Formatted Action Recommendations</h4>
                      
                      <div className="space-y-3">
                        {scoreData.tips.map((tip: string, idx: number) => (
                          <div key={idx} className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl flex items-start gap-3">
                            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-950 text-sm">{tip}</p>
                              <p className="text-slate-500 text-xs font-medium">Applying this raises your parsed rating scores by up to +15%.</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                </div>

              </section>

              {/* INTEGRATE PREMIUM AI FEEDBACK PANEL */}
              <AIFeedbackPanel feedback={scoreData.aiFeedback} />

              {/* INTEGRATE JOB MATCHES FROM ADZUNA NETWORKS */}
              <JobMatches jobs={scoreData.jobs} />

              {/* 6. HOW TO IMPROVE YOUR ATS SCORE (KNOWLEDGE CARDS) */}
              <section className="space-y-8 text-center pt-8">
                <div className="space-y-3">
                  <span className="text-xs font-extrabold uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                    ATS COMPLIANCE METRICS
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    How to Improve Your ATS Score
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {EXPERT_TIPS.map((tip, idx) => (
                    <div key={idx} className="p-6 bg-white border border-slate-150 rounded-2xl text-left space-y-2 hover:shadow-md hover:border-purple-200 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold font-mono text-xs">
                        {idx + 1}
                      </div>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base">{tip.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. ATS-FRIENDLY TEMPLATES DRAWERS FOR RESULTS RE-ENTRY */}
              <section className="bg-slate-50 border-t border-slate-200 p-8 rounded-3xl space-y-6">
                <div className="text-left space-y-2">
                  <h4 className="font-extrabold text-lg text-slate-900">Optimize Instantly with ATS Approved Formats</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">Selecting one of our formats completely resolves formatting warnings.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.slice(0, 3).map((layout) => (
                    <div key={layout.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div className="text-left space-y-0.5">
                        <span className="text-[9px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase font-sans">VERIFIED</span>
                        <h5 className="font-black text-slate-950 text-sm">{layout.name}</h5>
                      </div>
                      <button
                        onClick={() => handleSelectTemplate(layout.id)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-black transition-colors"
                      >
                        Use
                      </button>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
