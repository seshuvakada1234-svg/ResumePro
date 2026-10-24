import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: 0,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20pt 24pt',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  photoBox: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  title: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contactItem: {
    fontSize: 7.5,
    color: '#4b5563',
  },
  bodyGrid: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#f9fafb',
    padding: '16pt 16pt',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  main: {
    width: '65%',
    padding: '16pt 18pt',
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 6,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduSchool: {
    fontSize: 7.5,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 7,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 1,
  },
  skillItem: {
    fontSize: 7.5,
    color: '#374151',
    marginBottom: 2.5,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#374151',
    marginBottom: 10,
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
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.5,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  expCompany: {
    fontSize: 7.8,
    fontWeight: 'bold',
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
    color: '#4b5563',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#4b5563',
    flex: 1,
  },
});

export function renderPhotoSidebarPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    photo,
    summary,
    firstName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Photo Classic Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* TOP HEADER */}
        <View style={styles.header}>
          <View style={styles.photoBox}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{name}</Text>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <View style={styles.contactRow}>
              {email ? <Text style={styles.contactItem}>{email}</Text> : null}
              {phone ? <Text style={styles.contactItem}>• {phone}</Text> : null}
              {location ? <Text style={styles.contactItem}>• {location}</Text> : null}
            </View>
          </View>
        </View>

        {/* 2-COLUMN BODY */}
        <View style={styles.bodyGrid}>
          {/* LEFT 35% SIDEBAR */}
          <View style={styles.sidebar}>
            {validEducation.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionTitle}>Education</Text>
                {validEducation.map((edu, i) => (
                  <View key={i} style={styles.eduItem} wrap={false}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduYear}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {validSkills.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {validSkills.map((s, i) => (
                  <Text key={i} style={styles.skillItem} wrap={false}>• {s.name}</Text>
                ))}
              </View>
            )}

            {validLanguages.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Languages</Text>
                {validLanguages.map((l, i) => (
                  <Text key={i} style={styles.skillItem} wrap={false}>• {l.name}</Text>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT 65% MAIN */}
          <View style={styles.main}>
            {summary ? (
              <View style={{ marginBottom: 12 }} wrap={false}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {validExperience.length > 0 && (
              <View style={{ marginBottom: 12 }}>
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

            {validProjects.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Projects</Text>
                {validProjects.map((proj, i) => (
                  <View key={i} style={styles.expItem} wrap={false}>
                    <Text style={styles.expPosition}>{proj.name}</Text>
                    {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                    {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
