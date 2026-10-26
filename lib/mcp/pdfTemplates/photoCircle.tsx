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
  // --- SIDEBAR (28% width, #f3f4f6) ---
  sidebar: {
    width: '28%',
    backgroundColor: '#f3f4f6',
    padding: '24pt 12pt',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100%',
  },
  photoCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#d1d5db',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  sideSection: {
    width: '100%',
    marginBottom: 16,
  },
  sideTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2.5,
    marginBottom: 6,
  },
  sideItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 3.5,
  },
  sideBullet: {
    fontSize: 8,
    color: '#9ca3af',
  },
  sideText: {
    fontSize: 8.5,
    color: '#4b5563',
    flex: 1,
    lineHeight: 1.3,
  },
  // --- MAIN CONTENT (72% width, #ffffff) ---
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  mainHeader: {
    padding: '24pt 24pt 14pt',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  mainName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#111827',
  },
  mainTitle: {
    fontSize: 10.5,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactIcon: {
    fontSize: 8,
    color: '#6b7280',
  },
  contactVal: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  mainBody: {
    padding: '16pt 24pt',
    flex: 1,
  },
  sectionBox: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#1f2937',
    marginBottom: 7,
  },
  summaryText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  expItem: {
    marginBottom: 11,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expDuration: {
    fontSize: 8,
    color: '#9ca3af',
    marginTop: 1,
    marginBottom: 2,
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
    color: '#6b7280',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  eduItem: {
    marginBottom: 8,
  },
});

export function renderPhotoCirclePdf(data: ResumeData) {
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
    validCertifications,
    validAchievements,
    validInternships,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- LEFT SIDEBAR (Photo + Skills + Languages + Certs) --- */}
        <View style={styles.sidebar}>
          <View style={styles.photoCircle}>
            {photo ? (
              <Image src={photo} style={styles.photoImg} />
            ) : (
              <Text style={styles.photoInitial}>{name ? name.charAt(0) : 'A'}</Text>
            )}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Skills</Text>
              {validSkills.map((s, idx) => (
                <View key={idx} style={styles.sideItem}>
                  <Text style={styles.sideBullet}>•</Text>
                  <Text style={styles.sideText}>{s.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Languages</Text>
              {validLanguages.map((l, idx) => (
                <View key={idx} style={styles.sideItem}>
                  <Text style={styles.sideBullet}>•</Text>
                  <Text style={styles.sideText}>{l.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {validCertifications.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Certifications</Text>
              {validCertifications.map((c, idx) => (
                <View key={idx} style={styles.sideItem}>
                  <Text style={styles.sideBullet}>•</Text>
                  <Text style={styles.sideText}>{c}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* --- RIGHT MAIN CONTENT (Header with contact + Experience + Education) --- */}
        <View style={styles.main}>
          {/* Header */}
          <View style={styles.mainHeader}>
            <Text style={styles.mainName}>{name}</Text>
            <Text style={styles.mainTitle}>{title || 'Professional Title'}</Text>
            <View style={styles.contactRow}>
              {email ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>✉</Text>
                  <Text style={styles.contactVal}>{email}</Text>
                </View>
              ) : null}
              {phone ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📞</Text>
                  <Text style={styles.contactVal}>{phone}</Text>
                </View>
              ) : null}
              {location ? (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📍</Text>
                  <Text style={styles.contactVal}>{location}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Body */}
          <View style={styles.mainBody}>
            {/* Summary */}
            {summary ? (
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {/* Experience */}
            {validExperience.length > 0 && (
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>
                      {exp.position}
                      {exp.company ? `, ${exp.company}` : ''}
                    </Text>
                    {exp.duration ? <Text style={styles.expDuration}>{exp.duration}</Text> : null}
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
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Projects</Text>
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
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Education</Text>
                {validEducation.map((edu, idx) => (
                  <View key={idx} style={styles.eduItem}>
                    <Text style={styles.expPosition}>
                      {edu.degree}
                      {edu.school ? `, ${edu.school}` : ''}
                    </Text>
                    {edu.year ? <Text style={styles.expDuration}>{edu.year}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {validInternships.length > 0 && (
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Internships</Text>
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>
                      {intn.role}
                      {intn.company ? `, ${intn.company}` : ''}
                    </Text>
                    {intn.duration ? <Text style={styles.expDuration}>{intn.duration}</Text> : null}
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {validAchievements.length > 0 && (
              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {validAchievements.map((ach, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{ach.title}</Text>
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
