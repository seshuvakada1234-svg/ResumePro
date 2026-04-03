import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const A4_H = 1123;

export const TwoColumnTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      className="font-sans text-gray-800 flex flex-row p-0"
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar - 30% */}
      <aside
        className="text-white p-8 flex flex-col gap-8"
        style={{
          width: '238px',
          minWidth: '238px',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          backgroundColor: '#0f172a', // bg-slate-900 hardcoded — survives html2canvas
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight" style={{ color: '#ffffff' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm" style={{ color: '#94a3b8' }}>{personalInfo.location}</p>
        </div>

        <section>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#818cf8' }}
          >
            Contact
          </h2>
          <div className="space-y-3 text-xs" style={{ color: '#cbd5e1' }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} /> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={12} /> {personalInfo.phone}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={12} />
                <span className="truncate">{personalInfo.linkedin.replace('https://', '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github size={12} />
                <span className="truncate">{personalInfo.github.replace('https://', '')}</span>
              </div>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: '#818cf8' }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded text-[10px]"
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                  }}
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && education[0].school && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: '#818cf8' }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-bold text-xs" style={{ color: '#ffffff' }}>{edu.school}</div>
                  <div className="text-[10px]" style={{ color: '#94a3b8' }}>{edu.degree}</div>
                  <div className="text-[10px] italic" style={{ color: '#64748b' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content - 70% */}
      <main
        className="flex flex-col gap-8"
        style={{
          flex: 1,
          padding: '40px',
          backgroundColor: '#ffffff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
        }}
      >
        {personalInfo.summary && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: '#0f172a' }}
            >
              <div style={{ width: '4px', height: '16px', backgroundColor: '#4f46e5' }} />
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: '#0f172a' }}
            >
              <div style={{ width: '4px', height: '16px', backgroundColor: '#4f46e5' }} />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ paddingLeft: '16px', borderLeft: '1px solid #f1f5f9' }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: '-1.5px',
                      top: '6px',
                      width: '3px',
                      height: '3px',
                      backgroundColor: '#4f46e5',
                    }}
                  />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm" style={{ color: '#0f172a' }}>{exp.position}</h3>
                    <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>{exp.duration}</span>
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#4f46e5' }}>{exp.company}</div>
                  <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: '#64748b' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && projects[0].name && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: '#0f172a' }}
            >
              <div style={{ width: '4px', height: '16px', backgroundColor: '#4f46e5' }} />
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <h3 className="font-bold text-xs mb-1" style={{ color: '#0f172a' }}>{proj.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};