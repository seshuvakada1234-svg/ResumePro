import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f9f4ef',
    fontFamily: DEFAULT_SERIF,
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#8b1a2a',
    padding: '20pt 14pt',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6a1020',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  title: {
    fontSize: 7.5,
    color: '#fca5a5',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 14,
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 3.5,
  },
  skillBullet: {
    fontSize: 7.5,
    color: '#ffffff',
    marginBottom: 3,
  },
  main: {
    width: '70%',
    padding: '24pt 20pt',
    backgroundColor: '#f9f4ef',
    flexDirection: 'column',
  },
  mainSection: {
    marginBottom: 13,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#8b1a2a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: '#8b1a2a',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#4a4036',
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
    color: '#8b1a2a',
  },
  expDuration: {
    fontSize: 7.5,
    fontStyle: 'italic',
    color: '#78716c',
  },
  expCompany: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#292524',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.8,
    lineHeight: 1.4,
    color: '#57534e',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#8b1a2a',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#57534e',
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#292524',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#57534e',
  },
  eduYear: {
    fontSize: 7,
    fontStyle: 'italic',
    color: '#78716c',
    marginTop: 1,
  },
});

export function renderCrimsonPdf(data: ResumeData) {
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
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Crimson Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT CRIMSON SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              {photo ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={photo} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
              )}
            </View>
          </View>

          <Text style={styles.name}>{name}</Text>
          {title ? <Text style={styles.title}>{title}</Text> : null}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
            {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {validSkills.map((s, i) => (
                <Text key={i} style={styles.skillBullet} wrap={false}>• {s.name}</Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {validLanguages.map((l, i) => (
                <Text key={i} style={styles.skillBullet} wrap={false}>• {l.name}</Text>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT WARM CREAM MAIN */}
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
