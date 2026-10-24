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
    width: '31%',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoBox: {
    width: '100%',
    height: 125,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.2)',
  },
  redArch: {
    height: 4,
    backgroundColor: '#e8474a',
  },
  sidebarContent: {
    padding: '16pt 14pt',
    flex: 1,
  },
  sidebarSection: {
    marginBottom: 14,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8474a',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#d1d5db',
    marginBottom: 4,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e8474a',
    marginRight: 6,
  },
  skillText: {
    fontSize: 7.5,
    color: '#f3f4f6',
  },
  main: {
    width: '69%',
    padding: '22pt 20pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  mainHeader: {
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  redLine: {
    width: 36,
    height: 3,
    backgroundColor: '#e8474a',
    marginVertical: 4,
  },
  title: {
    fontSize: 8.5,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  sectionBox: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#4b5563',
  },
  expItem: {
    borderLeftWidth: 2,
    borderLeftColor: '#e8474a',
    paddingLeft: 8,
    marginBottom: 8,
  },
  expPosition: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.2,
    color: '#e8474a',
    fontWeight: 'bold',
  },
  expCompany: {
    fontSize: 7.8,
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
    color: '#e8474a',
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
  eduDegree: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eduSchool: {
    fontSize: 7.2,
    color: '#9ca3af',
  },
  eduYear: {
    fontSize: 6.8,
    color: '#e8474a',
    marginTop: 1,
  },
});

export function renderRedlinePdf(data: ResumeData) {
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
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Redline Bold Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT BLACK SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.photoBox}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
            )}
          </View>
          <View style={styles.redArch} />

          <View style={styles.sidebarContent}>
            {/* Contact */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
              {email ? <Text style={styles.contactItem}>{email}</Text> : null}
              {location ? <Text style={styles.contactItem}>{location}</Text> : null}
              {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
            </View>

            {/* Education in Sidebar */}
            {validEducation.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {validEducation.map((edu, i) => (
                  <View key={i} style={styles.eduItem} wrap={false}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduYear}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {validSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                {validSkills.map((s, i) => (
                  <View key={i} style={styles.skillRow} wrap={false}>
                    <View style={styles.redDot} />
                    <Text style={styles.skillText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          <View style={styles.mainHeader}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.redLine} />
            {title ? <Text style={styles.title}>{title}</Text> : null}
          </View>

          {summary ? (
            <View style={styles.sectionBox} wrap={false}>
              <Text style={styles.sectionTitle}>Profile Summary</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {validExperience.map((exp, i) => (
                <View key={i} style={styles.expItem} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 }}>
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
            <View style={styles.sectionBox}>
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
      </Page>
    </Document>
  );
}
