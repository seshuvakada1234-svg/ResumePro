import React from 'react';
import { ResumeData } from '@/types/resume';

const A4_H = 1123;

export const SerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, languages } = data;

  return (
    <div
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        overflow: 'hidden',
        background: '#fff',
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          background: '#2b2b2b',
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
        <div style={{ width: '100%', height: '240px', overflow: 'hidden', flexShrink: 0, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {personalInfo?.profileImage ? (
            <img src={personalInfo.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(100%)' }} />
          ) : (
            <div style={{ fontSize: '64px', fontWeight: 900, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia, serif' }}>
              {personalInfo?.fullName?.charAt(0) || '?'}
            </div>
          )}
        </div>

        {/* Sidebar content */}
        <div style={{ padding: '24px 24px 28px', overflow: 'hidden', flex: 1 }}>
          {/* Name */}
          <div style={{ marginBottom: '14px' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, lineHeight: 1.1, color: '#fff' }}>
              {personalInfo?.fullName?.split(' ')[0] || 'First'}<br />
              {personalInfo?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
            </h1>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '5px', letterSpacing: '1px', fontFamily: 'sans-serif' }}>
              {experience?.[0]?.position || 'Your Role'}
            </div>
          </div>

          {/* Social links */}
          {(personalInfo?.linkedin || personalInfo?.github) && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
              {personalInfo?.linkedin && (
                <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2b2b2b"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
              )}
              {personalInfo?.github && (
                <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#2b2b2b"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </div>
              )}
            </div>
          )}

          {/* Contact */}
          <div style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Contact</h2>
            <div style={{ width: '24px', height: '2px', background: '#fff', marginBottom: '12px' }} />
            {personalInfo?.email && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Email:</div>
                <div style={{ fontSize: '11px', color: '#ddd' }}>{personalInfo.email}</div>
              </div>
            )}
            {personalInfo?.phone && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone:</div>
                <div style={{ fontSize: '11px', color: '#ddd' }}>{personalInfo.phone}</div>
              </div>
            )}
            {personalInfo?.location && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Address:</div>
                <div style={{ fontSize: '11px', color: '#ddd' }}>{personalInfo.location}</div>
              </div>
            )}
          </div>

          {/* Languages */}
          {languages?.length > 0 && (
            <div style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Languages</h2>
              <div style={{ width: '24px', height: '2px', background: '#fff', marginBottom: '12px' }} />
              {languages.map((lang, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#ccc', width: '55px', flexShrink: 0 }}>{lang.name}</span>
                  <div style={{ flex: 1, height: '5px', background: '#555', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: '#fff', borderRadius: '3px', width: `${lang.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div style={{ fontFamily: 'sans-serif' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Skills</h2>
              <div style={{ width: '24px', height: '2px', background: '#fff', marginBottom: '12px' }} />
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#ccc', width: '75px', flexShrink: 0 }}>{skill.name}</span>
                  <div style={{ flex: 1, height: '5px', background: '#555', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: '#fff', borderRadius: '3px', width: `${skill.level}%` }} />
                  </div>
                  <span style={{ fontSize: '10px', color: '#888', width: '28px', textAlign: 'right' }}>{skill.level}%</span>
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
          padding: '36px 32px',
          fontFamily: "'Open Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Profile */}
        {personalInfo?.summary && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Profile</h2>
            <div style={{ width: '28px', height: '3px', background: '#2b2b2b', marginBottom: '14px' }} />
            <p style={{ fontSize: '12px', lineHeight: 1.75, color: '#555' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && experience[0].company && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Experience</h2>
            <div style={{ width: '28px', height: '3px', background: '#2b2b2b', marginBottom: '14px' }} />
            {experience.map((exp, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#333' }}>{exp.position}</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{exp.duration}</div>
                  <div style={{ fontSize: '10px', color: '#888' }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.65 }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && education[0].school && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Education</h2>
            <div style={{ width: '28px', height: '3px', background: '#2b2b2b', marginBottom: '14px' }} />
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#333' }}>{edu.school}</div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{edu.year}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.65 }}>{edu.degree}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills expertise bars */}
        {skills?.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>Expertise</h2>
            <div style={{ width: '28px', height: '3px', background: '#2b2b2b', marginBottom: '14px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#444', width: '85px', flexShrink: 0 }}>{skill.name}</span>
                  <div style={{ flex: 1, height: '6px', background: '#e0e0e0', borderRadius: '3px' }}>
                    <div style={{ height: '100%', background: '#2b2b2b', borderRadius: '3px', width: `${skill.level}%` }} />
                  </div>
                  <span style={{ fontSize: '10px', color: '#888', width: '28px', textAlign: 'right' }}>{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};