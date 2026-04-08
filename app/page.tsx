'use client';

import React, { useState, useCallback, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { Auth } from '@/components/Auth';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { Toaster, toast } from 'sonner';
import { FileText, Sparkles, Zap, CheckCircle2, Plus, Share2, Home, Menu, X, Mail, Layout, ArrowRight } from 'lucide-react';
import { AdBanner } from '@/components/AdBanner';
import { ATSTips } from '@/components/ATSTips';
import { TemplateSelector } from '@/components/TemplateSelector';
import { dummyResumeData } from '@/constants/dummyData';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import Footer from '@/components/Footer';

function AppContent() {
  const [currentView, setCurrentView] = useState<'builder' | 'templates' | 'ats-tips'>('builder');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // FIX: when arriving from the preview page via /?template=<id>,
  // apply the selected template and switch to the builder view,
  // then clean the URL so a refresh doesn't re-apply it.
  useEffect(() => {
    const templateId = searchParams.get('template') as ResumeTemplate | null;
    if (templateId) {
      setResumeData((prev) => ({ ...prev, template: templateId }));
      setCurrentView('builder');
      window.scrollTo(0, 0);
      toast.success(`Template applied: ${templateId}`);
      // Remove the ?template= param from the URL without a page reload
      router.replace('/', { scroll: false });
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
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = async (_data: ResumeData) => {
    toast.info('Sign in to save your resume to the cloud');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner adSlot="header-bottom" className="my-4 md:my-6" />
      </div>

      {currentView === 'builder' ? (
        <>
          {/* Hero Section */}
          {!activeResumeId && <HeroSection />}

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 xl:grid-cols-13 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-6 order-1" id="builder-section">
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

                <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Why use our ATS Resume Builder?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'ATS-Optimized',
                        desc: 'Our templates are tested against major ATS systems used by Indian companies like TCS, Infosys, and Wipro.',
                      },
                      {
                        title: '100% Free',
                        desc: 'No hidden subscriptions or "premium" templates. Everything is free for freshers in India.',
                      },
                      {
                        title: 'Privacy First',
                        desc: "Your data is secure. We don't sell your information to third parties.",
                      },
                      {
                        title: 'Professional Design',
                        desc: 'Clean, minimal, and modern layouts that impress human recruiters as well.',
                      },
                    ].map(({ title, desc }) => (
                      <div key={title} className="space-y-2">
                        <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                          <CheckCircle2 size={16} /> {title}
                        </h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Career Resources Section */}
                <section className="py-12 space-y-8 border-t border-gray-100">
                  <div className="text-left space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">Career Resources</h3>
                    <p className="text-gray-500 text-sm">Learn, improve, and land your first job faster</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/resume-guide" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200">
                      <h4 className="font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">Resume for Freshers</h4>
                      <p className="text-sm text-gray-500 mt-2 mb-4">Expert guide for Indian students.</p>
                      <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
                        Read Guide <ArrowRight size={12} />
                      </span>
                    </Link>

                    <Link href="/ats-format" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200">
                      <h4 className="font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">ATS Resume Format</h4>
                      <p className="text-sm text-gray-500 mt-2 mb-4">Best ATS-friendly structure for 2026.</p>
                      <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
                        View Format <ArrowRight size={12} />
                      </span>
                    </Link>

                    <Link href="/resume-examples" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200">
                      <h4 className="font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">Resume Examples</h4>
                      <p className="text-sm text-gray-500 mt-2 mb-4">50+ real fresher resume samples.</p>
                      <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
                        Browse Examples <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                </section>

                <AdBanner adSlot="builder-bottom" className="mt-12" />
              </div>

              {/* Right Sidebar: Desktop Only */}
              <div className="hidden xl:block xl:col-span-1">
                <div className="sticky top-24">
                  <AdBanner adSlot="sidebar-sticky" adFormat="rectangle" className="h-[600px]" />
                </div>
              </div>
            </div>
          </main>
        </>
      ) : currentView === 'templates' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Choose Your <span className="text-indigo-600">Template</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our professionally designed, ATS-optimized templates to get started.
            </p>
          </div>
          <TemplateSelector
            selectedId={resumeData.template}
            onSelect={(id: ResumeTemplate) => {
              setResumeData({ ...resumeData, template: id });
              setCurrentView('builder');
              window.scrollTo(0, 0);
            }}
          />
          <AdBanner adSlot="templates-bottom" className="mt-12" />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ATSTips />
          <AdBanner adSlot="ats-tips-bottom" className="mt-12" />
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}