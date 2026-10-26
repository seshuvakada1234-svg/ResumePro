import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'column',
  },
  // --- TOP BANNER (indigo-700 #4338ca) ---
  banner: {
    backgroundColor: '#4338ca',
    color: '#ffffff',
    padding: '24pt 28pt',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactIcon: {
    fontSize: 8,
    color: '#c7d2fe',
  },
  contactText: {
    fontSize: 8.8,
    color: '#e0e7ff',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialText: {
    fontSize: 8,
    color: '#c7d2fe',
  },
  // --- BODY (2 Columns: Left 65%, Right 35%) ---
  bodyGrid: {
    padding: '24pt 28pt',
    flexDirection: 'row',
    gap: 20,
    flex: 1,
  },
  leftCol: {
    width: '65%',
    flexDirection: 'column',
    gap: 16,
  },
  rightCol: {
    width: '35%',
    flexDirection: 'column',
    gap: 16,
  },
  sectionHdr: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#4338ca',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 8.8,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  // Experience item
  expItem: {
    borderLeftWidth: 2,
    borderLeftColor: '#e0e7ff',
    paddingLeft: 10,
    marginBottom: 12,
  },
  expTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  durationBadge: {
    backgroundColor: '#eef2ff',
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  durationBadgeText: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  expCompany: {
    fontSize: 8.8,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 3,
  },
  expDesc: {
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
    color: '#818cf8',
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  // Skills badges in right column
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  skillBadgeText: {
    fontSize: 8,
    color: '#374151',
    fontWeight: 'bold',
  },
  // Education item in right column
  eduItem: {
    marginBottom: 9,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#6b7280',
    marginTop: 1,
  },
  eduYear: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginTop: 1.5,
  },
});

export function renderModernPdf(data: ResumeData) {
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
        {/* --- BANNER --- */}
        <View style={styles.banner}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.contactRow}>
            {email ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>✉</Text>
                <Text style={styles.contactText}>{email}</Text>
              </View>
            ) : null}
            {phone ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>{phone}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text style={styles.contactText}>{location}</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.socialRow}>
            {linkedin ? (
              <Text style={styles.socialText}>LinkedIn: {linkedin.replace(/^https?:\/\//, '')}</Text>
            ) : null}
            {github ? (
              <Text style={styles.socialText}>GitHub: {github.replace(/^https?:\/\//, '')}</Text>
            ) : null}
          </View>
        </View>

        {/* --- BODY GRID --- */}
        <View style={styles.bodyGrid}>
          {/* LEFT COLUMN (Summary + Experience + Projects) */}
          <View style={styles.leftCol}>
            {summary ? (
              <View>
                <Text style={styles.sectionHdr}>About Me</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {validExperience.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Experience</Text>
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expTopRow}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      {exp.duration ? (
                        <View style={styles.durationBadge}>
                          <Text style={styles.durationBadgeText}>{exp.duration}</Text>
                        </View>
                      ) : null}
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

            {validProjects.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Key Projects</Text>
                {validProjects.map((p, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {validInternships.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Internships</Text>
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expTopRow}>
                      <Text style={styles.expPosition}>{intn.role}</Text>
                      {intn.duration ? (
                        <View style={styles.durationBadge}>
                          <Text style={styles.durationBadgeText}>{intn.duration}</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.expCompany}>{intn.company}</Text>
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {validAchievements.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Achievements</Text>
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{ach.title}</Text>
                    {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT COLUMN (Skills + Education) */}
          <View style={styles.rightCol}>
            {validSkills.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Skills</Text>
                <View style={styles.skillsWrap}>
                  {validSkills.map((s, idx) => (
                    <View key={idx} style={styles.skillBadge}>
                      <Text style={styles.skillBadgeText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {validEducation.length > 0 && (
              <View>
                <Text style={styles.sectionHdr}>Education</Text>
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
      </Page>
    </Document>
  );
}
