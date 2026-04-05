'use client';

import React, { useState, useCallback, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { ATSScore } from '@/components/ATSScore';
import { Auth } from '@/components/Auth';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { Toaster, toast } from 'sonner';
import { FileText, Sparkles, Zap, CheckCircle2, Plus, Share2, Home, Menu, X, Mail, Layout } from 'lucide-react';
import { AdBanner } from '@/components/AdBanner';
import { ATSTips } from '@/components/ATSTips';
import { TemplateSelector } from '@/components/TemplateSelector';
import { dummyResumeData } from '@/constants/dummyData';

function AppContent() {
  const [currentView, setCurrentView] = useState<'builder' | 'templates' | 'ats-tips'>('builder');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSave = async (_data: ResumeData) => {
    toast.info('Sign in to save your resume to the cloud');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div 
              className="flex items-center gap-2 group cursor-pointer" 
              onClick={() => {
                setCurrentView('builder');
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <FileText className="text-white" size={20} />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
                Free<span className="text-indigo-600">Resume</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-500">
              <button
                onClick={() => setCurrentView('builder')}
                className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors ${currentView === 'builder' ? 'text-indigo-600' : ''}`}
              >
                <Home size={16} /> Home
              </button>
              <button
                onClick={() => setCurrentView('templates')}
                className={`hover:text-indigo-600 transition-colors ${currentView === 'templates' ? 'text-indigo-600' : ''}`}
              >
                Templates
              </button>
              <button
                onClick={() => setCurrentView('ats-tips')}
                className={`hover:text-indigo-600 transition-colors ${currentView === 'ats-tips' ? 'text-indigo-600' : ''}`}
              >
                ATS Tips
              </button>
              <Link
                href="/contact"
                className="hover:text-indigo-600 transition-colors"
              >
                Contact
              </Link>
              <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Share2 size={16} /> Share
              </button>
              <Auth />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <Auth />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {[
                { id: 'builder', label: 'Home', icon: <Home size={18} /> },
                { id: 'templates', label: 'Templates', icon: <Layout size={18} /> },
                { id: 'ats-tips', label: 'ATS Tips', icon: <Zap size={18} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-all ${
                    currentView === item.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
              >
                <Mail size={18} /> Contact Us
              </Link>
              <button 
                onClick={() => {
                  handleShare();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
              >
                <Share2 size={18} /> Share App
              </button>
            </div>
          </div>
        )}
      </nav>

      <AdBanner adSlot="header-bottom" className="max-w-7xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8 my-4" />

      {currentView === 'builder' ? (
        <>
          {/* Hero Section */}
          {!activeResumeId && (
            <div className="bg-white border-b border-gray-100 py-16 md:py-24 overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  <Zap size={12} /> #1 Free Resume Builder in India
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                  Build a Free ATS Resume <br className="hidden md:block" />
                  That Gets You Hired
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                  Create job-ready resumes in minutes with ATS-optimized templates for freshers in India.
                </p>
                <div className="flex justify-center mb-10">
                  <button 
                    onClick={() => {
                      const builderSection = document.getElementById('builder-section');
                      builderSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1"
                  >
                    Create Free Resume 🚀
                  </button>
                </div>
                <AdBanner adSlot="hero-bottom" className="max-w-2xl mx-auto mb-10" />
                <div className="flex flex-wrap justify-center gap-8">
                  {['No Hidden Costs', 'ATS Optimized', 'PDF Download'].map((text) => (
                    <div key={text} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <div className="bg-green-100 p-1 rounded-full">
                        <CheckCircle2 size={14} className="text-green-600" />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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

                <ATSScore data={resumeData} />

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