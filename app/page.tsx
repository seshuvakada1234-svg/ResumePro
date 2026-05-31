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

import { HeroSection } from '@/components/HeroSection';

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
                  <h3 className="text-xl font-bold text-gray-900">Why use the official FreeResume.dev?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'ATS-Optimized',
                        desc: 'Every FreeResume template is tested against ATS systems used by companies like TCS, Infosys, and Wipro.',
                      },
                      {
                        title: '100% Free',
                        desc: 'No "Premium" locks. FreeResume.dev is a completely free builder for Indian students.',
                      },
                      {
                        title: 'Privacy First',
                        desc: "Your data stays on the official FreeResume platform. We don't sell your info.",
                      },
                      {
                        title: 'Professional Design',
                        desc: 'Clean layouts by FreeResume designers that impress human recruiters as well.',
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

                {/* --- FOOTER SEO CONTENT --- */}
                <section id="homepage-seo-guide" className="mt-28 pt-20 border-t border-slate-200 space-y-20">
                  <div className="prose prose-slate max-w-none space-y-12">
                    
                    {/* Part 1: Deep Dive into ATS Resumes */}
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        The Comprehensive Guide on ATS Resumes for Indian Grads & Freshers
                      </h2>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        If you are a student, recent graduate, or fresher candidate in India, entering the professional job market is one of the most exciting yet challenging milestones of your career. With thousands of applicants competing for entry-level positions at top multinational corporations (such as <strong>TCS, Wipro, Infosys, Cognizant, Wipro, HCL, and Accenture</strong>) alongside hyper-growth startup teams, human HR departments can no longer review every CV manually. 
                      </p>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                        To scale their verification processes, over 95% of top employers utilize automated recruitment software called an <strong>Applicant Tracking System (ATS)</strong>. An ATS acts as a digital gatekeeper, automatically parsing, reading, and scoring your resume based on keyword density, role titles, and layout configuration before any hiring manager ever lays eyes on your document. If your resume contains unparseable formatting (such as horizontal percentage bars, dual-column visual structures, or images of text), it is automatically rejected. At <strong>FreeResume.dev</strong>, we have designed our entire platform and free builder specifically to eliminate these risks, helping you clear automatic filters and secure interview calls on autopilot.
                      </p>
                    </div>

                    {/* Part 2: Resume Creation Process */}
                    <div className="space-y-8 bg-slate-50 border rounded-[3rem] p-8 md:p-16">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Our Step-by-Step Resume Creation Process (The FreeResume Strategy)
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                        To engineer a high-scoring resume, you must follow a structured, programmatic approach that balances key target skills with quantified professional accomplishments:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-3">
                          <h4 className="font-extrabold text-slate-800 text-base">Phase 1: Header and Coordinates</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Maintain a unified, text-searchable contact header at the top of the body. Include your legal name, professional email address, city location, active mobile contact registry, and clickable links directing to your portfolio or GitHub.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-extrabold text-slate-800 text-base">Phase 2: Recruiter-Oriented Objectives</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Craft a punchy, 2-3 sentence objective summarizing your academic degree background and your primary technical skills. State clearly how you intend to apply those competencies to solve challenges for your potential employer.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-extrabold text-slate-800 text-base">Phase 3: Precise Academic Milestones</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Clearly list your B.Tech, B.Com, or MBA degree, institution name, and completion schedules. Ensure you accurately include your 10th and 12th board percentages, as many top MNCs utilize these grades for shortlisting cutoffs.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-extrabold text-slate-800 text-base">Phase 4: Hands-on Projects Stack</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Detailed technical projects are the absolute best proof of competence for fresher candidates. Highlight 2 to 3 key projects, stating the technologies utilized alongside accomplishments written in the STAR framework.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Part 3: Customizing Resume Examples */}
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Leveraging Real-World Industry Resume Examples
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        Every single candidate's journey is unique. Rather than using generic templates, you should explore our specialized libraries of 20+ role-focused samples. We host tailored guidelines and text copy packages for roles including:
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          'Software Engineer', 'Java Developer', 'React Developer', 'Python Developer', 
                          'Frontend Developer', 'DevOps Engineer', 'Data Analyst', 'HR Professional', 
                          'Accountant', 'Teacher', 'Mechanical Engineer', 'Civil Engineer', 'MBA Graduate', 
                          'Project Manager', 'Graphic Designer', 'Digital Marketer', 'Content Writer'
                        ].map(role => (
                          <span key={role} className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-xs">
                            {role} Template
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        By navigating directly to our <Link href="/resume-examples" className="text-indigo-600 font-bold hover:underline">Resume Examples Hub</Link> or our <Link href="/tips" className="text-indigo-600 font-bold hover:underline">ATS Learning Center</Link>, you can review actual copy blocks, discover the top high-intent keywords HR managers look for, and inject them into our builder interface to compile an outstanding resume.
                      </p>
                    </div>

                    {/* Part 4: Career Guidance */}
                    <div className="space-y-6 bg-indigo-900 text-white p-8 md:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                      <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                        <Sparkles className="text-amber-400" size={24} /> Essential Career Guidance for Indian Grads
                      </h3>
                      <p className="text-indigo-100 opacity-90 text-sm md:text-base leading-relaxed">
                        To clear entry competitive requirements at Indian MNCs and land top corporate placements, you must pair your optimized resume with a clear placement strategy:
                      </p>
                      <ul className="space-y-4 text-xs md:text-sm text-indigo-100/90 list-disc pl-5">
                        <li>
                          <strong>Sourcing Off-Campus Internships:</strong> Use portals like Internshala, LinkedIn, and corporate careers hubs to apply before target seasons, choosing roles with concrete skill metrics that match your resume stack.
                        </li>
                        <li>
                          <strong>Optimizing Your LinkedIn Presence:</strong> Align your LinkedIn headline and bio using the exact keywords featured on your resume. This allows headhunters searching for candidates to discover your profile.
                        </li>
                        <li>
                          <strong>Preparing for Technical Screening Runs:</strong> In addition to writing a beautiful CV, you should spend time mastering basic Data Structures, Object-Oriented principles, and SQL queries to pass online tests.
                        </li>
                      </ul>
                    </div>

                    {/* Part 5: Benefits of FreeResume */}
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        The Benefits of FreeResume.dev vs. Paid Alternatives
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        Most commercial resume platforms across the internet leverage predatory payment modules—allowing you to design your resume only to lock down your PDF behind subscription paywalls. At <strong>FreeResume.dev</strong>, we operate with a strict commitment to transparency:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl">
                          <h4 className="font-extrabold text-slate-900 text-base mb-2">Permanently 100% Free</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            No premium tiers, no hidden watermark locks, and no subscription popups. Build and export unlimited PDF copies completely free.
                          </p>
                        </div>

                        <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl">
                          <h4 className="font-extrabold text-slate-900 text-base mb-2">Rigorous Parser Audited</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Our templates undergo active automated testing rounds against parsing platforms, ensuring outstanding character readability metrics.
                          </p>
                        </div>

                        <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl">
                          <h4 className="font-extrabold text-slate-900 text-base mb-2">Completely Ad-Supported</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            We sustain platform development, server hosting, and vector compilations using simple AdSense placements, ensuring students pay ₹0.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Part 6: Comprehensive FAQs for SEO */}
                    <div className="space-y-8 mt-16">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        Frequently Asked Questions (FAQs)
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-slate-500">
                        <div className="space-y-2 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
                          <h4 className="font-extrabold text-slate-900 text-base">Is this resume builder really free for life?</h4>
                          <p className="text-xs md:text-sm">Yes, FreeResume.dev is a completely free resource for the entire student and fresher community in India. Our platform is dedicated to helping graduates build high-scoring, professional ATS resumes without charging fees.</p>
                        </div>

                        <div className="space-y-2 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
                          <h4 className="font-extrabold text-slate-900 text-base">How do I generate an ATS resume for freshers?</h4>
                          <p className="text-xs md:text-sm">Simply upload your details inside of our intuitive inputs block, select one of our tested layouts (like Classic Professional), and trigger the download mechanism. Your text-searchable PDF is generated in under 5 seconds.</p>
                        </div>

                        <div className="space-y-2 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
                          <h4 className="font-extrabold text-slate-900 text-base">Does my resume need a photo for recruiters in India?</h4>
                          <p className="text-xs md:text-sm">While photo guidelines vary globally, major IT players and multinational recruitment hubs across India discourage photos. Text-compliant, single-page professional layout resumes yield significantly higher parsing metrics.</p>
                        </div>

                        <div className="space-y-2 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
                          <h4 className="font-extrabold text-slate-900 text-base">Is it safe to run my details on this builder?</h4>
                          <p className="text-xs md:text-sm">Absolutely. We maintain a secure, private infrastructure framework. Your data remains processed entirely inside your local browser container dynamically, protecting candidate integrity throughout the process.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-200 mt-20 font-medium">
                  <div className="space-y-4">
                    <p>&copy; {new Date().getFullYear()} FreeResume.dev - The Official #1 Free Resume Builder in India.</p>
                    <div className="flex justify-center gap-6">
                      <Link href="/privacy" className="hover:text-indigo-600 underline">Privacy Policy</Link>
                      <Link href="/terms" className="hover:text-indigo-600 underline">Terms of Service</Link>
                    </div>
                  </div>
                </footer>
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