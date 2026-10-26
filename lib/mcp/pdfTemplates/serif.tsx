import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: 0,
    flexDirection: 'row',
  },
  // --- SIDEBAR (33% width, #2b2b2b) ---
  sidebar: {
    width: '33%',
    backgroundColor: '#2b2b2b',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.15)',
  },
  sidebarContent: {
    padding: '18pt 16pt 24pt',
    flex: 1,
  },
  nameBox: {
    marginBottom: 16,
  },
  sideName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1.15,
  },
  sideProfession: {
    fontSize: 8.5,
    color: '#aaaaaa',
    fontFamily: DEFAULT_SANS,
    letterSpacing: 1,
    marginTop: 4,
  },
  sideSection: {
    marginBottom: 16,
    fontFamily: DEFAULT_SANS,
  },
  sideHdr: {
    fontFamily: DEFAULT_SERIF,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  sideWhiteBar: {
    width: 20,
    height: 1.5,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  contactItem: {
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 7.5,
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contactVal: {
    fontSize: 8.5,
    color: '#dddddd',
  },
  // Progress bar row
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  progressName: {
    fontSize: 8,
    color: '#cccccc',
    width: 55,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFillWhite: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressPercent: {
    fontSize: 7.5,
    color: '#888888',
    width: 22,
    textAlign: 'right',
  },
  // --- MAIN CONTENT (67% width, #ffffff) ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '26pt 24pt',
    flexDirection: 'column',
  },
  mainSection: {
    marginBottom: 18,
  },
  mainHdr: {
    fontFamily: DEFAULT_SERIF,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  mainCharcoalBar: {
    width: 24,
    height: 2.5,
    backgroundColor: '#2b2b2b',
    marginBottom: 10,
  },
  summaryText: {
    fontFamily: DEFAULT_SANS,
    fontSize: 9,
    lineHeight: 1.6,
    color: '#555555',
  },
  // 2-column grid item (Left: 110pt, Right: 1fr)
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    fontFamily: DEFAULT_SANS,
  },
  gridLeft: {
    width: 105,
  },
  jobPos: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#333333',
  },
  jobDur: {
    fontSize: 8,
    color: '#888888',
    marginTop: 1,
  },
  jobComp: {
    fontSize: 8.5,
    color: '#888888',
    marginTop: 0.5,
  },
  gridRight: {
    flex: 1,
  },
  jobDesc: {
    fontSize: 8.8,
    color: '#666666',
    lineHeight: 1.5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    fontSize: 8.5,
    color: '#2b2b2b',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.8,
    color: '#555555',
    lineHeight: 1.4,
    flex: 1,
  },
  // Expertise 2-column grid
  expertiseWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: DEFAULT_SANS,
  },
  expertiseItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8,
    marginBottom: 5,
  },
  expertiseName: {
    fontSize: 8,
    color: '#444444',
    width: 55,
  },
  expertiseTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  expertiseFill: {
    height: '100%',
    backgroundColor: '#2b2b2b',
    borderRadius: 2,
  },
  expertisePct: {
    fontSize: 7.5,
    color: '#888888',
    width: 20,
    textAlign: 'right',
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
          <View style={styles.photoBox}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoInitial}>{name ? name.charAt(0) : '?'}</Text>
            )}
          </View>
          <View style={styles.sidebarContent}>
            <View style={styles.nameBox}>
              <Text style={styles.sideName}>{firstName}</Text>
              <Text style={styles.sideName}>{lastName || ''}</Text>
              <Text style={styles.sideProfession}>{role}</Text>
            </View>

            {/* Contact */}
            <View style={styles.sideSection}>
              <Text style={styles.sideHdr}>Contact</Text>
              <View style={styles.sideWhiteBar} />
              {email ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text style={styles.contactVal}>{email}</Text>
                </View>
              ) : null}
              {phone ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactVal}>{phone}</Text>
                </View>
              ) : null}
              {location ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactLabel}>Address:</Text>
                  <Text style={styles.contactVal}>{location}</Text>
                </View>
              ) : null}
            </View>

            {/* Languages */}
            {validLanguages.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={styles.sideHdr}>Languages</Text>
                <View style={styles.sideWhiteBar} />
                {validLanguages.map((l, idx) => (
                  <View key={idx} style={styles.progressRow}>
                    <Text style={styles.progressName}>{l.name}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFillWhite, { width: `${l.level}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {validSkills.length > 0 && (
              <View style={styles.sideSection}>
                <Text style={styles.sideHdr}>Skills</Text>
                <View style={styles.sideWhiteBar} />
                {validSkills.slice(0, 5).map((s, idx) => (
                  <View key={idx} style={styles.progressRow}>
                    <Text style={styles.progressName}>{s.name}</Text>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFillWhite, { width: `${s.level}%` }]} />
                    </View>
                    <Text style={styles.progressPercent}>{s.level}%</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* --- MAIN --- */}
        <View style={styles.main}>
          {/* Profile */}
          {summary ? (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Profile</Text>
              <View style={styles.mainCharcoalBar} />
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Experience</Text>
              <View style={styles.mainCharcoalBar} />
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.gridRow}>
                  <View style={styles.gridLeft}>
                    <Text style={styles.jobPos}>{exp.position}</Text>
                    {exp.duration ? <Text style={styles.jobDur}>{exp.duration}</Text> : null}
                    {exp.company ? <Text style={styles.jobComp}>{exp.company}</Text> : null}
                  </View>
                  <View style={styles.gridRight}>
                    {exp.description ? <Text style={styles.jobDesc}>{exp.description}</Text> : null}
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
              <Text style={styles.mainHdr}>Projects</Text>
              <View style={styles.mainCharcoalBar} />
              {validProjects.map((p, idx) => (
                <View key={idx} style={styles.gridRow}>
                  <View style={styles.gridLeft}>
                    <Text style={styles.jobPos}>{p.name}</Text>
                  </View>
                  <View style={styles.gridRight}>
                    {p.description ? <Text style={styles.jobDesc}>{p.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Education</Text>
              <View style={styles.mainCharcoalBar} />
              {validEducation.map((edu, idx) => (
                <View key={idx} style={styles.gridRow}>
                  <View style={styles.gridLeft}>
                    <Text style={styles.jobPos}>{edu.school}</Text>
                    {edu.year ? <Text style={styles.jobDur}>{edu.year}</Text> : null}
                  </View>
                  <View style={styles.gridRight}>
                    <Text style={styles.jobDesc}>{edu.degree}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Expertise */}
          {validSkills.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Expertise</Text>
              <View style={styles.mainCharcoalBar} />
              <View style={styles.expertiseWrap}>
                {validSkills.map((s, idx) => (
                  <View key={idx} style={styles.expertiseItem}>
                    <Text style={styles.expertiseName}>{s.name}</Text>
                    <View style={styles.expertiseTrack}>
                      <View style={[styles.expertiseFill, { width: `${s.level}%` }]} />
                    </View>
                    <Text style={styles.expertisePct}>{s.level}%</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Internships</Text>
              <View style={styles.mainCharcoalBar} />
              {validInternships.map((intn, idx) => (
                <View key={idx} style={styles.gridRow}>
                  <View style={styles.gridLeft}>
                    <Text style={styles.jobPos}>{intn.role}</Text>
                    {intn.duration ? <Text style={styles.jobDur}>{intn.duration}</Text> : null}
                    {intn.company ? <Text style={styles.jobComp}>{intn.company}</Text> : null}
                  </View>
                  <View style={styles.gridRight}>
                    {intn.description ? <Text style={styles.jobDesc}>{intn.description}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainHdr}>Achievements</Text>
              <View style={styles.mainCharcoalBar} />
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.gridRow}>
                  <View style={styles.gridLeft}>
                    <Text style={styles.jobPos}>{ach.title}</Text>
                  </View>
                  <View style={styles.gridRight}>
                    {ach.description ? <Text style={styles.jobDesc}>{ach.description}</Text> : null}
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
