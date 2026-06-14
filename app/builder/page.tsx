'use client';

import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { PreviewFeatures } from '@/components/PreviewFeatures';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { Toaster, toast } from 'sonner';
import { Sparkles, Plus, Share2, Award, Zap, FileText } from 'lucide-react';
import { AdBanner } from '@/components/AdBanner';
import { dummyResumeData } from '@/constants/dummyData';
import { motion } from 'motion/react';

function BuilderContent() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // 1. Check search params (legacy/direct link)
    const templateId = searchParams.get('template') as ResumeTemplate | null;
    
    // 2. Check localStorage (from /templates page)
    const storedTemplate = localStorage.getItem('selectedTemplate') as ResumeTemplate | null;

    if (storedTemplate) {
      console.log('Template loaded from localStorage:', storedTemplate);
      setResumeData((prev) => ({ ...prev, template: storedTemplate }));
      toast.success(`Template applied: ${storedTemplate}`);
      localStorage.removeItem('selectedTemplate'); // Clear after applying
    } else if (templateId) {
      console.log('Template loaded from URL:', templateId);
      setResumeData((prev) => ({ ...prev, template: templateId }));
      toast.success(`Template applied: ${templateId}`);
      router.replace('/builder', { scroll: false });
    }
  }, [searchParams, router]);

  const handleResumeChange = useCallback((data: ResumeData) => {
    setResumeData(data);
  }, []);

  const loadDummyData = () => {
    setResumeData(dummyResumeData);
    setActiveResumeId(null);
    toast.info('Loaded professional sample data!');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume - CV Builder',
        text: 'Build your professional, ATS-friendly resume for free!',
        url: window.location.origin + '/builder',
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/builder');
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = async (data: ResumeData) => {
    setIsSaving(true);
    // Simulate persistent save
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Resume saved successfully! Sign in to sink your files across devices.');
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0F172A] font-sans pb-16">
      
      {/* Premium ambient backdrop glow effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[3%] w-[35rem] h-[35rem] rounded-full bg-[#5B4DFF]/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[25%] right-[2%] w-[40rem] h-[40rem] rounded-full bg-[#A855F7]/5 blur-[130px] mix-blend-multiply" />
        <div className="absolute bottom-[15%] left-[10%] w-[38rem] h-[38rem] rounded-full bg-[#FF5EA8]/5 blur-[110px] mix-blend-multiply" />
      </div>

      <Toaster position="top-center" richColors />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Professional Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#ECECF5]/80 pb-8 mb-10">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-extrabold text-white bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                <Zap size={10} /> Premium Engine
              </span>
              <span className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Version 3.5
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              Premium Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8]">Builder</span>
            </h1>
            <p className="text-sm text-[#64748B] font-medium">
              Create your ATS-friendly resume in minutes.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
            <button
              onClick={loadDummyData}
              className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#5B4DFF] to-[#A855F7] hover:shadow-lg hover:shadow-[#5B4DFF]/20 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Sparkles size={14} />
              Load Premium Sample
            </button>

            <button
              onClick={() => {
                setResumeData(defaultResumeData);
                toast.success('Cleared current workspace labels');
              }}
              className="px-5 py-3 text-xs font-bold text-[#0F172A] border border-[#ECECF5] bg-white hover:bg-[#F8FAFC] rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Plus size={14} />
              Start Fresh
            </button>

            <button
              onClick={handleShare}
              className="p-3 text-[#64748B] border border-[#ECECF5] bg-white hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-2xl transition-all flex items-center justify-center cursor-pointer w-full sm:w-auto text-xs font-semibold gap-2"
              title="Share Builder Link"
            >
              <Share2 size={16} />
              <span className="sm:hidden font-bold">Share Workspace</span>
            </button>
          </div>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 40% (Form Steps) */}
          <div className="lg:col-span-5 space-y-6">
            <ResumeForm
              initialData={resumeData}
              onChange={handleResumeChange}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </div>

          {/* RIGHT COLUMN: 60% (Sticky Live Resume Canvas Workspace) */}
          <div id="live-preview-section" className="lg:col-span-7 lg:sticky lg:top-8 self-start space-y-6 scroll-mt-24">
            <ResumePreview data={resumeData} />
            <PreviewFeatures />
          </div>

        </div>

      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-[#64748B] font-semibold text-sm">Initializing Creator Workspace...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
