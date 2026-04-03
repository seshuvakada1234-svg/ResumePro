import React from 'react';
import { ResumeData } from '@/types/resume';

const A4_H = 1123;

export const NavyTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, languages, projects } = data;

  return (
    <div
      className="font-sans"
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        overflow: 'hidden',
        background: '#fff',
        fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          background: '#1a2e5a',
          color: '#fff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
          paddingBottom: '32px',
        }}
      >
        {/* About / Summary */}
        <div style={{ padding: '32px 28px 0' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 600, color: '#aab8d8', letterSpacing: '1px', marginBottom: '14px' }}>About Me</h2>
          <p style={{ fontSize: '11px', lineHeight: 1.75, color: '#c8d4e8', marginBottom: '28px' }}>
            {personalInfo?.summary || 'Add a professional summary to introduce yourself.'}
          </p>
        </div>

        {/* Contact */}
        <div style={{ padding: '0 28px', marginBottom: '22px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
          <div style={{ height: '1.5px', background: 'rgba(255,255,255,0.2)', marginBottom: '12px' }} />
          {personalInfo?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
              <div style={{ width: '26px', height: '26px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#aab8d8"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              </div>
              <span style={{ fontSize: '11px', color: '#c8d4e8' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
              <div style={{ width: '26px', height: '26px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aab8d8" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span style={{ fontSize: '11px', color: '#c8d4e8' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
              <div style={{ width: '26px', height: '26px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#aab8d8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <span style={{ fontSize: '11px', color: '#c8d4e8' }}>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div style={{ padding: '0 28px', marginBottom: '22px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h3>
            <div style={{ height: '1.5px', background: 'rgba(255,255,255,0.2)', marginBottom: '12px' }} />
            {skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#c8d4e8', marginBottom: '7px', paddingLeft: '12px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#6b8dd6' }}>•</span>
                {skill.name}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div style={{ padding: '0 28px', marginBottom: '22px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Language</h3>
            <div style={{ height: '1.5px', background: 'rgba(255,255,255,0.2)', marginBottom: '12px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
              {languages.slice(0, 3).map((lang, i) => {
                const r = 24; const circ = 2 * Math.PI * r;
                const fill = (lang.level / 100) * circ;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '10px', color: '#c8d4e8', fontWeight: 600 }}>{lang.name}</span>
                    <div style={{ position: 'relative', width: '54px', height: '54px' }}>
                      <svg viewBox="0 0 60 60" width="54" height="54" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                        <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
                        <circle cx="30" cy="30" r={r} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={`${fill} ${circ}`} />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
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
          background: '#fff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with photo */}
        <div style={{ position: 'relative', padding: '32px 32px 0 32px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#1a2e5a', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            <span style={{ fontWeight: 400 }}>{personalInfo?.fullName?.split(' ')[0] || 'FIRST'}</span>
            <br />
            {personalInfo?.fullName?.split(' ').slice(1).join(' ') || 'LAST NAME'}
          </h1>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#555', marginTop: '8px', letterSpacing: '1px' }}>
            {experience?.[0]?.position || 'Your Role'}
          </div>
          {/* Photo circle - top right */}
          <div style={{
            position: 'absolute', top: '18px', right: '32px',
            width: '110px', height: '110px',
            borderRadius: '50% 50% 50% 0', overflow: 'hidden',
            background: '#1a2e5a', flexShrink: 0,
          }}>
            {personalInfo?.profileImage ? (
              <img src={personalInfo.profileImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2a4080, #1a2e5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 900, color: 'rgba(255,255,255,0.4)' }}>
                {personalInfo?.fullName?.charAt(0) || '?'}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '0 32px 32px', overflow: 'hidden', flex: 1 }}>
          {/* Experience */}
          {experience?.length > 0 && experience[0].company && (
            <div style={{ marginBottom: '22px' }}>
              <NavySectionHdr label="Experience" />
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.position}</span>
                    <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e5a', marginBottom: '5px' }}>{exp.company}</div>
                  <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.6 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && education[0].school && (
            <div style={{ marginBottom: '22px' }}>
              <NavySectionHdr label="Education" />
              {education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e5a' }}>{edu.school}</div>
                    <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>{edu.degree}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && projects[0].name && (
            <div style={{ marginBottom: '22px' }}>
              <NavySectionHdr label="Projects" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a2e5a' }}>{proj.name}</div>
                    <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.6 }}>{proj.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function NavySectionHdr({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #1a2e5a' }}>
      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a2e5a', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
    </div>
  );
}