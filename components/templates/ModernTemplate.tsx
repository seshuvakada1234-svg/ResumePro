import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="a4-page font-sans text-gray-800 flex flex-col p-0 overflow-hidden">
      <div className="bg-indigo-700 p-10 text-white">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-indigo-100">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {personalInfo.location}</span>}
        </div>
        <div className="flex gap-4 mt-4">
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-indigo-200 hover:text-white transition-colors"><Linkedin size={16} /></a>}
          {personalInfo.github && <a href={personalInfo.github} className="text-indigo-200 hover:text-white transition-colors"><Github size={16} /></a>}
        </div>
      </div>

      <div className="p-10 grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold text-indigo-700 mb-3 uppercase tracking-wider">About Me</h2>
              <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && experience[0].company && (
            <section>
              <h2 className="text-lg font-bold text-indigo-700 mb-4 uppercase tracking-wider">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-indigo-100 pl-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.duration}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-indigo-700 mb-4 uppercase tracking-wider">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && education[0].school && (
            <section>
              <h2 className="text-lg font-bold text-indigo-700 mb-4 uppercase tracking-wider">Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm text-gray-900">{edu.school}</div>
                    <div className="text-xs text-gray-500">{edu.degree}</div>
                    <div className="text-xs font-bold text-indigo-600 mt-1">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};