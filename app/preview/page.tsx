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
  const resumeId = searchParams.get('id');
  const token = searchParams.get('token');
  const templateParam = searchParams.get('template') as ResumeTemplate | null;

  const [loading, setLoading] = React.useState(!!resumeId);
  const [error, setError] = React.useState<string | null>(null);
  const [customData, setCustomData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!resumeId) return;

    let isMounted = true;
    async function loadResume() {
      try {
        setLoading(true);
        const url = `/api/resumes/${encodeURIComponent(resumeId!)}?token=${encodeURIComponent(token || '')}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Unable to load resume. The link may have expired or is invalid.');
        }
        const json = await res.json();
        if (isMounted) {
          setCustomData(json.resume);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load resume');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadResume();
    return () => { isMounted = false; };
  }, [resumeId, token]);

  const activeTemplate = customData?.template || templateParam || 'classic';
  const displayData = customData || {
    ...dummyResumeData,
    template: activeTemplate,
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
            <h1 className="font-bold text-gray-900">
              {resumeId ? (customData?.personalInfo?.fullName || 'Generated Resume') : 'Template Preview'}
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{activeTemplate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {resumeId && token && (
            <a
              href={`/api/resumes/download/${encodeURIComponent(resumeId)}?token=${encodeURIComponent(token)}`}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-lg hover:opacity-95 transition-all shadow-md text-sm"
              download
            >
              Download PDF 🚀
            </a>
          )}
          <Link
            href={`/?template=${activeTemplate}`}
            className="px-5 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition-all border border-indigo-200 text-sm"
          >
            Open in Builder
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-full flex flex-col items-center">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">Loading your resume...</div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 font-semibold mb-2">{error}</p>
              <Link href="/" className="text-indigo-600 font-bold hover:underline">Return to Home</Link>
            </div>
          ) : (
            <ResumePreview data={displayData} />
          )}
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