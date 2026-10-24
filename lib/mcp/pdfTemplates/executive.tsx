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
    width: '32%',
    backgroundColor: '#1e293b',
    padding: '24pt 16pt',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  main: {
    width: '68%',
    padding: '24pt 20pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d97706',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#ffffff',
    marginBottom: 2,
  },
  title: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#d97706',
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
    color: '#cbd5e1',
    borderBottomWidth: 1,
    borderBottomColor: '#d97706',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 6,
  },
  contactText: {
    fontSize: 7.2,
    color: '#cbd5e1',
    flex: 1,
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
    fontSize: 7.2,
    color: '#94a3b8',
  },
  eduYear: {
    fontSize: 6.8,
    color: '#d97706',
    marginTop: 1,
  },
  skillText: {
    fontSize: 7.5,
    color: '#e2e8f0',
    marginBottom: 3,
  },
  mainSection: {
    marginBottom: 13,
  },
  mainSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  goldBar: {
    width: 16,
    height: 2.5,
    backgroundColor: '#d97706',
    marginRight: 6,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#475569',
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
    color: '#1e293b',
  },
  expDuration: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#d97706',
  },
  expCompany: {
    fontSize: 7.8,
    color: '#64748b',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.8,
    lineHeight: 1.4,
    color: '#475569',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#d97706',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#475569',
    flex: 1,
  },
});

export function renderExecutivePdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    summary,
    firstName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validAchievements,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Executive Dark Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT SLATE/GOLD SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? (
              <View style={styles.contactRow}>
                <View style={styles.contactBadge} />
                <Text style={styles.contactText}>{phone}</Text>
              </View>
            ) : null}
            {email ? (
              <View style={styles.contactRow}>
                <View style={styles.contactBadge} />
                <Text style={styles.contactText}>{email}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactRow}>
                <View style={styles.contactBadge} />
                <Text style={styles.contactText}>{location}</Text>
              </View>
            ) : null}
            {linkedin ? (
              <View style={styles.contactRow}>
                <View style={styles.contactBadge} />
                <Text style={styles.contactText}>{linkedin.replace('https://', '')}</Text>
              </View>
            ) : null}
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
              <Text style={styles.sidebarSectionTitle}>Expertise</Text>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.skillText} wrap={false}>• {s.name}</Text>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          {summary ? (
            <View style={styles.mainSection} wrap={false}>
              <View style={styles.mainSectionHeader}>
                <View style={styles.goldBar} />
                <Text style={styles.mainSectionTitle}>Executive Summary</Text>
              </View>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <View style={styles.mainSectionHeader}>
                <View style={styles.goldBar} />
                <Text style={styles.mainSectionTitle}>Professional Experience</Text>
              </View>
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
              <View style={styles.mainSectionHeader}>
                <View style={styles.goldBar} />
                <Text style={styles.mainSectionTitle}>Key Projects</Text>
              </View>
              {validProjects.map((proj, i) => (
                <View key={i} style={styles.expItem} wrap={false}>
                  <Text style={styles.expPosition}>{proj.name}</Text>
                  {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                  {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {validAchievements.length > 0 && (
            <View style={styles.mainSection}>
              <View style={styles.mainSectionHeader}>
                <View style={styles.goldBar} />
                <Text style={styles.mainSectionTitle}>Key Achievements</Text>
              </View>
              {validAchievements.map((ach, i) => (
                <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                  <Text style={styles.expPosition}>{ach.title} {ach.organization ? `— ${ach.organization}` : ''}</Text>
                  {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
