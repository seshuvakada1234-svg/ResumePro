'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ResumeData, Skill, Language, Reference } from '@/types/resume';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate';
import PremiumTemplate from '@/components/templates/PremiumTemplate';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { RedlineTemplate } from '@/components/templates/RedlineTemplate';
import { NavyTemplate } from '@/components/templates/NavyTemplate';
import { SerifTemplate } from '@/components/templates/SerifTemplate';
import PhotoSidebarTemplate from '@/components/templates/PhotoSidebarTemplate';
import PhotoCircleTemplate from '@/components/templates/PhotoCircleTemplate';
import LawyerClassicTemplate from '@/components/templates/LawyerClassicTemplate';
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';
import PinkHeaderTemplate from '@/components/templates/PinkHeaderTemplate';
import DarkNavyTemplate from '@/components/templates/DarkNavyTemplate';
import CrimsonTemplate from '@/components/templates/CrimsonTemplate';
import BlackYellowTemplate from '@/components/templates/BlackYellowTemplate';
import { LuxuryGoldTemplate } from '@/components/templates/LuxuryGoldTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Check, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const isStringPlaceholder = (str: string | undefined | null): boolean => {
  if (!str) return true;
  const s = str.trim().toLowerCase();
  if (s === '') return true;

  const exactPlaceholders = [
    'project name',
    'company name',
    'lorem ipsum',
    'example data',
    'example university',
    'school name',
    'university name',
    'your role',
    'your company',
    'job title / position',
    'duration / dates',
    'your profession',
    'your profession here',
    'professional role',
    'professional title',
    'internship: [company/role]',
    'volunteer work: [organization]',
    'achievement: [title/award]',
    'briefly describe your responsibilities and achievements in this project.',
    'describe your contributions, technical stack, and results accomplished.',
    'outline what you did and your impact on the organization.',
    'detail the recognition, details, and context of this achievement.',
    'add bullet points describing technical challenges, key outcomes...',
  ];

  if (exactPlaceholders.includes(s)) {
    return true;
  }

  // Check for common patterns
  if (
    s.includes('[company/role]') ||
    s.includes('[organization]') ||
    s.includes('[title/award]') ||
    s.includes('lorem ipsum') ||
    s === 'project name' ||
    s === 'internship: [company/role]' ||
    s === 'volunteer work: [organization]' ||
    s === 'achievement: [title/award]' ||
    s === 'describe your contributions...' ||
    s === 'briefly describe your responsibilities and achievements in this project.' ||
    s === 'describe your contributions, technical stack, and results accomplished.' ||
    s === 'outline what you did and your impact on the organization.' ||
    s === 'detail the recognition, details, and context of this achievement.' ||
    s === 'company name' ||
    s === 'example data' ||
    s === 'lorem ipsum' ||
    s.startsWith('describe your contributions') ||
    s.startsWith('briefly describe your') ||
    s.startsWith('outline what you did') ||
    s.startsWith('detail the recognition')
  ) {
    return true;
  }

  return false;
};

const preprocessResumeData = (raw: ResumeData): ResumeData => {
  const isFresher = raw.experienceType === 'fresher';

  // 1. Filter education
  const education = (raw.education || []).map(edu => ({
    ...edu,
    school: isStringPlaceholder(edu.school) ? '' : edu.school.trim(),
    degree: isStringPlaceholder(edu.degree) ? '' : edu.degree.trim(),
    year: isStringPlaceholder(edu.year) ? '' : edu.year.trim(),
  })).filter(edu => edu.school !== '' || edu.degree !== '');

  // 2. Filter experience: hide completely if fresher or has no entries
  let experience: typeof raw.experience = [];
  if (!isFresher) {
    experience = (raw.experience || []).map(exp => ({
      ...exp,
      company: isStringPlaceholder(exp.company) ? '' : exp.company.trim(),
      position: isStringPlaceholder(exp.position) ? '' : exp.position.trim(),
      duration: isStringPlaceholder(exp.duration) ? '' : exp.duration.trim(),
      description: isStringPlaceholder(exp.description) ? '' : exp.description.trim(),
    })).filter(exp => exp.company !== '' || exp.position !== '');
  }

  // 3. Filter projects (including internships, volunteer work, achievements)
  let projects = (raw.projects || []).map(proj => ({
    ...proj,
    name: isStringPlaceholder(proj.name) ? '' : proj.name.trim(),
    description: isStringPlaceholder(proj.description) ? '' : proj.description.trim(),
    technologies: isStringPlaceholder(proj.technologies) ? '' : (proj.technologies || '').trim(),
    duration: isStringPlaceholder(proj.duration) ? '' : (proj.duration || '').trim(),
    githubUrl: isStringPlaceholder(proj.githubUrl) ? '' : (proj.githubUrl || '').trim(),
    liveUrl: isStringPlaceholder(proj.liveUrl) ? '' : (proj.liveUrl || '').trim(),
    bullets: (proj.bullets || []).map(b => isStringPlaceholder(b) ? '' : b.trim()).filter(b => b !== ''),
  })).filter(proj => proj.name !== '' || proj.description !== '' || (proj.bullets && proj.bullets.length > 0));

  // 3b. Filter internships
  const internships = (raw.internships || []).map(intern => ({
    ...intern,
    company: isStringPlaceholder(intern.company) ? '' : intern.company.trim(),
    role: isStringPlaceholder(intern.role) ? '' : intern.role.trim(),
    duration: isStringPlaceholder(intern.duration) ? '' : intern.duration.trim(),
    location: isStringPlaceholder(intern.location) ? '' : (intern.location || '').trim(),
    description: isStringPlaceholder(intern.description) ? '' : intern.description.trim(),
    achievements: isStringPlaceholder(intern.achievements) ? '' : (intern.achievements || '').trim(),
  })).filter(intern => intern.company !== '' || intern.role !== '' || intern.description !== '');

  // 3c. Filter volunteerExperience
  const volunteerExperience = (raw.volunteerExperience || []).map(vol => ({
    ...vol,
    organization: isStringPlaceholder(vol.organization) ? '' : vol.organization.trim(),
    role: isStringPlaceholder(vol.role) ? '' : vol.role.trim(),
    duration: isStringPlaceholder(vol.duration) ? '' : vol.duration.trim(),
    description: isStringPlaceholder(vol.description) ? '' : vol.description.trim(),
    achievements: isStringPlaceholder(vol.achievements) ? '' : (vol.achievements || '').trim(),
  })).filter(vol => vol.organization !== '' || vol.role !== '' || vol.description !== '');

  // 3d. Filter achievements
  const achievements = (raw.achievements || []).map(ach => ({
    ...ach,
    title: isStringPlaceholder(ach.title) ? '' : ach.title.trim(),
    organization: isStringPlaceholder(ach.organization) ? '' : ach.organization.trim(),
    date: isStringPlaceholder(ach.date) ? '' : ach.date.trim(),
    description: isStringPlaceholder(ach.description) ? '' : ach.description.trim(),
  })).filter(ach => ach.title !== '' || ach.description !== '');

  // 4. Handle Academic Work for Freshers
  if (isFresher && raw.fresherAcademicWork && !isStringPlaceholder(raw.fresherAcademicWork)) {
    const title = 'Academic Projects & Activities';
    if (!projects.some(p => p.name === title)) {
      projects.unshift({
        name: title,
        description: raw.fresherAcademicWork.trim(),
        link: '',
        technologies: '',
        duration: '',
        githubUrl: '',
        liveUrl: '',
        bullets: [],
      });
    }
  }

  // 5. Filter skills
  const skills = (raw.skills || []).map(skill => {
    if (!skill) return null;
    const name = typeof skill === 'string' ? skill : skill.name;
    if (isStringPlaceholder(name)) return null;
    return skill;
  }).filter(Boolean) as Skill[];

  // 6. Filter languages
  const languages = (raw.languages || []).map(lang => {
    if (!lang) return null;
    const name = typeof lang === 'string' ? lang : lang.name;
    if (isStringPlaceholder(name)) return null;
    return lang;
  }).filter(Boolean) as Language[];

  // 7. Filter certifications
  const certifications = (raw.certifications || []).map(cert => {
    if (!cert) return null;
    const name = typeof cert === 'string' ? cert : (cert as any).name;
    if (isStringPlaceholder(name)) return null;
    return cert;
  }).filter(Boolean) as (string | { name: string })[];

  // 8. Filter references
  const references = (raw.references || []).map(ref => {
    if (!ref) return null;
    if (isStringPlaceholder(ref.name) && isStringPlaceholder(ref.position)) return null;
    return {
      ...ref,
      name: isStringPlaceholder(ref.name) ? '' : ref.name.trim(),
      position: isStringPlaceholder(ref.position) ? '' : ref.position.trim(),
      company: isStringPlaceholder(ref.company) ? '' : (ref.company || '').trim(),
    };
  }).filter(Boolean) as Reference[];

  // Clean personalInfo summary if placeholder or empty
  const personalInfo = { ...raw.personalInfo };
  if (isStringPlaceholder(personalInfo.summary)) {
    personalInfo.summary = '';
  }

  return {
    ...raw,
    personalInfo,
    education,
    experience,
    projects,
    internships,
    volunteerExperience,
    achievements,
    skills,
    languages,
    certifications,
    references,
  };
};

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(1);
  const [zoomFactor, setZoomFactor] = useState(1); // 0.6 to 1.5
  const [isFullscreen, setIsFullscreen] = useState(false);

  const processedData = preprocessResumeData(data);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        if (containerWidth > 0) {
          // Leave some safety margins around the paper
          const padding = 32;
          const targetWidth = containerWidth - padding;
          setBaseScale(Math.min(targetWidth / A4_WIDTH, 1.2));
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scale = baseScale * zoomFactor;

  const handleZoomIn = () => setZoomFactor((prev) => Math.min(prev + 0.1, 1.6));
  const handleZoomOut = () => setZoomFactor((prev) => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoomFactor(1);

  const renderTemplate = () => {
    switch (processedData.template) {
      case 'modern':
        return <ModernTemplate data={processedData} />;
      case 'minimal':
        return <MinimalTemplate data={processedData} />;
      case 'two-column':
        return <TwoColumnTemplate data={processedData} />;
      case 'premium':
        return <PremiumTemplate data={processedData} />;
      case 'executive':
        return <ExecutiveTemplate data={processedData} />;
      case 'redline':
        return <RedlineTemplate data={processedData} />;
      case 'navy':
        return <NavyTemplate data={processedData} />;
      case 'serif':
        return <SerifTemplate data={processedData} />;
      case 'photo-sidebar':
        return <PhotoSidebarTemplate data={processedData} />;
      case 'photo-circle':
        return <PhotoCircleTemplate data={processedData} />;
      case 'lawyer-classic':
        return <LawyerClassicTemplate data={processedData} />;
      case 'minimal-pro':
        return <MinimalProTemplate data={processedData} />;
      case 'pink-header':
        return <PinkHeaderTemplate data={processedData} />;
      case 'dark-navy':
        return <DarkNavyTemplate data={processedData} />;
      case 'crimson':
        return <CrimsonTemplate data={processedData} />;
      case 'black-yellow':
        return <BlackYellowTemplate data={processedData} />;
      case 'luxury-gold':
        return <LuxuryGoldTemplate data={processedData} />;
      case 'classic':
      default:
        return <ClassicTemplate data={processedData} />;
    }
  };

  return (
    <>
      {/* Canvas Workspace Wrapper */}
      <div className="flex flex-col bg-[#F8FAFC] border border-[#ECECF5] rounded-[24px] overflow-hidden shadow-sm">
        
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECF5] bg-white gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#0F172A] tracking-wide uppercase">Live Updates Active</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="flex items-center gap-1.5 bg-[#F1F5F9] rounded-xl p-1">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomFactor <= 0.5}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-all disabled:opacity-30"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                className="px-2 py-0.5 text-[11px] font-bold text-[#0F172A] hover:bg-white rounded-md transition-all whitespace-nowrap"
                title="Reset Zoom"
              >
                {Math.round(zoomFactor * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomFactor >= 1.6}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-all disabled:opacity-30"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-[#64748B] hover:text-[#0f172a] hover:bg-[#F1F5F9] rounded-xl transition-all"
              title="Fullscreen Preview"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Outer Workspace Canvas */}
        <div 
          ref={containerRef}
          className="relative w-full flex items-start justify-center p-2.5 sm:p-6 lg:p-8 min-h-[380px] sm:min-h-[500px] overflow-x-auto overflow-y-hidden select-none"
          style={{
            backgroundImage: 'radial-gradient(#E2E8F0 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#F8FAFC'
          }}
        >
          {/* Scaled A4 paper */}
          <div
            style={{
              width: `${A4_WIDTH * scale}px`,
              height: `${A4_HEIGHT * scale}px`,
              transition: 'width 0.2s ease-out, height 0.2s ease-out'
            }}
            className="relative bg-white shadow-2xl rounded-lg overflow-hidden border border-[#ECECF5]"
          >
            <div
              style={{
                width: `${A4_WIDTH}px`,
                height: `${A4_HEIGHT}px`,
                minHeight: `${A4_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay using Framer Motion */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <Minimize2 size={24} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              style={{
                width: 'min(95vw, 680px)',
                aspectRatio: `${A4_WIDTH} / ${A4_HEIGHT}`,
              }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden relative max-h-[90vh]"
            >
              <div className="w-full h-full overflow-auto p-4 bg-gray-100 flex justify-center">
                <div 
                  style={{
                    width: `${A4_WIDTH}px`,
                    height: `${A4_HEIGHT}px`,
                    transform: `scale(${600 / A4_WIDTH})`,
                    transformOrigin: 'top center',
                  }}
                  className="bg-white shadow-lg"
                >
                  {renderTemplate()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Off-screen PDF Target Element */}
      <div
        id="resume-preview"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '0',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          minHeight: `${A4_HEIGHT}px`,
          maxHeight: `${A4_HEIGHT}px`,
          background: '#ffffff',
          overflow: 'hidden',
          zIndex: -9999,
          pointerEvents: 'none',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {renderTemplate()}
      </div>
    </>
  );
};
