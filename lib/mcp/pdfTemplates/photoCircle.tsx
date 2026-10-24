import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#f3f4f6',
    padding: '22pt 14pt',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#d1d5db',
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
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
    color: '#6b7280',
  },
  sidebarSection: {
    width: '100%',
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 6,
  },
  sidebarBullet: {
    fontSize: 7.5,
    color: '#4b5563',
    marginBottom: 3,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#4b5563',
    marginBottom: 3,
  },
  main: {
    width: '70%',
    padding: '24pt 20pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  mainHeader: {
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  title: {
    fontSize: 8.5,
    color: '#6b7280',
    marginTop: 2,
  },
  mainSection: {
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
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
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.5,
    color: '#6b7280',
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
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 7,
    color: '#6b7280',
    marginTop: 1,
  },
});

export function renderPhotoCirclePdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
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
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Photo Circle Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT GRAY SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.photoCircle}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
            )}
          </View>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
            {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
          </View>

          {/* Skills in Sidebar */}
          {validSkills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.sidebarBullet} wrap={false}>• {s.name}</Text>
              ))}
            </View>
          )}

          {/* Languages in Sidebar */}
          {validLanguages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {validLanguages.map((l, i) => (
                <Text key={i} style={styles.sidebarBullet} wrap={false}>• {l.name}</Text>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          <View style={styles.mainHeader}>
            <Text style={styles.name}>{name}</Text>
            {title ? <Text style={styles.title}>{title}</Text> : null}
          </View>

          {summary ? (
            <View style={styles.mainSection} wrap={false}>
              <Text style={styles.mainSectionTitle}>About Me</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Experience</Text>
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

          {validEducation.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Education</Text>
              {validEducation.map((edu, i) => (
                <View key={i} style={styles.eduItem} wrap={false}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduYear}>{edu.year}</Text>
                </View>
              ))}
            </View>
          )}

          {validProjects.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Projects</Text>
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
      </Page>
    </Document>
  );
}
