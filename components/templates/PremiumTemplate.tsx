'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props {
  data: ResumeData;
}

const ProgressBar = ({ label, level }: { label: string; level: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
      <span>{label}</span>
      <span>{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="space-y-2 mb-4">
    <h2 className="text-base font-semibold text-indigo-600 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
      {title}
    </h2>
    <div className="h-[1px] w-full bg-gray-100" />
  </div>
);

export default function PremiumTemplate({ data }: Props) {
  const { personalInfo, education, experience, skills, languages, projects } = data;

  return (
    <div className="a4-page flex flex-col lg:flex-row p-0 overflow-hidden font-sans text-gray-800 bg-white shadow-xl hover:scale-[1.01] transition-all duration-300">
      {/* Sidebar - 30% on Desktop, Full on Mobile */}
      <div className="w-full lg:w-[30%] bg-gray-50 p-6 lg:p-8 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-gray-100">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative group">
            {personalInfo?.profileImage ? (
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo?.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-105">
                {personalInfo?.fullName?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalInfo?.fullName || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 font-medium">{experience?.[0]?.position || 'Professional Role'}</p>
            <div className="h-[1px] w-12 bg-indigo-200 mx-auto mt-2" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors">
              <Mail size={14} className="text-indigo-400" />
              <span className="truncate">{personalInfo?.email || 'email@example.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={14} className="text-indigo-400" />
              <span>{personalInfo?.phone || '+91 0000000000'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={14} className="text-indigo-400" />
              <span>{personalInfo?.location || 'City, Country'}</span>
            </div>
            {personalInfo?.website && (
              <div className="flex items-center gap-3 text-gray-600">
                <Globe size={14} className="text-indigo-400" />
                <span className="truncate">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Skills</h3>
          <div className="space-y-4">
            {skills?.length > 0 ? (
              skills.map((skill, idx) => (
                <ProgressBar key={idx} label={skill.name} level={skill.level} />
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">Add your skills</p>
            )}
          </div>
        </div>

        {/* Languages */}
        {languages?.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Languages</h3>
            <div className="space-y-4">
              {languages.map((lang, idx) => (
                <ProgressBar key={idx} label={lang.name} level={lang.level} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content - 70% on Desktop */}
      <div className="flex-1 p-6 lg:p-10 space-y-8 bg-white">
        {/* Summary */}
        <section>
          <SectionTitle title="Professional Summary" />
          <p className="text-sm text-gray-600 leading-relaxed">
            {personalInfo?.summary || 'Add your professional summary to highlight your key achievements and goals.'}
          </p>
        </section>

        {/* Experience */}
        <section>
          <SectionTitle title="Work Experience" />
          <div className="space-y-6">
            {experience?.length > 0 ? (
              experience.map((exp, idx) => (
                <div key={idx} className="relative pl-5 border-l border-gray-100 last:border-0 pb-1">
                  <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{exp.position}</h4>
                      <p className="text-indigo-600 font-semibold text-xs">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase tracking-wider">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">Add your work experience</p>
            )}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionTitle title="Education" />
          <div className="grid grid-cols-1 gap-4">
            {education?.length > 0 ? (
              education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start group">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{edu.degree}</h4>
                    <p className="text-xs text-gray-500">{edu.school}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{edu.year}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">Add your education</p>
            )}
          </div>
        </section>

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <SectionTitle title="Key Projects" />
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:border-indigo-100 transition-all space-y-2 group">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 text-[10px] font-bold uppercase hover:underline">Link</a>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
