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
  pinkBar: {
    backgroundColor: '#fce4e4',
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  pinkBarText: {
    fontSize: 7.5,
    color: '#374151',
  },
  nameHeader: {
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
  },
  title: {
    fontSize: 8.5,
    color: '#6b7280',
    marginTop: 2,
  },
  bodyContent: {
    padding: '16pt 24pt',
  },
  sectionRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 8,
    marginBottom: 8,
  },
  sectionLabelCol: {
    width: 75,
    paddingRight: 10,
  },
  sectionLabelText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#1f2937',
  },
  sectionContentCol: {
    flex: 1,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#4b5563',
  },
  expItem: {
    marginBottom: 6,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  expPosition: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.2,
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 7.5,
    color: '#4b5563',
    marginBottom: 1.5,
  },
  expDesc: {
    fontSize: 7.5,
    lineHeight: 1.35,
    color: '#4b5563',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#db2777',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.5,
    lineHeight: 1.3,
    color: '#4b5563',
    flex: 1,
  },
  eduItem: {
    marginBottom: 4,
  },
  eduSchool: {
    fontSize: 8.2,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 7.5,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 7,
    color: '#6b7280',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillText: {
    fontSize: 7.5,
    color: '#374151',
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
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Pink Header Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* PINK TOP BAR */}
        <View style={styles.pinkBar}>
          {location ? <Text style={styles.pinkBarText}>{location}</Text> : null}
          {phone ? <Text style={styles.pinkBarText}>• {phone}</Text> : null}
          {email ? <Text style={styles.pinkBarText}>• {email}</Text> : null}
        </View>

        {/* NAME + TITLE */}
        <View style={styles.nameHeader}>
          <Text style={styles.name}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>

        {/* BODY ROWS WITH LEFT SECTION LABELS */}
        <View style={styles.bodyContent}>
          {/* SUMMARY */}
          {summary ? (
            <View style={styles.sectionRow} wrap={false}>
              <View style={styles.sectionLabelCol}>
                <Text style={styles.sectionLabelText}>Summary</Text>
              </View>
              <View style={styles.sectionContentCol}>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            </View>
          ) : null}

          {/* EXPERIENCE */}
          {validExperience.length > 0 && (
            <View style={styles.sectionRow}>
              <View style={styles.sectionLabelCol}>
                <Text style={styles.sectionLabelText}>Experience</Text>
              </View>
              <View style={styles.sectionContentCol}>
                {validExperience.map((exp, i) => (
                  <View key={i} style={styles.expItem} wrap={false}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      <Text style={styles.expDuration}>{exp.duration}</Text>
                    </View>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <View style={{ marginTop: 1 }}>
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
            </View>
          )}

          {/* SKILLS */}
          {validSkills.length > 0 && (
            <View style={styles.sectionRow} wrap={false}>
              <View style={styles.sectionLabelCol}>
                <Text style={styles.sectionLabelText}>Skills</Text>
              </View>
              <View style={styles.sectionContentCol}>
                <View style={styles.skillsWrap}>
                  {validSkills.map((s, i) => (
                    <Text key={i} style={styles.skillText}>• {s.name}</Text>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* EDUCATION */}
          {validEducation.length > 0 && (
            <View style={styles.sectionRow} wrap={false}>
              <View style={styles.sectionLabelCol}>
                <Text style={styles.sectionLabelText}>Education</Text>
              </View>
              <View style={styles.sectionContentCol}>
                {validEducation.map((edu, i) => (
                  <View key={i} style={styles.eduItem}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree} — {edu.year}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* PROJECTS */}
          {validProjects.length > 0 && (
            <View style={styles.sectionRow} wrap={false}>
              <View style={styles.sectionLabelCol}>
                <Text style={styles.sectionLabelText}>Projects</Text>
              </View>
              <View style={styles.sectionContentCol}>
                {validProjects.map((p, i) => (
                  <View key={i} style={styles.expItem}>
                    <Text style={styles.expPosition}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
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
