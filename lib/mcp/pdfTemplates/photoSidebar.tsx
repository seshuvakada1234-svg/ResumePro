import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: 0,
    flexDirection: 'column',
  },
  // --- TOP HEADER ---
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 18,
    paddingHorizontal: 36,
    paddingTop: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  photoBox: {
    width: 86,
    height: 86,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#e5e7eb',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 1.15,
  },
  title: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 8,
  },
  contactCol: {
    flexDirection: 'column',
    gap: 2.5,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactIcon: {
    fontSize: 8,
    color: '#4b5563',
  },
  contactVal: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  // --- BODY (Horizontal Bands: 96pt left label column, border-left divider, right content) ---
  body: {
    paddingHorizontal: 36,
    paddingVertical: 20,
    flexDirection: 'column',
    gap: 16,
  },
  band: {
    flexDirection: 'row',
  },
  bandLeft: {
    width: 96,
  },
  bandTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#111827',
    paddingTop: 1,
  },
  bandRight: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#d1d5db',
    paddingLeft: 18,
  },
  summaryText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.55,
  },
  // Experience item
  expItem: {
    marginBottom: 12,
  },
  expDate: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 1.5,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDesc: {
    fontSize: 8.5,
    color: '#4b5563',
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
    fontSize: 8.5,
    color: '#4b5563',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  // Education item
  eduItem: {
    marginBottom: 8,
  },
  // Skills grid (2 columns)
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  skillText: {
    fontSize: 8.5,
    color: '#374151',
  },
});

export function renderPhotoSidebarPdf(data: ResumeData) {
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
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
    validCertifications,
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- TOP HEADER --- */}
        <View style={styles.header}>
          <View style={styles.photoBox}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoInitial}>{name ? name.charAt(0) : 'A'}</Text>
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title || 'Professional Title'}</Text>
            <View style={styles.contactCol}>
              {email ? (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>✉</Text>
                  <Text style={styles.contactVal}>{email}</Text>
                </View>
              ) : null}
              {phone ? (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>📞</Text>
                  <Text style={styles.contactVal}>{phone}</Text>
                </View>
              ) : null}
              {location ? (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>📍</Text>
                  <Text style={styles.contactVal}>{location}</Text>
                </View>
              ) : null}
              {linkedin ? (
                <View style={styles.contactRow}>
                  <Text style={styles.contactIcon}>🔗</Text>
                  <Text style={styles.contactVal}>{linkedin.replace(/^https?:\/\//, '')}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* --- BODY HORIZONTAL BANDS --- */}
        <View style={styles.body}>
          {/* Summary */}
          {summary ? (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Summary</Text>
              </View>
              <View style={styles.bandRight}>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            </View>
          ) : null}

          {/* Experience */}
          {validExperience.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Experience</Text>
              </View>
              <View style={styles.bandRight}>
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    {exp.duration ? <Text style={styles.expDate}>{exp.duration}</Text> : null}
                    <Text style={styles.expPosition}>
                      {exp.position}
                      {exp.company ? `, ${exp.company}` : ''}
                    </Text>
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
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Education</Text>
              </View>
              <View style={styles.bandRight}>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduItem}>
                    {edu.year ? <Text style={styles.expDate}>{edu.year}</Text> : null}
                    <Text style={styles.expPosition}>
                      {edu.school}
                      {edu.degree ? `, ${edu.degree}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Skills</Text>
              </View>
              <View style={styles.bandRight}>
                <View style={styles.skillsGrid}>
                  {validSkills.map((s, idx) => (
                    <View key={idx} style={styles.skillItem}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.skillText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Languages</Text>
              </View>
              <View style={styles.bandRight}>
                <View style={styles.skillsGrid}>
                  {validLanguages.map((l, idx) => (
                    <View key={idx} style={styles.skillItem}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.skillText}>{l.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Certifications */}
          {validCertifications.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Certifications</Text>
              </View>
              <View style={styles.bandRight}>
                {validCertifications.map((c, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{c}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {validProjects.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Projects</Text>
              </View>
              <View style={styles.bandRight}>
                {validProjects.map((p, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{p.name}</Text>
                    {p.description ? <Text style={styles.expDesc}>{p.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Internships */}
          {validInternships.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Internships</Text>
              </View>
              <View style={styles.bandRight}>
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    {intn.duration ? <Text style={styles.expDate}>{intn.duration}</Text> : null}
                    <Text style={styles.expPosition}>
                      {intn.role}
                      {intn.company ? `, ${intn.company}` : ''}
                    </Text>
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Achievements */}
          {validAchievements.length > 0 && (
            <View style={styles.band}>
              <View style={styles.bandLeft}>
                <Text style={styles.bandTitle}>Achievements</Text>
              </View>
              <View style={styles.bandRight}>
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{ach.title}</Text>
                    {ach.description ? <Text style={styles.expDesc}>{ach.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
