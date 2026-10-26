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
  // --- SIDEBAR (33% width, #1a2e5a) ---
  sidebar: {
    width: '33%',
    backgroundColor: '#1a2e5a',
    color: '#ffffff',
    padding: '24pt 16pt',
    flexDirection: 'column',
    minHeight: '100%',
  },
  sideSection: {
    marginBottom: 18,
  },
  sideTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  sideTitleMuted: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#aab8d8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sideDivider: {
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 8.8,
    lineHeight: 1.6,
    color: '#c8d4e8',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  contactIconBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIconText: {
    fontSize: 8,
    color: '#aab8d8',
  },
  contactVal: {
    fontSize: 8.5,
    color: '#c8d4e8',
    flex: 1,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  skillBullet: {
    color: '#6b8dd6',
    fontSize: 8.5,
  },
  skillText: {
    fontSize: 8.5,
    color: '#c8d4e8',
  },
  // --- MAIN (67% width, #ffffff) ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  headerRow: {
    padding: '24pt 24pt 12pt',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameBlock: {
    flex: 1,
    paddingRight: 10,
  },
  firstName: {
    fontSize: 26,
    color: '#1a2e5a',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  lastName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a2e5a',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  roleText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#555555',
    letterSpacing: 1,
    marginTop: 6,
  },
  photoBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1a2e5a',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
  },
  mainBody: {
    padding: '12pt 24pt 24pt',
    flex: 1,
  },
  mainSection: {
    marginBottom: 16,
  },
  navySectionHdr: {
    marginBottom: 8,
  },
  navySectionTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a2e5a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  navySectionLine: {
    height: 1.5,
    backgroundColor: '#1a2e5a',
  },
  // Experience item
  expItem: {
    marginBottom: 11,
  },
  expMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  expPosition: {
    fontSize: 8,
    color: '#888888',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expDuration: {
    fontSize: 8,
    color: '#888888',
    fontWeight: 'bold',
  },
  expCompany: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a2e5a',
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 8.8,
    color: '#555555',
    lineHeight: 1.45,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: '#1a2e5a',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.8,
    color: '#555555',
    lineHeight: 1.4,
    flex: 1,
  },
  // Education item in main
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 9,
  },
  eduSchool: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1a2e5a',
  },
  eduDegree: {
    fontSize: 9,
    color: '#777777',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 8.5,
    color: '#888888',
    fontWeight: 'bold',
  },
});

function NavySectionHdr({ label }: { label: string }) {
  return (
    <View style={styles.navySectionHdr}>
      <Text style={styles.navySectionTitle}>{label}</Text>
      <View style={styles.navySectionLine} />
    </View>
  );
}

export function renderNavyPdf(data: ResumeData) {
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
    lastName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
    validAchievements,
    validInternships,
  } = fields;

  const role = validExperience[0]?.position || title || 'Professional';

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- SIDEBAR (Summary, Contact, Skills, Languages) --- */}
        <View style={styles.sidebar}>
          {summary ? (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitleMuted}>About Me</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Contact</Text>
            <View style={styles.sideDivider} />
            {phone ? (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBadge}>
                  <Text style={styles.contactIconText}>P</Text>
                </View>
                <Text style={styles.contactVal}>{phone}</Text>
              </View>
            ) : null}
            {email ? (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBadge}>
                  <Text style={styles.contactIconText}>@</Text>
                </View>
                <Text style={styles.contactVal}>{email}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBadge}>
                  <Text style={styles.contactIconText}>L</Text>
                </View>
                <Text style={styles.contactVal}>{location}</Text>
              </View>
            ) : null}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Skills</Text>
              <View style={styles.sideDivider} />
              {validSkills.map((s, idx) => (
                <View key={idx} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{s.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Language</Text>
              <View style={styles.sideDivider} />
              {validLanguages.map((l, idx) => (
                <View key={idx} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{l.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* --- MAIN (Header + Experience + Education) --- */}
        <View style={styles.main}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.nameBlock}>
              <Text style={styles.firstName}>{firstName}</Text>
              <Text style={styles.lastName}>{lastName || firstName}</Text>
              <Text style={styles.roleText}>{role}</Text>
            </View>
            <View style={styles.photoBox}>
              {photo ? (
                <Image src={photo} style={styles.photoImg} />
              ) : (
                <Text style={styles.photoInitial}>{name ? name.charAt(0) : '?'}</Text>
              )}
            </View>
          </View>

          {/* Body */}
          <View style={styles.mainBody}>
            {/* Experience */}
            {validExperience.length > 0 && (
              <View style={styles.mainSection}>
                <NavySectionHdr label="Experience" />
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expMetaRow}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      {exp.duration ? <Text style={styles.expDuration}>{exp.duration}</Text> : null}
                    </View>
                    <Text style={styles.expCompany}>{exp.company}</Text>
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

            {/* Projects */}
            {validProjects.length > 0 && (
              <View style={styles.mainSection}>
                <NavySectionHdr label="Projects" />
                {validProjects.map((p, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expCompany}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {validEducation.length > 0 && (
              <View style={styles.mainSection}>
                <NavySectionHdr label="Education" />
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduRow}>
                    <View>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                    </View>
                    {edu.year ? <Text style={styles.eduYear}>{edu.year}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {validInternships.length > 0 && (
              <View style={styles.mainSection}>
                <NavySectionHdr label="Internships" />
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expMetaRow}>
                      <Text style={styles.expPosition}>{intn.role}</Text>
                      {intn.duration ? <Text style={styles.expDuration}>{intn.duration}</Text> : null}
                    </View>
                    <Text style={styles.expCompany}>{intn.company}</Text>
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {validAchievements.length > 0 && (
              <View style={styles.mainSection}>
                <NavySectionHdr label="Achievements" />
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expCompany}>{ach.title}</Text>
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
