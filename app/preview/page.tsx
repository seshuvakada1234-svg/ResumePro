'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumePreview } from '@/components/ResumePreview';
import { dummyResumeData } from '@/constants/dummyData';
import { ResumeTemplate } from '@/types/resume';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

function PreviewContent() {
  const searchParams = useSearchParams();
  const templateId = (searchParams.get('template') as ResumeTemplate) || 'classic';

  const data = {
    ...dummyResumeData,
    template: templateId,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="font-bold text-gray-900">Template Preview</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{templateId}</p>
          </div>
        </div>

        <Link
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md"
        >
          Use This Template
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-full flex flex-col items-center">
          <ResumePreview data={data} />
        </div>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}