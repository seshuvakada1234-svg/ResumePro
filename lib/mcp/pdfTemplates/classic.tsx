import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: '36pt 42pt',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#1f2937',
    paddingBottom: 14,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 8.8,
    color: '#4b5563',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialItem: {
    fontSize: 8,
    color: '#6b7280',
  },
  section: {
    marginBottom: 14,
  },
  sectionHdr: {
    fontSize: 10.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2.5,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#374151',
    lineHeight: 1.55,
    textAlign: 'justify',
  },
  expItem: {
    marginBottom: 10,
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.45,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8.5,
    color: '#374151',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#374151',
    lineHeight: 1.4,
    flex: 1,
  },
  // 2-column grid at bottom (Education + Skills)
  twoColGrid: {
    flexDirection: 'row',
    gap: 20,
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
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8.8,
    color: '#374151',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#4b5563',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 8.5,
    color: '#374151',
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
          <View style={styles.socialRow}>
            {linkedin ? <Text style={styles.socialItem}>LinkedIn: {linkedin.replace(/^https?:\/\//, '')}</Text> : null}
            {github ? <Text style={styles.socialItem}>GitHub: {github.replace(/^https?:\/\//, '')}</Text> : null}
          </View>
        </View>

        {/* Summary */}
        {summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Experience</Text>
            {validExperience.map((exp, idx) => (
              <View key={idx} style={styles.expItem}>
                <View style={styles.expTopRow}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  {exp.duration ? <Text style={styles.expDuration}>{exp.duration}</Text> : null}
                </View>
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
            ))}
          </View>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Projects</Text>
            {validProjects.map((p, idx) => (
              <View key={idx} style={styles.expItem}>
                <Text style={styles.expPosition}>{p.name}</Text>
                {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Bottom 2-col Grid for Education & Skills */}
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
          <View style={[styles.section, { marginTop: 10 }]}>
            <Text style={styles.sectionHdr}>Internships</Text>
            {validInternships.map((intn, idx) => (
              <View key={idx} style={styles.expItem}>
                <View style={styles.expTopRow}>
                  <Text style={styles.expPosition}>{intn.role}</Text>
                  {intn.duration ? <Text style={styles.expDuration}>{intn.duration}</Text> : null}
                </View>
                <Text style={styles.expCompany}>{intn.company}</Text>
                {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {validAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHdr}>Achievements</Text>
            {validAchievements.map((ach, idx) => (
              <View key={idx} style={styles.expItem}>
                <Text style={styles.expPosition}>{ach.title}</Text>
                {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
