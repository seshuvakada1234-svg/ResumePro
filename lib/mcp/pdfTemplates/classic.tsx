import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: '30pt 36pt',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1f2937',
    paddingBottom: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    fontSize: 8.5,
    color: '#4b5563',
    marginTop: 2,
  },
  contactItem: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    fontSize: 8,
    color: '#6b7280',
    marginTop: 3,
  },
  linkText: {
    fontSize: 8,
    color: '#4f46e5',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#1f2937',
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'justify',
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
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  expCompany: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#4b5563',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 8,
    color: '#4b5563',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 8,
    lineHeight: 1.35,
    color: '#4b5563',
    flex: 1,
  },
  twoColSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 4,
  },
  halfCol: {
    width: '48%',
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#374151',
  },
  eduYear: {
    fontSize: 7.5,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBullet: {
    fontSize: 8,
    color: '#374151',
    width: '47%',
    marginBottom: 2,
  },
});

export function renderClassicPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
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
    validAchievements,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Classic Professional Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactRow}>
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {email && phone ? <Text style={styles.contactItem}>•</Text> : null}
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {(email || phone) && location ? <Text style={styles.contactItem}>•</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
          </View>
          {(linkedin || github) && (
            <View style={styles.linksRow}>
              {linkedin ? <Text style={styles.linkText}>LinkedIn: {linkedin.replace('https://', '')}</Text> : null}
              {github ? <Text style={styles.linkText}>GitHub: {github.replace('https://', '')}</Text> : null}
            </View>
          )}
        </View>

        {/* SUMMARY */}
        {summary ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* EXPERIENCE */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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

        {/* PROJECTS */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {validProjects.map((proj, i) => (
              <View key={i} style={styles.expItem} wrap={false}>
                <View style={styles.expHeader}>
                  <Text style={styles.expPosition}>{proj.name}</Text>
                  {proj.duration ? <Text style={styles.expDuration}>{proj.duration}</Text> : null}
                </View>
                {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* BOTTOM 2-COLUMN SECTION: EDUCATION & SKILLS */}
        {(validEducation.length > 0 || validSkills.length > 0) && (
          <View style={styles.twoColSection}>
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
                <View style={styles.skillsWrap}>
                  {validSkills.map((s, i) => (
                    <Text key={i} style={styles.skillBullet}>• {s.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* ACHIEVEMENTS */}
        {validAchievements.length > 0 && (
          <View style={[styles.section, { marginTop: 8 }]}>
            <Text style={styles.sectionTitle}>Key Achievements</Text>
            {validAchievements.map((ach, i) => (
              <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                <Text style={styles.expPosition}>{ach.title} {ach.organization ? `— ${ach.organization}` : ''}</Text>
                {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
