'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  Layout, 
  Upload, 
  Image as ImageIcon,
  ChevronDown,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Languages,
  FolderGit2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Download,
  Award
} from 'lucide-react';
import { AdBanner } from './AdBanner';
import { motion, AnimatePresence } from 'motion/react';
import { templates } from "@/constants/templates";
import { dummyResumeData } from "@/constants/dummyData";
import { toast } from 'sonner';
import PDFDownloadButton from './PDFDownloadButton';

const resumeSchema = z.object({
  id: z.string().optional(),
  uid: z.string(),
  title: z.string().min(1, 'Title is required'),
  template: z.enum([
    'classic',
    'modern',
    'minimal',
    'two-column',
    'premium',
    'executive',
    'fresher-india',
    'redline',
    'navy',
    'serif',
    'tech-modern',
    'business-classic',
    'fresher-minimal',
    'photo-sidebar',
    'photo-circle',
    'lawyer-classic',
    'minimal-pro',
    'pink-header',
    'dark-navy',
    'crimson',
    'black-yellow',
    'luxury-gold',
  ]),
  personalInfo: z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string().min(1, 'Location is required'),
    summary: z.string().min(10, 'Summary should be at least 10 characters'),
    profileImage: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  }),
  education: z.array(
    z.object({
      school: z.string().min(1, 'School is required'),
      degree: z.string().min(1, 'Degree is required'),
      year: z.string().min(1, 'Year is required'),
    })
  ),
  experienceType: z.enum(['fresher', 'experienced']).optional(),
  fresherAcademicWork: z.string().optional(),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      duration: z.string(),
      description: z.string(),
    })
  ),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, 'Skill name is required'),
        level: z.number().min(0).max(100),
      })
    )
    .min(1, 'At least one skill is required'),
  languages: z.array(
    z.object({
      name: z.string().min(1, 'Language name is required'),
      level: z.number().min(0).max(100),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      link: z.string().optional(),
      technologies: z.string().optional(),
      duration: z.string().optional(),
      githubUrl: z.string().optional(),
      liveUrl: z.string().optional(),
      bullets: z.array(z.string()).optional(),
    })
  ),
  internships: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      duration: z.string(),
      location: z.string().optional(),
      description: z.string(),
      achievements: z.string().optional(),
    })
  ).optional(),
  volunteerExperience: z.array(
    z.object({
      organization: z.string(),
      role: z.string(),
      duration: z.string(),
      description: z.string(),
      achievements: z.string().optional(),
    })
  ).optional(),
  achievements: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      date: z.string(),
      description: z.string(),
    })
  ).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.experienceType === 'experienced') {
    if (data.experience && data.experience.length > 0) {
      data.experience.forEach((exp, idx) => {
        if (!exp.company || exp.company.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Company Name is required',
            path: ['experience', idx, 'company'],
          });
        }
        if (!exp.position || exp.position.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Job Title is required',
            path: ['experience', idx, 'position'],
          });
        }
      });
    }
  }
});

interface ResumeFormProps {
  initialData: ResumeData;
  onChange: (data: ResumeData) => void;
  onSave: (data: ResumeData) => void;
  isSaving: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ initialData, onChange, onSave, isSaving }) => {
  const router = useRouter();

  // Multi-step form state
  const [activeStep, setActiveStep] = useState(1);

  // Synchronize activeStep with browser history state so back button works perfectly on mobile!
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Replace the initial state with step 1 so popstate knows where to stop
    if (!window.history.state) {
      window.history.replaceState({ step: 1 }, '');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentHistoryState = window.history.state;
    if (!currentHistoryState || currentHistoryState.step !== activeStep) {
      // Only push if the new step is different
      window.history.pushState({ step: activeStep }, '');
    }
  }, [activeStep]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.step === 'number') {
        setActiveStep(e.state.step);
      } else {
        setActiveStep(1);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Expanded/collapsed states for section cards
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    education: true,
    experience: true,
    skills: true,
    languages: true,
    projects: true,
    internships: true,
    volunteer: true,
    achievements: true,
  });

  // AI loading indicator map
  const [loadingAISug, setLoadingAISug] = useState<Record<string, boolean>>({});
  
  // Suggested skills store for quick badge bank
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  const inputClass =
    'w-full h-[52px] px-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300';
  const labelClass = 'text-xs font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider block';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue('personalInfo.profileImage', base64String);
      toast.success('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: projFields, append: appendProj, remove: removeProj, insert: insertProj } = useFieldArray({ control, name: 'projects' });
  const { fields: internshipFields, append: appendInternship, remove: removeInternship } = useFieldArray({ control, name: 'internships' as any });
  const { fields: volunteerFields, append: appendVolunteer, remove: removeVolunteer } = useFieldArray({ control, name: 'volunteerExperience' as any });
  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({ control, name: 'achievements' as any });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: 'languages' });

  const watchedData = watch();
  const lastSentData = React.useRef<string>(JSON.stringify(initialData));
  const dataStr = JSON.stringify(watchedData);

  React.useEffect(() => {
    if (dataStr !== lastSentData.current) {
      lastSentData.current = dataStr;
      onChange(watchedData);
    }
  }, [dataStr, onChange, watchedData]);

  const initialDataStr = JSON.stringify(initialData);

  React.useEffect(() => {
    if (initialDataStr !== lastSentData.current) {
      lastSentData.current = initialDataStr;
      reset(initialData);
    }
  }, [initialDataStr, reset, initialData]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Central suggestion caller
  const handleAISuggest = async (type: string, payload: any, applyCallback: (text: string) => void) => {
    const key = `${type}-${payload.index || 'main'}`;
    setLoadingAISug(prev => ({ ...prev, [key]: true }));
    toast.promise(
      (async () => {
        const res = await fetch('/api/ai/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, payload })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (data.text) {
          applyCallback(data.text);
          return data.text;
        }
        throw new Error("Empty response");
      })(),
      {
        loading: 'Consulting Gemini AI...',
        success: () => {
          setLoadingAISug(prev => ({ ...prev, [key]: false }));
          return 'AI suggestion applied wonderfully! ✨';
        },
        error: (err) => {
          setLoadingAISug(prev => ({ ...prev, [key]: false }));
          return `AI Suggest failed: ${err.message}`;
        }
      }
    );
  };

  // Suggest specific skills using AI
  const handleAISkillsSuggest = async () => {
    const key = 'skills-suggest';
    setLoadingAISug(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'skills',
          payload: {
            title: watchedData.title,
            currentSkills: watchedData.skills?.map(s => s.name).join(', ')
          }
        })
      });
      const data = await res.json();
      if (data.text) {
        const items = data.text.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
        setSuggestedSkills(items);
        toast.success("Loaded AI suggested skills bank!");
      }
    } catch (err) {
      toast.error("Failed to suggest skills with AI");
    } finally {
      setLoadingAISug(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleAddSuggestedSkill = (skillName: string) => {
    // Check if skill already exists
    const exists = watchedData.skills?.some(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      toast.info(`"${skillName}" is already in your skills list`);
      return;
    }
    appendSkill({ name: skillName, level: 85 });
    setSuggestedSkills(prev => prev.filter(s => s !== skillName));
    toast.success(`Positioned "${skillName}" inside list!`);
  };

  const activeTemplate = templates.find(t => t.id === watchedData.template) || templates[0];

  return (
    <div className="space-y-6">
      {/* 4-Step Indicator */}
      <div className="relative bg-white border border-[#ECECF5] p-3 sm:p-6 rounded-[20px] sm:rounded-[24px] shadow-sm mb-2 overflow-hidden mx-1 sm:mx-0">
        {/* Glow behind step indicator */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-[#5B4DFF]/15 to-[#FF5EA8]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative flex justify-between items-center max-w-lg mx-auto gap-1">
          {/* Progress Connecting Line */}
          <div className="absolute left-[8%] right-[8%] top-[14px] sm:top-[20px] h-[3px] sm:h-[4px] bg-[#ECECF5] -translate-y-1/2 z-0 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8]"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {[
            { num: 1, label: 'Profile' },
            { num: 2, label: 'Education' },
            { num: 3, label: 'Skills' },
            { num: 4, label: 'Finish' },
          ].map((item) => {
            const isActive = activeStep === item.num;
            const isCompleted = activeStep > item.num;
            
            return (
              <button
                key={item.num}
                type="button"
                onClick={() => setActiveStep(item.num)}
                className="z-10 flex flex-col items-center group focus:outline-none flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-sm shadow-md transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] text-white ring-2 sm:ring-4 ring-[#5B4DFF]/10 ring-offset-1 sm:ring-offset-2'
                      : isCompleted
                      ? 'bg-gradient-to-r from-[#A855F7] to-[#FF5EA8] text-white'
                      : 'bg-white border text-xs border-[#ECECF5] text-[#64748B] group-hover:border-[#5B4DFF]/30 group-hover:text-[#5B4DFF]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={3} /> : item.num}
                </motion.div>
                <span className={`text-[9px] sm:text-xs font-semibold sm:font-bold uppercase mt-1 sm:mt-2 tracking-wider ${
                  isActive ? 'text-[#5B4DFF]' : 'text-[#64748B]'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-6 pb-28">
        
        {/* STEP 1: PERSONAL INFORMATION */}
        <AnimatePresence mode="wait">
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Personal Info Card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('personal')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <User size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Personal Information</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your contact details and career objectives.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.personal ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.personal && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={labelClass}>Resume Title</label>
                          <input {...register('title')} className={inputClass} placeholder="e.g. Senior Frontend Engineer" />
                          {errors.title && <p className="text-xs text-red-500 font-semibold">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>Full Name</label>
                          <input {...register('personalInfo.fullName')} className={inputClass} placeholder="John Doe" />
                          {errors.personalInfo?.fullName && <p className="text-xs text-red-500 font-semibold">{errors.personalInfo.fullName.message}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>Email Address</label>
                          <input {...register('personalInfo.email')} className={inputClass} placeholder="john.doe@example.com" />
                          {errors.personalInfo?.email && <p className="text-xs text-red-500 font-semibold">{errors.personalInfo.email.message}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>Phone Number</label>
                          <input {...register('personalInfo.phone')} className={inputClass} placeholder="+1 (555) 019-2834" />
                          {errors.personalInfo?.phone && <p className="text-xs text-red-500 font-semibold">{errors.personalInfo.phone.message}</p>}
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className={labelClass}>Location / City, Country</label>
                          <input {...register('personalInfo.location')} className={inputClass} placeholder="San Francisco, CA" />
                          {errors.personalInfo?.location && <p className="text-xs text-red-500 font-semibold">{errors.personalInfo.location.message}</p>}
                        </div>

                        {/* Profile Image upload card */}
                        <div className="space-y-1 md:col-span-2">
                          <label className={labelClass}>Profile Photo (Optional)</label>
                          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all group relative">
                            <div className="relative w-24 h-24 shrink-0">
                              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                                {watchedData.personalInfo.profileImage ? (
                                  <img referrerPolicy="no-referrer" src={watchedData.personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-[#E2E8F0] flex flex-col items-center justify-center text-slate-400">
                                    <ImageIcon size={32} strokeWidth={1.5} />
                                  </div>
                                )}
                              </div>
                              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-[1px]">
                                <Upload size={18} className="text-white animate-bounce" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                              </label>
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                              <p className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">Change Image</p>
                              <p className="text-xs text-[#64748B] font-medium leading-relaxed">JPG or PNG format. Clean corporate headshots are prioritized for ATS.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className={labelClass}>LinkedIn URL</label>
                          <input {...register('personalInfo.linkedin')} className={inputClass} placeholder="linkedin.com/in/username" />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>GitHub URL</label>
                          <input {...register('personalInfo.github')} className={inputClass} placeholder="github.com/username" />
                        </div>

                        {/* Professional Summary */}
                        <div className="space-y-1 md:col-span-2 mt-2">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Professional Summary</label>
                            <button
                              type="button"
                              onClick={() => {
                                handleAISuggest('summary', {
                                  fullName: watchedData.personalInfo.fullName,
                                  skills: watchedData.skills?.map(s => s.name).join(', '),
                                  title: watchedData.title
                                }, (text) => setValue('personalInfo.summary', text));
                              }}
                              disabled={loadingAISug['summary-main']}
                              className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                            >
                              {loadingAISug['summary-main'] ? (
                                <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Sparkles size={13} className="text-[#5B4DFF]" />
                              )}
                              AI Suggest
                            </button>
                          </div>
                          <textarea 
                            {...register('personalInfo.summary')} 
                            rows={5} 
                            className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                            placeholder="Write a highly focused summary detailing your greatest achievements..."
                          />
                          {errors.personalInfo?.summary && <p className="text-xs text-red-500 font-semibold">{errors.personalInfo.summary.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: EDUCATION & EXPERIENCE */}
        <AnimatePresence mode="wait">
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Education section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('education')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Education</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your academic background and major qualifications.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.education ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.education && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div className="flex justify-between items-center sm:pt-2">
                          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Degrees & Academic Records</span>
                          <button
                            type="button"
                            onClick={() => appendEdu({ school: '', degree: '', year: '' })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                          >
                            <Plus size={14} /> Add Education
                          </button>
                        </div>

                        {eduFields.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-400">No education entries added yet. Provide at least one.</p>
                          </div>
                        )}

                        {eduFields.map((field, index) => (
                          <div key={field.id} className="p-4 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all space-y-4 relative group">
                            <button
                              type="button"
                              onClick={() => removeEdu(index)}
                              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className={labelClass}>School / University</label>
                                <input {...register(`education.${index}.school`)} placeholder="e.g. Stanford University" className={inputClass} />
                              </div>
                              <div className="space-y-1">
                                <label className={labelClass}>Degree / Field of Study</label>
                                <input {...register(`education.${index}.degree`)} placeholder="e.g. Bachelor of Science in CS" className={inputClass} />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <label className={labelClass}>Year / Duration</label>
                                <input {...register(`education.${index}.year`)} placeholder="e.g. 2020 - 2024" className={inputClass} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Experience section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('experience')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Experience</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your work history, roles, and job accomplishments.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.experience ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.experience && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        {/* Selector for Fresher vs Experienced */}
                        <div className="bg-[#F8FAFC] border border-[#ECECF5] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block mb-1">Work Experience Type</span>
                            <p className="text-[11px] text-[#64748B] font-medium">Choose whether you have corporate/work experience or are just starting out.</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#5B4DFF]/50 transition-all text-xs font-bold text-[#0F172A] select-none shadow-sm">
                              <input
                                type="radio"
                                value="fresher"
                                checked={watchedData.experienceType === 'fresher'}
                                onChange={() => setValue('experienceType', 'fresher')}
                                className="w-4 h-4 text-[#5B4DFF] focus:ring-[#5B4DFF]/10 border-gray-300"
                              />
                              <span>Fresher / No Experience</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#5B4DFF]/50 transition-all text-xs font-bold text-[#0F172A] select-none shadow-sm">
                              <input
                                type="radio"
                                value="experienced"
                                checked={watchedData.experienceType === 'experienced'}
                                onChange={() => setValue('experienceType', 'experienced')}
                                className="w-4 h-4 text-[#5B4DFF] focus:ring-[#5B4DFF]/10 border-gray-300"
                              />
                              <span>Experienced</span>
                            </label>
                          </div>
                        </div>

                        {watchedData.experienceType === 'fresher' ? (
                          <div className="space-y-6">
                            <div className="p-5 bg-gradient-to-br from-[#5B4DFF]/5 via-[#A855F7]/5 to-[#FF5EA8]/5 border border-[#ECECF5] rounded-2xl flex items-start gap-4 shadow-sm">
                              <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#5B4DFF] shrink-0 border border-gray-100 mt-0.5">
                                <Sparkles size={20} className="animate-pulse" />
                              </div>
                              <p className="text-xs sm:text-sm font-medium text-[#475569] leading-relaxed">
                                No work experience? That's okay! Your resume will focus on your education, projects, internships, certifications, achievements and skills.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <label className={labelClass}>Academic Projects / College Activities / Volunteer Work</label>
                              <textarea
                                {...register('fresherAcademicWork')}
                                placeholder="Describe any college projects, hackathons, leadership activities, freelancing, or volunteer work."
                                rows={4}
                                className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                              />
                            </div>

                            <div className="space-y-3 pt-2">
                              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">Add Resume Sections & Content</span>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    appendProj({ name: '', description: '', link: '', technologies: '', duration: '', bullets: [] });
                                    toast.success('Added a new project to your resume! You can fill out the details below.');
                                  }}
                                  className="h-[40px] px-4 rounded-xl border border-dashed border-[#5B4DFF]/30 text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] hover:border-[#A855F7]/50 hover:bg-[#5B4DFF]/5 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                                >
                                  <Plus size={14} /> Add Project
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    appendInternship({ company: '', role: '', duration: '', location: '', description: '', achievements: '' });
                                    toast.success('Added internship to your resume! You can fill out the details below.');
                                  }}
                                  className="h-[40px] px-4 rounded-xl border border-dashed border-[#5B4DFF]/30 text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] hover:border-[#A855F7]/50 hover:bg-[#5B4DFF]/5 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                                >
                                  <Plus size={14} /> Add Internship
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    appendVolunteer({ organization: '', role: '', duration: '', description: '', achievements: '' });
                                    toast.success('Added volunteer experience to your resume! You can fill out the details below.');
                                  }}
                                  className="h-[40px] px-4 rounded-xl border border-dashed border-[#5B4DFF]/30 text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] hover:border-[#A855F7]/50 hover:bg-[#5B4DFF]/5 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                                >
                                  <Plus size={14} /> Add Volunteer Experience
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    appendAchievement({ title: '', organization: '', date: '', description: '' });
                                    toast.success('Added achievement to your resume! You can fill out the details below.');
                                  }}
                                  className="h-[40px] px-4 rounded-xl border border-dashed border-[#5B4DFF]/30 text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] hover:border-[#A855F7]/50 hover:bg-[#5B4DFF]/5 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                                >
                                  <Plus size={14} /> Add Achievement
                                </button>
                              </div>
                            </div>

                            {/* Dynamically added sections editable right here inside Step 2 */}
                            {projFields.length > 0 && (
                              <div className="space-y-4 pt-4 border-t border-[#ECECF5]/60">
                                <h4 className="text-sm font-bold text-[#0F172A]">Added Projects</h4>
                                <div className="space-y-4">
                                  {projFields.map((field, index) => {
                                    const sugKey = `fresher-project-${index}`;
                                    return (
                                      <div key={field.id} className="p-4 border border-[#ECECF5] rounded-xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all space-y-3 relative group">
                                        <button
                                          type="button"
                                          onClick={() => removeProj(index)}
                                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Project Name *</label>
                                            <input {...register(`projects.${index}.name`)} placeholder="e.g. AI Portfolio Generator" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Technologies Used</label>
                                            <input {...register(`projects.${index}.technologies`)} placeholder="e.g. React, Next.js" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Duration</label>
                                            <input {...register(`projects.${index}.duration`)} placeholder="e.g. 3 Months" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Project URL</label>
                                            <input {...register(`projects.${index}.link`)} placeholder="e.g. domain.com" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <div className="flex justify-between items-center">
                                              <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Description</label>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const nameVal = watchedData.projects?.[index]?.name;
                                                  const descVal = watchedData.projects?.[index]?.description;
                                                  handleAISuggest('project', {
                                                    index,
                                                    name: nameVal,
                                                    description: descVal
                                                  }, (text) => setValue(`projects.${index}.description`, text));
                                                }}
                                                disabled={loadingAISug[sugKey]}
                                                className="text-[10px] font-bold text-[#5B4DFF] flex items-center gap-1 hover:text-[#A855F7] transition-all cursor-pointer"
                                              >
                                                {loadingAISug[sugKey] ? "Suggesting..." : "✨ AI Suggest"}
                                              </button>
                                            </div>
                                            <textarea {...register(`projects.${index}.description`)} placeholder="Summarize key features..." rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all resize-none" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {internshipFields.length > 0 && (
                              <div className="space-y-4 pt-4 border-t border-[#ECECF5]/60">
                                <h4 className="text-sm font-bold text-[#0F172A]">Added Internships</h4>
                                <div className="space-y-4">
                                  {internshipFields.map((field, index) => {
                                    const sugKey = `fresher-internship-${index}`;
                                    return (
                                      <div key={field.id} className="p-4 border border-[#ECECF5] rounded-xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all space-y-3 relative group">
                                        <button
                                          type="button"
                                          onClick={() => removeInternship(index)}
                                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Company Name</label>
                                            <input {...register(`internships.${index}.company` as any)} placeholder="e.g. Acme Corp" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Role / Title</label>
                                            <input {...register(`internships.${index}.role` as any)} placeholder="e.g. Front-End Intern" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Duration</label>
                                            <input {...register(`internships.${index}.duration` as any)} placeholder="e.g. May 2023 - July 2023" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Location</label>
                                            <input {...register(`internships.${index}.location` as any)} placeholder="e.g. Remote" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <div className="flex justify-between items-center">
                                              <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Description</label>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const companyVal = watchedData.internships?.[index]?.company;
                                                  const roleVal = watchedData.internships?.[index]?.role;
                                                  const descVal = watchedData.internships?.[index]?.description;
                                                  handleAISuggest('internship', {
                                                    index,
                                                    role: roleVal,
                                                    company: companyVal,
                                                    description: descVal
                                                  }, (text) => setValue(`internships.${index}.description` as any, text));
                                                }}
                                                disabled={loadingAISug[sugKey]}
                                                className="text-[10px] font-bold text-[#5B4DFF] flex items-center gap-1 hover:text-[#A855F7] transition-all cursor-pointer"
                                              >
                                                {loadingAISug[sugKey] ? "Suggesting..." : "✨ AI Suggest"}
                                              </button>
                                            </div>
                                            <textarea {...register(`internships.${index}.description` as any)} placeholder="Summarize responsibilities..." rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all resize-none" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {volunteerFields.length > 0 && (
                              <div className="space-y-4 pt-4 border-t border-[#ECECF5]/60">
                                <h4 className="text-sm font-bold text-[#0F172A]">Added Volunteer Experience</h4>
                                <div className="space-y-4">
                                  {volunteerFields.map((field, index) => {
                                    const sugKey = `fresher-volunteer-${index}`;
                                    return (
                                      <div key={field.id} className="p-4 border border-[#ECECF5] rounded-xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all space-y-3 relative group">
                                        <button
                                          type="button"
                                          onClick={() => removeVolunteer(index)}
                                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Organization</label>
                                            <input {...register(`volunteerExperience.${index}.organization` as any)} placeholder="e.g. Red Cross" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Role / Position</label>
                                            <input {...register(`volunteerExperience.${index}.role` as any)} placeholder="e.g. Web Lead" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Duration</label>
                                            <input {...register(`volunteerExperience.${index}.duration` as any)} placeholder="e.g. Jan 2022 - Present" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <div className="flex justify-between items-center">
                                              <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Description</label>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const orgVal = watchedData.volunteerExperience?.[index]?.organization;
                                                  const roleVal = watchedData.volunteerExperience?.[index]?.role;
                                                  const descVal = watchedData.volunteerExperience?.[index]?.description;
                                                  handleAISuggest('volunteer', {
                                                    index,
                                                    role: roleVal,
                                                    organization: orgVal,
                                                    description: descVal
                                                  }, (text) => setValue(`volunteerExperience.${index}.description` as any, text));
                                                }}
                                                disabled={loadingAISug[sugKey]}
                                                className="text-[10px] font-bold text-[#5B4DFF] flex items-center gap-1 hover:text-[#A855F7] transition-all cursor-pointer"
                                              >
                                                {loadingAISug[sugKey] ? "Suggesting..." : "✨ AI Suggest"}
                                              </button>
                                            </div>
                                            <textarea {...register(`volunteerExperience.${index}.description` as any)} placeholder="Describe your contribution..." rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all resize-none" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {achievementFields.length > 0 && (
                              <div className="space-y-4 pt-4 border-t border-[#ECECF5]/60">
                                <h4 className="text-sm font-bold text-[#0F172A]">Added Achievements</h4>
                                <div className="space-y-4">
                                  {achievementFields.map((field, index) => {
                                    const sugKey = `fresher-achievement-${index}`;
                                    return (
                                      <div key={field.id} className="p-4 border border-[#ECECF5] rounded-xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all space-y-3 relative group">
                                        <button
                                          type="button"
                                          onClick={() => removeAchievement(index)}
                                          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Achievement Title</label>
                                            <input {...register(`achievements.${index}.title` as any)} placeholder="e.g. 1st Place Hackathon" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Issuing Organization</label>
                                            <input {...register(`achievements.${index}.organization` as any)} placeholder="e.g. Google Cloud Developer Group" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Date Received</label>
                                            <input {...register(`achievements.${index}.date` as any)} placeholder="e.g. October 2023" className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all" />
                                          </div>
                                          <div className="space-y-1 sm:col-span-2">
                                            <div className="flex justify-between items-center">
                                              <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Description</label>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const titleVal = watchedData.achievements?.[index]?.title;
                                                  const orgVal = watchedData.achievements?.[index]?.organization;
                                                  const descVal = watchedData.achievements?.[index]?.description;
                                                  handleAISuggest('achievement', {
                                                    index,
                                                    title: titleVal,
                                                    organization: orgVal,
                                                    description: descVal
                                                  }, (text) => setValue(`achievements.${index}.description` as any, text));
                                                }}
                                                disabled={loadingAISug[sugKey]}
                                                className="text-[10px] font-bold text-[#5B4DFF] flex items-center gap-1 hover:text-[#A855F7] transition-all cursor-pointer"
                                              >
                                                {loadingAISug[sugKey] ? "Suggesting..." : "✨ AI Suggest"}
                                              </button>
                                            </div>
                                            <textarea {...register(`achievements.${index}.description` as any)} placeholder="Explain the context of this award..." rows={2} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none text-xs font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all resize-none" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex justify-between items-center sm:pt-2">
                              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Job Roles & History</span>
                              <button
                                type="button"
                                onClick={() => appendExp({ company: '', position: '', duration: '', description: '' })}
                                className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                              >
                                <Plus size={14} /> Add Experience
                              </button>
                            </div>

                            {expFields.length === 0 && (
                              <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                <p className="text-xs font-medium text-gray-400">No career history added yet.</p>
                              </div>
                            )}

                            {expFields.map((field, index) => {
                              const sugKey = `experience-${index}`;
                              return (
                                <div key={field.id} className="p-5 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/55 hover:bg-[#F8FAFC]/90 transition-all space-y-4 relative group">
                                  <button
                                    type="button"
                                    onClick={() => removeExp(index)}
                                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className={labelClass}>Company Name</label>
                                      <input {...register(`experience.${index}.company`)} placeholder="e.g. Google" className={inputClass} />
                                    </div>
                                    <div className="space-y-1">
                                      <label className={labelClass}>Job Title / Position</label>
                                      <input {...register(`experience.${index}.position`)} placeholder="e.g. Software Engineer" className={inputClass} />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                      <label className={labelClass}>Duration / Dates</label>
                                      <input {...register(`experience.${index}.duration`)} placeholder="e.g. June 2021 - Present" className={inputClass} />
                                    </div>
                                    
                                    <div className="space-y-1 md:col-span-2">
                                      <div className="flex justify-between items-center mb-1.5 pt-1">
                                        <label className={labelClass}>Job Description & Achievements</label>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const companyVal = watchedData.experience?.[index]?.company;
                                            const positionVal = watchedData.experience?.[index]?.position;
                                            const descVal = watchedData.experience?.[index]?.description;
                                            handleAISuggest('experience', {
                                              index,
                                              position: positionVal,
                                              company: companyVal,
                                              description: descVal
                                            }, (text) => setValue(`experience.${index}.description`, text));
                                          }}
                                          disabled={loadingAISug[sugKey]}
                                          className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                                        >
                                          {loadingAISug[sugKey] ? (
                                            <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                                          ) : (
                                            <Sparkles size={13} className="text-[#5B4DFF]" />
                                          )}
                                          AI Suggest
                                        </button>
                                      </div>
                                      <textarea
                                        {...register(`experience.${index}.description`)}
                                        placeholder="Add bullet points describing technical challenges, key outcomes..."
                                        rows={4}
                                        className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: SKILLS, LANGUAGES & PROJECTS */}
        <AnimatePresence mode="wait">
          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Skills section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('skills')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <Wrench size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Technical Skills</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your coding languages and industry competencies.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.skills ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.skills && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        <div className="flex justify-between items-center sm:pt-1">
                          <button
                            type="button"
                            onClick={handleAISkillsSuggest}
                            disabled={loadingAISug['skills-suggest']}
                            className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3.5 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                          >
                            {loadingAISug['skills-suggest'] ? (
                              <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Sparkles size={13} className="text-[#5B4DFF]" />
                            )}
                            Predict Relevant Skills with AI
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => appendSkill({ name: '', level: 80 })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                          >
                            <Plus size={14} /> Add Skill
                          </button>
                        </div>

                        {/* Interactive AI Skill Badge Bank */}
                        <AnimatePresence>
                          {suggestedSkills.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="p-4 bg-[#F8FAFC] border border-[#ECECF5] rounded-2xl mt-2"
                            >
                              <p className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider mb-2">Tap to append Suggested Skill:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {suggestedSkills.map((sk) => (
                                  <button
                                    key={sk}
                                    type="button"
                                    onClick={() => handleAddSuggestedSkill(sk)}
                                    className="text-xs font-semibold px-3 py-1.5 bg-white border border-[#ECECF5] text-[#0F172A] rounded-full hover:border-[#5B4DFF] hover:text-[#5B4DFF] hover:bg-[#5B4DFF]/5 transition-all shadow-sm flex items-center gap-1"
                                  >
                                    <Plus size={12} />
                                    {sk}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {skillFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all flex flex-col gap-3 relative group">
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                              
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Skill Name</label>
                                <input
                                  {...register(`skills.${index}.name`)}
                                  placeholder="e.g. React.js"
                                  className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-sm font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all"
                                />
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Strength</span>
                                <div className="flex-1 flex items-center gap-3">
                                  <input
                                    type="range"
                                    {...register(`skills.${index}.level`, { valueAsNumber: true })}
                                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5B4DFF]"
                                  />
                                  <span className="text-xs font-bold text-[#5B4DFF] w-8 translate-y-0.5">{watchedData.skills?.[index]?.level}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Languages section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('languages')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <Languages size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Languages</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your linguistic capacity and fluency levels.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.languages ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.languages && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4">
                        <div className="flex justify-end items-center">
                          <button
                            type="button"
                            onClick={() => appendLang({ name: '', level: 100 })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                          >
                            <Plus size={14} /> Add Language
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {langFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC]/80 transition-all flex flex-col gap-3 relative group">
                              <button
                                type="button"
                                onClick={() => removeLang(index)}
                                className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                              
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider">Language Name</label>
                                <input
                                  {...register(`languages.${index}.name`)}
                                  placeholder="e.g. English"
                                  className="w-full h-[40px] px-3 bg-white border border-gray-200 rounded-xl outline-none text-sm font-semibold text-[#0F172A] focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all"
                                />
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Fluency Status</span>
                                <div className="flex-1 flex items-center gap-3">
                                  <input
                                    type="range"
                                    {...register(`languages.${index}.level`, { valueAsNumber: true })}
                                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5B4DFF]"
                                  />
                                  <span className="text-xs font-bold text-[#5B4DFF] w-8 translate-y-0.5">{watchedData.languages?.[index]?.level}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('projects')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <FolderGit2 size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Projects</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your personal endeavors, apps, and side achievements.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.projects ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.projects && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div className="flex justify-between items-center sm:pt-2">
                          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Independent Projects</span>
                          <button
                            type="button"
                            onClick={() => appendProj({ name: '', description: '', link: '' })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10"
                          >
                            <Plus size={14} /> Add Project
                          </button>
                        </div>

                        {projFields.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-400">No project listings added yet.</p>
                          </div>
                        )}

                        {projFields.map((field, index) => {
                          const sugKey = `project-${index}`;
                          return (
                            <div key={field.id} className="p-5 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/55 hover:bg-[#F8FAFC]/90 transition-all space-y-4 relative group">
                              <button
                                type="button"
                                onClick={() => removeProj(index)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className={labelClass}>Project Name *</label>
                                  <input {...register(`projects.${index}.name`)} placeholder="e.g. AI Portfolio Generator" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Technologies Used</label>
                                  <input {...register(`projects.${index}.technologies`)} placeholder="e.g. React, Next.js, Tailwind, Gemini API" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Duration</label>
                                  <input {...register(`projects.${index}.duration`)} placeholder="e.g. 3 Months, June 2023 - Aug 2023" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Project URL (Optional)</label>
                                  <input {...register(`projects.${index}.link`)} placeholder="e.g. portfolio-generator.com" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>GitHub URL (Optional)</label>
                                  <input {...register(`projects.${index}.githubUrl`)} placeholder="e.g. github.com/username/project" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Live Demo URL (Optional)</label>
                                  <input {...register(`projects.${index}.liveUrl`)} placeholder="e.g. demo.portfolio-generator.com" className={inputClass} />
                                </div>
                                
                                <div className="space-y-1 md:col-span-2">
                                  <div className="flex justify-between items-center mb-1.5 pt-1">
                                    <label className={labelClass}>Project Description</label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const nameVal = watchedData.projects?.[index]?.name;
                                        const descVal = watchedData.projects?.[index]?.description;
                                        handleAISuggest('project', {
                                          index,
                                          name: nameVal,
                                          description: descVal
                                        }, (text) => setValue(`projects.${index}.description`, text));
                                      }}
                                      disabled={loadingAISug[sugKey]}
                                      className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                                    >
                                      {loadingAISug[sugKey] ? (
                                        <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Sparkles size={13} className="text-[#5B4DFF]" />
                                      )}
                                      AI Suggest
                                    </button>
                                  </div>
                                  <textarea
                                    {...register(`projects.${index}.description`)}
                                    placeholder="Summarize the core technical stacks associated with this project and features..."
                                    rows={3}
                                    className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                                  />
                                </div>

                                {/* Dynamic Bullet Points (dynamic) */}
                                <div className="space-y-3 md:col-span-2 pt-2 border-t border-[#ECECF5]/60">
                                  <div className="flex justify-between items-center">
                                    <label className={labelClass}>Bullet Points (Dynamic)</label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentBullets = watchedData.projects?.[index]?.bullets || [];
                                        setValue(`projects.${index}.bullets`, [...currentBullets, '']);
                                      }}
                                      className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1 bg-[#5B4DFF]/5 px-2.5 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                                    >
                                      <Plus size={12} /> Add Bullet Point
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {((watchedData.projects?.[index]?.bullets as string[]) || []).map((bullet, bIdx) => (
                                      <div key={bIdx} className="flex items-center gap-2">
                                        <span className="text-gray-400 text-xs font-mono">{bIdx + 1}.</span>
                                        <input
                                          {...register(`projects.${index}.bullets.${bIdx}` as any)}
                                          placeholder="e.g. Engineered state managers and local persistence with a 99.9% success rate."
                                          className="flex-1 h-[40px] px-3 border border-gray-200 rounded-xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-xs"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const currentBullets = [...(watchedData.projects?.[index]?.bullets || [])];
                                            currentBullets.splice(bIdx, 1);
                                            setValue(`projects.${index}.bullets`, currentBullets);
                                          }}
                                          className="p-1 text-gray-400 hover:text-red-500 rounded-lg cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    ))}
                                    {(!watchedData.projects?.[index]?.bullets || watchedData.projects?.[index]?.bullets?.length === 0) && (
                                      <p className="text-[11px] text-gray-400 italic">No bullet points added yet. Bullet points can be used alongside the description.</p>
                                    )}
                                  </div>
                                </div>

                                <div className="md:col-span-2 flex justify-end gap-2 pt-2 border-t border-[#ECECF5]/60">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const currentVal = watchedData.projects?.[index];
                                      insertProj(index + 1, {
                                        ...currentVal,
                                        name: currentVal?.name ? `${currentVal.name} (Copy)` : '',
                                        bullets: currentVal?.bullets ? [...currentVal.bullets] : [],
                                      });
                                      toast.success('Project duplicated successfully!');
                                    }}
                                    className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer flex items-center gap-1"
                                  >
                                    Duplicate Project
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Internships section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('internships')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Internships</h3>
                      <p className="text-xs text-[#64748B] font-medium">Professional internships and industrial training programs.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.internships ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.internships && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div className="flex justify-between items-center sm:pt-2">
                          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Internship History</span>
                          <button
                            type="button"
                            onClick={() => appendInternship({ company: '', role: '', duration: '', location: '', description: '', achievements: '' })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                          >
                            <Plus size={14} /> Add Internship
                          </button>
                        </div>

                        {internshipFields.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-400">No internships added yet.</p>
                          </div>
                        )}

                        {internshipFields.map((field, index) => {
                          const sugKey = `internship-${index}`;
                          return (
                            <div key={field.id} className="p-5 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/55 hover:bg-[#F8FAFC]/90 transition-all space-y-4 relative group">
                              <button
                                type="button"
                                onClick={() => removeInternship(index)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className={labelClass}>Company Name</label>
                                  <input {...register(`internships.${index}.company` as any)} placeholder="e.g. Acme Corp" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Role / Title</label>
                                  <input {...register(`internships.${index}.role` as any)} placeholder="e.g. Front-End Intern" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Duration / Dates</label>
                                  <input {...register(`internships.${index}.duration` as any)} placeholder="e.g. May 2023 - July 2023" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Location</label>
                                  <input {...register(`internships.${index}.location` as any)} placeholder="e.g. San Francisco, CA (Remote)" className={inputClass} />
                                </div>
                                
                                <div className="space-y-1 md:col-span-2">
                                  <div className="flex justify-between items-center mb-1.5 pt-1">
                                    <label className={labelClass}>Description & Responsibilities</label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const companyVal = watchedData.internships?.[index]?.company;
                                        const roleVal = watchedData.internships?.[index]?.role;
                                        const descVal = watchedData.internships?.[index]?.description;
                                        handleAISuggest('internship', {
                                          index,
                                          role: roleVal,
                                          company: companyVal,
                                          description: descVal
                                        }, (text) => setValue(`internships.${index}.description` as any, text));
                                      }}
                                      disabled={loadingAISug[sugKey]}
                                      className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                                    >
                                      {loadingAISug[sugKey] ? (
                                        <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Sparkles size={13} className="text-[#5B4DFF]" />
                                      )}
                                      AI Suggest
                                    </button>
                                  </div>
                                  <textarea
                                    {...register(`internships.${index}.description` as any)}
                                    placeholder="Summarize the core achievements and technologies utilized..."
                                    rows={3}
                                    className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                                  />
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                  <label className={labelClass}>Key Achievements (Optional)</label>
                                  <input {...register(`internships.${index}.achievements` as any)} placeholder="e.g. Boosted SEO score by 40% and improved test suites" className={inputClass} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Volunteer Experience section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('volunteer')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <User size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Volunteer Experience</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your community work, leadership, and non-profit roles.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.volunteer ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.volunteer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div className="flex justify-between items-center sm:pt-2">
                          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Volunteer History</span>
                          <button
                            type="button"
                            onClick={() => appendVolunteer({ organization: '', role: '', duration: '', description: '', achievements: '' })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                          >
                            <Plus size={14} /> Add Volunteer Experience
                          </button>
                        </div>

                        {volunteerFields.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-400">No volunteer experience added yet.</p>
                          </div>
                        )}

                        {volunteerFields.map((field, index) => {
                          const sugKey = `volunteer-${index}`;
                          return (
                            <div key={field.id} className="p-5 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/55 hover:bg-[#F8FAFC]/90 transition-all space-y-4 relative group">
                              <button
                                type="button"
                                onClick={() => removeVolunteer(index)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className={labelClass}>Organization</label>
                                  <input {...register(`volunteerExperience.${index}.organization` as any)} placeholder="e.g. Red Cross" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Role / Position</label>
                                  <input {...register(`volunteerExperience.${index}.role` as any)} placeholder="e.g. Web Lead" className={inputClass} />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className={labelClass}>Duration / Dates</label>
                                  <input {...register(`volunteerExperience.${index}.duration` as any)} placeholder="e.g. Jan 2022 - Present" className={inputClass} />
                                </div>
                                
                                <div className="space-y-1 md:col-span-2">
                                  <div className="flex justify-between items-center mb-1.5 pt-1">
                                    <label className={labelClass}>Role Description</label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const orgVal = watchedData.volunteerExperience?.[index]?.organization;
                                        const roleVal = watchedData.volunteerExperience?.[index]?.role;
                                        const descVal = watchedData.volunteerExperience?.[index]?.description;
                                        handleAISuggest('volunteer', {
                                          index,
                                          role: roleVal,
                                          organization: orgVal,
                                          description: descVal
                                        }, (text) => setValue(`volunteerExperience.${index}.description` as any, text));
                                      }}
                                      disabled={loadingAISug[sugKey]}
                                      className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                                    >
                                      {loadingAISug[sugKey] ? (
                                        <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Sparkles size={13} className="text-[#5B4DFF]" />
                                      )}
                                      AI Suggest
                                    </button>
                                  </div>
                                  <textarea
                                    {...register(`volunteerExperience.${index}.description` as any)}
                                    placeholder="Explain your contribution and community impact..."
                                    rows={3}
                                    className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Achievements section card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-[#ECECF5] relative overflow-hidden pl-5 sm:pl-7 lg:pl-9 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div 
                  onClick={() => toggleSection('achievements')} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-[#5B4DFF]/10 to-[#A855F7]/10 p-3 rounded-2xl text-[#5B4DFF]">
                      <Award size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">Achievements</h3>
                      <p className="text-xs text-[#64748B] font-medium">Your medals, awards, hackathons, and certifications.</p>
                    </div>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedSections.achievements ? 'rotate-180' : ''}`} size={20} />
                </div>

                <AnimatePresence initial={false}>
                  {expandedSections.achievements && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <div className="flex justify-between items-center sm:pt-2">
                          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Awards & Achievements</span>
                          <button
                            type="button"
                            onClick={() => appendAchievement({ title: '', organization: '', date: '', description: '' })}
                            className="text-xs font-bold text-[#5B4DFF] hover:text-[#A855F7] flex items-center gap-1.5 transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                          >
                            <Plus size={14} /> Add Achievement
                          </button>
                        </div>

                        {achievementFields.length === 0 && (
                          <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <p className="text-xs font-medium text-gray-400">No achievements added yet.</p>
                          </div>
                        )}

                        {achievementFields.map((field, index) => {
                          const sugKey = `achievement-${index}`;
                          return (
                            <div key={field.id} className="p-5 border border-[#ECECF5] rounded-2xl bg-[#F8FAFC]/55 hover:bg-[#F8FAFC]/90 transition-all space-y-4 relative group">
                              <button
                                type="button"
                                onClick={() => removeAchievement(index)}
                                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className={labelClass}>Achievement Title</label>
                                  <input {...register(`achievements.${index}.title` as any)} placeholder="e.g. 1st Place Hackathon" className={inputClass} />
                                </div>
                                <div className="space-y-1">
                                  <label className={labelClass}>Issuing Organization</label>
                                  <input {...register(`achievements.${index}.organization` as any)} placeholder="e.g. Google Cloud Developer Group" className={inputClass} />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className={labelClass}>Date Received</label>
                                  <input {...register(`achievements.${index}.date` as any)} placeholder="e.g. October 2023" className={inputClass} />
                                </div>
                                
                                <div className="space-y-1 md:col-span-2">
                                  <div className="flex justify-between items-center mb-1.5 pt-1">
                                    <label className={labelClass}>Description / Context</label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const titleVal = watchedData.achievements?.[index]?.title;
                                        const orgVal = watchedData.achievements?.[index]?.organization;
                                        const descVal = watchedData.achievements?.[index]?.description;
                                        handleAISuggest('achievement', {
                                          index,
                                          title: titleVal,
                                          organization: orgVal,
                                          description: descVal
                                        }, (text) => setValue(`achievements.${index}.description` as any, text));
                                      }}
                                      disabled={loadingAISug[sugKey]}
                                      className="text-xs font-bold text-[#5B4DFF] flex items-center gap-1.5 hover:text-[#A855F7] transition-all bg-[#5B4DFF]/5 px-3 py-1.5 rounded-full hover:bg-[#5B4DFF]/10 cursor-pointer"
                                    >
                                      {loadingAISug[sugKey] ? (
                                        <div className="w-3.5 h-3.5 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Sparkles size={13} className="text-[#5B4DFF]" />
                                      )}
                                      AI Suggest
                                    </button>
                                  </div>
                                  <textarea
                                    {...register(`achievements.${index}.description` as any)}
                                    placeholder="Explain the background, criteria, and impact of this recognition..."
                                    rows={3}
                                    className="w-full min-h-[140px] p-4 border border-gray-200 rounded-2xl focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all outline-none bg-white font-medium text-[#0F172A] placeholder-gray-400 text-sm transition-all duration-300 resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4: PREVIEW & DOWNLOAD SUMMARY */}
        <AnimatePresence mode="wait">
          {activeStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Ready completion card */}
              <div className="bg-white rounded-[24px] shadow-sm shadow-[#ECECF5]/60 hover:shadow-md transition-all duration-300 p-4 sm:p-8 border border-[#ECECF5] text-center space-y-6 relative overflow-hidden pl-5 sm:pl-7 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] sm:before:w-[5px] before:bg-gradient-to-b before:from-[#5B4DFF] before:via-[#A855F7] before:to-[#FF5EA8] before:rounded-l-full">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-500 flex items-center justify-center rounded-2xl">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0F172A]">All Steps Completed!</h3>
                  <p className="text-sm text-[#64748B] font-medium max-w-md mx-auto leading-relaxed">
                    Your resume has been completely mapped and optimized. Use the live canvas preview to inspect correctness, or export your final document now.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <PDFDownloadButton />
                  
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#5B4DFF] to-[#A855F7] text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-[#5B4DFF]/20 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Save size={18} />
                    Save Progress
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Floating Action Bar with Glassmorphic styling and connecting pill elements */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-4xl bg-white/80 backdrop-blur-xl border border-white/40 p-1.5 sm:p-3 rounded-[24px] sm:rounded-full shadow-2xl flex items-center justify-between gap-1.5 sm:gap-3 transition-all duration-300 overflow-hidden">
        
        {/* Navigation Step controls / Back button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (activeStep > 1) {
                setActiveStep(prev => prev - 1);
              }
            }}
            disabled={activeStep === 1}
            className={`h-[44px] md:h-[48px] px-3 md:px-6 rounded-[14px] md:rounded-[18px] transition-all font-bold text-[13px] md:text-sm flex items-center justify-center gap-1 md:gap-1.5 cursor-pointer select-none active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink min-w-0 ${
              activeStep === 1 
                ? 'bg-zinc-100 text-zinc-400' 
                : 'bg-slate-100 hover:bg-slate-200 text-[#0F172A] hover:scale-105'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            <span>Back</span>
          </button>
        </div>

        {/* Center / Right Action buttons grouping */}
        <div className="flex items-center gap-2 md:gap-2.5 flex-nowrap min-w-0 overflow-hidden">
          {/* Next Button */}
          <button
            type="button"
            onClick={() => {
              if (activeStep < 4) {
                setActiveStep(prev => prev + 1);
              }
            }}
            disabled={activeStep === 4}
            className="h-[44px] md:h-[48px] px-3 md:px-6 bg-[#0F172A] hover:bg-slate-800 text-white rounded-[14px] md:rounded-[18px] transition-all font-bold text-[13px] md:text-sm flex items-center justify-center gap-1 md:gap-1.5 active:scale-95 duration-200 disabled:opacity-40 disabled:cursor-not-allowed select-none hover:scale-105 shadow-sm whitespace-nowrap shrink min-w-0"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
          </button>

          {/* Save button */}
          <button
            type="button"
            onClick={handleSubmit(onSave)}
            disabled={isSaving}
            className="h-[44px] md:h-[48px] px-3 md:px-5 bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#5B4DFF] rounded-[14px] md:rounded-[18px] transition-all font-bold text-[13px] md:text-sm flex items-center justify-center gap-1 md:gap-1.5 disabled:opacity-50 active:scale-95 duration-200 select-none hover:scale-105 whitespace-nowrap shrink min-w-0"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-[#5B4DFF] border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <Save className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            )}
            <span>Save</span>
          </button>

          {/* Download PDF button as the primary visual CTA */}
          <PDFDownloadButton 
            className="h-[44px] md:h-[48px] px-3 md:px-5 rounded-[14px] md:rounded-[18px] bg-gradient-to-r from-[#5B4DFF] via-[#A855F7] to-[#FF5EA8] hover:opacity-95 text-white font-bold text-[13px] md:text-sm flex items-center justify-center gap-1 md:gap-1.5 shadow-md shadow-indigo-100 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap select-none disabled:opacity-40 shrink min-w-0"
          />
        </div>
      </div>
    </div>
  );
};
