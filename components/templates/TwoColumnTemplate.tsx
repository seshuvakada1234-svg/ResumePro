import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const TwoColumnTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="a4-page font-sans text-gray-800 flex flex-row p-0 overflow-hidden">
      {/* Sidebar - 30% */}
      <aside className="w-[30%] bg-slate-900 text-white p-8 flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-slate-400 text-sm">{personalInfo.location}</p>
        </div>

        <section>
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Contact</h2>
          <div className="space-y-3 text-xs text-slate-300">
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone}</div>}
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
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-200 border border-slate-700">
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && education[0].school && (
          <section>
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-bold text-xs text-white">{edu.school}</div>
                  <div className="text-[10px] text-slate-400">{edu.degree}</div>
                  <div className="text-[10px] italic text-slate-500">{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content - 70% */}
      <main className="w-[70%] p-10 flex flex-col gap-8 bg-white">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-600" /> Professional Summary
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-600" /> Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-4 border-l border-slate-100">
                  <div className="absolute -left-[1.5px] top-1.5 w-[3px] h-[3px] bg-indigo-600 rounded-full" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.position}</h3>
                    <span className="text-xs text-slate-400 font-medium">{exp.duration}</span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 mb-2">{exp.company}</div>
                  <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && projects[0].name && (
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-600" /> Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-xs mb-1">{proj.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
