import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  // --- SIDEBAR (30% width, #0f172a) ---
  sidebar: {
    width: '30%',
    backgroundColor: '#0f172a',
    padding: '32pt 18pt',
    flexDirection: 'column',
    minHeight: '100%',
  },
  sideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 1.2,
    marginBottom: 6,
  },
  sideLocation: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 20,
  },
  sideSection: {
    marginBottom: 20,
  },
  sideTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#818cf8',
    marginBottom: 10,
  },
  contactItem: {
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 7.5,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  contactVal: {
    fontSize: 9,
    color: '#cbd5e1',
    marginTop: 1,
  },
  // Skill badges
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4.5,
  },
  skillBadge: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 3.5,
    paddingVertical: 2.5,
    paddingHorizontal: 6,
  },
  skillBadgeText: {
    fontSize: 8,
    color: '#e2e8f0',
  },
  // Education
  eduItem: {
    marginBottom: 10,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 1.5,
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#94a3b8',
    marginBottom: 1,
  },
  eduYear: {
    fontSize: 8,
    color: '#64748b',
    fontStyle: 'italic',
  },
  // --- MAIN CONTENT (70% width, #ffffff) ---
  main: {
    flex: 1,
    padding: '34pt 28pt',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  mainSection: {
    marginBottom: 20,
  },
  // Section Header with vertical indigo pill
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 11,
  },
  indigoPill: {
    width: 3.5,
    height: 13,
    backgroundColor: '#4f46e5',
    borderRadius: 1.75,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#0f172a',
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#475569',
  },
  // Timeline experience
  timelineItem: {
    borderLeftWidth: 1.5,
    borderLeftColor: '#e2e8f0',
    paddingLeft: 12,
    marginBottom: 14,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -4,
    top: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4f46e5',
  },
  jobHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  jobDuration: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  jobCompany: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 4,
  },
  jobDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#64748b',
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  bulletDot: {
    color: '#4f46e5',
    fontSize: 8.5,
  },
  bulletText: {
    fontSize: 9,
    color: '#64748b',
    lineHeight: 1.4,
    flex: 1,
  },
});

function SectionTitle({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.indigoPill} />
      <Text style={styles.sectionTitle}>{label}</Text>
    </View>
  );
}

export function renderTwoColumnPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    email,
    phone,
    location,
    linkedin,
    github,
    summary,
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
        {/* --- SIDEBAR --- */}
        <View style={styles.sidebar}>
          <Text style={styles.sideName}>{name}</Text>
          {location ? <Text style={styles.sideLocation}>{location}</Text> : null}

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Contact</Text>
            {email ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactVal}>{email}</Text>
              </View>
            ) : null}
            {phone ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactVal}>{phone}</Text>
              </View>
            ) : null}
            {linkedin ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactVal}>{linkedin.replace(/^https?:\/\//, '')}</Text>
              </View>
            ) : null}
            {github ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>GitHub</Text>
                <Text style={styles.contactVal}>{github.replace(/^https?:\/\//, '')}</Text>
              </View>
            ) : null}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Skills</Text>
              <View style={styles.skillsWrap}>
                {validSkills.map((s, idx) => (
                  <View key={idx} style={styles.skillBadge}>
                    <Text style={styles.skillBadgeText}>{s.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Education</Text>
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

        {/* --- MAIN CONTENT --- */}
        <View style={styles.main}>
          {/* Summary */}
          {summary ? (
            <View style={styles.mainSection}>
              <SectionTitle label="Professional Summary" />
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.mainSection}>
              <SectionTitle label="Experience" />
              {validExperience.map((exp, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.jobHeaderRow}>
                    <Text style={styles.jobPosition}>{exp.position}</Text>
                    {exp.duration ? <Text style={styles.jobDuration}>{exp.duration}</Text> : null}
                  </View>
                  <Text style={styles.jobCompany}>{exp.company}</Text>
                  {exp.description ? <Text style={styles.jobDesc}>{exp.description}</Text> : null}
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
              <SectionTitle label="Projects" />
              {validProjects.map((proj, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <Text style={styles.jobPosition}>{proj.name}</Text>
                  {proj.description ? <Text style={styles.jobDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.mainSection}>
              <SectionTitle label="Internships" />
              {validInternships.map((intn, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.jobHeaderRow}>
                    <Text style={styles.jobPosition}>{intn.role}</Text>
                    {intn.duration ? <Text style={styles.jobDuration}>{intn.duration}</Text> : null}
                  </View>
                  <Text style={styles.jobCompany}>{intn.company}</Text>
                  {intn.description ? <Text style={styles.jobDesc}>{intn.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.mainSection}>
              <SectionTitle label="Achievements" />
              {validAchievements.map((ach, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <Text style={styles.jobPosition}>{ach.title}</Text>
                  {ach.description ? <Text style={styles.jobDesc}>{ach.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
