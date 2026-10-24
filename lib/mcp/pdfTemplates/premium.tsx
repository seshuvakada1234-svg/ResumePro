import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8fafc',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#312e81',
    padding: '24pt 16pt',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  main: {
    width: '70%',
    padding: '18pt 18pt',
    backgroundColor: '#f8fafc',
    flexDirection: 'column',
  },
  sidebarName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  sidebarTitle: {
    fontSize: 7.5,
    color: '#c7d2fe',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 14,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#c7d2fe',
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.5,
    color: '#e0e7ff',
    marginBottom: 4,
  },
  progressBarLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  barTrack: {
    height: 4,
    backgroundColor: '#4338ca',
    borderRadius: 2,
    marginBottom: 6,
  },
  barFill: {
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: '10pt 12pt',
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  purpleDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#6366f1',
    marginRight: 6,
  },
  cardTitle: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#4f46e5',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
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
    color: '#6366f1',
    fontWeight: 'bold',
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
    color: '#6366f1',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#475569',
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#64748b',
  },
  eduYear: {
    fontSize: 7.2,
    color: '#6366f1',
    marginTop: 1,
  },
});

export function renderPremiumPdf(data: ResumeData) {
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
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Premium Indigo Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT INDIGO SIDEBAR */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{name}</Text>
          {title ? <Text style={styles.sidebarTitle}>{title}</Text> : null}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
            {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
            {github ? <Text style={styles.contactItem}>{github.replace('https://', '')}</Text> : null}
          </View>

          {/* Skills with Progress Bars */}
          {validSkills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {validSkills.map((s, i) => (
                <View key={i} wrap={false} style={{ marginBottom: 4 }}>
                  <View style={styles.progressBarLabel}>
                    <Text style={{ fontSize: 7, color: '#ffffff' }}>{s.name}</Text>
                    <Text style={{ fontSize: 6.5, color: '#c7d2fe' }}>{s.level}%</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${s.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {validLanguages.map((l, i) => (
                <View key={i} wrap={false} style={{ marginBottom: 4 }}>
                  <View style={styles.progressBarLabel}>
                    <Text style={{ fontSize: 7, color: '#ffffff' }}>{l.name}</Text>
                    <Text style={{ fontSize: 6.5, color: '#c7d2fe' }}>{l.level}%</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${l.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT (CARD CONTAINERS) */}
        <View style={styles.main}>
          {summary ? (
            <View style={styles.card} wrap={false}>
              <View style={styles.cardHeader}>
                <View style={styles.purpleDot} />
                <Text style={styles.cardTitle}>Professional Summary</Text>
              </View>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.purpleDot} />
                <Text style={styles.cardTitle}>Work Experience</Text>
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

          {validEducation.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.purpleDot} />
                <Text style={styles.cardTitle}>Education</Text>
              </View>
              {validEducation.map((edu, i) => (
                <View key={i} style={styles.eduItem} wrap={false}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {validProjects.length > 0 && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.purpleDot} />
                <Text style={styles.cardTitle}>Featured Projects</Text>
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
        </View>
      </Page>
    </Document>
  );
}
