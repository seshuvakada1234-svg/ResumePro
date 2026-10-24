import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import { ResumeData, ResumeTemplate, Skill, Language, Experience, Education, Project, Achievement, Internship } from '@/types/resume';

interface TemplateConfig {
  fontFamily: 'Helvetica' | 'Times-Roman';
  fontBold: 'Helvetica-Bold' | 'Times-Bold';
  fontItalic: 'Helvetica-Oblique' | 'Times-Italic';
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
        fontFamily: 'Times-Roman',
        fontBold: 'Times-Bold',
        fontItalic: 'Times-Italic',
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
        fontFamily: 'Times-Roman',
        fontBold: 'Times-Bold',
        fontItalic: 'Times-Italic',
        primaryColor: '#111827',
        secondaryColor: '#374151',
        accentColor: '#1e293b',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'two-column':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
    case 'black-yellow':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#000000',
        secondaryColor: '#1e293b',
        accentColor: '#ca8a04',
        sidebarBg: '#18181b',
        sidebarText: '#fef08a',
        isTwoColumn: true,
        sidebarWidth: '30%',
        mainWidth: '70%',
        headerAlign: 'left',
        educationInSidebar: false,
      };
    case 'photo-sidebar':
    case 'photo-circle':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
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
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#dc2626',
        secondaryColor: '#334155',
        accentColor: '#b91c1c',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'pink-header':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#db2777',
        secondaryColor: '#374151',
        accentColor: '#be185d',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'minimal':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#18181b',
        secondaryColor: '#52525b',
        accentColor: '#27272a',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'modern':
    default:
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#4338ca',
        secondaryColor: '#334155',
        accentColor: '#4f46e5',
        isTwoColumn: false,
        headerAlign: 'left',
      };
  }
}

export async function generateResumePdfBuffer(data: ResumeData): Promise<Buffer> {
  const template = data.template || 'classic';
  const cfg = getTemplateConfig(template);

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
      fontFamily: cfg.fontBold,
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
      fontFamily: cfg.fontBold,
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
      fontFamily: cfg.fontBold,
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
      fontFamily: cfg.fontBold,
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
      fontFamily: cfg.fontBold,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: 9,
      fontFamily: cfg.fontItalic,
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
  const validProjects = (data.projects || []).filter(p => p.name);
  const validAchievements = (data.achievements || []).filter(a => a.title);
  const validInternships = (data.internships || []).filter(i => i.company);

  const DocumentComponent = () => (
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

            {/* Education in Sidebar (e.g. for TwoColumnTemplate) */}
            {cfg.educationInSidebar && validEducation.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.sidebarSectionTitle}>Education</Text>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={[styles.sidebarTextItem, { fontFamily: cfg.fontBold, color: '#ffffff' }]}>
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

          {/* Education in Main Column (for templates where education is in main) */}
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

  return await renderToBuffer(React.createElement(DocumentComponent));
}
