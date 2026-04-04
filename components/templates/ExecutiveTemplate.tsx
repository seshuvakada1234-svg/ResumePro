import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';

const A4_H = 1123;

// Inline ContactItem — fixes email/phone wrapping
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
      marginBottom: '6px',
    }}
  >
    <div
      style={{
        width: '18px',
        height: '18px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '1px',
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontSize: '10px',
        color: '#ccc',
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
      {/* ── SIDEBAR ── */}
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
          boxSizing: 'border-box',
        }}
      >
        {/* Profile */}
        <div
          style={{
            padding: '28px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '3px solid #c9a84c',
              overflow: 'hidden',
              background: '#1a1a1a',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: '#c9a84c',
              flexShrink: 0,
            }}
          >
            {personalInfo?.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              personalInfo?.fullName?.charAt(0) || '?'
            )}
          </div>
          <h1
            style={{
              fontSize: '16px',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '1px',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'normal',
            }}
          >
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div
            style={{
              width: '32px',
              height: '2px',
              background: '#c9a84c',
              margin: '8px auto',
            }}
          />
          <div
            style={{
              fontSize: '9px',
              color: '#aaa',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {experience?.[0]?.position || 'Your Profession'}
          </div>
        </div>

        {/* Contact */}
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '6px',
            }}
          >
            Contact
          </div>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.12)',
              marginBottom: '10px',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {personalInfo?.email && (
              <ContactItem
                icon={<Mail size={9} color="#aaa" />}
                text={personalInfo.email}
              />
            )}
            {personalInfo?.phone && (
              <ContactItem
                icon={<Phone size={9} color="#aaa" />}
                text={personalInfo.phone}
              />
            )}
            {personalInfo?.location && (
              <ContactItem
                icon={<MapPin size={9} color="#aaa" />}
                text={personalInfo.location}
              />
            )}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '6px',
              }}
            >
              Skills
            </div>
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.12)',
                marginBottom: '10px',
              }}
            />
            {skills.map((skill, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    color: '#ccc',
                    width: '85px',
                    minWidth: '85px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    flexShrink: 0,
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                    whiteSpace: 'normal',
                  }}
                >
                  {skill.name}
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background:
                          dot <= Math.round((skill.level / 100) * 5)
                            ? '#c9a84c'
                            : '#555',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && education[0].school && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '6px',
              }}
            >
              Education
            </div>
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.12)',
                marginBottom: '10px',
              }}
            />
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '11px',
                    color: '#fff',
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
                    marginTop: '2px',
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
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div style={{ padding: '0 20px', marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '6px',
              }}
            >
              Languages
            </div>
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.12)',
                marginBottom: '10px',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {languages.slice(0, 3).map((lang, i) => {
                const r = 22;
                const circ = 2 * Math.PI * r;
                const fill = (lang.level / 100) * circ;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '9px',
                        color: '#bbb',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      {lang.name}
                    </span>
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                      <svg
                        viewBox="0 0 56 56"
                        width="50"
                        height="50"
                        style={{ transform: 'rotate(-90deg)', display: 'block' }}
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r={r}
                          fill="none"
                          stroke="#444"
                          strokeWidth="5"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r={r}
                          fill="none"
                          stroke="#c9a84c"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={`${fill} ${circ}`}
                        />
                      </svg>
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
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

      {/* ── MAIN ── */}
      <main
        style={{
          background: '#f4f4f4',
          height: `${A4_H}px`,
          minHeight: `${A4_H}px`,
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#fff',
            padding: '24px 28px 18px',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#2d2d2d',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              overflowWrap: 'break-word',
              wordBreak: 'normal',
              whiteSpace: 'normal',
            }}
          >
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <div style={{ width: '36px', height: '2px', background: '#c9a84c' }} />
            <div style={{ width: '18px', height: '2px', background: '#2d2d2d' }} />
            <div style={{ width: '18px', height: '2px', background: '#2d2d2d' }} />
          </div>
          <div
            style={{
              fontSize: '9px',
              color: '#999',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: '5px',
            }}
          >
            {experience?.[0]?.position || 'Your Profession Here'}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '20px 28px',
            overflow: 'hidden',
            flex: 1,
            boxSizing: 'border-box',
          }}
        >
          {/* Summary */}
          {personalInfo?.summary && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader label="Profile" />
              <p
                style={{
                  fontSize: '11px',
                  color: '#666',
                  lineHeight: 1.75,
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  whiteSpace: 'normal',
                }}
              >
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && experience[0].company && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader label="Work Experience" />
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        flex: 1,
                        minWidth: 0,
                        overflowWrap: 'break-word',
                        wordBreak: 'normal',
                        whiteSpace: 'normal',
                      }}
                    >
                      {exp.company}
                    </span>
                    {exp.duration && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#999',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#2d2d2d',
                      marginBottom: '3px',
                      marginTop: '2px',
                    }}
                  >
                    {exp.position}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#777',
                      lineHeight: 1.65,
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                      whiteSpace: 'normal',
                    }}
                  >
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && education[0].school && (
            <div style={{ marginBottom: '20px' }}>
              <SectionHeader label="Education" />
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#999',
                        flex: 1,
                        minWidth: 0,
                        overflowWrap: 'break-word',
                        wordBreak: 'normal',
                        whiteSpace: 'normal',
                      }}
                    >
                      {edu.school}
                    </span>
                    {edu.year && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#999',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {edu.year}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#2d2d2d',
                      marginTop: '2px',
                    }}
                  >
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '22px',
            height: '22px',
            background: '#2d2d2d',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#c9a84c',
              borderRadius: '50%',
            }}
          />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#2d2d2d' }}>
          {label}
        </span>
      </div>
      <div
        style={{
          height: '1px',
          background: '#ddd',
          marginTop: '6px',
          marginBottom: '10px',
        }}
      />
    </div>
  );
}