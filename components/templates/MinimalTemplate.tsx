import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

export const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="a4-page font-sans text-slate-900 p-12 overflow-hidden">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 uppercase tracking-widest font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-10">
        {personalInfo.summary && (
          <section>
            <p className="text-sm leading-relaxed text-slate-600 italic">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-4 gap-4">
                  <div className="text-xs text-slate-400 font-medium">{exp.duration}</div>
                  <div className="col-span-3">
                    <h3 className="font-bold text-sm mb-1">{exp.position}</h3>
                    <div className="text-xs text-slate-500 mb-3">{exp.company}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {education.length > 0 && education[0].school && (
            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm mb-1">{edu.school}</div>
                    <div className="text-xs text-slate-500">{edu.degree}</div>
                    <div className="text-xs text-slate-400 mt-1">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Skills</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-xs text-slate-600">{typeof skill === 'string' ? skill : skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
