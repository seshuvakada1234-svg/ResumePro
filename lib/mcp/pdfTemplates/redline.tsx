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
  // --- SIDEBAR (30% width, #1a1a1a) ---
  sidebar: {
    width: '30%',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#111111',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.15)',
  },
  redArch: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#e8474a',
  },
  sidebarContent: {
    padding: '14pt 16pt 20pt',
    flex: 1,
  },
  sideSection: {
    marginBottom: 16,
  },
  sideHdrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sideHdrCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#e8474a',
  },
  sideHdrTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#e8474a',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
  sideDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  barItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  barName: {
    fontSize: 8,
    color: '#cccccc',
    width: 60,
  },
  barTrack: {
    flex: 1,
    height: 3.5,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFillRed: {
    height: '100%',
    backgroundColor: '#e8474a',
    borderRadius: 2,
  },
  barFillGray: {
    height: '100%',
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  barPercent: {
    fontSize: 7.5,
    color: '#888888',
    width: 22,
    textAlign: 'right',
  },
  contactItem: {
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#e8474a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 1,
  },
  contactVal: {
    fontSize: 8.5,
    color: '#cccccc',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eduDegree: {
    fontSize: 8,
    color: '#aaaaaa',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 7.5,
    color: '#666666',
    marginTop: 1,
  },
  // --- MAIN (70% width, #ffffff) ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '24pt 22pt',
    flexDirection: 'column',
  },
  nameHeader: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  firstName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e8474a',
  },
  lastName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  roleText: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#888888',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  headerLine: {
    height: 1.5,
    backgroundColor: '#e8e8e8',
    marginVertical: 8,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#777777',
    lineHeight: 1.6,
  },
  mainSection: {
    marginBottom: 16,
  },
  // Section Header: 20pt red circle with white dot
  sectionHdrBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  circleRed: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e8474a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInnerWhite: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  sectionHdrTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  sectionHdrLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e8e8e8',
  },
  // Timeline Row (Left date, vertical line with red dot, right content)
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  dateCol: {
    width: 60,
    paddingRight: 10,
    paddingTop: 1,
  },
  dateText: {
    fontSize: 8,
    color: '#999999',
    textAlign: 'right',
  },
  timelineRight: {
    flex: 1,
    borderLeftWidth: 1.5,
    borderLeftColor: '#e8e8e8',
    paddingLeft: 12,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -4,
    top: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e8474a',
  },
  expPosition: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#e8474a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expCompany: {
    fontSize: 9,
    color: '#555555',
    marginVertical: 1,
  },
  expDesc: {
    fontSize: 8.5,
    color: '#777777',
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
    color: '#e8474a',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#666666',
    lineHeight: 1.4,
    flex: 1,
  },
});

function SectionHdr({ label }: { label: string }) {
  return (
    <View style={styles.sectionHdrBox}>
      <View style={styles.circleRed}>
        <View style={styles.circleInnerWhite} />
      </View>
      <Text style={styles.sectionHdrTitle}>{label}</Text>
      <View style={styles.sectionHdrLine} />
    </View>
  );
}

export function renderRedlinePdf(data: ResumeData) {
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
        {/* --- SIDEBAR --- */}
        <View style={styles.sidebar}>
          {/* Photo */}
          <View style={styles.photoContainer}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoInitial}>{name ? name.charAt(0) : '?'}</Text>
            )}
            <View style={styles.redArch} />
          </View>

          <View style={styles.sidebarContent}>
            {/* Work Skills */}
            {validSkills.length > 0 && (
              <View style={styles.sideSection}>
                <View style={styles.sideHdrRow}>
                  <View style={styles.sideHdrCircle} />
                  <Text style={styles.sideHdrTitle}>Work Skills</Text>
                </View>
                <View style={styles.sideDivider} />
                {validSkills.map((s, idx) => (
                  <View key={idx} style={styles.barItem}>
                    <Text style={styles.barName}>{s.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFillRed, { width: `${s.level}%` }]} />
                    </View>
                    <Text style={styles.barPercent}>{s.level}%</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {validLanguages.length > 0 && (
              <View style={styles.sideSection}>
                <View style={styles.sideHdrRow}>
                  <View style={styles.sideHdrCircle} />
                  <Text style={styles.sideHdrTitle}>Languages</Text>
                </View>
                <View style={styles.sideDivider} />
                {validLanguages.map((l, idx) => (
                  <View key={idx} style={styles.barItem}>
                    <Text style={styles.barName}>{l.name}</Text>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFillGray, { width: `${l.level}%` }]} />
                    </View>
                    <Text style={styles.barPercent}>{l.level}%</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Contact */}
            <View style={styles.sideSection}>
              <View style={styles.sideHdrRow}>
                <View style={styles.sideHdrCircle} />
                <Text style={styles.sideHdrTitle}>Contact</Text>
              </View>
              <View style={styles.sideDivider} />
              {phone ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactVal}>{phone}</Text>
                </View>
              ) : null}
              {email ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text style={styles.contactVal}>{email}</Text>
                </View>
              ) : null}
              {location ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Address:</Text>
                  <Text style={styles.contactVal}>{location}</Text>
                </View>
              ) : null}
            </View>

            {/* Education in sidebar */}
            {validEducation.length > 0 && (
              <View style={styles.sideSection}>
                <View style={styles.sideHdrRow}>
                  <View style={styles.sideHdrCircle} />
                  <Text style={styles.sideHdrTitle}>Education</Text>
                </View>
                <View style={styles.sideDivider} />
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduItem}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    {edu.year ? <Text style={styles.eduYear}>{edu.year}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* --- MAIN --- */}
        <View style={styles.main}>
          {/* Header */}
          <View style={styles.nameHeader}>
            <View style={styles.nameRow}>
              <Text style={styles.firstName}>{firstName} </Text>
              <Text style={styles.lastName}>{lastName || ''}</Text>
            </View>
            <Text style={styles.roleText}>{role}</Text>
            <View style={styles.headerLine} />
            {summary ? <Text style={styles.summaryText}>{summary}</Text> : null}
          </View>

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHdr label="Work Experience" />
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <View style={styles.dateCol}>
                    <Text style={styles.dateText}>{exp.duration || exp.startDate || ''}</Text>
                  </View>
                  <View style={styles.timelineRight}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    {exp.company ? <Text style={styles.expCompany}>{exp.company}</Text> : null}
                    {exp.description ? <Text style={styles.expDesc}>{exp.description}</Text> : null}
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
              <SectionHdr label="Projects" />
              {validProjects.map((p, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <View style={styles.dateCol}>
                    <Text style={styles.dateText}>Project</Text>
                  </View>
                  <View style={styles.timelineRight}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.expPosition}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHdr label="Internships" />
              {validInternships.map((intn, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <View style={styles.dateCol}>
                    <Text style={styles.dateText}>{intn.duration || ''}</Text>
                  </View>
                  <View style={styles.timelineRight}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.expPosition}>{intn.role}</Text>
                    {intn.company ? <Text style={styles.expCompany}>{intn.company}</Text> : null}
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.mainSection}>
              <SectionHdr label="Achievements" />
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <View style={styles.dateCol}>
                    <Text style={styles.dateText}>Award</Text>
                  </View>
                  <View style={styles.timelineRight}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.expPosition}>{ach.title}</Text>
                    {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
