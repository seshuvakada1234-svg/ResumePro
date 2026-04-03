import React from 'react';
import { ResumeData } from '@/types/resume';

const A4_H = 1123;

export const RedlineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, languages } = data;

  return (
    <div
      className="font-sans"
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        overflow: 'hidden',
        background: '#fff',
        fontFamily: "'Raleway', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          background: '#1a1a1a',
          color: '#fff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Photo area */}
        <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative', background: '#111', flexShrink: 0 }}>
          {personalInfo?.profileImage ? (
            <img src={personalInfo.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '56px', fontWeight: 900, color: 'rgba(255,255,255,0.15)' }}>
                {personalInfo?.fullName?.charAt(0) || '?'}
              </div>
            </div>
          )}
          {/* Red arch overlay */}
          <div style={{ position: 'absolute', bottom: '28px', left: '10px', right: '10px', height: '44px', background: '#e8474a', borderRadius: '55% 55% 0 0 / 28px 28px 0 0' }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '44px', background: '#1a1a1a', borderRadius: '55% 55% 0 0 / 28px 28px 0 0' }} />
        </div>

        {/* Sidebar content */}
        <div style={{ padding: '14px 22px 24px', flex: 1, overflow: 'hidden' }}>

          {/* Skills */}
          {skills?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '18px', height: '18px', background: '#e8474a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '2px' }}>Work Skills</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#ccc', width: '85px', flexShrink: 0 }}>{skill.name}</span>
                  <div style={{ flex: 1, height: '4px', background: '#333', borderRadius: '2px' }}>
                    <div style={{ height: '100%', background: '#e8474a', borderRadius: '2px', width: `${skill.level}%` }} />
                  </div>
                  <span style={{ fontSize: '9px', color: '#888', width: '26px', textAlign: 'right' }}>{skill.level}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '18px', height: '18px', background: '#e8474a', borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '2px' }}>Languages</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#ccc', width: '85px', flexShrink: 0 }}>{lang.name}</span>
                  <div style={{ flex: 1, height: '4px', background: '#333', borderRadius: '2px' }}>
                    <div style={{ height: '100%', background: '#666', borderRadius: '2px', width: `${lang.level}%` }} />
                  </div>
                  <span style={{ fontSize: '9px', color: '#888', width: '26px', textAlign: 'right' }}>{lang.level}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '18px', height: '18px', background: '#e8474a', borderRadius: '50%', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '2px' }}>Contact</span>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />
            {personalInfo?.phone && (
              <><div style={{ fontSize: '9px', color: '#e8474a', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '2px' }}>Phone:</div>
              <div style={{ fontSize: '10px', color: '#ccc', marginBottom: '8px' }}>{personalInfo.phone}</div></>
            )}
            {personalInfo?.email && (
              <><div style={{ fontSize: '9px', color: '#e8474a', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '2px' }}>Email:</div>
              <div style={{ fontSize: '10px', color: '#ccc', marginBottom: '8px' }}>{personalInfo.email}</div></>
            )}
            {personalInfo?.location && (
              <><div style={{ fontSize: '9px', color: '#e8474a', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '2px' }}>Address:</div>
              <div style={{ fontSize: '10px', color: '#ccc', marginBottom: '8px' }}>{personalInfo.location}</div></>
            )}
          </div>

          {/* Education */}
          {education?.length > 0 && education[0].school && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '18px', height: '18px', background: '#e8474a', borderRadius: '50%', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '2px' }}>Education</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px' }} />
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{edu.school}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>{edu.degree}</div>
                  <div style={{ fontSize: '10px', color: '#666' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <main
        style={{
          background: '#fff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
          flex: 1,
          padding: '32px 28px 32px',
        }}
      >
        {/* Name header */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#e8474a', letterSpacing: '-0.5px', lineHeight: 1 }}>
            {personalInfo?.fullName?.split(' ')[0] || 'FIRST'}{' '}
            <span style={{ color: '#1a1a1a' }}>{personalInfo?.fullName?.split(' ').slice(1).join(' ') || 'LAST'}</span>.
          </h1>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '4px' }}>
            {experience?.[0]?.position || 'Your Role'}
          </div>
          <div style={{ height: '1.5px', background: '#e8e8e8', margin: '12px 0' }} />
          {personalInfo?.summary && (
            <p style={{ fontSize: '11px', color: '#777', lineHeight: 1.75 }}>{personalInfo.summary}</p>
          )}
        </div>

        {/* Education */}
        {education?.length > 0 && education[0].school && (
          <div style={{ marginBottom: '20px' }}>
            <SectionHdr label="Education" />
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '75px 1fr', gap: '0', marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: '#999', paddingRight: '12px', textAlign: 'right', paddingTop: '2px' }}>{edu.year}</div>
                <div style={{ paddingLeft: '16px', borderLeft: '2px solid #e8e8e8', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: '#e8474a' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '11px', color: '#777' }}>{edu.school}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && experience[0].company && (
          <div style={{ marginBottom: '20px' }}>
            <SectionHdr label="Work Experience" />
            {experience.map((exp, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '75px 1fr', gap: '0', marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: '#999', paddingRight: '12px', textAlign: 'right', paddingTop: '2px' }}>{exp.duration}</div>
                <div style={{ paddingLeft: '16px', borderLeft: '2px solid #e8e8e8', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: '#e8474a' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8474a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.position}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginBottom: '3px' }}>{exp.company}</div>
                  <div style={{ fontSize: '11px', color: '#777', lineHeight: 1.65 }}>{exp.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

function SectionHdr({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <div style={{ width: '24px', height: '24px', background: '#e8474a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%' }} />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a', letterSpacing: '3px', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
    </div>
  );
}