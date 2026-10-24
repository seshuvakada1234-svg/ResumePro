import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  renderToBuffer,
} from '@react-pdf/renderer';
import { ResumeData, ResumeTemplate } from '@/types/resume';

interface TemplateTheme {
  fontFamily: 'Helvetica' | 'Times-Roman';
  fontBold: 'Helvetica-Bold' | 'Times-Bold';
  fontItalic: 'Helvetica-Oblique' | 'Times-Italic';
  primaryColor: string;
  secondaryColor: string;
  sidebarBg?: string;
  sidebarText?: string;
  isTwoColumn: boolean;
  headerAlign: 'left' | 'center';
}

function getTemplateTheme(template: ResumeTemplate): TemplateTheme {
  switch (template) {
    case 'classic':
      return {
        fontFamily: 'Times-Roman',
        fontBold: 'Times-Bold',
        fontItalic: 'Times-Italic',
        primaryColor: '#1f2937',
        secondaryColor: '#4b5563',
        isTwoColumn: false,
        headerAlign: 'center',
      };
    case 'lawyer-classic':
    case 'minimal-pro':
    case 'serif':
      return {
        fontFamily: 'Times-Roman',
        fontBold: 'Times-Bold',
        fontItalic: 'Times-Italic',
        primaryColor: '#111827',
        secondaryColor: '#374151',
        isTwoColumn: false,
        headerAlign: 'left',
      };
    case 'two-column':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#0f766e',
        secondaryColor: '#334155',
        sidebarBg: '#f1f5f9',
        sidebarText: '#1e293b',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'premium':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#4338ca',
        secondaryColor: '#334155',
        sidebarBg: '#312e81',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'executive':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#b45309',
        secondaryColor: '#334155',
        sidebarBg: '#0f172a',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'navy':
    case 'dark-navy':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#1e3a8a',
        secondaryColor: '#334155',
        sidebarBg: '#172554',
        sidebarText: '#f8fafc',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'crimson':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#991b1b',
        secondaryColor: '#334155',
        sidebarBg: '#7f1d1d',
        sidebarText: '#fef2f2',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'black-yellow':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#ca8a04',
        secondaryColor: '#1e293b',
        sidebarBg: '#18181b',
        sidebarText: '#fef08a',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'luxury-gold':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#b45309',
        secondaryColor: '#334155',
        sidebarBg: '#0f172a',
        sidebarText: '#fef3c7',
        isTwoColumn: true,
        headerAlign: 'left',
      };
    case 'redline':
      return {
        fontFamily: 'Helvetica',
        fontBold: 'Helvetica-Bold',
        fontItalic: 'Helvetica-Oblique',
        primaryColor: '#dc2626',
        secondaryColor: '#334155',
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
        isTwoColumn: false,
        headerAlign: 'left',
      };
  }
}

export async function generateResumePdfBuffer(data: ResumeData): Promise<Buffer> {
  const template = data.template || 'classic';
  const theme = getTemplateTheme(template);

  const p = data.personalInfo || {
    fullName: 'Resume',
    email: '',
    phone: '',
    location: '',
    summary: '',
  };

  const skillsList = (data.skills || []).map(s => (typeof s === 'string' ? s : s.name)).filter(Boolean);
  const languagesList = (data.languages || []).map(l => (typeof l === 'string' ? l : l.name)).filter(Boolean);
  const certsList = (data.certifications || []).map(c => (typeof c === 'string' ? c : c.name)).filter(Boolean);

  const summaryText = p.summary || data.summary || '';

  const styles = StyleSheet.create({
    page: {
      flexDirection: theme.isTwoColumn ? 'row' : 'column',
      backgroundColor: '#ffffff',
      padding: theme.isTwoColumn ? 0 : 36,
      fontFamily: theme.fontFamily,
      fontSize: 9.5,
      lineHeight: 1.4,
      color: '#334155',
    },
    // Sidebar styles for two-column templates
    sidebar: {
      width: '32%',
      backgroundColor: theme.sidebarBg || '#f1f5f9',
      color: theme.sidebarText || '#1e293b',
      padding: 24,
      paddingTop: 32,
    },
    mainColumn: {
      width: theme.isTwoColumn ? '68%' : '100%',
      padding: theme.isTwoColumn ? 28 : 0,
      paddingTop: theme.isTwoColumn ? 32 : 0,
    },
    // Header
    headerContainer: {
      marginBottom: 16,
      borderBottomWidth: 1.5,
      borderBottomColor: theme.primaryColor,
      paddingBottom: 12,
      textAlign: theme.headerAlign,
    },
    fullName: {
      fontSize: 22,
      fontFamily: theme.fontBold,
      color: theme.primaryColor,
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: theme.headerAlign === 'center' ? 'center' : 'flex-start',
      gap: 8,
      fontSize: 8.5,
      color: '#64748b',
    },
    sidebarContactItem: {
      fontSize: 8.5,
      marginBottom: 6,
      color: theme.sidebarText || '#334155',
    },
    sidebarSectionTitle: {
      fontSize: 10,
      fontFamily: theme.fontBold,
      color: theme.sidebarText || '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 18,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 4,
    },
    // Content sections
    section: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 11.5,
      fontFamily: theme.fontBold,
      color: theme.primaryColor,
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
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: 10,
      fontFamily: theme.fontBold,
      color: '#0f172a',
    },
    itemSubtitle: {
      fontSize: 9,
      fontFamily: theme.fontItalic,
      color: '#475569',
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8.5,
      color: '#64748b',
    },
    itemDescription: {
      fontSize: 9,
      color: '#334155',
      lineHeight: 1.35,
    },
    bulletItem: {
      fontSize: 9,
      color: '#334155',
      marginBottom: 2,
      paddingLeft: 6,
    },
    skillBadge: {
      fontSize: 8.5,
      marginBottom: 4,
      paddingVertical: 2,
      paddingHorizontal: 6,
      backgroundColor: theme.isTwoColumn ? 'rgba(255,255,255,0.1)' : '#f1f5f9',
      borderRadius: 3,
      color: theme.sidebarText || '#1e293b',
    },
    link: {
      color: theme.primaryColor,
      textDecoration: 'none',
    },
  });

  const ResumePdfDocument = () => (
    <Document title={`${p.fullName || 'Resume'} - FreeResume.dev`} author="FreeResume.dev" subject="ATS-Optimized Resume">
      <Page size="A4" style={styles.page}>
        {/* If Two-Column, render Sidebar */}
        {theme.isTwoColumn && (
          <View style={styles.sidebar}>
            <Text style={[styles.fullName, { color: theme.sidebarText || '#ffffff', fontSize: 18 }]}>
              {p.fullName || 'Your Name'}
            </Text>
            
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sidebarSectionTitle}>Contact</Text>
              {p.email ? <Text style={styles.sidebarContactItem}>{p.email}</Text> : null}
              {p.phone ? <Text style={styles.sidebarContactItem}>{p.phone}</Text> : null}
              {p.location ? <Text style={styles.sidebarContactItem}>{p.location}</Text> : null}
              {p.linkedin ? <Text style={styles.sidebarContactItem}>LinkedIn: {p.linkedin}</Text> : null}
              {p.github ? <Text style={styles.sidebarContactItem}>GitHub: {p.github}</Text> : null}
              {p.website ? <Text style={styles.sidebarContactItem}>Portfolio: {p.website}</Text> : null}
            </View>

            {skillsList.length > 0 && (
              <View>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                {skillsList.map((skill, idx) => (
                  <Text key={idx} style={styles.skillBadge}>• {skill}</Text>
                ))}
              </View>
            )}

            {languagesList.length > 0 && (
              <View>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {languagesList.map((lang, idx) => (
                  <Text key={idx} style={styles.skillBadge}>{lang}</Text>
                ))}
              </View>
            )}

            {certsList.length > 0 && (
              <View>
                <Text style={styles.sidebarSectionTitle}>Certifications</Text>
                {certsList.map((cert, idx) => (
                  <Text key={idx} style={styles.sidebarContactItem}>• {cert}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Main Column */}
        <View style={styles.mainColumn}>
          {/* Header if Single Column */}
          {!theme.isTwoColumn && (
            <View style={styles.headerContainer}>
              <Text style={styles.fullName}>{p.fullName || 'Your Name'}</Text>
              <View style={styles.contactRow}>
                {p.email ? <Text>{p.email}</Text> : null}
                {p.phone ? <Text>•  {p.phone}</Text> : null}
                {p.location ? <Text>•  {p.location}</Text> : null}
                {p.linkedin ? <Text>•  {p.linkedin}</Text> : null}
                {p.github ? <Text>•  {p.github}</Text> : null}
                {p.website ? <Text>•  {p.website}</Text> : null}
              </View>
            </View>
          )}

          {/* Professional Summary */}
          {summaryText ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.itemDescription}>{summaryText}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {data.experience && data.experience.filter(e => e.company || e.position).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {data.experience
                .filter(e => e.company || e.position)
                .map((exp, idx) => (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{exp.position || 'Position'}</Text>
                      <Text style={styles.itemDate}>{exp.duration || ''}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{exp.company || 'Company'}</Text>
                    {exp.description ? (
                      <Text style={styles.itemDescription}>{exp.description}</Text>
                    ) : null}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <View style={{ marginTop: 2 }}>
                        {exp.bullets.map((b, bIdx) => (
                          <Text key={bIdx} style={styles.bulletItem}>• {b}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
            </View>
          )}

          {/* Projects */}
          {data.projects && data.projects.filter(p => p.name).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects
                .filter(p => p.name)
                .map((proj, idx) => (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{proj.name}</Text>
                      {proj.duration ? <Text style={styles.itemDate}>{proj.duration}</Text> : null}
                    </View>
                    {proj.technologies ? (
                      <Text style={styles.itemSubtitle}>Tech: {proj.technologies}</Text>
                    ) : null}
                    {proj.description ? (
                      <Text style={styles.itemDescription}>{proj.description}</Text>
                    ) : null}
                    {proj.link ? (
                      <Text style={[styles.itemDate, { color: theme.primaryColor, marginTop: 1 }]}>
                        Link: {proj.link}
                      </Text>
                    ) : null}
                  </View>
                ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.filter(e => e.school || e.degree).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education
                .filter(e => e.school || e.degree)
                .map((edu, idx) => (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{edu.degree || 'Degree'}</Text>
                      <Text style={styles.itemDate}>{edu.year || ''}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{edu.school || 'School / University'}</Text>
                    {edu.gpa ? <Text style={styles.itemDescription}>GPA: {edu.gpa}</Text> : null}
                  </View>
                ))}
            </View>
          )}

          {/* Skills (if Single Column) */}
          {!theme.isTwoColumn && skillsList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.itemDescription}>
                {skillsList.join('  •  ')}
              </Text>
            </View>
          )}

          {/* Certifications (if Single Column) */}
          {!theme.isTwoColumn && certsList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certsList.map((c, idx) => (
                <Text key={idx} style={styles.bulletItem}>• {c}</Text>
              ))}
            </View>
          )}

          {/* Achievements */}
          {data.achievements && data.achievements.filter(a => a.title).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Achievements</Text>
              {data.achievements
                .filter(a => a.title)
                .map((ach, idx) => (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{ach.title}</Text>
                      <Text style={styles.itemDate}>{ach.date || ''}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{ach.organization}</Text>
                    {ach.description ? <Text style={styles.itemDescription}>{ach.description}</Text> : null}
                  </View>
                ))}
            </View>
          )}

          {/* Internships */}
          {data.internships && data.internships.filter(i => i.company).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Internships</Text>
              {data.internships
                .filter(i => i.company)
                .map((int, idx) => (
                  <View key={idx} style={styles.itemBlock}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{int.role || 'Intern'}</Text>
                      <Text style={styles.itemDate}>{int.duration || ''}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{int.company}</Text>
                    {int.description ? <Text style={styles.itemDescription}>{int.description}</Text> : null}
                  </View>
                ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );

  return await renderToBuffer(React.createElement(ResumePdfDocument));
}
