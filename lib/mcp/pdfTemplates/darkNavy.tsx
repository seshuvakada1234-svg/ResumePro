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
  // --- HEADER (#1a2a4a) ---
  header: {
    backgroundColor: '#1a2a4a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '18pt 24pt',
    gap: 16,
  },
  photoContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    borderColor: '#4a6fa5',
    backgroundColor: '#2a3f6a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoInitial: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  titleText: {
    color: '#a0b8d8',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#a0b8d8',
    opacity: 0.4,
  },
  // --- BODY (Sidebar + Main) ---
  bodyRow: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '27%',
    backgroundColor: '#1a2a4a',
    padding: '16pt 12pt',
    flexDirection: 'column',
    gap: 14,
  },
  sideSection: {
    marginBottom: 6,
  },
  sideTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    paddingBottom: 2.5,
    marginBottom: 7,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  contactBubble: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2a3f6a',
    borderWidth: 1,
    borderColor: '#4a6fa5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBubbleText: {
    fontSize: 7.5,
    color: '#c0d0e8',
  },
  contactVal: {
    fontSize: 8,
    color: '#c0d0e8',
    flex: 1,
  },
  skillItem: {
    marginBottom: 6,
  },
  skillLabel: {
    fontSize: 7.8,
    color: '#c0d0e8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  barTrack: {
    height: 4,
    backgroundColor: '#2a3f6a',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4a8fe8',
    borderRadius: 2,
  },
  // --- MAIN CONTENT ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '18pt 20pt',
    flexDirection: 'column',
  },
  mainSection: {
    marginBottom: 16,
  },
  // Ribbon section header
  ribbonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 9,
  },
  ribbonBadge: {
    backgroundColor: '#1a2a4a',
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  ribbonText: {
    color: '#ffffff',
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  ribbonLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1a2a4a',
    opacity: 0.2,
  },
  ribbonDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1a2a4a',
  },
  summaryText: {
    fontSize: 8.8,
    color: '#555555',
    lineHeight: 1.55,
  },
  // Timeline items with left date column
  gridItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 11,
  },
  dateCol: {
    width: 44,
    paddingTop: 1,
  },
  dateText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#4a8fe8',
    textAlign: 'right',
  },
  dividerCol: {
    width: 1,
    backgroundColor: '#d0d8e8',
  },
  contentCol: {
    flex: 1,
  },
  posText: {
    fontSize: 9.8,
    fontWeight: 'bold',
    color: '#1a2a4a',
  },
  compText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#4a8fe8',
    marginTop: 1,
  },
  descText: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.45,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: '#4a8fe8',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.4,
    flex: 1,
  },
});

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.ribbonRow}>
      <View style={styles.ribbonBadge}>
        <Text style={styles.ribbonText}>{label}</Text>
      </View>
      <View style={styles.ribbonLine} />
      <View style={styles.ribbonDot} />
    </View>
  );
}

export function renderDarkNavyPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    website,
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
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View style={styles.photoContainer}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoInitial}>{name ? name.charAt(0) : 'A'}</Text>
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>{title || 'Professional Title'}</Text>
              <View style={styles.titleLine} />
            </View>
          </View>
        </View>

        {/* --- BODY ROW --- */}
        <View style={styles.bodyRow}>
          {/* SIDEBAR */}
          <View style={styles.sidebar}>
            {/* Contact */}
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Contact</Text>
              {phone ? (
                <View style={styles.contactItem}>
                  <View style={styles.contactBubble}>
                    <Text style={styles.contactBubbleText}>P</Text>
                  </View>
                  <Text style={styles.contactVal}>{phone}</Text>
                </View>
              ) : null}
              {email ? (
                <View style={styles.contactItem}>
                  <View style={styles.contactBubble}>
                    <Text style={styles.contactBubbleText}>@</Text>
                  </View>
                  <Text style={styles.contactVal}>{email}</Text>
                </View>
              ) : null}
              {location ? (
                <View style={styles.contactItem}>
                  <View style={styles.contactBubble}>
                    <Text style={styles.contactBubbleText}>L</Text>
                  </View>
                  <Text style={styles.contactVal}>{location}</Text>
                </View>
              ) : null}
              {website ? (
                <View style={styles.contactItem}>
                  <View style={styles.contactBubble}>
                    <Text style={styles.contactBubbleText}>W</Text>
                  </View>
                  <Text style={styles.contactVal}>{website}</Text>
                </View>
              ) : null}
            </View>

            {/* Skills */}
            {validSkills.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={styles.sideTitle}>Skills</Text>
                {validSkills.map((s, idx) => (
                  <View key={idx} style={styles.skillItem}>
                    <Text style={styles.skillLabel}>{s.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${s.level}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {validLanguages.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={styles.sideTitle}>Language</Text>
                {validLanguages.map((l, idx) => (
                  <View key={idx} style={styles.skillItem}>
                    <Text style={styles.skillLabel}>{l.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, { width: `${l.level}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* MAIN CONTENT */}
          <View style={styles.main}>
            {/* Profile */}
            {summary ? (
              <View style={styles.mainSection}>
                <SectionHeader label="Profile" />
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {/* Experience */}
            {validExperience.length > 0 && (
              <View style={styles.mainSection}>
                <SectionHeader label="Experience" />
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.dateCol}>
                      <Text style={styles.dateText}>{exp.duration || exp.startDate || ''}</Text>
                    </View>
                    <View style={styles.dividerCol} />
                    <View style={styles.contentCol}>
                      <Text style={styles.posText}>{exp.position}</Text>
                      {exp.company ? <Text style={styles.compText}>{exp.company}</Text> : null}
                      {exp.description ? <Text style={styles.descText}>{exp.description}</Text> : null}
                      {exp.bullets &&
                        exp.bullets.map((b, bi) => (
                          <View key={bi} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>{b}</Text>
                          </View>
                        ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {validProjects.length > 0 && (
              <View style={styles.mainSection}>
                <SectionHeader label="Projects" />
                {validProjects.map((p, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.dateCol}>
                      <Text style={styles.dateText}>Project</Text>
                    </View>
                    <View style={styles.dividerCol} />
                    <View style={styles.contentCol}>
                      <Text style={styles.posText}>{p.name}</Text>
                      {p.description ? <Text style={styles.descText}>{p.description}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {validEducation.length > 0 && (
              <View style={styles.mainSection}>
                <SectionHeader label="Education" />
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.dateCol}>
                      <Text style={styles.dateText}>{edu.year || ''}</Text>
                    </View>
                    <View style={styles.dividerCol} />
                    <View style={styles.contentCol}>
                      <Text style={styles.posText}>{edu.school}</Text>
                      {edu.degree ? <Text style={styles.compText}>{edu.degree}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {validInternships.length > 0 && (
              <View style={styles.mainSection}>
                <SectionHeader label="Internships" />
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.dateCol}>
                      <Text style={styles.dateText}>{intn.duration || ''}</Text>
                    </View>
                    <View style={styles.dividerCol} />
                    <View style={styles.contentCol}>
                      <Text style={styles.posText}>{intn.role}</Text>
                      {intn.company ? <Text style={styles.compText}>{intn.company}</Text> : null}
                      {intn.description ? <Text style={styles.descText}>{intn.description}</Text> : null}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {validAchievements.length > 0 && (
              <View style={styles.mainSection}>
                <SectionHeader label="Achievements" />
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.gridItem}>
                    <View style={styles.dateCol}>
                      <Text style={styles.dateText}>Award</Text>
                    </View>
                    <View style={styles.dividerCol} />
                    <View style={styles.contentCol}>
                      <Text style={styles.posText}>{ach.title}</Text>
                      {ach.description ? <Text style={styles.descText}>{ach.description}</Text> : null}
                    </View>
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
