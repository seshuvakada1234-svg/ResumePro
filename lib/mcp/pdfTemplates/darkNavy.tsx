import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'column',
  },
  topHeader: {
    backgroundColor: '#1a2a4a',
    padding: '16pt 20pt',
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2a3f6a',
    borderWidth: 2,
    borderColor: '#4a6fa5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    overflow: 'hidden',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#a0b8d8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  titleDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#4a6fa5',
    opacity: 0.5,
  },
  bodyGrid: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#162035',
    padding: '16pt 12pt',
    color: '#ffffff',
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 7.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#a0b8d8',
    borderBottomWidth: 1,
    borderBottomColor: '#2a3f6a',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  barTrack: {
    height: 3,
    backgroundColor: '#243656',
    borderRadius: 1.5,
    marginBottom: 5,
  },
  barFill: {
    height: 3,
    backgroundColor: '#4a6fa5',
    borderRadius: 1.5,
  },
  main: {
    width: '68%',
    padding: '16pt 18pt',
    backgroundColor: '#ffffff',
  },
  mainSection: {
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a2a4a',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 1.2,
    borderBottomColor: '#4a6fa5',
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
    color: '#111827',
  },
  expDuration: {
    fontSize: 7.2,
    color: '#4a6fa5',
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
    color: '#4a6fa5',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.8,
    lineHeight: 1.35,
    color: '#334155',
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
    color: '#4a6fa5',
    marginTop: 1,
  },
});

export function renderDarkNavyPdf(data: ResumeData) {
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
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Dark Navy Resume">
      <Page size="A4" style={styles.page} wrap>
        {/* TOP HEADER */}
        <View style={styles.topHeader}>
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
            <View style={styles.titleRow}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              <View style={styles.titleDivider} />
            </View>
          </View>
        </View>

        {/* 2-COLUMN BODY */}
        <View style={styles.bodyGrid}>
          {/* LEFT 32% SIDEBAR */}
          <View style={styles.sidebar}>
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
                  <View key={i} wrap={false} style={{ marginBottom: 3 }}>
                    <Text style={{ fontSize: 7, color: '#ffffff', marginBottom: 1 }}>{s.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${s.level}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {validLanguages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {validLanguages.map((l, i) => (
                  <View key={i} wrap={false} style={{ marginBottom: 3 }}>
                    <Text style={{ fontSize: 7, color: '#ffffff', marginBottom: 1 }}>{l.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${l.level}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT 68% MAIN */}
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
        </View>
      </Page>
    </Document>
  );
}
