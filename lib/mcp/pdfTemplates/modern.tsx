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
  headerBanner: {
    backgroundColor: '#4338ca',
    padding: '24pt 24pt',
    color: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 2,
  },
  contactText: {
    fontSize: 8.5,
    color: '#e0e7ff',
  },
  linksRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 4,
  },
  linkText: {
    fontSize: 8,
    color: '#c7d2fe',
  },
  bodyGrid: {
    flexDirection: 'row',
    padding: '16pt 20pt',
    gap: 14,
  },
  leftCol: {
    width: '65%',
  },
  rightCol: {
    width: '35%',
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4338ca',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#4b5563',
    marginBottom: 10,
  },
  expBlock: {
    borderLeftWidth: 2,
    borderLeftColor: '#e0e7ff',
    paddingLeft: 8,
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  durationBadge: {
    backgroundColor: '#eef2ff',
    color: '#4f46e5',
    padding: '2 6',
    borderRadius: 3,
    fontSize: 7,
    fontWeight: 'bold',
  },
  expCompany: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#6b7280',
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
    color: '#6366f1',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#4b5563',
    flex: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  skillPill: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 4,
  },
  skillPillText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#374151',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#6b7280',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginTop: 1,
  },
  projItem: {
    borderLeftWidth: 2,
    borderLeftColor: '#e0e7ff',
    paddingLeft: 8,
    marginBottom: 8,
  },
  projTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  projDesc: {
    fontSize: 7.5,
    color: '#4b5563',
    lineHeight: 1.35,
  },
});

export function renderModernPdf(data: ResumeData) {
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
    validLanguages,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Modern Clean Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* TOP INDIGO BANNER */}
        <View style={styles.headerBanner}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactRow}>
            {email ? <Text style={styles.contactText}>{email}</Text> : null}
            {email && phone ? <Text style={styles.contactText}>•</Text> : null}
            {phone ? <Text style={styles.contactText}>{phone}</Text> : null}
            {(email || phone) && location ? <Text style={styles.contactText}>•</Text> : null}
            {location ? <Text style={styles.contactText}>{location}</Text> : null}
          </View>
          {(linkedin || github) && (
            <View style={styles.linksRow}>
              {linkedin ? <Text style={styles.linkText}>LinkedIn: {linkedin.replace('https://', '')}</Text> : null}
              {github ? <Text style={styles.linkText}>GitHub: {github.replace('https://', '')}</Text> : null}
            </View>
          )}
        </View>

        {/* 2-COLUMN BODY GRID */}
        <View style={styles.bodyGrid}>
          {/* LEFT 65% COLUMN */}
          <View style={styles.leftCol}>
            {summary ? (
              <View wrap={false}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {validExperience.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Experience</Text>
                {validExperience.map((exp, i) => (
                  <View key={i} style={styles.expBlock} wrap={false}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      {exp.duration ? <Text style={styles.durationBadge}>{exp.duration}</Text> : null}
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
              <View>
                <Text style={styles.sectionTitle}>Projects</Text>
                {validProjects.map((proj, i) => (
                  <View key={i} style={styles.projItem} wrap={false}>
                    <Text style={styles.projTitle}>{proj.name}</Text>
                    {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                    {proj.description ? <Text style={styles.projDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT 35% COLUMN */}
          <View style={styles.rightCol}>
            {validSkills.length > 0 && (
              <View wrap={false}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsWrap}>
                  {validSkills.map((s, i) => (
                    <View key={i} style={styles.skillPill}>
                      <Text style={styles.skillPillText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {validEducation.length > 0 && (
              <View wrap={false}>
                <Text style={styles.sectionTitle}>Education</Text>
                {validEducation.map((edu, i) => (
                  <View key={i} style={styles.eduItem}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduYear}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {validLanguages.length > 0 && (
              <View wrap={false} style={{ marginTop: 6 }}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={styles.skillsWrap}>
                  {validLanguages.map((l, i) => (
                    <View key={i} style={styles.skillPill}>
                      <Text style={styles.skillPillText}>{l.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
