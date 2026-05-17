'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';

/**
 * LuxuryGoldTemplate
 * A professional, high-end resume template with a gold and dark aesthetic.
 * Converted from a boutique HTML template to React + Tailwind CSS.
 */

interface LuxuryGoldTemplateProps {
  data: ResumeData;
}

export const LuxuryGoldTemplate: React.FC<LuxuryGoldTemplateProps> = ({ data }) => {
  // Helper to split full name
  const nameParts = data.personalInfo.fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Helper to render skill dots
  const renderDots = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const isFilled = i < level;
      // In this template level is 1-5
      return (
        <div
          key={i}
          className={`w-[7px] h-[7px] rounded-full sm:w-[7px] sm:h-[7px] ${
            isFilled ? 'bg-[#1a1a1a]' : 'bg-gray-300'
          }`}
        />
      );
    });
  };

  return (
    <div className="flex justify-center items-start w-full font-sans print:p-0 print:bg-white transition-all duration-300">
      <div className="relative w-full bg-white grid grid-cols-1 md:grid-cols-[220px_1fr] overflow-hidden print:shadow-none print:max-w-full min-h-[1123px]">
        
        {/* --- HEADER --- */}
        <header className="col-span-full grid grid-cols-1 md:grid-cols-[220px_1fr_auto] border-b border-[#e8e5de] z-10">
          {/* Photo */}
          <div className="relative h-[200px] overflow-hidden">
            <img 
              src={data.personalInfo.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.personalInfo.fullName)}&background=1a1a1a&color=fff&size=300`} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          
          {/* Name & Title */}
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-1">
              <p className="text-[22px] tracking-widest text-[#1a1a1a] uppercase">
                {firstName}
              </p>
            </div>
            <p className="font-serif text-5xl md:text-[48px] font-black text-[#1a1a1a] leading-tight tracking-tighter">
              {lastName}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-[3px] h-[18px] bg-[#1a1a1a]" />
              <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#444]">
                {data.personalInfo.title || 'Professional'}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="p-8 flex flex-col justify-center gap-1.5 min-w-[220px] bg-gray-50 md:bg-white border-t md:border-t-0 border-[#e8e5de]">
            <div className="flex gap-2 text-[12px] text-[#444] leading-normal">
              <span className="font-bold text-[#1a1a1a] min-w-[14px] uppercase">P:</span>
              <span className="break-all">{data.personalInfo.phone}</span>
            </div>
            <div className="flex gap-2 text-[12px] text-[#444] leading-normal">
              <span className="font-bold text-[#1a1a1a] min-w-[14px] uppercase">E:</span>
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
            {data.personalInfo.website && (
              <div className="flex gap-2 text-[12px] text-[#444] leading-normal">
                <span className="font-bold text-[#1a1a1a] min-w-[14px] uppercase">S:</span>
                <span className="break-all">{data.personalInfo.website}</span>
              </div>
            )}
            <div className="flex gap-2 text-[12px] text-[#444] leading-normal">
              <span className="font-bold text-[#1a1a1a] min-w-[14px] uppercase">A:</span>
              <span className="break-words">{data.personalInfo.location}</span>
            </div>
          </div>
        </header>

        {/* --- SUMMARY SECTION --- */}
        <div className="md:border-b md:border-[#e8e5de] bg-[#fafaf8]" />
        <section className="p-8 border-b border-[#e8e5de]">
          <p className="text-[12.5px] text-[#444] leading-[1.7] whitespace-pre-line sm:max-w-prose">
            {data.personalInfo.summary}
          </p>
        </section>

        {/* --- SIDEBAR (Left on MD+) --- */}
        <aside className="bg-[#fafaf8] p-8 md:p-6 flex flex-col gap-8">
          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] pb-1.5 border-b-2 border-[#E8B84B] inline-block">
              Skills
            </h3>
            
            <div className="space-y-4">
               <div>
                 <ul className="space-y-1.5">
                   {data.skills.map((skill, i) => (
                     <li key={i} className="text-[12px] text-[#444] pl-3.5 relative before:content-['•'] before:absolute before:left-0 before:text-[#E8B84B] before:text-[14px]">
                       {skill.name}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] pb-1.5 border-b-2 border-[#E8B84B] inline-block">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#1a1a1a]">{edu.degree}</p>
                  <p className="text-[11.5px] text-[#444] mt-0.5">{edu.school}</p>
                  <p className="text-[10.5px] text-[#888] mt-0.5">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT (Right on MD+) --- */}
        <main className="p-8 md:p-8 flex flex-col gap-8">
          <section className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[3px] uppercase text-[#1a1a1a] pb-1.5 border-b-2 border-[#E8B84B] inline-block">
              Work Experience
            </h2>

            <div className="space-y-8">
              {data.experience.map((job, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[14px] font-bold text-[#1a1a1a] leading-tight">{job.position}</p>
                  </div>
                  <p className="text-[11.5px] italic text-[#888]">
                    <span className="text-[#444] font-semibold not-italic">{job.company}</span> | {job.duration}
                  </p>
                  <div className="text-[12px] text-[#444] leading-relaxed">
                    {job.description}
                  </div>
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1.5">
                      {job.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-[12px] text-[#444] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#E8B84B] before:text-[14px]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* --- FOOTER --- */}
        <footer className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#e8e5de] bg-[#fafaf8] print:bg-transparent">
          
          {/* References */}
          {data.references && data.references.length > 0 && (
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#e8e5de]">
              <h4 className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] mb-4">References</h4>
              <div className="space-y-4">
                {data.references.map((ref, i) => (
                  <div key={i}>
                    <p className="text-[11px] font-semibold text-[#1a1a1a]">{ref.name} – {ref.phone}</p>
                    <p className="text-[10.5px] text-[#888] italic">{ref.position}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Metrics Dots */}
          <div className="col-span-full lg:col-span-3 grid grid-cols-1 sm:grid-cols-3">
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#e8e5de]">
              <h4 className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] mb-4">Core Skills</h4>
              <div className="space-y-2">
                {data.skills.slice(0, 4).map((skill, si) => (
                  <div key={si} className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-[#444]">{skill.name}</span>
                    <div className="flex gap-[3px]">
                      {renderDots(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-[#e8e5de]">
              <h4 className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] mb-4">Technical</h4>
              <div className="space-y-2">
                {data.skills.slice(4, 8).map((skill, si) => (
                  <div key={si} className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-[#444]">{skill.name}</span>
                    <div className="flex gap-[3px]">
                      {renderDots(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-[#1a1a1a] mb-4">Expertise</h4>
              <div className="space-y-2">
                {data.skills.slice(8, 12).map((skill, si) => (
                  <div key={si} className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-[#444]">{skill.name}</span>
                    <div className="flex gap-[3px]">
                      {renderDots(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </footer>

      </div>

      {/* Global CSS for Print and Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif !important;
        }
        
        .font-sans {
          font-family: 'DM Sans', sans-serif !important;
        }

        @media print {
          body { -webkit-print-color-adjust: exact; background: white !important; }
        }
      `}</style>
    </div>
  );
};
