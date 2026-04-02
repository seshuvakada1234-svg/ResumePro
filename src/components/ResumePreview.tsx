import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, template } = data;

  const renderClassic = () => (
    <div className="a4-page font-serif text-gray-800">
      <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-gray-500" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={14} className="text-gray-500" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-500" />
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && experience[0].company && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-xs font-medium text-gray-600 italic">{exp.duration}</span>
                </div>
                <div className="text-sm font-semibold text-gray-700">{exp.company}</div>
                <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && projects[0].name && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    {proj.name}
                    {proj.link && <ExternalLink size={12} className="text-indigo-500" />}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && education[0].school && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-base">{edu.school}</h3>
                  <p className="text-sm text-gray-700">{edu.degree}</p>
                </div>
                <span className="text-xs font-medium text-gray-600 italic">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm font-medium">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );

  const renderModern = () => (
    <div className="a4-page font-sans text-gray-800 flex flex-col">
      <div className="bg-indigo-900 -mx-[20mm] -mt-[20mm] p-[20mm] text-white mb-8">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-indigo-100">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={14} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {personalInfo.location}</span>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-grow">
        <div className="col-span-8 space-y-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                Profile
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && experience[0].company && (
            <section>
              <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                      <span className="text-xs font-bold text-indigo-600">{exp.duration}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && projects[0].name && (
            <section>
              <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-base text-gray-900">{proj.name}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wider mb-4">Skills</h2>
              <div className="flex flex-col gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && education[0].school && (
            <section>
              <h2 className="text-lg font-bold text-indigo-900 uppercase tracking-wider mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                    <p className="text-[10px] font-bold text-indigo-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="a4-page font-sans text-gray-800">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-10">
        {personalInfo.summary && (
          <section>
            <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs font-bold text-gray-400">{exp.duration}</div>
                  <div className="col-span-9 space-y-1">
                    <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                    <div className="text-xs font-medium text-gray-500">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && education[0].school && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs font-bold text-gray-400">{edu.year}</div>
                  <div className="col-span-9">
                    <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );

  const renderFresherIndia = () => (
    <div className="a4-page font-sans text-gray-800 border-t-8 border-blue-600">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-6">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 pb-1 mb-2">Objective</h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {education.length > 0 && education[0].school && (
          <section>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && projects[0].name && (
          <section>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 pb-1 mb-3">Academic Projects</h2>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 pb-1 mb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider border-b border-blue-100 pb-1 mb-3">Internships / Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-blue-600">{exp.duration}</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-500">{exp.company}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );

  const renderTwoColumn = () => (
    <div className="a4-page font-sans text-gray-800 flex flex-col p-0">
      <div className="bg-purple-900 p-10 text-white">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-purple-200 text-sm max-w-2xl">{personalInfo.summary}</p>
      </div>
      
      <div className="flex flex-grow">
        <div className="w-1/3 bg-purple-50 p-8 space-y-8">
          <section>
            <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest mb-4">Contact</h2>
            <div className="space-y-3 text-xs text-purple-800">
              {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {personalInfo.phone}</div>}
              {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} /> {personalInfo.location}</div>}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-white text-purple-700 rounded text-[10px] font-bold border border-purple-100">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && education[0].school && (
            <section>
              <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-xs text-purple-900">{edu.school}</h3>
                    <p className="text-[10px] text-purple-700">{edu.degree}</p>
                    <p className="text-[10px] font-bold text-purple-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-2/3 p-8 space-y-8">
          {experience.length > 0 && experience[0].company && (
            <section>
              <h2 className="text-sm font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-2 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm text-gray-900">{exp.position}</h3>
                      <span className="text-[10px] font-bold text-purple-600">{exp.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-500">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && projects[0].name && (
            <section>
              <h2 className="text-sm font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );

  return (
    <div className="a4-preview-container">
      <div className="a4-preview-scale">
        {template === 'classic' && renderClassic()}
        {template === 'modern' && renderModern()}
        {template === 'minimal' && renderMinimal()}
        {template === 'executive' && renderExecutive(data)}
        {template === 'fresher-india' && renderFresherIndia()}
        {template === 'two-column' && renderTwoColumn()}
      </div>
    </div>
  );
};

const renderExecutive = (data: ResumeData) => {
  const { personalInfo, education, experience, skills, projects } = data;
  return (
    <div className="a4-page font-serif text-gray-900 border-[12px] border-double border-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-indigo-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-8">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-2 mb-4">Executive Profile</h2>
            <p className="text-sm leading-relaxed text-justify text-gray-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-2 mb-4">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-indigo-600">{exp.duration}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">{exp.company}</div>
                  <p className="text-sm leading-relaxed text-gray-600 border-l-2 border-indigo-50 pl-4">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && education[0].school && (
            <section>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-sm text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                    <p className="text-[10px] font-bold text-indigo-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest border-b-2 border-indigo-50 pb-2 mb-4">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {skills.map((skill, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-300 pointer-events-none">
        Built with ResumePro India
      </div>
    </div>
  );
};
