'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { templates } from '@/constants/templates';
import { dummyResumeData } from '@/constants/dummyData';
import { 
  Sparkles, 
  Zap, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Monitor, 
  Cpu, 
  Smartphone, 
  Download, 
  Upload, 
  Star, 
  Check, 
  Code, 
  BookOpen, 
  Briefcase, 
  Flame, 
  HeartHandshake,
  LayoutGrid
} from 'lucide-react';
import { toast } from 'sonner';

// Company list
const COM_LOGOS = [
  { name: 'Google', icon: 'Google' },
  { name: 'Microsoft', icon: 'Microsoft' },
  { name: 'Amazon', icon: 'Amazon' },
  { name: 'Infosys', icon: 'Infosys' },
  { name: 'TCS', icon: 'TCS' },
  { name: 'Accenture', icon: 'Accenture' },
  { name: 'Deloitte', icon: 'Deloitte' }
];


// Featured templates preview structure
const PREVIEW_TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Professional',
    tag: 'Corporate Standard',
    color: 'from-blue-600 to-indigo-600',
    type: 'classic'
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    tag: 'Tech & Frontend',
    color: 'from-purple-600 to-pink-600',
    type: 'modern'
  },
  {
    id: 'premium',
    name: 'Indigo Creative',
    tag: 'Marketing & Sales',
    color: 'from-orange-500 to-pink-500',
    type: 'creative'
  }
];

// 6 Premium Feature descriptions
const PREMIUM_FEATURES = [
  {
    id: 'ai-builder',
    title: 'AI Resume Builder',
    desc: 'Generate summaries and professional descriptions using AI assistance.',
    emoji: '🤖',
    badge: 'AI Powered',
    gradient: 'from-[#5B4DFF]/10 to-[#A855F7]/10',
    borderHover: 'hover:border-[#5B4DFF]/40',
    iconColor: 'text-[#5B4DFF]'
  },
  {
    id: 'ats-checker',
    title: 'ATS Resume Checker',
    desc: 'Analyze resume quality and improve compatibility with recruiter systems.',
    emoji: '🎯',
    badge: 'ATS Score',
    gradient: 'from-[#FF5EA8]/10 to-orange-500/10',
    borderHover: 'hover:border-[#FF5EA8]/40',
    iconColor: 'text-[#FF5EA8]'
  },
  {
    id: 'custom-templates',
    title: 'Professional Templates',
    desc: 'Choose from modern, executive and creative layouts optimized for ATS.',
    emoji: '🎨',
    badge: 'ATS Optimized',
    gradient: 'from-[#A855F7]/10 to-[#FF5EA8]/10',
    borderHover: 'hover:border-[#A855F7]/40',
    iconColor: 'text-[#A855F7]'
  },
  {
    id: 'mobile-friendly',
    title: 'Mobile Friendly',
    desc: 'Create, edit and download resumes seamlessly on any device.',
    emoji: '📱',
    badge: 'Fully Responsive',
    gradient: 'from-[#5B4DFF]/10 to-blue-500/10',
    borderHover: 'hover:border-[#5B4DFF]/40',
    iconColor: 'text-[#5B4DFF]'
  },
  {
    id: 'instant-download',
    title: 'Instant PDF Download',
    desc: 'Download clean, high-quality PDF resumes without watermarks.',
    emoji: '⚡',
    badge: 'Vector Clean',
    gradient: 'from-[#FF5EA8]/10 to-amber-500/10',
    borderHover: 'hover:border-[#FF5EA8]/40',
    iconColor: 'text-[#FF5EA8]'
  },
  {
    id: 'import-existing',
    title: 'Import Existing Resume',
    desc: 'Upload an existing PDF or DOCX and automatically populate your details.',
    emoji: '📂',
    badge: 'Auto Parser',
    gradient: 'from-emerald-500/10 to-[#5B4DFF]/10',
    borderHover: 'hover:border-emerald-500/40',
    iconColor: 'text-emerald-500'
  }
];


// Resume Examples categories
const EXAMPLES_CATEGORIES = [
  { name: 'Software Engineer', slug: 'software-engineer', emoji: '💻' },
  { name: 'Teacher', slug: 'teacher', emoji: '👩‍🏫' },
  { name: 'Nurse', slug: 'nurse', emoji: '🏥' },
  { name: 'Accountant', slug: 'accountant', emoji: '💰' },
  { name: 'Sales Manager', slug: 'sales-manager', emoji: '📈' },
  { name: 'Marketing Executive', slug: 'marketing', emoji: '📢' },
  { name: 'Customer Service', slug: 'customer-service', emoji: '🎧' },
  { name: 'Freshers', slug: 'fresher', emoji: '🎓' },
  { name: 'HR Manager', slug: 'hr', emoji: '👔' },
  { name: 'Graphic Designer', slug: 'designer', emoji: '🎨' }
];



// 15 SEO Rich FAQs
const FAQ_LIST = [
  {
    q: 'What is an ATS Resume?',
    a: 'An ATS resume is formatted specifically to be read and indexed by an Applicant Tracking System (ATS), the automated screening software used by top global firms and Indian MNCs like TCS, Infosys, and Wipro. This software parses document text to find targeted keywords, experience, and academic marks. Bypassing this step successfully requires using clean, single-column templates, standard subheadings, and avoiding any graphic bars, tables, or complex shapes that scramble parsing engines.'
  },
  {
    q: 'How to create a resume for freshers?',
    a: 'To create a resume for freshers, focus on highlighting your academic scores (10th/12th/CGPA), relevant college capstone projects, coding profiles (such as GitHub or LeetCode), and technology certifications (like NPTEL or cloud badges). Since you lack extensive corporate experience, select a single-column, clean layout that minimizes empty whitespace and structures your education, major projects, and skill lists in a readable chronological feed. FreeResume.dev offers dedicated fresher templates that parse perfectly.'
  },
  {
    q: 'How ATS Resume Score works?',
    a: 'An ATS Resume Score acts as a digital relevancy ranking. When you upload a resume, the parser scans it against a specific job description, tracking the frequency and context of matching core keywords, hard skills, job titles, and educational requirements. It calculates a compatibility percentage based on keyword density, standard header matches, and date progression. Our online ATS checker analyzes your PDF format to detect formatting hurdles and provide a live score with optimization suggestions.'
  },
  {
    q: 'Best resume format for software engineers?',
    a: 'The best resume format for software engineers is a single-column, text-searchable, reverse-chronological PDF layout. It should feature a clean Tech Stack summary at the top (categorized by Languages, Frameworks, and Tools), followed by specific Work Experience or Github coding projects. For software roles, use action verbs and quantify achievements (e.g., "optimized query latency by 45%"). Avoid graphic design formats or two-column sidebars that confuse parse algorithms.'
  },
  {
    q: 'Best resume format for teachers?',
    a: 'The best resume format for teachers is a highly structured, conservative chronological design. It must feature prominent sections for Teaching Credentials/Certifications (like CTET, B.Ed, or state licensing) right after the professional summary, followed by a history of classroom experiences, grading methodologies, lesson planning achievements, and subject expertise. Keep the format text-based and easy to scan for educational coordinators.'
  },
  {
    q: 'Is FreeResume.dev really completely free?',
    a: 'Yes, 100%. FreeResume.dev is created to eliminate the frustrations of predatory resume builders across the web. We do not restrict features, we do not add watermarks, and we do not charge premium fees to download your final PDF. The platform is entirely supported by clean, standard advertising placements.'
  },
  {
    q: 'Can I download the resume as a PDF?',
    a: 'Absolutely. Clicking download exports a clean, vector-based PDF file directly to your device. The document is built to be extremely high quality, ensuring it prints perfectly and parses quickly in computer index databases.'
  },
  {
    q: 'Is my input data secure on FreeResume.dev?',
    a: 'Yes, your privacy is our highest priority. Your inputs are stored and processed entire inside your browser\'s local storage container dynamically. We do not sell, scrape, or distribute candidate data to third-party brokers.'
  },
  {
    q: 'Can I create and edit resumes on mobile devices?',
    a: 'Yes! The entire application has been designed mobile-first. You can populate your details, edit sections, analyze features, and download optimized PDFs directly from your smartphone or tablet.'
  },
  {
    q: 'Does it support resume formulations for freshers?',
    a: 'Yes, we specialize in high-scoring formats for freshers and students with no commercial experience. The builder highlights board scores, academic capstone projects, coding ratings (LeetCode, GitHub), and certifications (NPTEL, Swayam).'
  },
  {
    q: 'How does the AI helper support resume writing?',
    a: 'Our built-in AI assists in drafting highly descriptive summaries and rewriting project descriptions to emphasize performance and impact. It ensures your sentences remain concise and full of professional, high-intent action verbs.'
  },
  {
    q: 'Which format is best for ATS scanners?',
    a: 'A single-column, top-to-bottom, reverse-chronological format is the gold standard. It allows the parser to scan your credentials, academic scores, and coding projects in a logical progression.'
  },
  {
    q: 'Do I need a custom cover letter?',
    a: 'Yes, pairing your resume with a targeted cover letter increases interview conversion rates. Our resources section offers template libraries designed to bypass automated tools and appeal directly to HR coordinators.'
  },
  {
    q: 'Are there resume templates with photo frames?',
    a: 'We offer templates with custom photo integrations; however, for mass recruitment MNC assessments in India, we strongly suggest choosing text-only layouts like our "Classic Professional" to ensure complete parser compatibility.'
  },
  {
    q: 'Is signing up for an account mandatory?',
    a: 'No sign-up is required to draft, format, or download your resume. Registration is entirely optional and is only available if you choose to sync your information across multiple devices dynamically.'
  },
  {
    q: 'Can I import an existing resume into the builder?',
    a: 'Yes! Our custom import engine allows candidates to upload an existing PDF or Word CV. The tool extracts details, maps skill lists, and pre-fills our editor grid in seconds.'
  },
  {
    q: 'Do company recruiting teams in India reject graphic resumes?',
    a: 'Top IT Services providers and large firms (such as TCS, Wipro, and Infosys) utilize system parsers that easily lose details on highly graphical resumes. Clean, crisp, code-like structures compile far better scores.'
  },
  {
    q: 'How frequently should I update my resume?',
    a: 'We suggest updating your resume file whenever you tackle a new project, earn a tech certification, clear academic boards, or when tuning your profile for a specific off-campus job post.'
  }
];

// Home blog dynamic guides
const HOME_BLOG_ARTICLES = [
  {
    title: 'How to Write a Resume for Freshers',
    desc: 'Resume tips for students and recent graduates.',
    slug: 'how-to-write-resume-for-freshers',
    logo: '📘'
  },
  {
    title: 'Best Resume Formats in 2026',
    desc: 'Choose the right layout for ATS compatibility.',
    slug: 'best-resume-format-2026',
    logo: '📘'
  },
  {
    title: 'Top Resume Skills and Keywords',
    desc: 'Discover important keywords recruiters search for.',
    slug: 'resume-skills-keywords',
    logo: '📘'
  },
  {
    title: 'Professional Summary Examples',
    desc: 'Write strong opening statements that attract recruiters.',
    slug: 'professional-summary-examples',
    logo: '📘'
  },
  {
    title: 'ATS Optimization Guide',
    desc: 'Improve compatibility with applicant tracking systems.',
    slug: 'ats-optimization-guide',
    logo: '📘'
  },
  {
    title: 'Interview Preparation Tips',
    desc: 'Common interview questions and strategies.',
    slug: 'interview-preparation-tips',
    logo: '📘'
  }
];



const TEMPLATE_METADATA: Record<string, { experience: string; style: string; industries: string[] }> = {
  'classic': { experience: 'Mid-Level', style: 'Classic', industries: ['Business', 'Legal & Finance', 'Education'] },
  'modern': { experience: 'Entry / Fresher', style: 'Modern', industries: ['Tech', 'Engineering', 'Marketing'] },
  'minimal': { experience: 'Entry / Fresher', style: 'Minimalist', industries: ['Fresher', 'Tech', 'Education'] },
  'premium': { experience: 'Mid-Level', style: 'Creative / Bold', industries: ['Marketing', 'Tech', 'Business'] },
  'executive': { experience: 'Executive', style: 'Luxury / Dark', industries: ['Executive', 'Legal & Finance', 'Business'] },
  'redline': { experience: 'Mid-Level', style: 'Creative / Bold', industries: ['Creative', 'Tech', 'Marketing'] },
};

// Interactive live scaled preview mimicking real dimensions reactively
function LiveTemplatePreview({ Template }: { Template: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.24);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Resume page coordinates (A4 format = 794 x 1123)
        // Adjust scaling to fill 85-95% of container
        const scaleW = (width * 0.90) / 794;
        const scaleH = (height * 0.90) / 1123;
        const finalScale = Math.min(scaleW, scaleH);
        setScale(finalScale);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center bg-[#F8FAFC] rounded-[24px] overflow-hidden relative"
    >
      <div
        style={{
          width: 794,
          height: 1123,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
        className="flex-shrink-0 bg-white shadow-lg rounded-sm"
      >
        <Template data={dummyResumeData} />
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    localStorage.setItem('selectedTemplate', templateId);
    router.push('/builder');
  };

  const handleImportFeature = () => {
    toast.info('Parser Engine Ready! Transferring to import interface...');
    window.location.href = '/builder?import=true';
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-purple-100 selection:text-purple-950">
      
      {/* Dynamic SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'FreeResume.dev',
            'url': 'https://freeresume.dev',
            'logo': 'https://freeresume.dev/logo.png',
            'description': 'Award-winning, 100% free resume builder in India. Craft standard, single-column, high-parsing, ATS-friendly resumes within minutes.',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'All',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'INR'
            }
          })
        }}
      />

      {/* --- HERO SECTION WITH GLASSMORPHISM AND GRADIENTS --- */}
      <section className="relative pt-10 pb-16 md:pt-24 md:pb-28 overflow-hidden bg-radial from-purple-50/70 via-white to-white" id="hero-heading-block">
        {/* Decorative Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-3xl text-center pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-pink-100/40 blur-3xl text-center pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center">
            
            {/* Left Content Column Centered */}
            <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
              {/* Highlight Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 text-purple-700 rounded-full text-xs font-bold tracking-wide uppercase">
                <Sparkles size={14} className="text-purple-600 animate-pulse" />
                #1 FREE ATS CV BUILDER IN INDIA
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] font-sans">
                Build a Professional{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent px-1">
                  ATS-Friendly
                </span>{' '}
                Resume in Minutes
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                Create job-winning resumes with AI assistance, modern templates, ATS optimization, and instant PDF downloads — completely free.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 w-full sm:w-auto">
                <Link 
                  href="/templates"
                  id="cta-build-resume-free"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-600/20 hover:shadow-2xl hover:shadow-purple-600/30 hover:scale-[1.02] active:scale-100 transition-all text-center flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
                >
                  Build Resume Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/ats-score"
                  id="cta-check-ats"
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:scale-[1.02] active:scale-100 transition-all text-center flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <Sparkles size={18} className="text-pink-500 animate-pulse" />
                  Check ATS Score
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full justify-items-center">
                {[
                  { icon: <CheckCircle2 className="text-purple-600" size={16} />, text: 'No Credit Card Required' },
                  { icon: <Zap className="text-pink-500" size={16} />, text: 'ATS Friendly' },
                  { icon: <Download className="text-orange-500" size={16} />, text: 'Free PDF Download' },
                  { icon: <Cpu className="text-purple-500" size={16} />, text: 'AI Powered' }
                ].map((item, id) => (
                  <div key={id} className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tight">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- POPULAR TEMPLATES SECTION (100% IDENTICAL STUNNING REDESIGN) --- */}
      <section 
        className="py-16 sm:py-20 bg-[#F6F3FF] border-y border-[#5B4DFF]/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#5B4DFF]/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#FF5EA8]/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] flex items-center gap-2 font-sans">
                <Star size={24} className="text-[#5B4DFF] fill-[#5B4DFF]" />
                ⭐ Popular & Highly Rated Layouts
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] font-bold uppercase tracking-wider">
                MOST CHOSEN TEMPLATES BY INDIAN PROFESSIONALS
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-[11px] sm:text-xs bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] text-white px-3.5 py-1.5 rounded-full font-extrabold uppercase shadow-md tracking-wider">
                Most Loved
              </span>
            </div>
          </div>

          {/* Grid is responsive: Horizontal scroll with snap on mobile, 3 columns on tablet, 4 columns on desktop */}
          <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-none gap-4 sm:gap-6 pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-3 lg:grid-cols-4">
            {templates
              .filter((t) => ['classic', 'modern', 'minimal', 'premium', 'executive', 'redline'].includes(t.id))
              // Guarantee consistent popular order: classic -> modern -> minimal -> premium -> executive -> redline
              .sort((a, b) => {
                const order = ['classic', 'modern', 'minimal', 'premium', 'executive', 'redline'];
                return order.indexOf(a.id) - order.indexOf(b.id);
              })
              .map((template, index) => {
                const meta = TEMPLATE_METADATA[template.id] || {
                  experience: 'Entry / Fresher',
                  style: 'Modern',
                  industries: [template.category]
                };
                return (
                  <motion.div 
                    key={template.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="snap-center shrink-0 w-[85%] sm:w-[50%] md:w-auto bg-white rounded-[28px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between h-full group border border-[#ECECF5] shadow-sm hover:shadow-[0_20px_40px_rgba(91,77,255,0.14)] hover:-translate-y-1.5"
                  >
                    <div className="space-y-3 flex-1 flex flex-col">
                      <div className="aspect-[8.5/11] relative overflow-hidden rounded-[24px] bg-[#F8FAFC] border border-[#ECECF5]">
                        <LiveTemplatePreview Template={template.component} />
                        
                        {/* Live overlay trigger details */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 items-center justify-center p-3">
                          <button
                            onClick={() => handleSelectTemplate(template.id)}
                            className="w-full max-w-[140px] py-2 bg-white text-[#5B4DFF] font-extrabold text-[10px] sm:text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Sparkles size={12} className="text-[#5B4DFF]" /> Use Layout
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between pt-1">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                            <h3 className="font-extrabold text-xs sm:text-sm text-[#0F172A] leading-tight block truncate max-w-[130px] sm:max-w-none">
                              {template.name}
                            </h3>
                            {template.ats && (
                              <span className="text-[8px] sm:text-[9px] font-extrabold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase whitespace-nowrap">
                                <CheckCircle2 size={8} /> ATS OK
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                            {template.category}
                          </span>
                        </div>
                        
                        {/* Template specifications */}
                        <div className="mt-4 pt-3 border-t border-[#ECECF5] space-y-1.5 text-[10px] sm:text-xs text-[#64748B] font-semibold">
                          <div className="flex justify-between items-center">
                            <span>Style:</span>
                            <span className="font-extrabold text-[#0F172A]">{meta.style}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Experience:</span>
                            <span className="font-extrabold text-[#0F172A]">{meta.experience.split(' ')[0]}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Focus:</span>
                            <span className="font-extrabold text-[#0F172A] truncate max-w-[90px]">{meta.industries[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Use Template button */}
                    <button
                      onClick={() => handleSelectTemplate(template.id)}
                      style={{
                        background: 'linear-gradient(90deg, #5B4DFF, #A855F7, #FF5EA8)'
                      }}
                      className="mt-5 w-full py-2.5 sm:py-3 text-white font-extrabold text-[10px] sm:text-xs rounded-[16px] shadow-sm shadow-[#5B4DFF]/10 hover:shadow-[#5B4DFF]/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 uppercase tracking-wider cursor-pointer"
                    >
                      <Check size={12} strokeWidth={3} />
                      Use Template
                    </button>
                  </motion.div>
                );
              })}
          </div>

          {/* Centered Button: Check All Templates */}
          <div className="flex justify-center pt-6 sm:pt-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-full shadow-[0_10px_30px_rgba(91,77,255,0.25)] hover:shadow-[0_15px_35px_rgba(91,77,255,0.45)] transition-all duration-300"
            >
              {/* Glow filter behind the button */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] opacity-75 blur-md -z-10 transition-transform" />
              
              <Link
                href="/templates"
                style={{
                  background: 'linear-gradient(90deg, #5B4DFF, #A855F7, #FF5EA8)'
                }}
                className="flex items-center gap-2 px-8 py-3.5 text-white font-extrabold text-sm sm:text-base rounded-full tracking-wider uppercase whitespace-nowrap cursor-pointer hover:brightness-110 transition-all duration-200"
              >
                <span>✨ Check All Templates</span>
                <LayoutGrid size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- REPUTABLE COMPANY LOGOS WORKSPACE --- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            RESUMES OPTIMIZED TO CLEAR SCREENINGS AT COMPANIES NATIONWIDE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {COM_LOGOS.map((com, id) => (
              <span 
                key={id} 
                className="text-lg md:text-xl font-bold font-sans text-slate-500 tracking-tight select-none hover:text-slate-900 transition-colors"
              >
                {com.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION (RE-DESIGNED TIMELINE) --- */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden" id="how-it-works-block">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="space-y-4 max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF] bg-[#5B4DFF]/10 px-3.5 py-1.5 rounded-full">
              GUIDED PROCESS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              How FreeResume Works
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg">
              Create your ATS-friendly resume in minutes with our guided workflow.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[44px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#5B4DFF] to-[#FF5EA8] opacity-30 -z-10" />
            {/* Connecting Line (Mobile) */}
            <div className="absolute left-[39px] md:hidden top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#5B4DFF] to-[#FF5EA8] opacity-30 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
              {/* Step 1 */}
              <motion.div
                whileHover={{ y: -8 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 group bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B4DFF] to-[#A855F7] text-white flex items-center justify-center font-black text-xl shadow-md relative">
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[9px] font-black items-center justify-center">1</span>
                  </span>
                  <LayoutGrid size={24} />
                </div>
                <div className="space-y-1.5 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900">🎨 Choose Template</h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Browse professionally designed ATS-optimized templates and select the layout that fits your career.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                whileHover={{ y: -8 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 group bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#FF5EA8] text-white flex items-center justify-center font-black text-xl shadow-md relative">
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[9px] font-black items-center justify-center">2</span>
                  </span>
                  <FileText size={24} />
                </div>
                <div className="space-y-1.5 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900">✍️ Fill Resume Details</h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Add personal information, education, experience, skills, projects and certifications.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                whileHover={{ y: -8 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 group bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5EA8] to-orange-400 text-white flex items-center justify-center font-black text-xl shadow-md relative">
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[9px] font-black items-center justify-center">3</span>
                  </span>
                  <Sparkles size={24} className="animate-pulse" />
                </div>
                <div className="space-y-1.5 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900">🤖 AI Optimization</h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Receive smart suggestions and keyword improvements for better ATS compatibility.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                whileHover={{ y: -8 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 group bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-[#5B4DFF] text-white flex items-center justify-center font-black text-xl shadow-md relative">
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[9px] font-black items-center justify-center">4</span>
                  </span>
                  <Download size={24} />
                </div>
                <div className="space-y-1.5 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900">📄 Download PDF</h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Generate a clean, recruiter-friendly PDF instantly and start applying.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW ATS RESUME SCORE WORKS --- */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        {/* Decorative ambient glowing orbits */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#5B4DFF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#FF5EA8]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="space-y-4 max-w-3xl mx-auto text-center mb-20 animate-fade-in">
            <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF] bg-[#5B4DFF]/10 px-4 py-1.5 rounded-full">
              INTELLIGENT RECRUITER SIMULATION
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              How ATS Resume Score Works
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg">
              Our ATS engine simulates how recruiters and applicant tracking systems analyze your resume before shortlisting candidates.
            </p>
          </div>

          <div className="relative">
            {/* Animated progress line running behind cards on desktop */}
            <div className="hidden md:block absolute top-[44px] left-[12.5%] right-[12.5%] h-[4px] bg-slate-100 rounded-full overflow-hidden -z-10">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8]"
              />
            </div>
            {/* Animated progress line running behind cards on mobile */}
            <div className="md:hidden absolute left-[39px] top-12 bottom-12 w-[4px] bg-slate-100 rounded-full overflow-hidden -z-10">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10 text-left">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-5 group bg-white/70 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B4DFF] to-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-110 transition-transform relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-black pointer-events-none">1</span>
                  📄
                </div>
                <div className="space-y-2 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#5B4DFF] transition-colors leading-snug">
                    1️⃣ Resume Parsing
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    We extract and read your PDF or DOCX exactly like ATS systems used by TCS, Infosys, Accenture and other companies.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-5 group bg-white/70 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#FF5EA8] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-110 transition-transform relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-black pointer-events-none">2</span>
                  🎯
                </div>
                <div className="space-y-2 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#A855F7] transition-colors leading-snug">
                    2️⃣ Keyword Matching
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Important skills, technologies and job-specific keywords are compared against recruiter requirements to measure relevance.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-5 group bg-white/70 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5EA8] to-orange-400 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-110 transition-transform relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-black pointer-events-none">3</span>
                  ⚡
                </div>
                <div className="space-y-2 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors leading-snug">
                    3️⃣ Structure & Formatting
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Sections, headings, fonts, spacing and readability are checked to ensure maximum ATS compatibility.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex md:flex-col items-start md:items-center gap-6 md:gap-5 group bg-white/70 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-110 transition-transform relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-black pointer-events-none">4</span>
                  🚀
                </div>
                <div className="space-y-2 md:text-center">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    4️⃣ Score & AI Suggestions
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Receive an ATS score along with personalized recommendations to improve keyword coverage and increase interview chances.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE FREERESUME (UPGRADED CORE VALUE PROPOSITION) --- */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100" id="features-block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative">
          
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5EA8] bg-[#FF5EA8]/10 px-4 py-1.5 rounded-full">
              ELITE CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Why Choose FreeResume?
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg">
              Everything you need to build, optimize and download professional ATS-friendly resumes completely free.
            </p>
          </div>

          {/* 6 Premium Feature cards: 2 columns on desktop, 1 on mobile, equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
            {PREMIUM_FEATURES.map((feat, idx) => (
              <motion.div 
                key={feat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-8 bg-white border border-slate-150 rounded-[24px] flex flex-col sm:flex-row items-start gap-6 shadow-sm hover:shadow-xl transition-all duration-300 group ${feat.borderHover}`}
              >
                {/* Colorful gradient icon base */}
                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
                  {feat.emoji}
                </div>
                
                <div className="space-y-2 md:space-y-2.5 flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#5B4DFF] transition-colors leading-tight">
                        {feat.title}
                      </h3>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {feat.badge}
                      </span>
                    </div>
                    
                    <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* --- RESUME EXAMPLES BY CATEGORY SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100" id="resume-examples-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF] bg-[#5B4DFF]/10 px-4 py-1.5 rounded-full">
              CAREER EXAMPLES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Resume Examples by Profession
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Explore professionally designed resume examples tailored for different careers and industries. Select your profession to view matching templates and build your resume faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {EXAMPLES_CATEGORIES.map((cat, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: id * 0.04 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="h-full"
              >
                <Link 
                  href={`/templates?category=${cat.slug}`}
                  className="group flex items-center justify-between p-6 bg-white border border-slate-200/80 rounded-[24px] shadow-sm hover:shadow-xl hover:border-[#5B4DFF]/30 transition-all duration-300 text-left h-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#5B4DFF]/10 group-hover:scale-110 flex items-center justify-center text-2xl shadow-inner transition-all duration-300">
                      {cat.emoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base group-hover:text-[#5B4DFF] transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[#5B4DFF] text-xs font-extrabold flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        View Resume Examples 
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#5B4DFF] text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <Link 
              href="/resume-examples"
              className="inline-flex items-center gap-1.5 text-sm font-black text-purple-600 hover:underline cursor-pointer"
            >
              Learn more in the Examples Library
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>



      {/* --- BLOG WRITING GUIDES / CAREER RESOURCES --- */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100" id="guides-carousel-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF] bg-[#5B4DFF]/10 px-4 py-1.5 rounded-full">
              CAREER RESOURCES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Resume Writing Guides & Career Resources
            </h2>
            <p className="text-slate-600 font-normal text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Learn resume writing, ATS optimization, interview preparation, and career growth with expert guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {HOME_BLOG_ARTICLES.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="h-full"
              >
                <Link 
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col justify-between p-6 bg-white border border-slate-200/90 rounded-[24px] shadow-sm hover:shadow-xl hover:border-[#5B4DFF]/30 transition-all duration-300 h-full cursor-pointer block"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-[#5B4DFF]/10 flex items-center justify-center text-2xl shadow-inner transition-all duration-300">
                      {article.logo}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-950 text-base group-hover:text-[#5B4DFF] transition-colors leading-snug">
                        {article.title}
                      </h4>
                      
                      <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-3">
                        {article.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100/80 flex items-center justify-between text-xs font-extrabold text-slate-400 mt-6 relative z-10">
                    <span className="text-[#5B4DFF] text-xs font-black opacity-80 group-hover:opacity-100 transition-opacity">Read Article</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#5B4DFF] text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md cursor-pointer"
            >
              Explore Career Guides
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* --- SEO COMPLIANT ACCORDION FAQs SECTION --- */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12" id="faqs-accordion-block">
        
        <div className="space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            FAQS & TROUBLESHOOT
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 font-normal text-sm sm:text-base">
            Find immediate insights on core ATS compliance guidelines and offline resume generation rules.
          </p>
        </div>

        {/* 15 Rich SEO Accordion FAQs */}
        <div className="space-y-4 text-left">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-150 rounded-2xl shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-600' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </section>

      {/* --- LARGE GRADIENT BANNER FINAL CTA SECTION --- */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="landing-final-cta-section">
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-[2.5rem] p-8 md:p-16 text-white text-center space-y-8 relative overflow-hidden shadow-2xl shadow-pink-500/15">
          {/* Decorative spheres */}
          <div className="absolute top-[-30%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-96 h-96 bg-black/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase">
              🚀 PLACE SPRINT SESSIONS IS LIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-slate-100 opacity-90 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
              Compile your recruiter approved single-page vector PDF in minutes. No credit card, no registration thresholds, completely free.
            </p>
          </div>

          <div className="pt-4 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/builder"
              id="bottom-cta-build-free"
              className="px-8 py-4 bg-white text-purple-700 font-extrabold rounded-2xl shadow-xl hover:scale-105 active:scale-100 transition-all text-center flex items-center justify-center gap-1 group cursor-pointer"
            >
              Create My Resume Free
              <ArrowRight size={18} className="text-purple-600 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/templates"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-extrabold rounded-2xl border border-white/20 hover:scale-105 active:scale-100 transition-all text-center backdrop-blur-sm cursor-pointer"
            >
              View Templates Catalog
            </Link>
          </div>

          <div className="pt-4 opacity-75 text-[10px] sm:text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-6 text-white/95">
            <span className="flex items-center gap-1.5">✓ 100% Free Export</span>
            <span className="flex items-center gap-1.5">✓ Zero Sign Up Required</span>
            <span className="flex items-center gap-1.5">✓ Tested against Taleo/Workday</span>
          </div>

        </div>
      </section>

    </div>
  );
}
