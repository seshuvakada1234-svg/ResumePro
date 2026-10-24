import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import {
  ResumeData,
  ResumeTemplate,
  Skill,
  Language,
  Experience,
  Education,
  Project,
  Achievement,
  Internship,
} from '@/types/resume';

// ── Built-in Standard PDF Fonts (Deployment & Serverless Safe) ──
// @react-pdf/renderer natively supports standard PostScript PDF fonts:
// 'Helvetica' (regular, bold, oblique/italic, bold-oblique) and
// 'Times-Roman' (regular, bold, italic, bold-italic).
// These standard fonts require zero external files or filesystem access,
// guaranteeing 100% reliable execution in Vercel serverless environments and Node runtimes.
const DEFAULT_SANS = 'Helvetica';
const DEFAULT_SERIF = 'Times-Roman';

// ════════════════════════════════════════════════════════════════════════════
// BLACK & YELLOW PRO TEMPLATE STYLES AND COMPONENTS
// ════════════════════════════════════════════════════════════════════════════
const byStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
  },
  sidebar: {
    width: '28.2%', // exactly 224px / 794px
    backgroundColor: '#1a1a1a',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoContainer: {
    width: '100%',
    height: 155,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#666666',
  },
  sidebarContent: {
    paddingVertical: 14,
    paddingHorizontal: 11,
    flexDirection: 'column',
    flex: 1,
  },
  yellowBadge: {
    backgroundColor: '#f5c518',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginBottom: 7,
  },
  yellowBadgeText: {
    fontSize: 6.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: '#000000',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 1.5,
  },
  eduSchool: {
    fontSize: 6.8,
    color: '#aaaaaa',
    marginBottom: 1,
  },
  eduYear: {
    fontSize: 6.5,
    color: '#888888',
  },
  certItem: {
    fontSize: 6.8,
    color: '#cccccc',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  contactSection: {
    marginTop: 'auto',
    paddingTop: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  contactYellowBar: {
    width: 2.2,
    minHeight: 20,
    backgroundColor: '#f5c518',
    marginRight: 6,
    marginTop: 1,
  },
  contactLabel: {
    fontSize: 7.2,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactValue: {
    fontSize: 6.5,
    color: '#aaaaaa',
    marginTop: 1,
  },
  mainColumn: {
    width: '71.8%', // exactly 570px / 794px
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 24,
    flexDirection: 'column',
  },
  mainHeader: {
    marginBottom: 16,
  },
  headerFirstName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 0.95,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  headerLastName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 0.95,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#888888',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  sectionBox: {
    marginBottom: 13,
  },
  bodySummary: {
    fontSize: 7.5,
    color: '#555555',
    lineHeight: 1.5,
  },
  expItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  expDateCol: {
    width: 44,
    marginRight: 8,
  },
  expDateText: {
    fontSize: 6.8,
    color: '#888888',
    lineHeight: 1.4,
  },
  expContentCol: {
    flex: 1,
  },
  expPosition: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  expCompany: {
    fontSize: 6.8,
    color: '#888888',
    marginTop: 1,
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.2,
    color: '#888888',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.4,
    flex: 1,
  },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 6,
  },
  gridItemName: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  yellowBarUnderline: {
    height: 1.6,
    width: 26,
    backgroundColor: '#f5c518',
    borderRadius: 1,
  },
  projItem: {
    marginBottom: 7,
  },
  projName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  projDesc: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.4,
  },
});

const ByYellowBadge = ({ title }: { title: string }) => (
  <View style={byStyles.yellowBadge}>
    <Text style={byStyles.yellowBadgeText}>{title}</Text>
  </View>
);

function renderBlackYellowPdf(data: ResumeData) {
  const p = data.personalInfo || {
    fullName: 'Candidate',
    email: '',
    phone: '',
    location: '',
    summary: '',
  };

  const name = p.fullName || (p as any).name || 'Your Name';
  const title = (p as any).title || data.title || 'Your Title';
  const email = p.email || '';
  const phone = p.phone || '';
  const location = p.location || '';
  const linkedin = p.linkedin || '';
  const website = p.website || p.github || '';
  const photo = p.profileImage || (p as any).photo || '';
  const summary = p.summary || data.summary || '';

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] ?? 'YOUR';
  const lastName = nameParts.slice(1).join(' ') || 'NAME';

  const validEducation = (data.education || []).filter(e => e.school || e.degree);
  const validExperience = (data.experience || []).filter(e => e.company || e.position);
  const validProjects = (data.projects || []).filter(pr => pr.name);
  const validSkills: string[] = (data.skills || [])
    .map(s => (typeof s === 'string' ? s : s.name))
    .filter(Boolean);
  const validLanguages: string[] = (data.languages || [])
    .map(l => (typeof l === 'string' ? l : l.name))
    .filter(Boolean);
  const validCertifications: string[] = (data.certifications || [])
    .map(c => (typeof c === 'string' ? c : (c as any).name))
    .filter(Boolean);

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="ATS-Optimized Resume">
      <Page size="A4" style={byStyles.page} wrap>
        {/* ── LEFT DARK SIDEBAR (width 224px / 794px ~ 28.2%) ── */}
        <View style={byStyles.sidebar}>
          {/* Top Profile / Photo Box */}
          <View style={byStyles.photoContainer}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={byStyles.photoImg} />
            ) : (
              <View style={byStyles.avatarCircle}>
                <Text style={byStyles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>

          {/* Sidebar Content */}
          <View style={byStyles.sidebarContent}>
            {/* Education in Sidebar */}
            {validEducation.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <ByYellowBadge title="EDUCATION" />
                {validEducation.map((edu, i) => (
                  <View key={i} style={byStyles.eduItem} wrap={false}>
                    <Text style={byStyles.eduDegree}>{edu.degree || 'Degree'}</Text>
                    <Text style={byStyles.eduSchool}>{edu.school || 'University'}</Text>
                    <Text style={byStyles.eduYear}>
                      {edu.startDate ? `${edu.startDate} — ${edu.endDate ?? 'Present'}` : edu.year || ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications in Sidebar */}
            {validCertifications.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <ByYellowBadge title="CERTIFICATIONS" />
                {validCertifications.map((cert, i) => (
                  <Text key={i} style={byStyles.certItem} wrap={false}>{cert}</Text>
                ))}
              </View>
            )}

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Contact Info at Bottom of Sidebar */}
            <View style={byStyles.contactSection}>
              {phone ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Phone</Text>
                    <Text style={byStyles.contactValue}>{phone}</Text>
                  </View>
                </View>
              ) : null}

              {email ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Email</Text>
                    <Text style={byStyles.contactValue}>{email}</Text>
                  </View>
                </View>
              ) : null}

              {linkedin ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>LinkedIn</Text>
                    <Text style={byStyles.contactValue}>{linkedin.replace('https://', '')}</Text>
                  </View>
                </View>
              ) : null}

              {website ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Website</Text>
                    <Text style={byStyles.contactValue}>{website.replace('https://', '')}</Text>
                  </View>
                </View>
              ) : null}

              {location ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Address</Text>
                    <Text style={byStyles.contactValue}>{location}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* ── RIGHT MAIN CONTENT (width 570px / 794px ~ 71.8%) ── */}
        <View style={byStyles.mainColumn}>
          {/* Candidate Name & Title Header */}
          <View style={byStyles.mainHeader}>
            <Text style={byStyles.headerFirstName}>{firstName}</Text>
            <Text style={byStyles.headerLastName}>{lastName}</Text>
            <Text style={byStyles.headerTitle}>{title}</Text>
          </View>

          {/* About Me / Summary */}
          {summary ? (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="ABOUT ME" />
              <Text style={byStyles.bodySummary}>{summary}</Text>
            </View>
          ) : null}

          {/* Work Experience */}
          {validExperience.length > 0 && (
            <View style={byStyles.sectionBox}>
              <ByYellowBadge title="WORK EXPERIENCE" />
              {validExperience.map((exp, i) => (
                <View key={i} style={byStyles.expItem} wrap={false}>
                  <View style={byStyles.expDateCol}>
                    <Text style={byStyles.expDateText}>
                      {exp.startDate || (exp.duration?.includes('-') ? exp.duration.split('-')[0]?.trim() : exp.duration || '')}
                    </Text>
                    <Text style={byStyles.expDateText}>
                      {exp.endDate || (exp.duration?.includes('-') ? exp.duration.split('-')[1]?.trim() : 'Present')}
                    </Text>
                  </View>
                  <View style={byStyles.expContentCol}>
                    <Text style={byStyles.expPosition}>{exp.position}</Text>
                    <Text style={byStyles.expCompany}>{exp.company}</Text>
                    {exp.description ? <Text style={byStyles.expDesc}>{exp.description}</Text> : null}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <View style={{ marginTop: 2 }}>
                        {exp.bullets.map((b, j) => (
                          <View key={j} style={byStyles.bulletRow}>
                            <Text style={byStyles.bulletDot}>•</Text>
                            <Text style={byStyles.bulletText}>{b}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Software Skill */}
          {validSkills.length > 0 && (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="SOFTWARE SKILL" />
              <View style={byStyles.twoColGrid}>
                {validSkills.map((skill, i) => (
                  <View key={i} style={byStyles.gridItem}>
                    <Text style={byStyles.gridItemName}>{skill}</Text>
                    <View style={byStyles.yellowBarUnderline} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="LANGUAGES" />
              <View style={byStyles.twoColGrid}>
                {validLanguages.map((lang, i) => (
                  <View key={i} style={byStyles.gridItem}>
                    <Text style={byStyles.gridItemName}>{lang}</Text>
                    <View style={byStyles.yellowBarUnderline} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {validProjects.length > 0 && (
            <View style={byStyles.sectionBox}>
              <ByYellowBadge title="PROJECTS" />
              {validProjects.map((proj, i) => (
                <View key={i} style={byStyles.projItem} wrap={false}>
                  <Text style={byStyles.projName}>{proj.name}</Text>
                  {proj.description ? <Text style={byStyles.projDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SHARED CONFIGURATION AND ENGINE FOR ALL OTHER TEMPLATES
// ════════════════════════════════════════════════════════════════════════════
interface TemplateConfig {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  sidebarBg?: string;
  sidebarText?: string;
  isTwoColumn: boolean;
  sidebarWidth?: string;
  mainWidth?: string;
  headerAlign: 'left' | 'center';
  educationInSidebar?: boolean;
}

function getTemplateConfig(template: ResumeTemplate): TemplateConfig {
  switch (template) {
    case 'classic':
      return {
        fontFamily: DEFAULT_SERIF,
        primaryColor: '#1f2937',
        secondaryColor: '#4b5563',
        accentColor: '#111827',
        isTwoColumn: false,
        headerAlign: 'center',
      };
    case 'serif':
    case 'lawyer-classic':
    case 'minimal-pro':
      return {
        fontFamily: DEFAULT_SERIF,
        primaryColor: '#111827',
        secondaryColor: '#374151',
        accentColor: '#1e293b',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'two-column':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#0f172a',
        secondaryColor: '#334155',
        accentColor: '#818cf8',
        sidebarBg: '#0f172a',
        sidebarText: '#e2e8f0',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: true,
      };
    case 'executive':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#1e293b',
        secondaryColor: '#475569',
        accentColor: '#d97706',
        sidebarBg: '#2d2d2d',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: false,
      };
    case 'premium':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#312e81',
        secondaryColor: '#334155',
        accentColor: '#6366f1',
        sidebarBg: '#312e81',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: false,
      };
    case 'navy':
    case 'dark-navy':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#1e3a8a',
        secondaryColor: '#334155',
        accentColor: '#3b82f6',
        sidebarBg: '#172554',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: true,
      };
    case 'crimson':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#7f1d1d',
        secondaryColor: '#334155',
        accentColor: '#dc2626',
        sidebarBg: '#7f1d1d',
        sidebarText: '#fef2f2',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: false,
      };
    case 'luxury-gold':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#b45309',
        secondaryColor: '#334155',
        accentColor: '#d97706',
        sidebarBg: '#0f172a',
        sidebarText: '#fef3c7',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: false,
      };
    case 'photo-sidebar':
    case 'photo-circle':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#334155',
        secondaryColor: '#475569',
        accentColor: '#4f46e5',
        sidebarBg: '#334155',
        sidebarText: '#f1f5f9',
        isTwoColumn: true,
        sidebarWidth: '32%',
        mainWidth: '68%',
        headerAlign: 'left',
        educationInSidebar: true,
      };
    case 'redline':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#dc2626',
        secondaryColor: '#334155',
        accentColor: '#b91c1c',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'pink-header':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#db2777',
        secondaryColor: '#374151',
        accentColor: '#be185d',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'minimal':
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#18181b',
        secondaryColor: '#52525b',
        accentColor: '#27272a',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'modern':
    default:
      return {
        fontFamily: DEFAULT_SANS,
        primaryColor: '#4338ca',
        secondaryColor: '#334155',
        accentColor: '#4f46e5',
        isTwoColumn: false,
        headerAlign: 'left',
      };
  }
}

function renderGenericPdf(data: ResumeData, cfg: TemplateConfig) {
  const p = data.personalInfo || {
    fullName: 'Candidate',
    email: '',
    phone: '',
    location: '',
    summary: '',
  };

  const skillsList: string[] = (data.skills || [])
    .map(s => (typeof s === 'string' ? s : s.name))
    .filter(Boolean);

  const languagesList: string[] = (data.languages || [])
    .map(l => (typeof l === 'string' ? l : l.name))
    .filter(Boolean);

  const certsList: string[] = (data.certifications || [])
    .map(c => (typeof c === 'string' ? c : (c as any).name))
    .filter(Boolean);

  const summaryText = p.summary || data.summary || '';

  const styles = StyleSheet.create({
    page: {
      flexDirection: cfg.isTwoColumn ? 'row' : 'column',
      backgroundColor: '#ffffff',
      padding: cfg.isTwoColumn ? 0 : 36,
      fontFamily: cfg.fontFamily,
      fontSize: 9.5,
      lineHeight: 1.4,
      color: '#334155',
    },
    sidebar: {
      width: cfg.sidebarWidth || '32%',
      backgroundColor: cfg.sidebarBg || '#0f172a',
      color: cfg.sidebarText || '#f8fafc',
      padding: 24,
      paddingTop: 32,
    },
    mainColumn: {
      width: cfg.isTwoColumn ? (cfg.mainWidth || '68%') : '100%',
      padding: cfg.isTwoColumn ? 28 : 0,
      paddingTop: cfg.isTwoColumn ? 32 : 0,
    },
    headerBlock: {
      marginBottom: 16,
      borderBottomWidth: cfg.headerAlign === 'center' ? 1.5 : 2,
      borderBottomColor: cfg.primaryColor,
      paddingBottom: 10,
      textAlign: cfg.headerAlign,
    },
    headerName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: cfg.primaryColor,
      letterSpacing: 0.5,
      marginBottom: 4,
      textTransform: cfg.headerAlign === 'center' ? 'uppercase' : 'none',
    },
    contactInlineRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: cfg.headerAlign === 'center' ? 'center' : 'flex-start',
      gap: 8,
      fontSize: 8.5,
      color: '#64748b',
      marginTop: 2,
    },
    sidebarName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: cfg.sidebarText || '#ffffff',
      marginBottom: 4,
      lineHeight: 1.2,
    },
    sidebarLocation: {
      fontSize: 9,
      color: '#94a3b8',
      marginBottom: 14,
    },
    sidebarSectionTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: cfg.accentColor,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginTop: 16,
      marginBottom: 8,
      borderBottomWidth: 0.75,
      borderBottomColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 3,
    },
    sidebarTextItem: {
      fontSize: 8.5,
      color: cfg.sidebarText || '#e2e8f0',
      marginBottom: 5,
      lineHeight: 1.35,
    },
    sidebarSkillBadge: {
      fontSize: 8,
      color: '#e2e8f0',
      backgroundColor: 'rgba(255,255,255,0.12)',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 3,
      marginBottom: 4,
      marginRight: 4,
    },
    sectionContainer: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: cfg.primaryColor,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
      paddingBottom: 3,
    },
    itemBlock: {
      marginBottom: 8,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 1,
    },
    itemTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: 9,
      fontStyle: 'italic',
      color: '#475569',
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8.5,
      color: '#64748b',
    },
    itemBody: {
      fontSize: 9,
      color: '#334155',
      lineHeight: 1.35,
    },
    bulletLine: {
      fontSize: 9,
      color: '#334155',
      marginBottom: 2,
      paddingLeft: 6,
      lineHeight: 1.35,
    },
  });

  const validExperience = (data.experience || []).filter(e => e.company || e.position);
  const validEducation = (data.education || []).filter(e => e.school || e.degree);
  const validProjects = (data.projects || []).filter(pr => pr.name);
  const validAchievements = (data.achievements || []).filter(a => a.title);
  const validInternships = (data.internships || []).filter(i => i.company);

  return (
    <Document
      title={`${p.fullName || 'Resume'} - FreeResume.dev`}
      author="FreeResume.dev"
      subject="ATS-Optimized Resume"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* ── SIDEBAR (For two-column layout) ── */}
        {cfg.isTwoColumn && (
          <View style={styles.sidebar}>
            <Text style={styles.sidebarName}>{p.fullName || 'Your Name'}</Text>
            {p.location ? <Text style={styles.sidebarLocation}>{p.location}</Text> : null}

            {/* Contact Information */}
            <View>
              <Text style={styles.sidebarSectionTitle}>Contact</Text>
              {p.email ? <Text style={styles.sidebarTextItem}>{p.email}</Text> : null}
              {p.phone ? <Text style={styles.sidebarTextItem}>{p.phone}</Text> : null}
              {p.linkedin ? <Text style={styles.sidebarTextItem}>{p.linkedin.replace('https://', '')}</Text> : null}
              {p.github ? <Text style={styles.sidebarTextItem}>{p.github.replace('https://', '')}</Text> : null}
              {p.website ? <Text style={styles.sidebarTextItem}>{p.website.replace('https://', '')}</Text> : null}
            </View>

            {/* Skills */}
            {skillsList.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {skillsList.map((skill, idx) => (
                    <Text key={idx} style={styles.sidebarSkillBadge}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Education in Sidebar */}
            {cfg.educationInSidebar && validEducation.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.sidebarSectionTitle}>Education</Text>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={[styles.sidebarTextItem, { fontWeight: 'bold', color: '#ffffff' }]}>
                      {edu.school}
                    </Text>
                    <Text style={styles.sidebarTextItem}>{edu.degree}</Text>
                    <Text style={[styles.sidebarTextItem, { color: '#94a3b8', fontSize: 8 }]}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {languagesList.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {languagesList.map((lang, idx) => (
                  <Text key={idx} style={styles.sidebarTextItem}>• {lang}</Text>
                ))}
              </View>
            )}

            {/* Certifications in sidebar */}
            {certsList.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.sidebarSectionTitle}>Certifications</Text>
                {certsList.map((cert, idx) => (
                  <Text key={idx} style={styles.sidebarTextItem}>• {cert}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* ── MAIN CONTENT COLUMN ── */}
        <View style={styles.mainColumn}>
          {/* Header (Single Column templates) */}
          {!cfg.isTwoColumn && (
            <View style={styles.headerBlock}>
              <Text style={styles.headerName}>{p.fullName || 'Your Name'}</Text>
              <View style={styles.contactInlineRow}>
                {p.email ? <Text>{p.email}</Text> : null}
                {p.phone ? <Text>•  {p.phone}</Text> : null}
                {p.location ? <Text>•  {p.location}</Text> : null}
                {p.linkedin ? <Text>•  {p.linkedin.replace('https://', '')}</Text> : null}
                {p.github ? <Text>•  {p.github.replace('https://', '')}</Text> : null}
                {p.website ? <Text>•  {p.website.replace('https://', '')}</Text> : null}
              </View>
            </View>
          )}

          {/* Professional Summary */}
          {summaryText ? (
            <View style={styles.sectionContainer} wrap={false}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.itemBody}>{summaryText}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.itemBlock} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.position || 'Position'}</Text>
                    <Text style={styles.itemDate}>{exp.duration || ''}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.company || 'Company'}</Text>
                  {exp.description ? <Text style={styles.itemBody}>{exp.description}</Text> : null}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <View style={{ marginTop: 2 }}>
                      {exp.bullets.map((b, bIdx) => (
                        <Text key={bIdx} style={styles.bulletLine}>• {b}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {validProjects.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {validProjects.map((proj, idx) => (
                <View key={idx} style={styles.itemBlock} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    {proj.duration ? <Text style={styles.itemDate}>{proj.duration}</Text> : null}
                  </View>
                  {proj.technologies ? (
                    <Text style={styles.itemSubtitle}>Technologies: {proj.technologies}</Text>
                  ) : null}
                  {proj.description ? <Text style={styles.itemBody}>{proj.description}</Text> : null}
                  {proj.link ? (
                    <Text style={[styles.itemDate, { color: cfg.primaryColor, marginTop: 1 }]}>
                      Link: {proj.link}
                    </Text>
                  ) : null}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <View style={{ marginTop: 2 }}>
                      {proj.bullets.map((b, bIdx) => (
                        <Text key={bIdx} style={styles.bulletLine}>• {b}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education in Main Column */}
          {!cfg.educationInSidebar && validEducation.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Education</Text>
              {validEducation.map((edu, idx) => (
                <View key={idx} style={styles.itemBlock} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.itemDate}>{edu.year || ''}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu.school || 'School'}</Text>
                  {edu.gpa ? <Text style={styles.itemBody}>GPA: {edu.gpa}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Skills (Single Column templates) */}
          {!cfg.isTwoColumn && skillsList.length > 0 && (
            <View style={styles.sectionContainer} wrap={false}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.itemBody}>{skillsList.join('  •  ')}</Text>
            </View>
          )}

          {/* Certifications (Single Column templates) */}
          {!cfg.isTwoColumn && certsList.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certsList.map((cert, idx) => (
                <Text key={idx} style={styles.bulletLine}>• {cert}</Text>
              ))}
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.itemBlock} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{ach.title}</Text>
                    <Text style={styles.itemDate}>{ach.date || ''}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{ach.organization}</Text>
                  {ach.description ? <Text style={styles.itemBody}>{ach.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Internships</Text>
              {validInternships.map((int, idx) => (
                <View key={idx} style={styles.itemBlock} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{int.role || 'Intern'}</Text>
                    <Text style={styles.itemDate}>{int.duration || ''}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{int.company}</Text>
                  {int.description ? <Text style={styles.itemBody}>{int.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

export async function generateResumePdfBuffer(data: ResumeData): Promise<Buffer> {
  const template = data.template || 'classic';

  // Dedicated pixel-perfect renderer for Black & Yellow Pro
  if (template === 'black-yellow') {
    const byDoc = renderBlackYellowPdf(data);
    return await renderToBuffer(byDoc);
  }

  // Generic document renderer for all other template families
  const cfg = getTemplateConfig(template);
  const doc = renderGenericPdf(data, cfg);
  return await renderToBuffer(doc);
}
