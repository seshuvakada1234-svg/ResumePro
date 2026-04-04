import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const A4_H = 1123;

// Inline ContactItem — fixes email/phone wrapping without relying on IconText
const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      width: '100%',
      minWidth: 0,
      marginBottom: '8px',
    }}
  >
    <span
      style={{
        flexShrink: 0,
        marginTop: '1px',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </span>
    <span
      style={{
        fontSize: '11px',
        color: '#cbd5e1',
        lineHeight: '1.4',
        overflowWrap: 'break-word',
        wordBreak: 'normal',
        whiteSpace: 'normal',
        flex: 1,
        minWidth: 0,
      }}
    >
      {text}
    </span>
  </div>
);

export const TwoColumnTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div
      style={{
        width: '794px',
        height: `${A4_H}px`,
        minHeight: `${A4_H}px`,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        background: '#fff',
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: '238px',
          minWidth: '238px',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          backgroundColor: '#0f172a',
          flexShrink: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          padding: '36px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Name + Location */}
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '8px',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'normal',
            }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.location && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '6px',
                minWidth: 0,
              }}
            >
              <MapPin size={11} color="#94a3b8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  whiteSpace: 'normal',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {personalInfo.location}
              </span>
            </div>
          )}
        </div>

        {/* Contact */}
        <section>
          <h2
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#818cf8',
              marginBottom: '12px',
            }}
          >
            Contact
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {personalInfo.email && (
              <ContactItem icon={<Mail size={12} />} text={personalInfo.email} />
            )}
            {personalInfo.phone && (
              <ContactItem icon={<Phone size={12} />} text={personalInfo.phone} />
            )}
            {personalInfo.linkedin && (
              <ContactItem
                icon={<Linkedin size={12} />}
                text={personalInfo.linkedin.replace('https://', '')}
              />
            )}
            {personalInfo.github && (
              <ContactItem
                icon={<Github size={12} />}
                text={personalInfo.github.replace('https://', '')}
              />
            )}
          </div>
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#818cf8',
                marginBottom: '12px',
              }}
            >
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '10px',
                  }}
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && education[0].school && (
          <section>
            <h2
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#818cf8',
                marginBottom: '12px',
              }}
            >
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {education.map((edu, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '3px',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      whiteSpace: 'normal',
                    }}
                  >
                    {edu.school}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#94a3b8',
                      marginBottom: '2px',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      whiteSpace: 'normal',
                    }}
                  >
                    {edu.degree}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#64748b',
                      fontStyle: 'italic',
                    }}
                  >
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* ── MAIN ── */}
      <main
        style={{
          flex: 1,
          padding: '40px 36px',
          backgroundColor: '#ffffff',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          boxSizing: 'border-box',
          minWidth: 0,
        }}
      >
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <SectionHeader label="Professional Summary" />
            <p
              style={{
                fontSize: '12px',
                lineHeight: 1.7,
                color: '#475569',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
                whiteSpace: 'normal',
              }}
            >
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <section>
            <SectionHeader label="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    paddingLeft: '16px',
                    borderLeft: '2px solid #e2e8f0',
                    position: 'relative',
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#4f46e5',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '3px',
                      gap: '8px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0f172a',
                        flex: 1,
                        minWidth: 0,
                        overflowWrap: 'break-word',
                        wordBreak: 'normal',
                        whiteSpace: 'normal',
                      }}
                    >
                      {exp.position}
                    </h3>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        color: '#9ca3af',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#4f46e5',
                      marginBottom: '6px',
                    }}
                  >
                    {exp.company}
                  </div>
                  <p
                    style={{
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#64748b',
                      whiteSpace: 'pre-line',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && projects[0].name && (
          <section>
            <SectionHeader label="Projects" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '4px',
                    }}
                  >
                    {proj.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#64748b',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      whiteSpace: 'normal',
                    }}
                  >
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// Section header with indigo left bar
function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '14px',
      }}
    >
      <div
        style={{
          width: '4px',
          height: '16px',
          backgroundColor: '#4f46e5',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: '#0f172a',
        }}
      >
        {label}
      </span>
    </div>
  );
}