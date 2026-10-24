import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#0f172a',
    padding: '24pt 16pt',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  main: {
    width: '70%',
    padding: '24pt 20pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  sidebarName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1.2,
    marginBottom: 4,
  },
  sidebarTitle: {
    fontSize: 8,
    color: '#94a3b8',
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 14,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#94a3b8',
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.5,
    color: '#cbd5e1',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eduSchool: {
    fontSize: 7.5,
    color: '#94a3b8',
  },
  eduYear: {
    fontSize: 7,
    color: '#64748b',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: '#1e293b',
    borderRadius: 4,
    padding: '2 5',
    marginBottom: 3,
  },
  skillText: {
    fontSize: 7.2,
    color: '#cbd5e1',
  },
  mainSection: {
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#334155',
  },
  expItem: {
    marginBottom: 8,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  expPosition: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  expDuration: {
    fontSize: 7.5,
    color: '#64748b',
  },
  expCompany: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.8,
    lineHeight: 1.4,
    color: '#334155',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#64748b',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#334155',
    flex: 1,
  },
});

export function renderTwoColumnPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    github,
    summary,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Two Column Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT SLATE SIDEBAR */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{name}</Text>
          {title ? <Text style={styles.sidebarTitle}>{title}</Text> : null}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? <Text style={styles.contactItem}>Phone: {phone}</Text> : null}
            {email ? <Text style={styles.contactItem}>Email: {email}</Text> : null}
            {location ? <Text style={styles.contactItem}>Location: {location}</Text> : null}
            {linkedin ? <Text style={styles.contactItem}>LinkedIn: {linkedin.replace('https://', '')}</Text> : null}
            {github ? <Text style={styles.contactItem}>GitHub: {github.replace('https://', '')}</Text> : null}
          </View>

          {/* Education in Sidebar */}
          {validEducation.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {validEducation.map((edu, i) => (
                <View key={i} style={styles.eduItem} wrap={false}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills in Sidebar */}
          {validSkills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              <View style={styles.skillsWrap}>
                {validSkills.map((s, i) => (
                  <View key={i} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages in Sidebar */}
          {validLanguages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {validLanguages.map((l, i) => (
                <Text key={i} style={styles.contactItem}>{l.name}</Text>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          {summary ? (
            <View style={styles.mainSection} wrap={false}>
              <Text style={styles.mainSectionTitle}>Professional Summary</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Experience</Text>
              {validExperience.map((exp, i) => (
                <View key={i} style={styles.expItem} wrap={false}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    <Text style={styles.expDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <View style={{ marginTop: 2 }}>
                      {exp.bullets.map((b, bi) => (
                        <View key={bi} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {validProjects.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Projects</Text>
              {validProjects.map((proj, i) => (
                <View key={i} style={styles.expItem} wrap={false}>
                  <Text style={styles.expPosition}>{proj.name}</Text>
                  {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                  {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
