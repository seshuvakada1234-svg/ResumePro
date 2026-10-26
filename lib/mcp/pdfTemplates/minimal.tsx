import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: '40pt 42pt',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'normal',
    letterSpacing: -0.5,
    color: '#0f172a',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
  summarySection: {
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 8.8,
    lineHeight: 1.6,
    color: '#475569',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 16,
  },
  sectionHdr: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#94a3b8',
    marginBottom: 8,
  },
  // Experience grid: Left duration (75pt), Right content
  expGridRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 11,
  },
  expLeft: {
    width: 75,
  },
  expDuration: {
    fontSize: 8,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  expRight: {
    flex: 1,
  },
  expPosition: {
    fontSize: 9.8,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  expCompany: {
    fontSize: 8.5,
    color: '#64748b',
    marginTop: 1,
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.45,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: '#94a3b8',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.4,
    flex: 1,
  },
  // Bottom 2-col grid
  twoColGrid: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 4,
  },
  gridCol: {
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#64748b',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 8.5,
    color: '#475569',
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
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactRow}>
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
          </View>
        </View>

        {/* Summary */}
        {summary ? (
          <View style={styles.summarySection}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Experience</Text>
            {validExperience.map((exp, idx) => (
              <View key={idx} style={styles.expGridRow}>
                <View style={styles.expLeft}>
                  <Text style={styles.expDuration}>{exp.duration || exp.startDate || ''}</Text>
                </View>
                <View style={styles.expRight}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  {exp.company ? <Text style={styles.expCompany}>{exp.company}</Text> : null}
                  {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                  {exp.bullets &&
                    exp.bullets.map((b, bi) => (
                      <View key={bi} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{b}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Projects</Text>
            {validProjects.map((p, idx) => (
              <View key={idx} style={styles.expGridRow}>
                <View style={styles.expLeft}>
                  <Text style={styles.expDuration}>Project</Text>
                </View>
                <View style={styles.expRight}>
                  <Text style={styles.expPosition}>{p.name}</Text>
                  {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 2-Column Grid (Education + Skills) */}
        <View style={styles.twoColGrid}>
          {validEducation.length > 0 && (
            <View style={styles.gridCol}>
              <Text style={styles.sectionHdr}>Education</Text>
              {validEducation.map((edu, idx) => (
                <View key={idx} style={styles.eduItem}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  {edu.year ? <Text style={styles.eduYear}>{edu.year}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {validSkills.length > 0 && (
            <View style={styles.gridCol}>
              <Text style={styles.sectionHdr}>Skills</Text>
              <View style={styles.skillsWrap}>
                {validSkills.map((s, idx) => (
                  <Text key={idx} style={styles.skillItem}>
                    • {s.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Internships */}
        {validInternships.length > 0 && (
          <View style={[styles.section, { marginTop: 12 }]}>
            <Text style={styles.sectionHdr}>Internships</Text>
            {validInternships.map((intn, idx) => (
              <View key={idx} style={styles.expGridRow}>
                <View style={styles.expLeft}>
                  <Text style={styles.expDuration}>{intn.duration || ''}</Text>
                </View>
                <View style={styles.expRight}>
                  <Text style={styles.expPosition}>{intn.role}</Text>
                  {intn.company ? <Text style={styles.expCompany}>{intn.company}</Text> : null}
                  {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {validAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Achievements</Text>
            {validAchievements.map((ach, idx) => (
              <View key={idx} style={styles.expGridRow}>
                <View style={styles.expLeft}>
                  <Text style={styles.expDuration}>Award</Text>
                </View>
                <View style={styles.expRight}>
                  <Text style={styles.expPosition}>{ach.title}</Text>
                  {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
