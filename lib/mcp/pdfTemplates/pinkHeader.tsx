import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'column',
  },
  // Top pink bar with contact
  pinkBar: {
    backgroundColor: '#fce4e4',
    paddingVertical: 7,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  pinkBarText: {
    fontSize: 8.5,
    color: '#374151',
  },
  pinkBarDot: {
    fontSize: 8.5,
    color: '#374151',
  },
  // Centered name + title
  nameSection: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
  },
  title: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  // Body horizontal sections with 85pt left label
  body: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
  },
  labelCol: {
    width: 80,
    paddingTop: 1,
  },
  labelText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#1f2937',
  },
  contentCol: {
    flex: 1,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  skillDot: {
    fontSize: 8,
    color: '#9ca3af',
  },
  skillText: {
    fontSize: 8.5,
    color: '#374151',
  },
  expItem: {
    marginBottom: 10,
  },
  expPosition: {
    fontSize: 9.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#111827',
  },
  expMeta: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 1,
  },
  expDuration: {
    fontSize: 8,
    color: '#6b7280',
    fontWeight: 'normal',
  },
  expDesc: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.45,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: '#6b7280',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4b5563',
    marginTop: 1,
  },
});

export function renderPinkHeaderPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    summary,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
    validCertifications,
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* Pink bar */}
        <View style={styles.pinkBar}>
          {location ? <Text style={styles.pinkBarText}>{location}</Text> : null}
          {location && phone ? <Text style={styles.pinkBarDot}>•</Text> : null}
          {phone ? <Text style={styles.pinkBarText}>{phone}</Text> : null}
          {phone && email ? <Text style={styles.pinkBarDot}>•</Text> : null}
          {email ? <Text style={styles.pinkBarText}>{email}</Text> : null}
        </View>

        {/* Centered Name */}
        <View style={styles.nameSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title || 'Professional Title'}</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Summary */}
          {summary ? (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Summary</Text>
              </View>
              <View style={styles.contentCol}>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            </View>
          ) : null}

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Skills</Text>
              </View>
              <View style={styles.contentCol}>
                <View style={styles.skillsGrid}>
                  {validSkills.map((s, idx) => (
                    <View key={idx} style={styles.skillItem}>
                      <Text style={styles.skillDot}>•</Text>
                      <Text style={styles.skillText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Experience</Text>
              </View>
              <View style={styles.contentCol}>
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>
                      {exp.position}
                      {exp.company ? ` AT ${exp.company.toUpperCase()}` : ''}
                    </Text>
                    {exp.company || exp.duration ? (
                      <Text style={styles.expMeta}>
                        {exp.company ? `${exp.company}, ` : ''}
                        <Text style={styles.expDuration}>{exp.duration || exp.startDate || ''}</Text>
                      </Text>
                    ) : null}
                    {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                    {exp.bullets &&
                      exp.bullets.map((b, bi) => (
                        <View key={bi} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Education</Text>
              </View>
              <View style={styles.contentCol}>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>
                      {edu.degree}
                      {edu.year ? `, ${edu.year}` : ''}
                    </Text>
                    {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Languages</Text>
              </View>
              <View style={styles.contentCol}>
                <View style={styles.skillsGrid}>
                  {validLanguages.map((l, idx) => (
                    <View key={idx} style={styles.skillItem}>
                      <Text style={styles.skillDot}>•</Text>
                      <Text style={styles.skillText}>{l.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Certifications */}
          {validCertifications.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Certifications</Text>
              </View>
              <View style={styles.contentCol}>
                {validCertifications.map((c, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {validProjects.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Projects</Text>
              </View>
              <View style={styles.contentCol}>
                {validProjects.map((p, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Internships</Text>
              </View>
              <View style={styles.contentCol}>
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>
                      {intn.role}
                      {intn.company ? ` AT ${intn.company.toUpperCase()}` : ''}
                    </Text>
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.labelCol}>
                <Text style={styles.labelText}>Achievements</Text>
              </View>
              <View style={styles.contentCol}>
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{ach.title}</Text>
                    {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
