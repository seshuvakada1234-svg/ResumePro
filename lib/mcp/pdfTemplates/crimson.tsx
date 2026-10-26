import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f9f4ef',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  // --- SIDEBAR (29% width, #8b1a2a) ---
  sidebar: {
    width: '29%',
    backgroundColor: '#8b1a2a',
    color: '#ffffff',
    padding: '24pt 14pt',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  photoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#6a1020',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
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
    fontFamily: DEFAULT_SERIF,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nameBox: {
    marginBottom: 16,
  },
  name: {
    fontFamily: DEFAULT_SERIF,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 1.15,
  },
  title: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  sideSection: {
    marginBottom: 14,
  },
  sideTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#ffffff',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 2,
    marginBottom: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  contactIcon: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.55)',
  },
  contactVal: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.85)',
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3.5,
  },
  listBullet: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.45)',
  },
  listText: {
    fontSize: 8.5,
    color: 'rgba(255,255,255,0.85)',
  },
  // --- MAIN (71% width, #f9f4ef) ---
  main: {
    flex: 1,
    backgroundColor: '#f9f4ef',
    padding: '24pt 24pt',
    flexDirection: 'column',
  },
  mainSection: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#8b1a2a',
    marginBottom: 2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#c0a090',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#444444',
    lineHeight: 1.55,
  },
  expItem: {
    marginBottom: 10,
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  expDuration: {
    fontSize: 8,
    color: '#888888',
  },
  expCompany: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#8b1a2a',
    marginTop: 1,
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 8.5,
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
    color: '#8b1a2a',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#555555',
    lineHeight: 1.4,
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eduSchool: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#8b1a2a',
    marginTop: 1,
  },
});

function SectionHeader({ label }: { label: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{label}</Text>
      <View style={styles.sectionDivider} />
    </View>
  );
}

export function renderCrimsonPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    photo,
    summary,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- SIDEBAR --- */}
        <View style={styles.sidebar}>
          <View style={styles.photoContainer}>
            <View style={styles.photoCircle}>
              {photo ? (
                <Image src={photo} style={styles.photoImg} />
              ) : (
                <Text style={styles.photoInitial}>{name ? name.charAt(0) : 'A'}</Text>
              )}
            </View>
          </View>

          <View style={styles.nameBox}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title || 'Professional Title'}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Contact</Text>
            {phone ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>☎</Text>
                <Text style={styles.contactVal}>{phone}</Text>
              </View>
            ) : null}
            {email ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉</Text>
                <Text style={styles.contactVal}>{email}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text style={styles.contactVal}>{location}</Text>
              </View>
            ) : null}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Skills</Text>
              {validSkills.map((s, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.listBullet}>•</Text>
                  <Text style={styles.listText}>{s.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Language</Text>
              {validLanguages.map((l, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.listBullet}>•</Text>
                  <Text style={styles.listText}>{l.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.main}>
          {/* About Me */}
          {summary ? (
            <View style={styles.mainSection}>
              <SectionHeader label="About Me" />
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {/* Work Experience */}
          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHeader label="Work Experience" />
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.expItem}>
                  <View style={styles.expTopRow}>
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
              <SectionHeader label="Projects" />
              {validProjects.map((p, idx) => (
                <View key={idx} style={styles.expItem}>
                  <Text style={styles.expPosition}>{p.name}</Text>
                  {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHeader label="Education" />
              {validEducation.map((edu, idx) => (
                <View key={idx} style={styles.eduItem}>
                  <View style={styles.expTopRow}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    {edu.year ? <Text style={styles.expDuration}>{edu.year}</Text> : null}
                  </View>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHeader label="Internships" />
              {validInternships.map((intn, idx) => (
                <View key={idx} style={styles.expItem}>
                  <View style={styles.expTopRow}>
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
              <SectionHeader label="Achievements" />
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.expItem}>
                  <Text style={styles.expPosition}>{ach.title}</Text>
                  {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
