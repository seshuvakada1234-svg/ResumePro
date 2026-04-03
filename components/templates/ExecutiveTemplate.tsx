import React from 'react';
import { ResumeData } from '@/types/resume';

const A4_H = 1123;

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, languages } = data;

  return (
    <div
      className="font-sans"
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'grid',
        gridTemplateColumns: '230px 1fr',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          background: '#2d2d2d',
          color: '#fff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Profile */}
        <div style={{ padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '3px solid #c9a84c', overflow: 'hidden',
            background: '#1a1a1a', marginBottom: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 900, color: '#c9a84c',
          }}>
            {personalInfo?.profileImage
              ? <img src={personalInfo.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : (personalInfo?.fullName?.charAt(0) || '?')}
          </div>
          <h1 style={{ fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '1px', lineHeight: 1.2, textTransform: 'uppercase' }}>
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div style={{ width: '32px', height: '2px', background: '#c9a84c', margin: '8px auto' }} />
          <div style={{ fontSize: '9px', color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>
            {experience?.[0]?.position || 'Your Profession'}
          </div>
        </div>

        {/* Contact */}
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>Contact</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '10px' }} />
          {personalInfo?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <div style={{ width: '18px', height: '18px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#aaa"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" stroke="#aaa" strokeWidth="2" fill="none"/></svg>
              </div>
              <span style={{ fontSize: '10px', color: '#ccc' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <div style={{ width: '18px', height: '18px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#aaa"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .9h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <span style={{ fontSize: '10px', color: '#ccc' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
              <div style={{ width: '18px', height: '18px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="#aaa"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <span style={{ fontSize: '10px', color: '#ccc' }}>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>Skills</div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '10px' }} />
            {skills.map((skill, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: '#ccc', width: '85px', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
                  {skill.name}
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div key={dot} style={{
                      width: '9px', height: '9px', borderRadius: '50%',
                      background: dot <= Math.round((skill.level / 100) * 5) ? '#c9a84c' : '#555',
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && education[0].school && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>Education</div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '10px' }} />
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '11px', color: '#fff' }}>{edu.school}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{edu.degree}</div>
                <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>Languages</div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
              {languages.slice(0, 3).map((lang, i) => {
                const r = 22; const circ = 2 * Math.PI * r;
                const fill = (lang.level / 100) * circ;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '9px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px' }}>{lang.name}</span>
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      <svg viewBox="0 0 56 56" width="50" height="50" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                        <circle cx="28" cy="28" r={r} fill="none" stroke="#444" strokeWidth="5" />
                        <circle cx="28" cy="28" r={r} fill="none" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${fill} ${circ}`} />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff' }}>
                        {lang.level}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </aside>

      {/* MAIN */}
      <main
        style={{
          background: '#f4f4f4',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ background: '#fff', padding: '24px 28px 18px', borderBottom: '1px solid #e8e8e8' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#2d2d2d', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '4px' }}>
            <div style={{ width: '36px', height: '2px', background: '#c9a84c' }} />
            <div style={{ width: '18px', height: '2px', background: '#2d2d2d' }} />
            <div style={{ width: '18px', height: '2px', background: '#2d2d2d' }} />
          </div>
          <div style={{ fontSize: '9px', color: '#999', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '5px' }}>
            {experience?.[0]?.position || 'Your Profession Here'}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px', overflow: 'hidden', flex: 1 }}>
          {/* Summary */}
          {personalInfo?.summary && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader icon="user" label="Profile" />
              <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.75 }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && experience[0].company && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader icon="work" label="Work Experience" />
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.company} {exp.duration && `/ ${exp.duration}`}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#2d2d2d', marginBottom: '3px' }}>{exp.position}</div>
                  <div style={{ fontSize: '11px', color: '#777', lineHeight: 1.65 }}>{exp.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && education[0].school && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader icon="edu" label="Education" />
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#999' }}>{edu.school} {edu.year && `/ ${edu.year}`}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#2d2d2d' }}>{edu.degree}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function SectionHeader({ label }: { icon: string; label: string }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '22px', height: '22px', background: '#2d2d2d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '8px', height: '8px', background: '#c9a84c', borderRadius: '50%' }} />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#2d2d2d' }}>{label}</span>
      </div>
      <div style={{ height: '1px', background: '#ddd', marginTop: '6px', marginBottom: '10px' }} />
    </div>
  );
}