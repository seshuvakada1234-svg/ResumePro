'use client';

import React, { useState, useCallback } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import { ATSScore } from '@/components/ATSScore';
import { Auth } from '@/components/Auth';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { Toaster, toast } from 'sonner';
import { FileText, Sparkles, Zap, CheckCircle2, Plus, Share2, Home } from 'lucide-react';
import { AdUnit } from '@/components/AdUnit';
import { ATSTips } from '@/components/ATSTips';
import { TemplateSelector } from '@/components/TemplateSelector';
import { dummyResumeData } from '@/constants/dummyData';

export default function App() {
  const [currentView, setCurrentView] = useState<'builder' | 'templates' | 'ats-tips'>('builder');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

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
        title: 'ResumePro India',
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
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setCurrentView('builder')}>
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <FileText className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Resume<span className="text-indigo-600">Pro</span>
              </span>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
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
                <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>
              <Auth />
            </div>
          </div>
        </div>
      </nav>

      <AdUnit slot="header-bottom" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4" />

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
                  Build a Professional ATS Resume <br className="hidden md:block" />
                  for{' '}
                  <span className="text-indigo-600 relative">
                    Freshers India
                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-indigo-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                  Land your dream job with our ATS-optimized templates. Designed specifically for the Indian job market. 100% Free. No Watermark.
                </p>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-5 space-y-6">
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
                <AdUnit slot="sidebar-bottom" className="mt-8" />
              </div>

              {/* Right: Preview */}
              <div className="lg:col-span-7 flex flex-col gap-6">
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

                <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-center">
                  <PDFDownloadButton />
                </div>

                <ATSScore data={resumeData} />

                <div className="relative group min-h-[600px]">
                  <ResumePreview data={resumeData} />
                </div>

                <AdUnit slot="preview-bottom" className="mt-8" />

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
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ATSTips />
        </main>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <FileText className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">ResumePro India</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                Empowering Indian freshers to land their first job with professional, ATS-optimized resumes. Built with passion for the Indian student community.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-3 text-gray-500 text-sm font-medium">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('templates');
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Free Templates
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('builder');
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    ATS Checker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('ats-tips');
                      window.scrollTo(0, 0);
                    }}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Resume Tips
                  </button>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-3 text-gray-500 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm font-medium">© 2026 ResumePro India. Built for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}