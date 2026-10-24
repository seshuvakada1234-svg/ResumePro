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
    backgroundColor: '#172554',
    padding: '20pt 14pt',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e3a8a',
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#93c5fd',
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#c8d4e8',
    marginBottom: 4,
  },
  barTrack: {
    height: 3.5,
    backgroundColor: '#1e3a8a',
    borderRadius: 2,
    marginBottom: 5,
  },
  barFill: {
    height: 3.5,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
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
    color: '#93c5fd',
  },
  eduYear: {
    fontSize: 6.8,
    color: '#60a5fa',
    marginTop: 1,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#172554',
  },
  title: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  mainSection: {
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 8,
    lineHeight: 1.45,
    color: '#334155',
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
    color: '#0f172a',
  },
  expDuration: {
    fontSize: 7.5,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  expCompany: {
    fontSize: 7.8,
    color: '#64748b',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.8,
    lineHeight: 1.4,
    color: '#334155',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.5,
    color: '#1e3a8a',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#334155',
    flex: 1,
  },
});

export function renderNavyPdf(data: ResumeData) {
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
    validCertifications,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Navy Pro Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* LEFT NAVY SIDEBAR */}
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

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
            {email ? <Text style={styles.contactItem}>{email}</Text> : null}
            {location ? <Text style={styles.contactItem}>{location}</Text> : null}
            {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
          </View>

          {/* Skills with Progress Bars */}
          {validSkills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {validSkills.map((s, i) => (
                <View key={i} wrap={false} style={{ marginBottom: 3 }}>
                  <Text style={{ fontSize: 7, color: '#ffffff', marginBottom: 1 }}>{s.name}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${s.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

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

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Languages</Text>
              {validLanguages.map((l, i) => (
                <Text key={i} style={styles.contactItem} wrap={false}>{l.name}</Text>
              ))}
            </View>
          )}

          {/* Certifications */}
          {validCertifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Certifications</Text>
              {validCertifications.map((c, i) => (
                <Text key={i} style={styles.contactItem} wrap={false}>{c}</Text>
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
