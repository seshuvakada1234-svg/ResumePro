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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e5de',
  },
  photoBox: {
    width: 100,
    height: 75,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    padding: '14pt 18pt',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1a1a1a',
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#b45309',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  bodyGrid: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#faf8f5',
    padding: '16pt 12pt',
    borderRightWidth: 1,
    borderRightColor: '#e8e5de',
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 7.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#b45309',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    fontSize: 7.2,
    color: '#4b5563',
    marginBottom: 4,
  },
  skillRow: {
    marginBottom: 5,
  },
  skillName: {
    fontSize: 7.2,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  filledDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1a1a1a',
  },
  emptyDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#d1d5db',
  },
  main: {
    width: '70%',
    padding: '16pt 18pt',
    backgroundColor: '#ffffff',
  },
  mainSection: {
    marginBottom: 12,
  },
  mainSectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#b45309',
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
    color: '#1a1a1a',
  },
  expDuration: {
    fontSize: 7.2,
    color: '#b45309',
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
    color: '#b45309',
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
    color: '#1a1a1a',
  },
  eduDegree: {
    fontSize: 7.8,
    color: '#4b5563',
  },
  eduYear: {
    fontSize: 7,
    color: '#b45309',
    marginTop: 1,
  },
});

function DotsRating({ level }: { level: number }) {
  // normalize level 0-100 to 1-5 dots
  const dotsCount = Math.max(1, Math.min(5, Math.round((level / 100) * 5)));
  return (
    <View style={styles.dotsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <View key={i} style={i <= dotsCount ? styles.filledDot : styles.emptyDot} />
      ))}
    </View>
  );
}

export function renderLuxuryGoldPdf(data: ResumeData) {
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
    validAchievements,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="Luxury Gold Resume">
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
            {title ? <Text style={styles.title}>{title}</Text> : null}
          </View>
        </View>

        {/* 2-COLUMN BODY */}
        <View style={styles.bodyGrid}>
          {/* LEFT 30% SIDEBAR */}
          <View style={styles.sidebar}>
            {/* Contact */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Contact</Text>
              {phone ? <Text style={styles.contactItem}>{phone}</Text> : null}
              {email ? <Text style={styles.contactItem}>{email}</Text> : null}
              {location ? <Text style={styles.contactItem}>{location}</Text> : null}
              {linkedin ? <Text style={styles.contactItem}>{linkedin.replace('https://', '')}</Text> : null}
            </View>

            {/* Skills with 5-dot ratings */}
            {validSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                {validSkills.map((s, i) => (
                  <View key={i} style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillName}>{s.name}</Text>
                    <DotsRating level={s.level} />
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {validLanguages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {validLanguages.map((l, i) => (
                  <View key={i} style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillName}>{l.name}</Text>
                    <DotsRating level={l.level} />
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT 70% MAIN */}
          <View style={styles.main}>
            {summary ? (
              <View style={styles.mainSection} wrap={false}>
                <Text style={styles.mainSectionTitle}>Executive Profile</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {validExperience.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Career Experience</Text>
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
                <Text style={styles.mainSectionTitle}>Key Projects</Text>
                {validProjects.map((proj, i) => (
                  <View key={i} style={styles.expItem} wrap={false}>
                    <Text style={styles.expPosition}>{proj.name}</Text>
                    {proj.technologies ? <Text style={styles.expCompany}>{proj.technologies}</Text> : null}
                    {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {validAchievements.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.mainSectionTitle}>Achievements</Text>
                {validAchievements.map((ach, i) => (
                  <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                    <Text style={styles.expPosition}>{ach.title} {ach.organization ? `— ${ach.organization}` : ''}</Text>
                    {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
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
