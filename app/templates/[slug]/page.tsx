'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { templates, categories } from '@/constants/templates';
import { dummyResumeData } from '@/constants/dummyData';
import { RESUME_EXAMPLES } from '@/lib/resume-examples-db';
import { 
  Check, 
  ArrowLeft, 
  Star, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Download, 
  Maximize2, 
  Sliders, 
  ZoomIn, 
  ZoomOut, 
  ChevronRight,
  Briefcase,
  Layers,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import TemplateThumbnail from '@/components/TemplateThumbnail';
import { AdBanner } from '@/components/AdBanner';

const TEMPLATE_METADATA: Record<string, { experience: string[]; style: string; industries: string[]; keyPoints: string[] }> = {
  'photo-sidebar': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Classic',
    industries: ['Business', 'Marketing', 'Education'],
    keyPoints: ['Includes profile photo slot', 'Serif corporate headings', 'Elegant multi-section layout']
  },
  'photo-circle': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Minimalist',
    industries: ['Creative', 'Tech', 'Marketing'],
    keyPoints: ['Modern circular headshot badge', 'Clean sidebar layout', 'Compact skills visual map']
  },
  'lawyer-classic': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Classic',
    industries: ['Legal & Finance', 'Business'],
    keyPoints: ['Elegant subheadings with dotted lines', 'Traditional high-rank font choice', 'Dense, formal text alignment']
  },
  'minimal-pro': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Minimalist',
    industries: ['Business', 'Legal & Finance', 'Healthcare'],
    keyPoints: ['Generous negative space', 'No distracting borders', 'Clean corporate font scaling']
  },
  'pink-header': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Modern',
    industries: ['Business', 'Education', 'Marketing'],
    keyPoints: ['Accent header top bar', 'Compact single-page allocation', 'Great for career switchers']
  },
  'classic': {
    experience: ['Entry / Fresher', 'Mid-Level', 'Senior / Executive'],
    style: 'Classic',
    industries: ['Business', 'Legal & Finance', 'Education'],
    keyPoints: ['Traditional serif hierarchy', 'TCS and HDFC compliant standard layout', 'Highly recommended for traditional corporations']
  },
  'modern': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Modern',
    industries: ['Tech', 'Engineering', 'Marketing'],
    keyPoints: ['Bold sans-serif section lines', 'Space Grotesk system typography', 'Ideal for engineers, developers, and designers']
  },
  'minimal': {
    experience: ['Entry / Fresher'],
    style: 'Minimalist',
    industries: ['Fresher', 'Tech', 'Education'],
    keyPoints: ['Ultra-clean single page canvas', 'Designed to avoid empty voids for freshers', 'No heavy graphical elements for maximum parsing speed']
  },
  'two-column': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Modern',
    industries: ['Engineering', 'Tech', 'Marketing'],
    keyPoints: ['Two-pane high density structure', 'Perfect for showcasing multiple projects alongside skill meters', 'Space-efficient sidebar layout']
  },
  'premium': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Creative / Bold',
    industries: ['Marketing', 'Tech', 'Business'],
    keyPoints: ['Vibrant indigo visual borders', 'Dynamic left details strip', 'Polished title header block']
  },
  'executive': {
    experience: ['Senior / Executive'],
    style: 'Creative / Bold',
    industries: ['Executive', 'Legal & Finance', 'Business'],
    keyPoints: ['Premium dark top accent bar', 'Sophisticated dual column grid hierarchy', 'Polished font weight variations']
  },
  'redline': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Creative / Bold',
    industries: ['Creative', 'Tech', 'Marketing'],
    keyPoints: ['Bold red vertical timeline line', 'Modern sidebar summary allocation', 'Action-oriented responsive layout']
  },
  'navy': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Classic',
    industries: ['Healthcare', 'Education', 'Business'],
    keyPoints: ['Safe navy corporate framing', 'Right-hand content expansion panel', 'Includes optional profile image circle']
  },
  'serif': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Classic',
    industries: ['Education', 'Creative', 'Legal & Finance'],
    keyPoints: ['Editorial styling with class', 'Deep slate body colors', 'Beautiful chronological narrative formatting']
  },
  'dark-navy': {
    experience: ['Mid-Level', 'Senior / Executive'],
    style: 'Creative / Bold',
    industries: ['Business', 'Engineering', 'Tech'],
    keyPoints: ['Hexagonal custom avatar banner', 'Dynamic horizontal progress line indicators', 'Polished dual margin alignments']
  },
  'crimson': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Creative / Bold',
    industries: ['Business', 'Creative', 'Marketing'],
    keyPoints: ['Crimson sidebar with a custom diagonal split', 'Perfect profile focus panel', 'Dedicated references list footer']
  },
  'black-yellow': {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Creative / Bold',
    industries: ['Creative', 'Marketing', 'Tech'],
    keyPoints: ['High contrast yellow bullet headers', 'Bold black column frame', 'Stands out in recruiter review pipelines']
  },
  'luxury-gold': {
    experience: ['Senior / Executive'],
    style: 'Creative / Bold',
    industries: ['Executive', 'Business', 'Legal & Finance'],
    keyPoints: ['Polished gold dividing elements', 'Luxurious branding panel styling', 'Tailored for senior administrative directors']
  }
};

const A4_W = 794;
const A4_H = 1123;

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = (params.slug as string) || '';

  // 1. Resolve SEO slug or standard id
  const getTemplateBySlugOrId = (slugOrId: string) => {
    const norm = slugOrId.toLowerCase();
    const mapping: Record<string, string> = {
      'modern-clean': 'modern',
      'minimalist': 'minimal',
      'premium-indigo': 'premium',
      'classic-professional': 'classic',
      'photo-classic': 'photo-sidebar',
      'photo-circle': 'photo-circle',
      'lawyer-classic': 'lawyer-classic',
      'minimal-pro': 'minimal-pro',
      'pink-header': 'pink-header',
      'two-column': 'two-column',
      'executive-dark': 'executive',
      'redline-bold': 'redline',
      'navy-pro': 'navy',
      'serif-classic': 'serif',
      'black-yellow-pro': 'black-yellow',
    };

    const id = mapping[norm] || norm;
    return templates.find(t => t.id === id);
  };

  const template = getTemplateBySlugOrId(slugParam);
  const [zoom, setZoom] = useState(0.85);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Scale dynamically based on window width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setZoom(0.42);
      } else if (window.innerWidth < 1024) {
        setZoom(0.65);
      } else {
        setZoom(0.85);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <FileText size={48} className="text-gray-300 mb-4 animate-bounce" />
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Template Not Found</h1>
        <p className="text-gray-600 mb-6 max-w-md">The requested resume template URL could not be recovered. It may have been relocated or renamed.</p>
        <Link href="/templates" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition-colors">
          Browse All Templates
        </Link>
      </div>
    );
  }

  // Get custom metadata helper values
  const meta = TEMPLATE_METADATA[template.id] || {
    experience: ['Entry / Fresher', 'Mid-Level'],
    style: 'Modern',
    industries: [template.category],
    keyPoints: ['ATS-verified layout spacing', 'Professional font hierarchy', 'Highly legible in black and white print']
  };

  const handleUseTemplate = () => {
    localStorage.setItem('selectedTemplate', template.id);
    router.push('/builder');
  };

  // Resolve related examples (freshers tailored)
  const relatedRoles = Object.values(RESUME_EXAMPLES).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] font-sans selection:bg-[#5B4DFF]/10 selection:text-[#5B4DFF] pb-16 relative overflow-hidden">
      
      {/* Subtle background blur spots */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-[#5B4DFF]/3 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#A855F7]/3 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Dynamic SEO Meta Tags Simulation - Title Header banner */}
      <div className="bg-white border-b border-[#E9E9F2] py-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#5B4DFF] transition-colors uppercase tracking-wider">
            <ArrowLeft size={16} /> All Templates
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#64748B] font-semibold bg-[#FAFAFC] border border-[#E9E9F2] px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="text-[#22C55E]" />
            <span>ATS Spacing Validated • TCS HDFC Compliant</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Live HD Template Preview Screen (8 Cols on LG) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="bg-slate-900 text-white rounded-[32px] p-4 sm:p-6 w-full shadow-2xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
              
              {/* Decorative light streaks */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B4DFF]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Floating Banner */}
              <div className="w-full flex items-center justify-between mb-6 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                </div>
                <div className="text-xs text-slate-400 font-mono tracking-tight bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Interactive PDF Canvas Preview
                </div>
              </div>

              {/* Dynamic Scaling Area */}
              <div 
                className="overflow-auto max-w-full bg-slate-950/40 rounded-2xl flex items-start justify-center p-2 mb-6 scrollbar-thin shadow-inner border border-slate-850"
                style={{ height: `${Math.min(720, A4_H * zoom + 32)}px` }}
              >
                <div
                  className="shadow-2xl flex-shrink-0 transition-all duration-300"
                  style={{
                    width: A4_W,
                    height: A4_H,
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                    pointerEvents: "none",
                  }}
                >
                  {/* Dynamic template execution with dummy fresher data */}
                  <template.component data={dummyResumeData} />
                </div>
              </div>

              {/* HD Vector Zoom Controls */}
              <div className="flex items-center gap-4 bg-slate-800 border border-slate-700/80 px-4 py-2.5 rounded-full z-10 shadow-lg">
                <button 
                  onClick={() => setZoom(prev => Math.max(0.4, prev - 0.05))}
                  className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs font-mono font-bold text-slate-300 w-16 text-center select-none">
                  {Math.round(zoom * 100)}% scale
                </span>
                <button 
                  onClick={() => setZoom(prev => Math.min(1.2, prev + 0.05))}
                  className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>
            
            {/* Ad Banner underneath preview */}
            <div className="w-full mt-6">
              <AdBanner adSlot="template-detail-below-preview" className="rounded-2xl" />
            </div>
          </div>

          {/* RIGHT: Template Details & Super Selling conversion factors (5 Cols on LG) */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            
            <div className="bg-white rounded-[32px] p-8 border border-[#E9E9F2] shadow-xl space-y-6">
              
              {/* Header Details */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#5B4DFF]/10 text-[#5B4DFF] text-xs font-extrabold rounded-full tracking-wider uppercase">
                    {template.category}
                  </span>
                  {template.ats && (
                    <span className="px-3 py-1 bg-[#22C55E] text-white text-xs font-extrabold rounded-full tracking-wider uppercase flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      100% ATS Approved
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] font-sans">
                  {template.name}
                </h1>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Conversion Metric badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#FAFAFC] rounded-xl p-3 text-center border border-[#E9E9F2]">
                  <div className="text-[#5B4DFF] font-extrabold text-lg">99.4%</div>
                  <div className="text-[10px] uppercase font-bold text-[#64748B]">ATS Rate</div>
                </div>
                <div className="bg-[#FAFAFC] rounded-xl p-3 text-center border border-[#E9E9F2]">
                  <div className="text-[#22C55E] font-extrabold text-lg">Free</div>
                  <div className="text-[10px] uppercase font-bold text-[#64748B]">Cost</div>
                </div>
                <div className="bg-[#FAFAFC] rounded-xl p-3 text-center border border-[#E9E9F2]">
                  <div className="text-[#A855F7] font-extrabold text-lg">Instant</div>
                  <div className="text-[10px] uppercase font-bold text-[#64748B]">Download</div>
                </div>
              </div>

              {/* Advanced Characteristics parameters */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#64748B]">Template Specifications</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-[#FAFAFC] p-3 rounded-xl border border-[#E9E9F2]">
                    <Briefcase size={16} className="text-[#64748B]" />
                    <div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase">Experience</div>
                      <div className="text-xs font-extrabold text-[#0F172A]">{meta.experience.join(', ')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#FAFAFC] p-3 rounded-xl border border-[#E9E9F2]">
                    <Sliders size={16} className="text-[#64748B]" />
                    <div>
                      <div className="text-[10px] font-bold text-[#64748B] uppercase">Style Format</div>
                      <div className="text-xs font-extrabold text-[#0F172A]">{meta.style}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key design accomplishments bullets list */}
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#64748B]">Design Features</h3>
                <ul className="space-y-2 text-sm text-[#64748B] font-medium">
                  {meta.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="bg-[#5B4DFF]/10 text-[#5B4DFF] p-0.5 rounded-full mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* GIANT HIGH-CONVERTING CALL TO ACTION */}
              <div className="pt-4">
                <button
                  onClick={handleUseTemplate}
                  style={{ background: 'linear-gradient(90deg, #5B4DFF, #A855F7, #FF5EA8)' }}
                  className="w-full py-4 text-white font-extrabold rounded-[16px] shadow-xl shadow-[#5B4DFF]/25 hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <Sparkles size={18} className="animate-spin-slow group-hover:scale-110 transition-transform" />
                  <span>Use This Template For Free</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[#64748B] text-[11px] font-bold uppercase tracking-wider mt-3">
                  No sign-up or credit card required • Instant PDF Download
                </p>
              </div>

            </div>

            {/* Indian Corporate ATS compliance warning callout card */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Zap size={16} className="text-amber-500 fill-amber-500 animate-pulse" />
                Why this layout is recruiter-approved
              </div>
              <p className="text-amber-900/80 text-xs leading-relaxed font-semibold">
                Major IT conglomerates and traditional employers in India (such as TCS, Infosys, Wipro, and ICICI Bank) employ rigid legacy ATS scanning technology. Simple single-column chronological structures like <strong className="text-slate-900 font-bold">{template.name}</strong> allow parser bots to read headings and dates sequentially, resulting in higher recruitment matching and interview calls.
              </p>
            </div>

          </div>
        </div>

        {/* RELATED RESUME EXAMPLES SECTION */}
        <section className="mt-20 border-t border-[#E9E9F2] pt-16 space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-none flex items-center gap-2">
              <Briefcase size={24} className="text-[#5B4DFF]" /> Related Resume Examples & Role Advice
            </h2>
            <p className="text-[#64748B] text-sm md:text-base font-medium">
              See what high-impact keywords, skills, and projects experts include for these professions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedRoles.map((ex) => (
              <Link 
                key={ex.slug}
                href={`/resume-examples/${ex.slug}`}
                className="bg-white border border-[#E9E9F2] rounded-[24px] p-6 shadow-sm hover:shadow-[0_10px_30px_rgba(91,77,255,0.06)] hover:border-[#5B4DFF]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="bg-[#5B4DFF]/10 text-[#5B4DFF] w-12 h-12 rounded-xl flex items-center justify-center font-bold">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F172A] group-hover:text-[#5B4DFF] transition-colors">
                      {ex.role}
                    </h3>
                    <p className="text-[10px] text-[#5B4DFF] font-extrabold uppercase mt-1">
                      Start Salary: {ex.marketSalary.split(' - ')[0]}
                    </p>
                  </div>
                  <p className="text-[#64748B] text-xs line-clamp-3 leading-relaxed">
                    {ex.objective}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E9E9F2] flex items-center justify-between text-xs font-bold text-[#5B4DFF] uppercase tracking-wider">
                  <span>Read Guide</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform animate-pulse" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BROWSE LANDING FOOTER DETAILS - OTHER POPULAR SELECTIONS */}
        <section className="mt-20 border-t border-[#E9E9F2] pt-16 space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
              Other Popular Free Templates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.filter(t => t.id !== template.id).slice(0, 4).map((other) => (
              <div 
                key={other.id}
                className="bg-white border border-[#E9E9F2] rounded-[24px] p-5 shadow-sm hover:shadow-[0_10px_30px_rgba(91,77,255,0.06)] hover:border-[#5B4DFF]/35 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-slate-50 rounded-2xl flex items-center justify-center p-2 relative group overflow-hidden border border-slate-100">
                    <TemplateThumbnail Template={other.component} />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <Link 
                        href={`/templates/${other.id === 'modern' ? 'modern-clean' : other.id === 'minimal' ? 'minimalist' : other.id === 'premium' ? 'premium-indigo' : other.id}`}
                        className="p-3 bg-white hover:bg-slate-50 text-[#5B4DFF] font-bold rounded-xl shadow-lg flex items-center gap-1 text-xs uppercase"
                      >
                        <Maximize2 size={14} /> Quick Preview
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0F172A] font-sans">{other.name}</h3>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase mt-0.5">{other.category}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('selectedTemplate', other.id);
                      router.push('/builder');
                    }}
                    className="flex-1 py-2 bg-[#5B4DFF]/10 hover:bg-[#5B4DFF]/15 text-[#5B4DFF] font-bold text-xs rounded-xl transition-colors uppercase tracking-wider"
                  >
                    Use Selected
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
