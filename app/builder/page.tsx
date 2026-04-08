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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-center" richColors />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 xl:grid-cols-13 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Builder</h2>

              <div className="flex gap-3">
                {activeResumeId && (
                  <button
                    onClick={() => {
                      setResumeData(defaultResumeData);
                      setActiveResumeId(null);
                    }}
                    className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg"
                  >
                    <Plus size={14} /> New
                  </button>
                )}

                <button
                  onClick={loadDummyData}
                  className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg"
                >
                  <Sparkles size={14} /> Sample
                </button>
              </div>
            </div>

            <ResumeForm
              initialData={resumeData}
              onChange={handleResumeChange}
              onSave={handleSave}
              isSaving={false}
            />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Live Preview</h2>

              <button
                onClick={handleShare}
                className="p-2 border rounded-lg"
              >
                <Share2 size={18} />
              </button>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
              <PDFDownloadButton />
            </div>

            <div className="min-h-[600px]">
              <ResumePreview data={resumeData} />
            </div>

          </div>
        </div>
      </main>
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