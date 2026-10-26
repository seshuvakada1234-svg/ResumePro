import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: '36pt 44pt',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  title: {
    fontSize: 10.5,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    marginBottom: 8,
  },
  contactVal: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  contactDot: {
    fontSize: 8.5,
    color: '#9ca3af',
  },
  dividerHr: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginBottom: 12,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  expItem: {
    marginBottom: 10,
  },
  expHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 8.8,
    color: '#4b5563',
    fontWeight: 'normal',
  },
  expCompany: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 1,
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
    marginLeft: 6,
  },
  bulletDot: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegreeRow: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 8.5,
    color: '#4b5563',
    marginTop: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillText: {
    fontSize: 8.5,
    color: '#4b5563',
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
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title || 'Professional Title'}</Text>
          <View style={styles.contactRow}>
            {location ? <Text style={styles.contactVal}>{location}</Text> : null}
            {location && phone ? <Text style={styles.contactDot}>•</Text> : null}
            {phone ? <Text style={styles.contactVal}>{phone}</Text> : null}
            {phone && email ? <Text style={styles.contactDot}>•</Text> : null}
            {email ? <Text style={styles.contactVal}>{email}</Text> : null}
          </View>
        </View>

        <View style={styles.dividerHr} />

        {/* Summary */}
        {summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {validExperience.map((exp, idx) => (
              <View key={idx} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  {exp.duration || exp.startDate ? (
                    <Text style={styles.expDuration}>
                      , {exp.duration || exp.startDate}
                    </Text>
                  ) : null}
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

        {/* Education */}
        {validEducation.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {validEducation.map((edu, idx) => (
              <View key={idx} style={styles.eduItem}>
                <Text style={styles.eduDegreeRow}>
                  {edu.degree}
                  {edu.year ? `, ${edu.year}` : ''}
                </Text>
                {edu.school ? <Text style={styles.eduSchool}>{edu.school}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {validSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrap}>
              {validSkills.map((s, idx) => (
                <Text key={idx} style={styles.skillText}>
                  • {s.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {validProjects.map((p, idx) => (
              <View key={idx} style={styles.expItem}>
                <Text style={styles.expPosition}>{p.name}</Text>
                {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Internships */}
        {validInternships.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Internships</Text>
            {validInternships.map((intn, idx) => (
              <View key={idx} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expPosition}>{intn.role}</Text>
                  {intn.duration ? <Text style={styles.expDuration}>, {intn.duration}</Text> : null}
                </View>
                {intn.company ? <Text style={styles.expCompany}>{intn.company}</Text> : null}
                {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {validAchievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
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
