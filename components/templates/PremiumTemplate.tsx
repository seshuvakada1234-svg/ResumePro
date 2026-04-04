'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

interface Props {
  data: ResumeData;
}

const A4_H = 1123;

const SidebarProgressBar = ({ label, level }: { label: string; level: number }) => (
  <div className="space-y-1.5">
    <div
      className="flex justify-between text-[10px] font-semibold uppercase tracking-wider"
      style={{ color: '#ffffff' }}
    >
      <span>{label}</span>
      <span>{level}%</span>
    </div>
    <div
      className="h-1.5 w-full rounded-full overflow-hidden"
      style={{ backgroundColor: '#5c6bc0' }}
    >
      <div className="h-full rounded-full" style={{ width: `${level}%`, backgroundColor: '#ffffff' }} />
    </div>
  </div>
);

const SectionCard = ({
  title,
  children,
  padding = 'p-5',
}: {
  title: string;
  children: React.ReactNode;
  padding?: string;
}) => (
  <div
    className={`rounded-xl ${padding}`}
    style={{ border: '1px solid #f3f4f6', backgroundColor: '#ffffff' }}
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6366f1' }} />
      <h2
        className="text-sm font-bold uppercase tracking-wider"
        style={{ color: '#4f46e5' }}
      >
        {title}
      </h2>
    </div>
    {children}
  </div>
);

export default function PremiumTemplate({ data }: Props) {
  const { personalInfo, education, experience, skills, languages, projects } = data;

  const validExperience = (experience ?? []).filter(
    (exp) => exp?.company?.trim() || exp?.position?.trim() || exp?.description?.trim()
  );
  const validEducation = (education ?? []).filter(
    (edu) => edu?.school?.trim() || edu?.degree?.trim() || edu?.year?.trim()
  );
  const validProjects = (projects ?? []).filter(
    (proj) => proj?.name?.trim() || proj?.description?.trim() || proj?.link?.trim()
  );

  const sectionCount =
    (personalInfo?.summary ? 1 : 0) +
    (validExperience.length > 0 ? 1 : 0) +
    (validEducation.length > 0 ? 1 : 0) +
    (validProjects.length > 0 ? 1 : 0);

  const cardPadding = sectionCount <= 2 ? 'p-6' : sectionCount >= 4 ? 'p-4' : 'p-5';

  const iconBadge: React.CSSProperties = {
    width: '24px',
    height: '24px',
    minWidth: '24px',
    borderRadius: '6px',
    background: '#5c6bc0',
    display: 'block',
    padding: '6px',
    boxSizing: 'border-box',
    flexShrink: 0,
    lineHeight: 0,
  };

  const socialBadge: React.CSSProperties = {
    width: '28px',
    height: '28px',
    minWidth: '28px',
    borderRadius: '6px',
    background: '#5c6bc0',
    display: 'block',
    padding: '7px',
    boxSizing: 'border-box',
    color: '#ffffff',
    flexShrink: 0,
    lineHeight: 0,
  };

  return (
    <div
      className="font-sans"
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      <aside
        className="flex flex-col gap-6 p-6 text-white"
        style={{
          width: '254px',
          minWidth: '254px',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          background: 'linear-gradient(to bottom, #4338ca, #3730a3, #581c87)',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <div className="flex flex-col items-start gap-4">
          <div className="relative">
            {personalInfo?.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo?.fullName}
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: '4px solid #7986cb' }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                style={{ background: '#5c6bc0', border: '4px solid #7986cb' }}
              >
                {personalInfo?.fullName?.charAt(0) || '?'}
              </div>
            )}
            <div
              className="absolute w-5 h-5 bg-green-400 rounded-full"
              style={{ bottom: '-2px', right: '-2px', border: '3px solid #4338ca' }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight" style={{ color: '#ffffff' }}>
              {personalInfo?.fullName || 'Your Name'}
            </h1>
            <p
              className="text-[10px] font-medium uppercase tracking-widest mt-1"
              style={{ color: '#ffffff' }}
            >
              {experience?.[0]?.position || 'Professional Role'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3
            className="text-[10px] font-bold uppercase tracking-widest pb-2"
            style={{ color: '#ffffff', borderBottom: '1px solid #5c6bc0' }}
          >
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px' }}>
            {[
              { icon: <Mail size={12} />, value: personalInfo?.email || 'email@example.com' },
              { icon: <Phone size={12} />, value: personalInfo?.phone || '+91 0000000000' },
              { icon: <MapPin size={12} />, value: personalInfo?.location || 'City, Country' },
            ].map(({ icon, value }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  lineHeight: 1
                }}
              >
                <div
                  style={{
                    ...iconBadge,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translateY(1px)'
                  }}
                >
                  {React.cloneElement(icon, {
                    style: {
                      display: 'block',
                      width: '12px',
                      height: '12px'
                    }
                  })}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    lineHeight: '1',
                    verticalAlign: 'middle',
                    transform: 'translateY(-1.5px)',
                    fontFeatureSettings: '"tnum"',
                    wordBreak: 'break-word'
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

            {(personalInfo?.linkedin || personalInfo?.github) && (
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} style={socialBadge}>
                    <Linkedin size={14} />
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} style={socialBadge}>
                    <Github size={14} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3
            className="text-[10px] font-bold uppercase tracking-widest pb-2"
            style={{ color: '#ffffff', borderBottom: '1px solid #5c6bc0' }}
          >
            Expertise
          </h3>
          <div className="space-y-4">
            {skills?.length > 0 ? (
              skills.map((skill, idx) => (
                <SidebarProgressBar key={idx} label={skill.name} level={skill.level} />
              ))
            ) : (
              <p className="text-[10px] italic" style={{ color: '#ffffff' }}>
                Add your expertise
              </p>
            )}
          </div>
        </div>

        {languages?.length > 0 && (
          <div className="space-y-3">
            <h3
              className="text-[10px] font-bold uppercase tracking-widest pb-2"
              style={{ color: '#ffffff', borderBottom: '1px solid #5c6bc0' }}
            >
              Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang, idx) => (
                <SidebarProgressBar key={idx} label={lang.name} level={lang.level} />
              ))}
            </div>
          </div>
        )}
      </aside>

      <main
        className="flex flex-col gap-4 p-8"
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
        }}
      >
        <div className="flex-shrink-0 mb-2">
          <h1
            className="text-3xl font-black tracking-tight uppercase"
            style={{ color: '#111827' }}
          >
            {personalInfo?.fullName || 'Full Name'}
          </h1>
          <p
            className="font-bold text-sm tracking-widest uppercase mt-1"
            style={{ color: '#4f46e5' }}
          >
            {experience?.[0]?.position || 'Professional Title'}
          </p>
          <div
            className="mt-3 rounded-full"
            style={{ height: '4px', width: '64px', backgroundColor: '#4f46e5' }}
          />
        </div>

        {personalInfo?.summary && (
          <SectionCard title="Professional Profile" padding={cardPadding}>
            <p className="text-sm leading-relaxed text-justify" style={{ color: '#4b5563' }}>
              {personalInfo.summary}
            </p>
          </SectionCard>
        )}

        {validExperience.length > 0 && (
          <SectionCard title="Work Experience" padding={cardPadding}>
            <div className="space-y-5">
              {validExperience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold" style={{ color: '#111827' }}>{exp.position}</h4>
                      <p className="font-bold text-xs mt-0.5" style={{ color: '#4f46e5' }}>{exp.company}</p>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide whitespace-nowrap flex-shrink-0"
                      style={{ color: '#9ca3af', backgroundColor: '#f3f4f6' }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed pl-3"
                    style={{ color: '#4b5563', borderLeft: '2px solid #e5e7eb' }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {validEducation.length > 0 && (
          <SectionCard title="Education" padding={cardPadding}>
            <div className="grid grid-cols-2 gap-4">
              {validEducation.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="text-xs font-bold leading-tight" style={{ color: '#111827' }}>
                      {edu.degree}
                    </h4>
                    <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: '#6366f1' }}>
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: '#6b7280' }}>{edu.school}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {validProjects.length > 0 && (
          <SectionCard title="Key Projects" padding={cardPadding}>
            <div className="space-y-3">
              {validProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: '#f9fafb', border: '1px solid #f3f4f6' }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold" style={{ color: '#111827' }}>{proj.name}</h4>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#6366f1' }}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </main>
    </div>
  );
}