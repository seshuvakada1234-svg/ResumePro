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
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 4,
  },
  location: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 2,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    fontSize: 8,
    color: '#4b5563',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    marginVertical: 10,
  },
  section: {
    marginBottom: 12,
  },
  grayBanner: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#1f2937',
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 8.5,
    lineHeight: 1.45,
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
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 8.2,
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
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8.2,
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
    gap: 12,
  },
  skillText: {
    fontSize: 8,
    color: '#374151',
  },
});

export function renderLawyerClassicPdf(data: ResumeData) {
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
    validCertifications,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Lawyer Classic Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {location ? <Text style={styles.location}>{location}</Text> : null}
          <View style={styles.contactRow}>
            {email ? <Text>{email}</Text> : null}
            {email && phone ? <Text>•</Text> : null}
            {phone ? <Text>{phone}</Text> : null}
          </View>
        </View>

        <View style={styles.divider} />

        {/* SUMMARY */}
        {summary ? (
          <View style={styles.section} wrap={false}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Summary</Text>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* EXPERIENCE */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Experience</Text>
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

        {/* EDUCATION */}
        {validEducation.length > 0 && (
          <View style={styles.section}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Education</Text>
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

        {/* SKILLS */}
        {validSkills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Skills & Bar Admissions</Text>
            </View>
            <View style={styles.skillsWrap}>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.skillText}>• {s.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* CERTIFICATIONS */}
        {validCertifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Certifications & Affiliations</Text>
            </View>
            {validCertifications.map((c, i) => (
              <Text key={i} style={styles.skillText} wrap={false}>• {c}</Text>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.grayBanner}>
              <Text style={styles.bannerTitle}>Notable Matters / Projects</Text>
            </View>
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
