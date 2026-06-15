'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { templates, categories } from '@/constants/templates';
import { ResumeTemplate } from '@/types/resume';
import { AdBanner } from '@/components/AdBanner';
import { RESUME_EXAMPLES } from '@/lib/resume-examples-db';
import { 
  FileText, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  X, 
  Check, 
  ChevronRight, 
  Star, 
  Briefcase, 
  Zap, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { TemplatesSidebarATSCard } from '@/components/TemplatesSidebarATSCard';
import TemplateThumbnail from '@/components/TemplateThumbnail';
import { dummyResumeData } from '@/constants/dummyData';
import { motion, AnimatePresence } from 'motion/react';

// Advanced filter metadata configuration corresponding to template IDs for precise matching
const TEMPLATE_METADATA: Record<string, { experience: string; style: string; industries: string[] }> = {
  'photo-sidebar': { experience: 'Senior / Executive', style: 'Classic', industries: ['Business', 'Marketing'] },
  'photo-circle': { experience: 'Entry / Fresher', style: 'Minimalist', industries: ['Creative', 'Tech', 'Marketing'] },
  'lawyer-classic': { experience: 'Senior / Executive', style: 'Classic', industries: ['Legal & Finance', 'Business'] },
  'minimal-pro': { experience: 'Senior / Executive', style: 'Minimalist', industries: ['Business', 'Legal & Finance'] },
  'pink-header': { experience: 'Entry / Fresher', style: 'Modern', industries: ['Business', 'Education'] },
  'classic': { experience: 'Mid-Level', style: 'Classic', industries: ['Business', 'Legal & Finance', 'Education'] },
  'modern': { experience: 'Entry / Fresher', style: 'Modern', industries: ['Tech', 'Engineering', 'Marketing'] },
  'minimal': { experience: 'Entry / Fresher', style: 'Minimalist', industries: ['Fresher', 'Tech', 'Education'] },
  'two-column': { experience: 'Mid-Level', style: 'Modern', industries: ['Engineering', 'Tech', 'Marketing'] },
  'premium': { experience: 'Mid-Level', style: 'Creative / Bold', industries: ['Marketing', 'Tech', 'Business'] },
  'executive': { experience: 'Senior / Executive', style: 'Creative / Bold', industries: ['Executive', 'Legal & Finance', 'Business'] },
  'redline': { experience: 'Senior / Executive', style: 'Creative / Bold', industries: ['Creative', 'Tech', 'Marketing'] },
  'navy': { experience: 'Mid-Level', style: 'Classic', industries: ['Healthcare', 'Education', 'Business'] },
  'serif': { experience: 'Mid-Level', style: 'Classic', industries: ['Education', 'Creative', 'Legal & Finance'] },
  'dark-navy': { experience: 'Senior / Executive', style: 'Creative / Bold', industries: ['Business', 'Engineering', 'Tech'] },
  'crimson': { experience: 'Entry / Fresher', style: 'Creative / Bold', industries: ['Business', 'Creative', 'Marketing'] },
  'black-yellow': { experience: 'Entry / Fresher', style: 'Creative / Bold', industries: ['Creative', 'Marketing', 'Tech'] },
  'luxury-gold': { experience: 'Senior / Executive', style: 'Creative / Bold', industries: ['Executive', 'Business', 'Legal & Finance'] }
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

const A4_W = 794;
const A4_H = 1123;

const PROFESSION_MAP: Record<string, { label: string; templates: string[] }> = {
  'software-engineer': {
    label: 'Software Engineer',
    templates: ['modern', 'dark-navy', 'premium']
  },
  'teacher': {
    label: 'Teacher',
    templates: ['minimal', 'classic', 'modern']
  },
  'marketing': {
    label: 'Marketing Executive',
    templates: ['premium', 'crimson', 'redline']
  },
  'executive': {
    label: 'Executive',
    templates: ['luxury-gold', 'executive']
  },
  'fresher': {
    label: 'Freshers',
    templates: ['minimal', 'classic', 'modern']
  },
  'nurse': {
    label: 'Nurse',
    templates: ['navy', 'classic', 'minimal']
  },
  'accountant': {
    label: 'Accountant',
    templates: ['lawyer-classic', 'minimal-pro', 'classic']
  },
  'sales-manager': {
    label: 'Sales Manager',
    templates: ['premium', 'executive', 'classic']
  },
  'customer-service': {
    label: 'Customer Service',
    templates: ['minimal', 'classic', 'modern']
  },
  'hr': {
    label: 'HR Manager',
    templates: ['minimal-pro', 'modern', 'minimal']
  },
  'designer': {
    label: 'Graphic Designer',
    templates: ['black-yellow', 'photo-circle', 'pink-header', 'redline']
  }
};

export default function TemplatesPage() {
  const router = useRouter();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);
  const [previewZoom, setPreviewZoom] = useState(0.85);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Custom states matching the requirements
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // References
  const stickyNavRef = useRef<HTMLDivElement>(null);

  // Read saved selected template from localStorage on mount & check URL query params
  useEffect(() => {
    const saved = localStorage.getItem('selectedTemplate') || 'modern';
    setSelectedTemplateId(saved);

    // Parse URL category parameter on initial mount/load
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      const decodedParam = catParam.toLowerCase();
      if (PROFESSION_MAP[decodedParam]) {
        setSelectedProfession(decodedParam);
        setSelectedCategory('All');
      } else {
        // Try direct tab match
        const matchedTab = categories.find(c => c.toLowerCase() === decodedParam);
        if (matchedTab) {
          setSelectedCategory(matchedTab);
        }
      }
    }
  }, []);

  // Synchronize category select changes back to the URL search parameter for shareable links
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedProfession) {
      url.searchParams.set('category', selectedProfession);
    } else if (selectedCategory !== 'All') {
      url.searchParams.set('category', selectedCategory.toLowerCase());
    } else {
      url.searchParams.delete('category');
    }
    // Update URL without a full page refresh
    window.history.replaceState(null, '', url.pathname + url.search);
  }, [selectedCategory, selectedProfession]);

  // Premium loading state simulation on filters and mounts to give high-end modern SaaS feel
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedProfession, searchQuery, selectedExperience, selectedStyle, selectedIndustry]);

  // Derive slug helper for correct SEO links
  const getTemplateSlug = (templateId: string) => {
    if (templateId === 'modern') return 'modern-clean';
    if (templateId === 'minimal') return 'minimalist';
    if (templateId === 'premium') return 'premium-indigo';
    if (templateId === 'classic') return 'classic-professional';
    if (templateId === 'photo-sidebar') return 'photo-classic';
    if (templateId === 'executive') return 'executive-dark';
    if (templateId === 'redline') return 'redline-bold';
    if (templateId === 'navy') return 'navy';
    if (templateId === 'serif') return 'serif-classic';
    if (templateId === 'black-yellow') return 'black-yellow-pro';
    return templateId;
  };

  // Filter templates list based on advanced inputs
  const filteredTemplates = templates.filter(template => {
    // Filter by selected profession first if active
    if (selectedProfession) {
      const activeProf = PROFESSION_MAP[selectedProfession];
      if (activeProf && !activeProf.templates.includes(template.id)) {
        return false;
      }
    }

    // 1. Category Filter Check (Sticky tabs)
    if (selectedCategory !== 'All' && template.category !== selectedCategory) {
      return false;
    }

    // 2. Search query check
    const searchableText = `${template.name} ${template.description} ${template.category}`.toLowerCase();
    if (searchQuery.trim() && !searchableText.includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Capture Metadata
    const meta = TEMPLATE_METADATA[template.id] || {
      experience: 'Mid-Level',
      style: 'Modern',
      industries: [template.category]
    };

    // 3. Experience Level filter check
    if (selectedExperience !== 'All' && meta.experience !== selectedExperience) {
      return false;
    }

    // 4. Style filter check
    if (selectedStyle !== 'All' && meta.style !== selectedStyle) {
      return false;
    }

    // 5. Industry filters
    if (selectedIndustry !== 'All') {
      const matchCategory = template.category.toLowerCase() === selectedIndustry.toLowerCase();
      const matchMetaIndustries = meta.industries.some(ind => ind.toLowerCase() === selectedIndustry.toLowerCase());
      if (!matchCategory && !matchMetaIndustries) {
        return false;
      }
    }

    return true;
  });

  // Action: apply selected template and direct to builder
  const handleSelectTemplate = (templateId: string) => {
    localStorage.setItem('selectedTemplate', templateId);
    setSelectedTemplateId(templateId);
    router.push('/builder');
  };

  // Open Preview Modal
  const handleOpenPreview = (template: any) => {
    setPreviewTemplate(template);
    // Adjust scale based on view size default
    if (window.innerWidth < 640) {
      setPreviewZoom(0.42);
    } else {
      setPreviewZoom(0.8);
    }
  };

  // Clear filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedExperience('All');
    setSelectedStyle('All');
    setSelectedIndustry('All');
    setSelectedProfession(null);
  };

  const handleClearProfession = () => {
    setSelectedProfession(null);
  };

  // Curated Popular Templates (Highlighted Section)
  const popularTemplates = templates.filter(t => ['modern', 'minimal', 'premium'].includes(t.id));

  // Dynamic Related Resume Examples derived from list
  const relatedExamples = Object.values(RESUME_EXAMPLES).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] font-sans selection:bg-[#4F46E5]/10 selection:text-[#4F46E5] relative overflow-hidden pb-20">
      
      {/* Soft background blur gradients matching homepage styling */}
      <div className="absolute top-[8%] left-[-15%] w-[450px] h-[450px] bg-[#4F46E5]/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-[35%] right-[-15%] w-[550px] h-[550px] bg-[#8B5CF6]/4 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[480px] h-[480px] bg-[#EC4899]/3 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Upper background banner wrap */}
      <div className="border-b border-[#ECECF5] py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Header Title Typography */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-extrabold rounded-full tracking-wider uppercase">
              <Sparkles size={12} className="animate-pulse" /> Verified Recruiter Spacing Layouts
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.05] sm:leading-tight lg:leading-tight font-sans text-center">
              Choose Your <br className="block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] inline-block">
                Resume Template
              </span>
            </h1>
            <p className="text-base lg:text-lg text-[#64748B] max-w-2xl mx-auto font-medium">
              Select from our professionally designed, ATS-optimized templates verified for freshers and executive professionals in India.
            </p>
            <div className="text-center">
              <Link 
                href="/ats-checker" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-[#8B5CF6] bg-[#4F46E5]/5 px-4 py-1.5 rounded-full transition-colors group border border-[#4F46E5]/15"
              >
                Already have a resume? Test your ATS compatibility with our free checker →
              </Link>
            </div>
          </div>

          {/* Dynamic Search Container above categories */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#4F46E5]/5 rounded-2xl blur group-hover:bg-[#4F46E5]/10 transition-colors duration-300 pointer-events-none"></div>
              <div className="relative bg-white border border-[#ECECF5] group-hover:border-[#4F46E5]/30 rounded-2xl flex items-center px-4 py-1 gap-3 shadow-lg hover:shadow-xl transition-all">
                <Search size={22} className="text-[#64748B] group-focus-within:text-[#4F46E5] transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query keywords, styles, or specific job categories..."
                  className="w-full py-3 bg-transparent text-sm focus:outline-none placeholder-[#64748B]/60 text-[#0F172A] font-medium truncate whitespace-nowrap overflow-hidden"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-[#FAFAFC] rounded-full text-[#64748B]"
                  >
                    <X size={16} />
                  </button>
                )}
                
                {/* Advanced filter toggle button inside bar */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                    showFilters || selectedExperience !== 'All' || selectedStyle !== 'All' || selectedIndustry !== 'All'
                      ? 'bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/15'
                      : 'bg-[#FAFAFC] text-[#64748B] hover:bg-[#4F46E5]/5 hover:text-[#4F46E5]'
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  <span className="hidden sm:inline">Filters</span>
                  {(selectedExperience !== 'All' || selectedStyle !== 'All' || selectedIndustry !== 'All') && (
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
                  )}
                </button>
              </div>
            </div>

            {/* EXPANDABLE ADVANCED FILTERS PANEL */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-[#ECECF5] rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30"
                >
                  {/* Experience Level */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-[#64748B] uppercase tracking-widest block">Experience Level</label>
                    <select 
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full p-3 bg-[#FAFAFC] hover:bg-[#FAFAFC]/60 border border-[#ECECF5] rounded-xl text-xs font-extrabold text-[#0F172A] focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      <option value="All">All Experience Levels</option>
                      <option value="Entry / Fresher">Entry / Fresher</option>
                      <option value="Mid-Level">Mid-Level</option>
                      <option value="Senior / Executive">Senior / Executive</option>
                    </select>
                  </div>

                  {/* Industry Area */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-[#64748B] uppercase tracking-widest block">Industry Focus</label>
                    <select 
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full p-3 bg-[#FAFAFC] hover:bg-[#FAFAFC]/60 border border-[#ECECF5] rounded-xl text-xs font-extrabold text-[#0F172A] focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      <option value="All">All Industries</option>
                      <option value="Tech">Tech & software</option>
                      <option value="Engineering">Core Engineering</option>
                      <option value="Business">Business Administration</option>
                      <option value="Marketing">Marketing / Branding</option>
                      <option value="Legal & Finance">Legal & Finance</option>
                      <option value="Creative">Creative / UX Design</option>
                      <option value="Healthcare">Healthcare & Medicine</option>
                      <option value="Education">Education & Academic</option>
                    </select>
                  </div>

                  {/* Style Format */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-[#64748B] uppercase tracking-widest block">Format Style</label>
                    <select 
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full p-3 bg-[#FAFAFC] hover:bg-[#FAFAFC]/60 border border-[#ECECF5] rounded-xl text-xs font-extrabold text-[#0F172A] focus:outline-none focus:border-[#4F46E5] cursor-pointer"
                    >
                      <option value="All">All Layout Styles</option>
                      <option value="Modern">Modern Minimalist</option>
                      <option value="Classic">Classic Corporate</option>
                      <option value="Minimalist">Whitespace Minimalist</option>
                      <option value="Creative / Bold">Creative & Accent Colors</option>
                    </select>
                  </div>

                  {/* Panel actions */}
                  <div className="md:col-span-3 flex justify-between items-center pt-4 border-t border-[#ECECF5] text-xs font-bold">
                    <span className="text-[#64748B] font-semibold uppercase">Advanced Search Settings</span>
                    <button 
                      onClick={handleResetFilters}
                      className="text-[#4F46E5] hover:text-[#4F46E5]/80 transition-colors uppercase"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>

      {/* STICKY CATEGORY NAVIGATION ROW */}
      <div 
        ref={stickyNavRef}
        className="sticky top-[64px] bg-white/90 backdrop-blur-md z-20 border-b border-[#ECECF5] py-4 px-4 sm:px-6 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category && !selectedProfession;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedProfession(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all duration-200 flex-shrink-0 border cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis ${
                    isActive 
                      ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md' 
                      : 'bg-white border-[#ECECF5] text-[#64748B] hover:bg-[#4F46E5]/10 hover:text-[#4F46E5] hover:border-[#4F46E5]/25'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          
          {/* Quick Result Counter */}
          <span className="text-xs font-bold text-[#64748B] whitespace-nowrap bg-white px-3 py-1.5 rounded-xl border border-[#ECECF5]">
            {filteredTemplates.length} templates
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ALL LISTINGS SECTION: (8 Cols on LG scale) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Profession / Career Active Warning Banner */}
            {selectedProfession && (
              <div className="bg-gradient-to-r from-[#4F46E5]/10 to-[#8B5CF6]/10 border border-[#4F46E5]/20 rounded-[24px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Career Filter Active</p>
                    <p className="text-sm font-extrabold text-[#0F172A]">
                      Showing templates optimized for <span className="text-[#4F46E5] font-black">{PROFESSION_MAP[selectedProfession]?.label || selectedProfession}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleClearProfession()}
                  className="px-4 py-1.5 bg-white border border-[#ECECF5] hover:bg-slate-50 font-extrabold text-xs text-slate-700 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1 shrink-0"
                >
                  <X size={14} /> Clear Career Filter
                </button>
              </div>
            )}
            
            {/* POPULAR TEMPLATES SECTION (STUNNING CONVERSION MODULE AT TOP) */}
            {selectedCategory === 'All' && !searchQuery && !selectedProfession && (
              <section 
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(139,92,246,0.04))'
                }}
                className="rounded-[40px] p-6 sm:p-10 border border-[#4F46E5]/10 space-y-8 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-[#0F172A] flex items-center gap-2 font-sans">
                      <Star size={20} className="text-[#4F46E5] fill-[#4F46E5]" />
                      Popular & Highly Rated Layouts
                    </h2>
                    <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">Most chosen templates by Indian professionals</p>
                  </div>
                  <span className="text-[10px] bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] text-white px-3 py-1 rounded-full font-extrabold uppercase shadow-md">Most Loved</span>
                </div>

                {/* Grid is responsive: 2 columns on mobile, 3 columns on tablet/desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {popularTemplates.map((template) => {
                    const isSelected = selectedTemplateId === template.id;
                    const meta = TEMPLATE_METADATA[template.id] || {
                      experience: 'Entry / Fresher',
                      style: 'Modern',
                      industries: [template.category]
                    };
                    return (
                      <div 
                        key={template.id}
                        className={`relative bg-white rounded-[28px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between h-full group ${
                          isSelected 
                            ? 'shadow-[0_0_25px_rgba(79,70,229,0.25)]' 
                            : 'shadow-sm hover:shadow-[0_15px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1.5'
                        }`}
                        style={{
                          border: isSelected ? '2px solid transparent' : '1px solid #ECECF5',
                          backgroundImage: isSelected ? 'linear-gradient(white, white), linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)' : 'none',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                        }}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] text-white p-1.5 rounded-full shadow-md animate-pulse">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="aspect-[8.5/11] relative overflow-hidden rounded-[24px] bg-[#F8FAFC] border border-[#ECECF5]">
                            <LiveTemplatePreview Template={template.component} />
                            
                            {/* Live overlay trigger details */}
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 items-center justify-center p-3">
                              <button
                                onClick={() => handleOpenPreview(template)}
                                className="w-full max-w-[130px] py-2 bg-white text-[#4F46E5] font-extrabold text-[10px] sm:text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                <Maximize2 size={12} /> Live Preview
                              </button>
                              <Link 
                                href={`/templates/${getTemplateSlug(template.id)}`}
                                className="w-full max-w-[130px] py-1.5 sm:py-2 bg-[#4F46E5] text-white font-extrabold text-[10px] sm:text-xs rounded-xl uppercase tracking-wider border border-white/20 hover:opacity-90 transition-opacity text-center"
                              >
                                SEO Detail
                              </Link>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                              <h3 className="font-extrabold text-lg sm:text-xl text-[#0F172A] leading-tight block break-words whitespace-normal">{template.name}</h3>
                              {template.ats && (
                                <span className="text-xs font-extrabold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase whitespace-nowrap">
                                  <CheckCircle2 size={10} /> ATS OK
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-bold text-[#64748B] uppercase tracking-widest">{template.category}</span>
                            
                            {/* Template specifications */}
                            <div className="mt-3 pt-2.5 border-t border-[#ECECF5] space-y-1.5 text-xs text-[#64748B] font-medium">
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

                        {/* Direct Click Action button */}
                        <button
                          onClick={() => handleSelectTemplate(template.id)}
                          style={{
                            background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)'
                          }}
                          className="mt-4 w-full py-2.5 sm:py-3 text-white font-extrabold text-sm rounded-[16px] shadow-sm shadow-[#4F46E5]/10 hover:shadow-[#4F46E5]/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 uppercase tracking-wider cursor-pointer"
                        >
                          <Check size={12} strokeWidth={3} />
                          Use Template
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* AD BANNER MID-PAGE BLOCK */}
            <AdBanner adSlot="templates-top-grid" className="rounded-2xl" />

            {/* MAIN TEMPLATE ITEMS GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECECF5]">
                <h2 className="text-xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2 font-sans">
                  <LayoutGrid size={18} className="text-[#64748B]" />
                  All Layouts Available
                </h2>
                <span className="text-xs font-bold text-[#64748B] uppercase">Interactive Grid</span>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-8 animate-pulse text-left">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white border border-[#ECECF5] rounded-[28px] p-6 h-[500px] flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                          <div className="h-4 bg-slate-150 rounded-full w-20" />
                          <div className="h-4 bg-slate-150 rounded-full w-14" />
                        </div>
                        <div className="aspect-[8.5/11] bg-slate-100/60 rounded-[24px] h-[280px]" />
                        <div className="space-y-3">
                          <div className="h-5 bg-slate-150 rounded-full w-2/3" />
                          <div className="h-4 bg-slate-100 rounded-full w-full" />
                        </div>
                      </div>
                      <div className="h-10 bg-slate-150 rounded-xl w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  {filteredTemplates.map((template, index) => {
                    const isSelected = selectedTemplateId === template.id;
                    const meta = TEMPLATE_METADATA[template.id] || {
                      experience: 'Entry / Fresher',
                      style: 'Modern',
                      industries: [template.category]
                    };
                    return (
                      <React.Fragment key={template.id}>
                        <div 
                          className={`relative bg-white rounded-[28px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between h-full group ${
                            isSelected 
                              ? 'shadow-[0_0_25px_rgba(79,70,229,0.25)]' 
                              : 'shadow-sm hover:shadow-[0_15px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1.5'
                          }`}
                          style={{
                            border: isSelected ? '2px solid transparent' : '1px solid #ECECF5',
                            backgroundImage: isSelected ? 'linear-gradient(white, white), linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)' : 'none',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                          }}
                        >
                          {isSelected && (
                            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] text-white p-1.5 rounded-full shadow-md animate-pulse">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          )}

                          <div>
                            {/* Inner Badge strip */}
                            <div className="mb-3 flex items-center justify-between flex-wrap gap-1.5">
                              <span className="text-xs font-extrabold text-[#4F46E5] bg-[#4F46E5]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase">
                                {template.category}
                              </span>
                              {template.ats && (
                                <span className="text-xs font-extrabold text-white bg-[#22C55E] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 uppercase whitespace-nowrap">
                                  <CheckCircle2 size={10} /> ATS OK
                                </span>
                              )}
                            </div>

                            {/* Live Rendering preview container */}
                            <div className="aspect-[8.5/11] relative overflow-hidden rounded-[24px] bg-[#F8FAFC] border border-[#ECECF5] mb-4">
                              <LiveTemplatePreview Template={template.component} />
                              
                              {/* Hover slide overlay */}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 items-center justify-center p-2 sm:p-4">
                                <button
                                  onClick={() => handleOpenPreview(template)}
                                  className="w-full max-w-[140px] py-1.5 sm:py-2.5 bg-white text-[#4F46E5] font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors uppercase tracking-wider cursor-pointer"
                                >
                                  <Eye size={12} /> Live Preview
                                </button>
                                
                                <Link 
                                  href={`/templates/${getTemplateSlug(template.id)}`}
                                  className="w-full max-w-[140px] py-1.5 sm:py-2.5 bg-[#4F46E5] text-white font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity uppercase tracking-wider border border-white/20 text-center"
                                >
                                  <Maximize2 size={12} /> Full Details
                                </Link>
                              </div>
                            </div>

                            {/* Card Copy Details */}
                            <div className="space-y-1.5 px-0.5">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <h3 className="font-extrabold text-lg sm:text-xl text-[#0F172A] tracking-tight group-hover:text-[#4F46E5] transition-colors break-words whitespace-normal">
                                  {template.name}
                                </h3>
                              </div>
                              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed line-clamp-2 font-medium break-words whitespace-normal">
                                {template.description}
                              </p>
                              
                              {/* Advanced parameters for Item 9 */}
                              <div className="mt-3 pt-2.5 border-t border-[#ECECF5] space-y-1.5 text-xs text-[#64748B] font-medium">
                                <div className="flex justify-between items-center">
                                  <span>Style:</span>
                                  <span className="font-extrabold text-[#0F172A]">{meta.style}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Experience:</span>
                                  <span className="font-extrabold text-[#0F172A]">{meta.experience}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Industry:</span>
                                  <span className="font-extrabold text-[#0F172A]">{meta.industries[0]}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* USE TEMPLATE DIRECT CALL TO ACTION ON EVERY CARD */}
                          <div className="mt-4 pt-3 border-t border-[#ECECF5]">
                            <button
                              onClick={() => handleSelectTemplate(template.id)}
                              style={{
                                background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)'
                              }}
                              className="w-full py-2.5 sm:py-3 text-white font-extrabold text-sm rounded-[16px] shadow-sm shadow-[#4F46E5]/10 hover:shadow-[#4F46E5]/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 uppercase tracking-wider cursor-pointer"
                            >
                              <Check size={12} strokeWidth={3} />
                              Use Template
                            </button>
                          </div>
                        </div>

                        {/* Mid Grid Ad Placement logic */}
                        {(index + 1) % 6 === 0 && (
                          <div className="col-span-2 w-full py-4">
                            <AdBanner adSlot={`template-grid-${index}`} className="rounded-xl shadow-sm border border-[#ECECF5]/80" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[28px] border border-[#ECECF5] shadow-sm space-y-4">
                  <FileText size={48} className="text-[#64748B]/30 mx-auto animate-pulse" />
                  <div className="space-y-1">
                    <p className="text-[#0F172A] font-extrabold">No Templates Found Matching Your Search Criteria</p>
                    <p className="text-[#64748B] text-xs max-w-sm mx-auto">Try resetting details or typing a simpler key descriptor word check.</p>
                  </div>
                  <button 
                    onClick={handleResetFilters}
                    style={{
                      background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)'
                    }}
                    className="px-5 py-2.5 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              )}
            </div>

            {/* COMPREHENSIVE RECRUITER INFO PANEL */}
            <section className="bg-white border border-[#ECECF5] rounded-[32px] p-8 sm:p-10 space-y-6">
              <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">Understanding ATS Scan Matching</h2>
              <p className="text-sm text-[#64748B] leading-relaxed font-semibold">
                Major recruiters in India such as <strong className="text-[#0F172A]">TCS, WIPRO, Infosys, and HDFC Bank</strong> process thousands of CVs daily using parsing engines. If templates are improperly built, your data stays invisible:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4 text-xs font-semibold">
                <div className="space-y-3 bg-[#22C55E]/5 p-6 rounded-3xl border border-[#22C55E]/15">
                  <h3 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#22C55E]" /> Guaranteed ATS Optimization</h3>
                  <ul className="space-y-2 text-[#64748B]">
                    <li className="flex items-start gap-1.5">• Use of standard headers (Experience, Education)</li>
                    <li className="flex items-start gap-1.5">• High contrast pure Inter readable elements</li>
                    <li className="flex items-start gap-1.5">• Seamless chronological left margin ordering</li>
                    <li className="flex items-start gap-1.5">• Text parsing logic avoiding graphics traps</li>
                  </ul>
                </div>
                <div className="space-y-3 bg-[#4F46E5]/5 p-6 rounded-3xl border border-[#4F46E5]/15">
                  <h3 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-1.5"><TrendingUp size={16} className="text-[#4F46E5]" /> Recommended Matching Types</h3>
                  <p className="text-[#64748B] leading-relaxed font-semibold">
                    1. <strong>Classic layout:</strong> Highly ideal for high-volume traditional IT and service sectors.<br/>
                    2. <strong>Modern formatting:</strong> Safest for active startup ecosystems, developers, and designers.<br/>
                    3. <strong>Sleek minimal:</strong> Safest choice for freshmen or people creating a first resume draft.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR PANEL: (4 Cols on LG scale) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              <TemplatesSidebarATSCard />
              <AdBanner adSlot="templates-right-sidebar" adFormat="rectangle" className="h-[400px] rounded-2xl" />
            </div>
          </div>

        </div>

        {/* RELATED RESUME EXAMPLES SECTION (BOTTOM HIGHLIGHT FEATURE) */}
        <section className="mt-24 border-t border-[#ECECF5] pt-16 space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-none flex items-center justify-center md:justify-start gap-2 font-sans">
              <Briefcase className="text-[#4F46E5]" size={24} />
              Featured Freshers Resume Examples
            </h2>
            <p className="text-[#64748B] text-sm md:text-base font-medium">
              Explore step-by-step role guides, keywords, and samples to help customize your selected layout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedExamples.map((ex) => (
              <Link 
                key={ex.slug}
                href={`/resume-examples/${ex.slug}`}
                className="bg-white border border-[#ECECF5] rounded-[24px] p-6 shadow-sm hover:shadow-lg hover:border-[#4F46E5]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors leading-tight">
                      {ex.role}
                    </h3>
                    <p className="text-[9px] text-[#4F46E5] font-extrabold uppercase mt-1">Starting Salary: {ex.marketSalary.split(" - ")[0]}</p>
                  </div>
                  <p className="text-[#64748B] text-xs line-clamp-3 leading-relaxed">
                    {ex.objective}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#ECECF5] flex items-center justify-between text-xs font-bold text-[#4F46E5] uppercase tracking-wider font-semibold">
                  <span>View Career Guide</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BOTTOM AD BANNER */}
        <AdBanner adSlot="templates-page-bottom" className="mt-16 rounded-2xl" />

      </main>

      {/* FULL-SCREEN INTERACTIVE TEMPLATE PREVIEW DIALOG MODAL Overlay */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-[#0F172A] rounded-[32px] w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[#ECECF5]"
            >
              
              {/* Modal header details bar */}
              <div className="p-6 border-b border-[#ECECF5] flex items-center justify-between gap-4 flex-shrink-0 bg-white/50 backdrop-blur">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-lg text-[#0F172A]">{previewTemplate.name}</h3>
                    <span className="text-[10px] bg-[#4F46E5] text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">{previewTemplate.category}</span>
                    <span className="text-[10px] bg-[#22C55E]/10 text-[#22C55E]/90 border border-[#22C55E]/20 px-2.5 py-0.5 rounded font-extrabold uppercase">100% ATS Spaced</span>
                  </div>
                  <p className="text-xs text-[#64748B] capitalize font-medium">{previewTemplate.description}</p>
                </div>
                
                <button 
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-[#FAFAFC] rounded-full text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Grid Section: Render sheet and CTAs */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-[#FAFAFC]">
                
                {/* Visual rendering panel */}
                <div className="md:col-span-7 flex flex-col items-center">
                  <div 
                    className="overflow-auto max-w-full bg-[#F8FAFC] border border-[#ECECF5] rounded-3xl p-4 flex items-start justify-center shadow-inner relative group"
                    style={{ height: '520px', width: '100%' }}
                  >
                    {/* Fullscreen icon trigger */}
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm border border-[#ECECF5] hover:bg-white text-[#4F46E5] rounded-xl shadow-md transition-all flex items-center gap-1.5 text-xs font-bold uppercase cursor-pointer pointer-events-auto"
                    >
                      <Maximize2 size={14} /> Fullscreen Mode
                    </button>

                    <div
                      className="shadow-2xl transition-all duration-300 bg-white"
                      style={{
                        width: A4_W,
                        height: A4_H,
                        transform: `scale(${previewZoom})`,
                        transformOrigin: "top center",
                        pointerEvents: "none",
                      }}
                    >
                      <previewTemplate.component data={dummyResumeData} />
                    </div>
                  </div>

                  {/* Zoom controller bar */}
                  <div className="mt-4 flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#ECECF5] shadow">
                    <button 
                      onClick={() => setPreviewZoom(prev => Math.max(0.35, prev - 0.05))}
                      className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <span className="text-[11px] font-mono font-bold text-[#0F172A] w-16 text-center select-none">
                      {Math.round(previewZoom * 100)}% scale
                    </span>
                    <button 
                      onClick={() => setPreviewZoom(prev => Math.min(1.1, prev + 0.05))}
                      className="p-1 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>
                </div>

                {/* Selling point copy panel list & Direct CTA selection button */}
                <div className="md:col-span-5 space-y-6 text-[#0F172A]">
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-xs uppercase tracking-widest text-[#64748B]">Template Specifications</h4>
                    
                    <div className="space-y-2 text-sm bg-white border border-[#ECECF5] p-5 rounded-[20px] shadow-sm">
                      <div className="flex justify-between border-b border-[#ECECF5] pb-2">
                        <span className="text-[#64748B] font-semibold">Template Name</span>
                        <span className="font-extrabold text-[#0F172A]">{previewTemplate.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#ECECF5] pb-2">
                        <span className="text-[#64748B] font-semibold">Style</span>
                        <span className="font-extrabold text-[#0F172A]">{(TEMPLATE_METADATA[previewTemplate.id] || { style: 'Modern' }).style}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#ECECF5] pb-2">
                        <span className="text-[#64748B] font-semibold">Experience Level</span>
                        <span className="font-extrabold text-[#0F172A]">{(TEMPLATE_METADATA[previewTemplate.id] || { experience: 'Entry / Fresher' }).experience}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-[#64748B] font-semibold">Industry</span>
                        <span className="font-extrabold text-[#0F172A]">{(TEMPLATE_METADATA[previewTemplate.id] || { industries: [previewTemplate.category] }).industries.join(', ')}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-[#4F46E5]/5 p-4 rounded-2xl border border-[#4F46E5]/10">
                        <CheckCircle2 size={18} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-[#0F172A]">ATS Spacing Validated • 100% Friendly</div>
                          <p className="text-[11px] text-[#64748B] leading-normal font-medium mt-1">Pre-tested over Indian parsing standards like TCS and HDFC bank to confirm correct parser scores.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#ECECF5]">
                        <CheckCircle2 size={18} className="text-[#4F46E5] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-[#0F172A]">Pure Inter Typography</div>
                          <p className="text-[11px] text-[#64748B] leading-normal font-medium mt-1">Extremely legible and modern visual formatting ensuring your achievements read clear.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#ECECF5] text-center space-y-4">
                    <button
                      onClick={() => handleSelectTemplate(previewTemplate.id)}
                      style={{
                        background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)'
                      }}
                      className="w-full py-4 text-white font-extrabold rounded-[16px] shadow-xl shadow-[#4F46E5]/15 hover:shadow-[#4F46E5]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer uppercase text-sm tracking-wider"
                    >
                      <Check size={18} strokeWidth={3} />
                      <span>Use This Selected Layout</span>
                    </button>
                    <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                      Free Download PDF • No registration required
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Overlay Mode */}
      <AnimatePresence>
        {isFullscreen && previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/95 backdrop-blur-lg z-[60] flex flex-col"
          >
            {/* Fullscreen Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                  {previewTemplate.name} <span className="text-[10px] bg-[#4F46E5] text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">{previewTemplate.category}</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">Fullscreen Live HD Template Preview • Ideal for ATS Checkers</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Use template inside fullscreen */}
                <button
                  onClick={() => {
                    setIsFullscreen(false);
                    handleSelectTemplate(previewTemplate.id);
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #4F46E5, #8B5CF6, #EC4899)'
                  }}
                  className="px-5 py-2.5 text-white font-extrabold text-xs rounded-[12px] shadow-lg flex items-center gap-1.5 uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Check size={14} strokeWidth={3} /> Use Template
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Fullscreen Contents */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center">
              <div 
                className="bg-white rounded-lg shadow-2xl transition-all duration-300"
                style={{
                  width: A4_W,
                  height: A4_H,
                  transform: `scale(${Math.max(0.4, previewZoom * 1.25)})`,
                  transformOrigin: "top center",
                  pointerEvents: "none"
                }}
              >
                <previewTemplate.component data={dummyResumeData} />
              </div>
            </div>

            {/* Floating Zoom Controllers at Bottom */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-center gap-4">
              <button 
                onClick={() => setPreviewZoom(prev => Math.max(0.35, prev - 0.05))}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full cursor-pointer"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-xs font-mono font-bold text-slate-200">
                {Math.round(previewZoom * 1.25 * 100)}% scale
              </span>
              <button 
                onClick={() => setPreviewZoom(prev => Math.min(1.5, prev + 0.05))}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full cursor-pointer"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

