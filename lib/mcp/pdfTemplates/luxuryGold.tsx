import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'column',
  },
  // --- HEADER (3 columns: Photo 220pt / Name & Title / Contact) ---
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e5de',
    minHeight: 140,
  },
  photoCol: {
    width: 170, // proportional to 220px / 794px
    height: 140,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nameCol: {
    flex: 1,
    padding: '20pt 18pt',
    justifyContent: 'center',
  },
  firstName: {
    fontSize: 16,
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 2,
  },
  lastName: {
    fontFamily: DEFAULT_SERIF,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
    lineHeight: 1.05,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  titleBar: {
    width: 2.5,
    height: 12,
    backgroundColor: '#1a1a1a',
  },
  titleText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#444444',
  },
  contactCol: {
    width: 170,
    padding: '18pt 14pt',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#e8e5de',
    backgroundColor: '#fafaf8',
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 4,
    gap: 4,
  },
  contactLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
    width: 12,
  },
  contactVal: {
    fontSize: 7.8,
    color: '#444444',
    flex: 1,
  },
  // --- SUMMARY ROW (Left empty #fafaf8, Right text) ---
  summaryRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e5de',
  },
  summaryLeftSpacer: {
    width: 170,
    backgroundColor: '#fafaf8',
  },
  summaryRight: {
    flex: 1,
    padding: '14pt 18pt',
  },
  summaryText: {
    fontSize: 8.5,
    color: '#444444',
    lineHeight: 1.5,
  },
  // --- BODY (Left Sidebar 170pt, Right Main Content) ---
  bodyGrid: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 170,
    backgroundColor: '#fafaf8',
    padding: '16pt 14pt',
    borderRightWidth: 1,
    borderRightColor: '#e8e5de',
  },
  sectionTitleBox: {
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#E8B84B',
    paddingBottom: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1a1a1a',
  },
  sidebarSection: {
    marginBottom: 16,
  },
  skillListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3.5,
    gap: 4,
  },
  goldBullet: {
    fontSize: 9,
    color: '#E8B84B',
  },
  skillListText: {
    fontSize: 8,
    color: '#444444',
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eduSchool: {
    fontSize: 7.8,
    color: '#444444',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 7.2,
    color: '#888888',
    marginTop: 1,
  },
  mainContent: {
    flex: 1,
    padding: '16pt 18pt',
  },
  mainSection: {
    marginBottom: 16,
  },
  jobItem: {
    marginBottom: 12,
  },
  jobPosition: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  jobMeta: {
    fontSize: 8,
    color: '#888888',
    fontStyle: 'italic',
    marginTop: 1.5,
    marginBottom: 4,
  },
  jobCompany: {
    color: '#444444',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  jobDesc: {
    fontSize: 8,
    color: '#444444',
    lineHeight: 1.45,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
    gap: 4,
  },
  bulletText: {
    fontSize: 8,
    color: '#444444',
    lineHeight: 1.35,
    flex: 1,
  },
  // --- FOOTER (4 columns with Skill Metric Dots) ---
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e8e5de',
    backgroundColor: '#fafaf8',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  footerCol: {
    flex: 1,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: '#e8e5de',
  },
  footerColLast: {
    flex: 1,
    paddingHorizontal: 6,
  },
  footerTitle: {
    fontSize: 6.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: '#1a1a1a',
    marginBottom: 6,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  metricName: {
    fontSize: 7.2,
    color: '#444444',
    flex: 1,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 2.5,
  },
  dotFilled: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: '#1a1a1a',
  },
  dotEmpty: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: '#d1d5db',
  },
});

function SkillDots({ level }: { level: number }) {
  // 1 to 5 dots
  const activeCount = Math.max(1, Math.min(5, Math.round(level <= 5 ? level : (level / 100) * 5)));
  return (
    <View style={styles.dotsRow}>
      {[1, 2, 3, 4, 5].map((idx) => (
        <View key={idx} style={idx <= activeCount ? styles.dotFilled : styles.dotEmpty} />
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
    website,
    photo,
    summary,
    firstName,
    lastName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View style={styles.photoCol}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.avatarText}>{firstName ? firstName.charAt(0) : 'A'}</Text>
            )}
          </View>
          <View style={styles.nameCol}>
            <Text style={styles.firstName}>{firstName}</Text>
            <Text style={styles.lastName}>{lastName || firstName}</Text>
            <View style={styles.titleRow}>
              <View style={styles.titleBar} />
              <Text style={styles.titleText}>{title || 'Professional'}</Text>
            </View>
          </View>
          <View style={styles.contactCol}>
            {phone ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>P:</Text>
                <Text style={styles.contactVal}>{phone}</Text>
              </View>
            ) : null}
            {email ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>E:</Text>
                <Text style={styles.contactVal}>{email}</Text>
              </View>
            ) : null}
            {website ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>S:</Text>
                <Text style={styles.contactVal}>{website}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>A:</Text>
                <Text style={styles.contactVal}>{location}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* --- SUMMARY SECTION --- */}
        {summary ? (
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeftSpacer} />
            <View style={styles.summaryRight}>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          </View>
        ) : null}

        {/* --- BODY GRID --- */}
        <View style={styles.bodyGrid}>
          {/* SIDEBAR */}
          <View style={styles.sidebar}>
            {/* Skills */}
            {validSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                </View>
                {validSkills.map((s, idx) => (
                  <View key={idx} style={styles.skillListItem}>
                    <Text style={styles.goldBullet}>•</Text>
                    <Text style={styles.skillListText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {validEducation.length > 0 && (
              <View style={styles.sidebarSection}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Education</Text>
                </View>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    {edu.year ? <Text style={styles.eduYear}>{edu.year}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* MAIN CONTENT */}
          <View style={styles.mainContent}>
            {/* Work Experience */}
            {validExperience.length > 0 && (
              <View style={styles.mainSection}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                </View>
                {validExperience.map((job, idx) => (
                  <View key={idx} style={styles.jobItem}>
                    <Text style={styles.jobPosition}>{job.position}</Text>
                    <Text style={styles.jobMeta}>
                      <Text style={styles.jobCompany}>{job.company}</Text>
                      {job.duration ? ` | ${job.duration}` : ''}
                    </Text>
                    {job.description ? <Text style={styles.jobDesc}>{job.description}</Text> : null}
                    {job.bullets &&
                      job.bullets.map((b, bi) => (
                        <View key={bi} style={styles.bulletRow}>
                          <Text style={styles.goldBullet}>•</Text>
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
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Key Projects</Text>
                </View>
                {validProjects.map((proj, idx) => (
                  <View key={idx} style={styles.jobItem}>
                    <Text style={styles.jobPosition}>{proj.name}</Text>
                    {proj.description ? <Text style={styles.jobDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {validInternships.length > 0 && (
              <View style={styles.mainSection}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Internships</Text>
                </View>
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.jobItem}>
                    <Text style={styles.jobPosition}>{intn.role}</Text>
                    <Text style={styles.jobMeta}>
                      <Text style={styles.jobCompany}>{intn.company}</Text>
                      {intn.duration ? ` | ${intn.duration}` : ''}
                    </Text>
                    {intn.description ? <Text style={styles.jobDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {validAchievements.length > 0 && (
              <View style={styles.mainSection}>
                <View style={styles.sectionTitleBox}>
                  <Text style={styles.sectionTitle}>Achievements</Text>
                </View>
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.jobItem}>
                    <Text style={styles.jobPosition}>{ach.title}</Text>
                    {ach.description ? <Text style={styles.jobDesc}>{ach.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* --- FOOTER METRICS --- */}
        {validSkills.length > 0 && (
          <View style={styles.footer}>
            <View style={styles.footerCol}>
              <Text style={styles.footerTitle}>Core Skills</Text>
              {validSkills.slice(0, 4).map((s, idx) => (
                <View key={idx} style={styles.metricRow}>
                  <Text style={styles.metricName}>{s.name}</Text>
                  <SkillDots level={s.level} />
                </View>
              ))}
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerTitle}>Technical</Text>
              {validSkills.slice(4, 8).map((s, idx) => (
                <View key={idx} style={styles.metricRow}>
                  <Text style={styles.metricName}>{s.name}</Text>
                  <SkillDots level={s.level} />
                </View>
              ))}
            </View>
            <View style={styles.footerColLast}>
              <Text style={styles.footerTitle}>Expertise</Text>
              {validSkills.slice(8, 12).map((s, idx) => (
                <View key={idx} style={styles.metricRow}>
                  <Text style={styles.metricName}>{s.name}</Text>
                  <SkillDots level={s.level} />
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
