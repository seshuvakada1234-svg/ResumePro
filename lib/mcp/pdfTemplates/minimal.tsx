import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: '36pt 40pt',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#94a3b8',
  },
  summaryText: {
    fontSize: 8.5,
    fontStyle: 'italic',
    lineHeight: 1.5,
    color: '#475569',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#94a3b8',
    marginBottom: 8,
  },
  expRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  expDurationCol: {
    width: '22%',
    paddingRight: 8,
  },
  expDuration: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  expContentCol: {
    width: '78%',
  },
  expPosition: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 1,
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
    color: '#94a3b8',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#475569',
    flex: 1,
  },
  bottomGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 10,
  },
  halfCol: {
    width: '48%',
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#64748b',
  },
  eduYear: {
    fontSize: 7.5,
    color: '#94a3b8',
    marginTop: 1,
  },
  skillRow: {
    fontSize: 8,
    color: '#475569',
    marginBottom: 3,
  },
});

export function renderMinimalPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    email,
    phone,
    location,
    summary,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Minimalist Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactRow}>
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
          </View>
        </View>

        {/* SUMMARY */}
        {summary ? (
          <View wrap={false}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* EXPERIENCE */}
        {validExperience.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {validExperience.map((exp, i) => (
              <View key={i} style={styles.expRow} wrap={false}>
                <View style={styles.expDurationCol}>
                  <Text style={styles.expDuration}>{exp.duration}</Text>
                </View>
                <View style={styles.expContentCol}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
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
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {validProjects.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {validProjects.map((proj, i) => (
              <View key={i} style={styles.expRow} wrap={false}>
                <View style={styles.expDurationCol}>
                  <Text style={styles.expDuration}>{proj.duration || 'Project'}</Text>
                </View>
                <View style={styles.expContentCol}>
                  <Text style={styles.expPosition}>{proj.name}</Text>
                  {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                  {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* BOTTOM 2-COLUMN SECTION: EDUCATION & SKILLS */}
        <View style={styles.bottomGrid}>
          {validEducation.length > 0 && (
            <View style={styles.halfCol}>
              <Text style={styles.sectionTitle}>Education</Text>
              {validEducation.map((edu, i) => (
                <View key={i} style={styles.eduItem} wrap={false}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {validSkills.length > 0 && (
            <View style={styles.halfCol}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.skillRow} wrap={false}>• {s.name}</Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
