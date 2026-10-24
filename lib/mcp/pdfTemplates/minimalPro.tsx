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
    marginBottom: 4,
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 8.8,
    color: '#6b7280',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    fontSize: 7.5,
    color: '#6b7280',
  },
  divider: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d5db',
    marginVertical: 10,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8.2,
    lineHeight: 1.45,
    color: '#4b5563',
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
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.5,
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.8,
    lineHeight: 1.4,
    color: '#4b5563',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#6b7280',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#4b5563',
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 7.2,
    color: '#6b7280',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillText: {
    fontSize: 7.8,
    color: '#374151',
    width: '48%',
    marginBottom: 2,
  },
});

export function renderMinimalProPdf(data: ResumeData) {
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
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Minimal Pro Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={styles.contactRow}>
            {location ? <Text>{location}</Text> : null}
            {location && phone ? <Text>•</Text> : null}
            {phone ? <Text>{phone}</Text> : null}
            {(location || phone) && email ? <Text>•</Text> : null}
            {email ? <Text>{email}</Text> : null}
          </View>
        </View>

        <View style={styles.divider} />

        {/* SUMMARY */}
        {summary ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Summary</Text>
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

        {/* EDUCATION */}
        {validEducation.length > 0 && (
          <View style={styles.section}>
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

        {/* SKILLS */}
        {validSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrap}>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.skillText}>• {s.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* PROJECTS */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {validProjects.map((p, i) => (
              <View key={i} style={styles.expItem} wrap={false}>
                <Text style={styles.expPosition}>{p.name}</Text>
                {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
