import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import IconText from '@/components/IconText';
import { FresherSections } from './FresherSectionsRenderer';

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;

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

      {experience && experience.length > 0 && experience.some(e => e.company || e.position || e.description || (e.bullets && e.bullets.length > 0)) && (
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
                {exp.description && (
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm leading-relaxed text-gray-700">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="leading-relaxed">
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <FresherSections data={data} styleType="classic" />

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
