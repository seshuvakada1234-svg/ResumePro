'use client';

import React, { useState, useEffect } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { ATSScore } from '@/components/ATSScore';
import { Auth } from '@/components/Auth';
import { ResumeData, defaultResumeData, ResumeTemplate } from '@/types/resume';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { Toaster, toast } from 'sonner';
import { FileText, Sparkles, Layout, Zap, CheckCircle2, Plus, Share2, Home } from 'lucide-react';
import { AdUnit } from '@/components/AdUnit';
import { ATSTips } from '@/components/ATSTips';
import { TemplateSelector } from '@/components/TemplateSelector';
import { dummyResumeData } from '@/constants/dummyData';

export default function App() {
  const [currentView, setCurrentView] = useState<'builder' | 'templates' | 'ats-tips'>('builder');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [userResumes, setUserResumes] = useState<ResumeData[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        setUserResumes([]);
        setResumeData(defaultResumeData);
        setActiveResumeId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Resumes listener
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'resumes'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const resumes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResumeData));
      setUserResumes(resumes);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'resumes'));

    return () => unsubscribe();
  }, [user]);

  // Initial load logic
  useEffect(() => {
    if (user && userResumes.length > 0 && !activeResumeId) {
      setResumeData(userResumes[0]);
      setActiveResumeId(userResumes[0].id || null);
    }
  }, [user, userResumes, activeResumeId]);

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

  const handleSave = async (data: ResumeData) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please login to save your resume');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...data,
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      };

      if (activeResumeId) {
        await updateDoc(doc(db, 'resumes', activeResumeId), payload);
        toast.success('Resume updated successfully!');
      } else {
        const docRef = await addDoc(collection(db, 'resumes'), {
          ...payload,
          createdAt: new Date().toISOString(),
        });
        setActiveResumeId(docRef.id);
        toast.success('Resume created successfully!');
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'resumes');
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
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
              <span className="text-xl font-bold tracking-tight text-gray-900">Resume<span className="text-indigo-600">Pro</span></span>
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
          {/* Hero Section (Only if not logged in or no resume) */}
          {!activeResumeId && !auth.currentUser && (
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
                  for <span className="text-indigo-600 relative">
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
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-green-600" /></div> No Hidden Costs
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-green-600" /></div> ATS Optimized
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 size={14} className="text-green-600" /></div> PDF Download
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form */}
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
                
                <ResumeForm 
                  initialData={resumeData} 
                  onChange={setResumeData} 
                  onSave={handleSave}
                  isSaving={isSaving}
                />

                <AdUnit slot="sidebar-bottom" className="mt-8" />
              </div>

              {/* Right Column: Preview & Score */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between sticky top-[64px] z-20 bg-gray-50/90 backdrop-blur-md py-4 border-b border-gray-200 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleShare}
                      className="p-2.5 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                      title="Share Link"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <ATSScore data={resumeData} />

                <div className="relative group min-h-[600px]">
                  <ResumePreview data={resumeData} showDownload={true} />
                </div>

                <AdUnit slot="preview-bottom" className="mt-8" />

                {/* SEO Content Section */}
                <section className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Why use our ATS Resume Builder?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                        <CheckCircle2 size={16} /> ATS-Optimized
                      </h4>
                      <p className="text-sm text-gray-500">Our templates are tested against major ATS systems used by Indian companies like TCS, Infosys, and Wipro.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                        <CheckCircle2 size={16} /> 100% Free
                      </h4>
                      <p className="text-sm text-gray-500">No hidden subscriptions or "premium" templates. Everything is free for freshers in India.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Privacy First
                      </h4>
                      <p className="text-sm text-gray-500">Your data is secure with Firebase. We don't sell your information to third parties.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-indigo-600 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Professional Design
                      </h4>
                      <p className="text-sm text-gray-500">Clean, minimal, and modern layouts that impress human recruiters as well.</p>
                    </div>
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
                <li><button onClick={() => { setCurrentView('templates'); window.scrollTo(0, 0); }} className="hover:text-indigo-600 transition-colors">Free Templates</button></li>
                <li><button onClick={() => { setCurrentView('builder'); window.scrollTo(0, 0); }} className="hover:text-indigo-600 transition-colors">ATS Checker</button></li>
                <li><button onClick={() => { setCurrentView('ats-tips'); window.scrollTo(0, 0); }} className="hover:text-indigo-600 transition-colors">Resume Tips</button></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold text-gray-900 mb-6">Support</h4>
              <ul className="space-y-3 text-gray-500 text-sm font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
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
