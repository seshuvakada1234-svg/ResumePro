import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import IconText from '@/components/IconText';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="a4-page font-serif text-gray-800 p-[20mm]">
      <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm min-w-0">
          {personalInfo.email && <IconText icon={<Mail size={14} className="text-gray-500" />} text={personalInfo.email} />}
          {personalInfo.phone && <IconText icon={<Phone size={14} className="text-gray-500" />} text={personalInfo.phone} />}
          {personalInfo.location && <IconText icon={<MapPin size={14} className="text-gray-500" />} text={personalInfo.location} />}
        </div>
        <div className="flex justify-center gap-4 mt-3 min-w-0">
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 min-w-0">
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 min-w-0">
              <Github size={12} /> GitHub
            </a>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && experience[0].company && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1 min-w-0">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-sm italic text-gray-600">{exp.duration}</span>
                </div>
                <div className="text-sm font-semibold mb-2">{exp.company}</div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && projects[0].name && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div key={i}>
                <h3 className="font-bold text-sm mb-1">{proj.name}</h3>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && education[0].school && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold text-sm">{edu.school}</div>
                  <div className="text-sm">{edu.degree}</div>
                  <div className="text-xs italic text-gray-600">{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 min-w-0">
              {skills.map((skill, i) => (
                <span key={i} className="text-sm">• {typeof skill === 'string' ? skill : skill.name}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
