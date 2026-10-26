import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SERIF, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SERIF,
    padding: '36pt 42pt',
    flexDirection: 'column',
  },
  // --- HEADER (Centered) ---
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#111827',
    textAlign: 'center',
  },
  title: {
    fontSize: 10.5,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  location: {
    fontSize: 8.5,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 4,
  },
  contactText: {
    fontSize: 8.5,
    color: '#4b5563',
  },
  dividerHr: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 10,
  },
  // --- SECTIONS ---
  sectionBox: {
    marginBottom: 14,
  },
  grayHdrBox: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  grayHdrTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1f2937',
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 8.8,
    color: '#4b5563',
    lineHeight: 1.55,
  },
  // Item with dotted connector line
  itemBox: {
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diamond: {
    fontSize: 7.5,
    color: '#9ca3af',
    marginRight: 4,
  },
  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    borderBottomStyle: 'dotted',
    marginHorizontal: 8,
  },
  itemDate: {
    fontSize: 8.5,
    color: '#6b7280',
  },
  itemDesc: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.45,
    marginTop: 2,
    marginLeft: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
    marginLeft: 10,
  },
  bulletDot: {
    fontSize: 8,
    color: '#4b5563',
  },
  bulletText: {
    fontSize: 8.5,
    color: '#4b5563',
    lineHeight: 1.4,
    flex: 1,
  },
  // Skills grid
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  skillText: {
    fontSize: 8.5,
    color: '#4b5563',
  },
});

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.grayHdrBox}>
      <Text style={styles.grayHdrTitle}>{label}</Text>
    </View>
  );
}

export function renderLawyerClassicPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
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
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title || 'Attorney at Law'}</Text>
          {location ? <Text style={styles.location}>{location}</Text> : null}
          <View style={styles.contactRow}>
            {email ? <Text style={styles.contactText}>{email}</Text> : null}
            {phone ? <Text style={styles.contactText}>{phone}</Text> : null}
          </View>
        </View>

        <View style={styles.dividerHr} />

        {/* --- SUMMARY --- */}
        {summary ? (
          <View style={styles.sectionBox}>
            <SectionHeader label="Summary" />
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* --- EXPERIENCE --- */}
        {validExperience.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Experience" />
            {validExperience.map((exp, idx) => (
              <View key={idx} style={styles.itemBox}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.diamond}>❖</Text>
                  <Text style={styles.itemTitle}>
                    {exp.position}
                    {exp.company ? `, ${exp.company}` : ''}
                  </Text>
                  <View style={styles.dottedLine} />
                  <Text style={styles.itemDate}>{exp.duration || exp.startDate || ''}</Text>
                </View>
                {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
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

        {/* --- EDUCATION --- */}
        {validEducation.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Education" />
            {validEducation.map((edu, idx) => (
              <View key={idx} style={styles.itemBox}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.diamond}>❖</Text>
                  <Text style={styles.itemTitle}>
                    {edu.school}
                    {edu.degree ? `, ${edu.degree}` : ''}
                  </Text>
                  <View style={styles.dottedLine} />
                  <Text style={styles.itemDate}>{edu.year || ''}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* --- SKILLS --- */}
        {validSkills.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Areas of Expertise" />
            <View style={styles.skillsWrap}>
              {validSkills.map((s, idx) => (
                <Text key={idx} style={styles.skillText}>
                  ❖ {s.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* --- CERTIFICATIONS --- */}
        {validCertifications.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Certifications & Admissions" />
            <View style={styles.skillsWrap}>
              {validCertifications.map((c, idx) => (
                <Text key={idx} style={styles.skillText}>
                  ❖ {c}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* --- PROJECTS / CASES --- */}
        {validProjects.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Key Cases & Matters" />
            {validProjects.map((p, idx) => (
              <View key={idx} style={styles.itemBox}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.diamond}>❖</Text>
                  <Text style={styles.itemTitle}>{p.name}</Text>
                  <View style={styles.dottedLine} />
                </View>
                {p.description ? <Text style={styles.itemDesc}>{p.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* --- INTERNSHIPS --- */}
        {validInternships.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Legal Internships" />
            {validInternships.map((intn, idx) => (
              <View key={idx} style={styles.itemBox}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.diamond}>❖</Text>
                  <Text style={styles.itemTitle}>
                    {intn.role}
                    {intn.company ? `, ${intn.company}` : ''}
                  </Text>
                  <View style={styles.dottedLine} />
                  <Text style={styles.itemDate}>{intn.duration || ''}</Text>
                </View>
                {intn.description ? <Text style={styles.itemDesc}>{intn.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* --- ACHIEVEMENTS --- */}
        {validAchievements.length > 0 && (
          <View style={styles.sectionBox}>
            <SectionHeader label="Honors & Achievements" />
            {validAchievements.map((ach, idx) => (
              <View key={idx} style={styles.itemBox}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.diamond}>❖</Text>
                  <Text style={styles.itemTitle}>{ach.title}</Text>
                  <View style={styles.dottedLine} />
                </View>
                {ach.description ? <Text style={styles.itemDesc}>{ach.description}</Text> : null}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
