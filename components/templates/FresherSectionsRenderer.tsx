'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, Heart, Briefcase, Rocket } from 'lucide-react';

interface FresherSectionsProps {
  data: ResumeData;
  styleType:
    | 'classic'
    | 'modern'
    | 'minimal'
    | 'two-column'
    | 'premium'
    | 'executive'
    | 'redline'
    | 'navy'
    | 'serif'
    | 'photo-sidebar'
    | 'photo-circle'
    | 'lawyer-classic'
    | 'minimal-pro'
    | 'pink-header'
    | 'dark-navy'
    | 'crimson'
    | 'black-yellow'
    | 'luxury-gold';
}

export const FresherSections: React.FC<FresherSectionsProps> = ({ data, styleType }) => {
  const { projects = [], internships = [], volunteerExperience = [], achievements = [] } = data;

  // Render check helper: only render if there's actual data
  const hasProjects = projects.length > 0 && projects.some(p => p.name && p.name.trim() !== '');
  const hasInternships = internships.length > 0 && internships.some(i => i.company && i.company.trim() !== '');
  const hasVolunteer = volunteerExperience.length > 0 && volunteerExperience.some(v => v.organization && v.organization.trim() !== '');
  const hasAchievements = achievements.length > 0 && achievements.some(a => a.title && a.title.trim() !== '');

  if (!hasProjects && !hasInternships && !hasVolunteer && !hasAchievements) {
    return null;
  }

  // Define visual themes based on styleType
  const getThemeConfig = () => {
    switch (styleType) {
      case 'modern':
        return {
          titleClass: "text-lg font-bold text-indigo-700 mb-4 uppercase tracking-wider",
          itemContainer: "border-l-2 border-indigo-100 pl-4 mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-base text-gray-900",
          durationBadge: "text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded",
          subTitle: "text-sm font-semibold text-gray-500 mb-2",
          techText: "text-xs font-bold text-indigo-600 mt-1 mb-2",
          bodyText: "text-sm text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 mr-4",
          sectionSpacing: "mb-8"
        };
      case 'minimal':
        return {
          titleClass: "text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6",
          itemContainer: "grid grid-cols-4 gap-4 mb-8 last:mb-0",
          headerRow: "col-span-1 text-xs text-slate-400 font-medium", // displays duration on the left
          itemTitle: "font-bold text-sm mb-1 text-slate-900",
          durationBadge: "text-xs text-slate-400 font-medium",
          subTitle: "text-xs text-slate-500 mb-3",
          techText: "text-xs font-medium text-slate-500 mt-1 mb-2",
          bodyText: "text-xs text-slate-600 leading-relaxed",
          bulletClass: "list-disc pl-4 mt-2 space-y-1 text-xs text-slate-600",
          linkClass: "inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 mt-2 mr-3 underline",
          sectionSpacing: "mb-10"
        };
      case 'minimal-pro':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-gray-200 pb-2 mb-4 text-gray-800",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-500",
          subTitle: "text-xs font-semibold text-gray-600 mb-1.5",
          techText: "text-xs font-semibold text-gray-500 mt-1 mb-1.5",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-4 mt-1.5 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 mt-1.5 mr-3 underline",
          sectionSpacing: "mb-8"
        };
      case 'two-column':
        return {
          titleClass: "text-lg font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-gray-900",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-600",
          subTitle: "text-xs font-semibold text-gray-700 mb-2",
          techText: "text-xs font-semibold text-indigo-600 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'premium':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider mb-4 text-indigo-600",
          itemContainer: "mb-6 last:mb-0 p-4 border border-gray-100 rounded-xl bg-slate-50/40",
          headerRow: "flex justify-between items-start gap-2 mb-2 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide text-gray-400 bg-gray-100 flex-shrink-0",
          subTitle: "font-bold text-xs text-indigo-600 mb-2",
          techText: "text-xs font-bold text-indigo-500 mt-1 mb-2",
          bodyText: "text-xs leading-relaxed text-gray-600 pl-3 border-l-2 border-gray-200",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'executive':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-gray-700 pb-2 mb-4 text-indigo-400",
          itemContainer: "mb-6 last:mb-0 border-l border-indigo-500/30 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-indigo-100",
          durationBadge: "text-xs text-indigo-400 font-medium",
          subTitle: "text-xs font-semibold text-gray-400 mb-2",
          techText: "text-xs font-semibold text-indigo-400 mt-1 mb-2",
          bodyText: "text-xs text-gray-300 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-300",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'redline':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-red-600 pb-1 mb-4 text-red-600",
          itemContainer: "mb-6 last:mb-0 relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-red-600 before:rounded-full",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-500",
          subTitle: "text-xs font-semibold text-red-600 mb-2",
          techText: "text-xs font-semibold text-gray-600 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'navy':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-navy-700 pb-1 mb-4 text-[#1e3a8a]",
          itemContainer: "mb-6 last:mb-0 border-l-2 border-[#1e3a8a]/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-[#1e3a8a]",
          durationBadge: "text-xs font-semibold text-[#1e3a8a] bg-[#1e3a8a]/5 px-2 py-0.5 rounded",
          subTitle: "text-xs font-semibold text-gray-600 mb-2",
          techText: "text-xs font-semibold text-[#1e3a8a]/80 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-[#1e3a8a] hover:text-[#1d4ed8] mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'serif':
        return {
          titleClass: "font-serif text-base font-bold uppercase border-b border-gray-300 pb-1 mb-4 text-gray-900",
          itemContainer: "mb-6 last:mb-0 font-serif",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-serif font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-600",
          subTitle: "text-xs font-semibold text-gray-700 mb-2",
          techText: "text-xs font-semibold text-gray-700 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-gray-800 hover:text-gray-900 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'photo-sidebar':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1.5 mb-4 text-gray-800",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-500",
          subTitle: "text-xs font-semibold text-gray-600 mb-2",
          techText: "text-xs font-semibold text-gray-500 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-gray-950 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'photo-circle':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1.5 mb-4 text-indigo-700",
          itemContainer: "mb-6 last:mb-0 border-l-2 border-indigo-500/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded",
          subTitle: "text-xs font-semibold text-gray-600 mb-2",
          techText: "text-xs font-semibold text-indigo-600 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'lawyer-classic':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b-2 border-slate-900 pb-1 mb-4 text-slate-900",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-slate-950",
          durationBadge: "text-xs italic text-slate-600",
          subTitle: "text-xs font-semibold text-slate-800 mb-2",
          techText: "text-xs font-semibold text-slate-700 mt-1 mb-2",
          bodyText: "text-xs text-slate-800 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-slate-850",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-950 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'pink-header':
        return {
          titleClass: "text-xs font-bold text-[#ec4899] uppercase tracking-widest border-b border-pink-200 pb-1 mb-4",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-500",
          subTitle: "text-xs font-semibold text-[#ec4899]/80 mb-2",
          techText: "text-xs font-semibold text-gray-500 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-[#ec4899] hover:text-pink-700 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'dark-navy':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-indigo-400 pb-1.5 mb-4 text-indigo-400",
          itemContainer: "mb-6 last:mb-0 border-l border-indigo-500/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-indigo-100",
          durationBadge: "text-xs font-semibold text-indigo-400",
          subTitle: "text-xs font-semibold text-indigo-300 mb-2",
          techText: "text-xs font-semibold text-indigo-400 mt-1 mb-2",
          bodyText: "text-xs text-gray-300 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-300",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'crimson':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-rose-300 pb-1.5 mb-4 text-rose-700",
          itemContainer: "mb-6 last:mb-0 border-l border-rose-500/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-rose-950",
          durationBadge: "text-xs font-semibold text-rose-700",
          subTitle: "text-xs font-semibold text-gray-600 mb-2",
          techText: "text-xs font-semibold text-rose-700 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'black-yellow':
        return {
          titleClass: "text-sm font-bold uppercase tracking-wider border-b border-yellow-500 pb-1.5 mb-4 text-yellow-600",
          itemContainer: "mb-6 last:mb-0 border-l border-yellow-500/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs font-semibold text-yellow-600",
          subTitle: "text-xs font-semibold text-gray-600 mb-2",
          techText: "text-xs font-semibold text-yellow-600 mt-1 mb-2",
          bodyText: "text-xs text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-yellow-600 hover:text-yellow-700 mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'luxury-gold':
        return {
          titleClass: "text-xs font-bold text-[#c5a880] uppercase tracking-widest border-b border-[#c5a880]/30 pb-2 mb-4",
          itemContainer: "mb-6 last:mb-0 border-l border-[#c5a880]/20 pl-4",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-100",
          durationBadge: "text-xs text-[#c5a880] font-medium",
          subTitle: "text-xs font-semibold text-gray-400 mb-2",
          techText: "text-xs font-semibold text-[#c5a880] mt-1 mb-2",
          bodyText: "text-xs text-gray-300 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-xs text-gray-400",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-[#c5a880] hover:text-[#d7bd99] mt-2 mr-4",
          sectionSpacing: "mb-6"
        };
      case 'classic':
      default:
        return {
          titleClass: "text-lg font-bold uppercase border-b border-gray-300 mb-4 text-gray-900",
          itemContainer: "mb-6 last:mb-0",
          headerRow: "flex justify-between items-baseline mb-1 min-w-0",
          itemTitle: "font-bold text-sm text-gray-900",
          durationBadge: "text-xs italic text-gray-600",
          subTitle: "text-xs font-semibold text-gray-700 mb-2",
          techText: "text-xs font-semibold text-indigo-600 mt-1 mb-2",
          bodyText: "text-sm text-gray-600 leading-relaxed",
          bulletClass: "list-disc pl-5 mt-2 space-y-1 text-sm text-gray-600",
          linkClass: "inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 mt-2 mr-4",
          sectionSpacing: "mb-8"
        };
    }
  };

  const theme = getThemeConfig();

  // Custom Rendering for Minimal Template to enforce the 4-column layout
  const renderMinimalItem = (
    key: React.Key,
    duration: string,
    title: string,
    subText: string,
    description: string,
    tech?: string,
    bullets?: string[],
    links?: { githubUrl?: string; liveUrl?: string }
  ) => {
    return (
      <div key={key} className={theme.itemContainer}>
        <div className={theme.headerRow}>
          {duration || <span className="invisible">-</span>}
        </div>
        <div className="col-span-3">
          <h3 className={theme.itemTitle}>{title}</h3>
          {subText && <div className={theme.subTitle}>{subText}</div>}
          {tech && <div className={theme.techText}><strong>Technologies:</strong> {tech}</div>}
          {description && <p className={theme.bodyText}>{description}</p>}
          {bullets && bullets.length > 0 && (
            <ul className={theme.bulletClass}>
              {bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          )}
          {links && (links.githubUrl || links.liveUrl) && (
            <div className="flex flex-wrap mt-2">
              {links.githubUrl && (
                <a href={links.githubUrl} target="_blank" rel="noopener noreferrer" className={theme.linkClass}>
                  <Github size={12} className="inline shrink-0" /> GitHub
                </a>
              )}
              {links.liveUrl && (
                <a href={links.liveUrl} target="_blank" rel="noopener noreferrer" className={theme.linkClass}>
                  <ExternalLink size={12} className="inline shrink-0" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Standard item layout for non-minimal templates
  const renderStandardItem = (
    key: React.Key,
    duration: string,
    title: string,
    subText: string,
    description: string,
    tech?: string,
    bullets?: string[],
    links?: { githubUrl?: string; liveUrl?: string },
    achievementsText?: string
  ) => {
    return (
      <div key={key} className={theme.itemContainer}>
        <div className={theme.headerRow}>
          <h3 className={theme.itemTitle}>{title}</h3>
          {duration && <span className={theme.durationBadge}>{duration}</span>}
        </div>
        {subText && <div className={theme.subTitle}>{subText}</div>}
        {tech && <div className={theme.techText}><strong>Technologies:</strong> {tech}</div>}
        {description && <p className={theme.bodyText + " whitespace-pre-line"}>{description}</p>}
        {bullets && bullets.length > 0 && (
          <ul className={theme.bulletClass}>
            {bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        )}
        {achievementsText && (
          <p className="text-xs italic text-gray-500 mt-2">
            <strong>Key Achievements:</strong> {achievementsText}
          </p>
        )}
        {links && (links.githubUrl || links.liveUrl) && (
          <div className="flex flex-wrap mt-2">
            {links.githubUrl && (
              <a href={links.githubUrl} target="_blank" rel="noopener noreferrer" className={theme.linkClass}>
                <Github size={12} className="inline shrink-0" /> GitHub
              </a>
            )}
            {links.liveUrl && (
              <a href={links.liveUrl} target="_blank" rel="noopener noreferrer" className={theme.linkClass}>
                <ExternalLink size={12} className="inline shrink-0" /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderItem = (
    key: React.Key,
    duration: string,
    title: string,
    subText: string,
    description: string,
    tech?: string,
    bullets?: string[],
    links?: { githubUrl?: string; liveUrl?: string },
    achievementsText?: string
  ) => {
    if (styleType === 'minimal') {
      return renderMinimalItem(key, duration, title, subText, description, tech, bullets, links);
    }
    return renderStandardItem(key, duration, title, subText, description, tech, bullets, links, achievementsText);
  };

  return (
    <>
      {/* 1. Projects Section */}
      {hasProjects && (
        <section className={theme.sectionSpacing}>
          <h2 className={theme.titleClass}>Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => {
              if (!proj.name) return null;
              return renderItem(
                `proj-${idx}`,
                proj.duration || '',
                proj.name,
                proj.link ? `Link: ${proj.link}` : '',
                proj.description,
                proj.technologies,
                proj.bullets,
                { githubUrl: proj.githubUrl, liveUrl: proj.liveUrl }
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Internships Section */}
      {hasInternships && (
        <section className={theme.sectionSpacing}>
          <h2 className={theme.titleClass}>Internships</h2>
          <div className="space-y-4">
            {internships.map((intern, idx) => {
              if (!intern.company) return null;
              return renderItem(
                `intern-${idx}`,
                intern.duration,
                intern.role,
                intern.company + (intern.location ? ` | ${intern.location}` : ''),
                intern.description,
                undefined,
                undefined,
                undefined,
                intern.achievements
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Volunteer Experience Section */}
      {hasVolunteer && (
        <section className={theme.sectionSpacing}>
          <h2 className={theme.titleClass}>Volunteer Experience</h2>
          <div className="space-y-4">
            {volunteerExperience.map((vol, idx) => {
              if (!vol.organization) return null;
              return renderItem(
                `vol-${idx}`,
                vol.duration,
                vol.role,
                vol.organization,
                vol.description,
                undefined,
                undefined,
                undefined,
                vol.achievements
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Achievements Section */}
      {hasAchievements && (
        <section className={theme.sectionSpacing}>
          <h2 className={theme.titleClass}>Achievements</h2>
          <div className="space-y-4">
            {achievements.map((ach, idx) => {
              if (!ach.title) return null;
              return renderItem(
                `ach-${idx}`,
                ach.date,
                ach.title,
                ach.organization || '',
                ach.description
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};
