import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    width: '33%',
    backgroundColor: '#2b2b2b',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoBox: {
    width: '100%',
    height: 140,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.2)',
  },
  sidebarContent: {
    padding: '16pt 14pt',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1.15,
  },
  title: {
    fontSize: 7.5,
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#ffffff',
    borderBottomWidth: 0.8,
    borderBottomColor: '#555555',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#cccccc',
    marginBottom: 3.5,
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
    color: '#aaaaaa',
  },
  eduYear: {
    fontSize: 6.8,
    color: '#888888',
    marginTop: 1,
  },
  skillItem: {
    fontSize: 7.5,
    color: '#dddddd',
    marginBottom: 2.5,
  },
  main: {
    width: '67%',
    padding: '24pt 20pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
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
    borderBottomColor: '#2b2b2b',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#374151',
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
    color: '#374151',
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

export function renderSerifPdf(data: ResumeData) {
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
    lastName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Serif Classic Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT CHARCOAL SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.photoBox}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
            )}
          </View>

          <View style={styles.sidebarContent}>
            <Text style={styles.name}>{firstName}</Text>
            {lastName ? <Text style={styles.name}>{lastName}</Text> : null}
            {title ? <Text style={styles.title}>{title}</Text> : null}

            {/* Contact */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Contact</Text>
              {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
              {email ? <Text style={styles.contactItem}>{email}</Text> : null}
              {location ? <Text style={styles.contactItem}>{location}</Text> : null}
              {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
            </View>

            {/* Education in Sidebar */}
            {validEducation.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Education</Text>
                {validEducation.map((edu, i) => (
                  <View key={i} style={styles.eduItem} wrap={false}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduYear}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills in Sidebar */}
            {validSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                {validSkills.map((s, i) => (
                  <Text key={i} style={styles.skillItem} wrap={false}>• {s.name}</Text>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
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
