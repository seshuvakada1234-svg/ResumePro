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
  // --- SIDEBAR (32% width, #4338ca deep indigo) ---
  sidebar: {
    width: '32%',
    backgroundColor: '#3730a3',
    color: '#ffffff',
    padding: '24pt 16pt',
    flexDirection: 'column',
    minHeight: '100%',
  },
  profileBox: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  photoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#7986cb',
    backgroundColor: '#5c6bc0',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sideName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1.2,
  },
  sideTitle: {
    fontSize: 8,
    color: '#e0e7ff',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  sideSection: {
    marginBottom: 16,
  },
  sideSectionHdr: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#5c6bc0',
    paddingBottom: 2.5,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  contactBadge: {
    width: 16,
    height: 16,
    borderRadius: 3.5,
    backgroundColor: '#5c6bc0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBadgeText: {
    fontSize: 7.5,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  contactVal: {
    fontSize: 8.5,
    color: '#ffffff',
    flex: 1,
  },
  // Progress bar
  progressBox: {
    marginBottom: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  progressName: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressPct: {
    fontSize: 7.5,
    color: '#ffffff',
  },
  progressTrack: {
    height: 3.5,
    backgroundColor: '#5c6bc0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  // --- MAIN (68% width, #ffffff) ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '24pt 22pt',
    flexDirection: 'column',
  },
  mainHeader: {
    marginBottom: 16,
  },
  mainName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainProfession: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4f46e5',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginTop: 2,
  },
  indigoBar: {
    width: 48,
    height: 3,
    backgroundColor: '#4f46e5',
    borderRadius: 1.5,
    marginTop: 6,
  },
  // SectionCard style
  card: {
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 6,
    padding: '12pt 14pt',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  cardDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
  },
  cardTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#4f46e5',
  },
  summaryText: {
    fontSize: 8.8,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  expItem: {
    marginBottom: 10,
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expCompany: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginTop: 1,
  },
  durationBadge: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 1.5,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  durationBadgeText: {
    fontSize: 7.2,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  descBlock: {
    borderLeftWidth: 1.5,
    borderLeftColor: '#e5e7eb',
    paddingLeft: 8,
    marginTop: 3,
  },
  descText: {
    fontSize: 8.5,
    color: '#4b5563',
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
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#4f46e5',
    marginTop: 1,
  },
});

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTitleRow}>
        <View style={styles.cardDot} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

export function renderPremiumPdf(data: ResumeData) {
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

  const role = validExperience[0]?.position || title || 'Professional';

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- SIDEBAR --- */}
        <View style={styles.sidebar}>
          <View style={styles.profileBox}>
            <View style={styles.photoWrapper}>
              {photo ? (
                <Image src={photo} style={styles.photoImg} />
              ) : (
                <Text style={styles.photoInitial}>{name ? name.charAt(0) : '?'}</Text>
              )}
            </View>
            <Text style={styles.sideName}>{name}</Text>
            <Text style={styles.sideTitle}>{role}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideSectionHdr}>Contact</Text>
            {email ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>@</Text>
                </View>
                <Text style={styles.contactVal}>{email}</Text>
              </View>
            ) : null}
            {phone ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>P</Text>
                </View>
                <Text style={styles.contactVal}>{phone}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>L</Text>
                </View>
                <Text style={styles.contactVal}>{location}</Text>
              </View>
            ) : null}
          </View>

          {/* Expertise (Skills) */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionHdr}>Expertise</Text>
              {validSkills.slice(0, 5).map((s, idx) => (
                <View key={idx} style={styles.progressBox}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressName}>{s.name}</Text>
                    <Text style={styles.progressPct}>{s.level}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${s.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideSectionHdr}>Languages</Text>
              {validLanguages.map((l, idx) => (
                <View key={idx} style={styles.progressBox}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressName}>{l.name}</Text>
                    <Text style={styles.progressPct}>{l.level}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${l.level}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.main}>
          <View style={styles.mainHeader}>
            <Text style={styles.mainName}>{name}</Text>
            <Text style={styles.mainProfession}>{role}</Text>
            <View style={styles.indigoBar} />
          </View>

          {/* Professional Profile Card */}
          {summary ? (
            <SectionCard title="Professional Profile">
              <Text style={styles.summaryText}>{summary}</Text>
            </SectionCard>
          ) : null}

          {/* Work Experience Card */}
          {validExperience.length > 0 && (
            <SectionCard title="Work Experience">
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.expItem}>
                  <View style={styles.expTopRow}>
                    <View>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      {exp.company ? <Text style={styles.expCompany}>{exp.company}</Text> : null}
                    </View>
                    {exp.duration ? (
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationBadgeText}>{exp.duration}</Text>
                      </View>
                    ) : null}
                  </View>
                  {exp.description ? (
                    <View style={styles.descBlock}>
                      <Text style={styles.descText}>{exp.description}</Text>
                    </View>
                  ) : null}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <View style={styles.descBlock}>
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
            </SectionCard>
          )}

          {/* Projects Card */}
          {validProjects.length > 0 && (
            <SectionCard title="Key Projects">
              {validProjects.map((p, idx) => (
                <View key={idx} style={styles.expItem}>
                  <Text style={styles.expPosition}>{p.name}</Text>
                  {p.description ? (
                    <View style={styles.descBlock}>
                      <Text style={styles.descText}>{p.description}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </SectionCard>
          )}

          {/* Education Card */}
          {validEducation.length > 0 && (
            <SectionCard title="Education">
              {validEducation.map((edu, idx) => (
                <View key={idx} style={styles.eduItem}>
                  <View style={styles.expTopRow}>
                    <View>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                    </View>
                    {edu.year ? (
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationBadgeText}>{edu.year}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              ))}
            </SectionCard>
          )}

          {/* Internships Card */}
          {validInternships.length > 0 && (
            <SectionCard title="Internships">
              {validInternships.map((intn, idx) => (
                <View key={idx} style={styles.expItem}>
                  <View style={styles.expTopRow}>
                    <View>
                      <Text style={styles.expPosition}>{intn.role}</Text>
                      <Text style={styles.expCompany}>{intn.company}</Text>
                    </View>
                    {intn.duration ? (
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationBadgeText}>{intn.duration}</Text>
                      </View>
                    ) : null}
                  </View>
                  {intn.description ? (
                    <View style={styles.descBlock}>
                      <Text style={styles.descText}>{intn.description}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </SectionCard>
          )}

          {/* Achievements Card */}
          {validAchievements.length > 0 && (
            <SectionCard title="Achievements">
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.expItem}>
                  <Text style={styles.expPosition}>{ach.title}</Text>
                  {ach.description ? (
                    <View style={styles.descBlock}>
                      <Text style={styles.descText}>{ach.description}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </SectionCard>
          )}
        </View>
      </Page>
    </Document>
  );
}
