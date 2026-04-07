'use client';

import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { Toaster, toast } from 'sonner';
import { Sparkles, Plus, Share2 } from 'lucide-react';
import { AdBanner } from '@/components/AdBanner';
import { dummyResumeData } from '@/constants/dummyData';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

function BuilderContent() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const templateId = searchParams.get('template') as ResumeTemplate | null;
    if (templateId) {
      setResumeData((prev) => ({ ...prev, template: templateId }));
      toast.success(`Template applied: ${templateId}`);
      // Remove the ?template= param from the URL without a page reload
      router.replace('/builder', { scroll: false });
    }
  }, [searchParams, router]);

  const handleResumeChange = useCallback((data: ResumeData) => {
    setResumeData(data);
  }, []);

  const loadDummyData = () => {
    setResumeData(dummyResumeData);
    setActiveResumeId(null);
    toast.info('Loaded sample data for testing');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume',
        text: 'Build your professional ATS resume for free!',
        url: window.location.origin + '/builder',
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/builder');
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = async (_data: ResumeData) => {
    toast.info('Sign in to save your resume to the cloud');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 xl:grid-cols-13 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6 order-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Builder</h2>
              <div className="flex items-center gap-3">
                {activeResumeId && (
                  <button
                    onClick={() => {
                      setResumeData(defaultResumeData);
                      setActiveResumeId(null);
                    }}
                    className="text-xs font-bold text-gray-600 hover:text-indigo-600 flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg transition-colors"
                  >
                    <Plus size={14} /> New
                  </button>
                )}
                <button
                  onClick={loadDummyData}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-3 py-1.5 bg-indigo-50 rounded-lg transition-colors"
                >
                  <Sparkles size={14} /> Load Sample
                </button>
              </div>
            </div>

            <ResumeForm initialData={resumeData} onChange={handleResumeChange} onSave={handleSave} isSaving={false} />
            <div className="hidden lg:block">
              <AdBanner adSlot="sidebar-bottom" className="mt-8" />
            </div>
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6 order-2">
            <div className="relative z-20 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between py-4">
                <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
                <button
                  onClick={handleShare}
                  className="p-2.5 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                  title="Share Link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
              <PDFDownloadButton />
              <AdBanner adSlot="download-bottom" className="w-full" minHeight={{ mobile: '100px', desktop: '100px' }} />
            </div>

            <div className="hidden lg:block">
              <AdBanner adSlot="preview-top" className="mb-6" />
            </div>

            <div className="relative group min-h-[600px]">
              <ResumePreview data={resumeData} />
            </div>

            <div className="hidden lg:block">
              <AdBanner adSlot="preview-bottom" className="mt-8" />
            </div>
          </div>

          {/* Right Sidebar: Desktop Only */}
          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-24">
              <AdBanner adSlot="sidebar-sticky" adFormat="rectangle" className="h-[600px]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
