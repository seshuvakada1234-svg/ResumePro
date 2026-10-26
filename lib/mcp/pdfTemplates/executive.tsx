import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f4f4f4',
    fontFamily: DEFAULT_SANS,
    padding: 0,
    flexDirection: 'row',
  },
  // --- SIDEBAR (230px / 794px = ~29%) ---
  sidebar: {
    width: '29%',
    backgroundColor: '#2d2d2d',
    color: '#ffffff',
    flexDirection: 'column',
    minHeight: '100%',
  },
  profileBox: {
    padding: '24pt 16pt 16pt',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2.5,
    borderColor: '#c9a84c',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c9a84c',
  },
  sideName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  goldBar: {
    width: 28,
    height: 2,
    backgroundColor: '#c9a84c',
    marginVertical: 6,
  },
  sideProfession: {
    fontSize: 8,
    color: '#aaaaaa',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sideSection: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sideTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginBottom: 5,
  },
  sideDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 6,
  },
  contactBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBadgeText: {
    fontSize: 8,
    color: '#c9a84c',
  },
  contactText: {
    fontSize: 8.5,
    color: '#cccccc',
    flex: 1,
    lineHeight: 1.3,
  },
  // Skills with 5 circular dots
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 8.5,
    color: '#cccccc',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    width: 75,
  },
  skillDotsBox: {
    flexDirection: 'row',
    gap: 2.5,
  },
  skillDotFilled: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#c9a84c',
  },
  skillDotEmpty: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#555555',
  },
  // Education
  eduItem: {
    marginBottom: 8,
  },
  eduSchool: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eduDegree: {
    fontSize: 8.5,
    color: '#94a3b8',
    marginTop: 1.5,
  },
  eduYear: {
    fontSize: 8,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 1,
  },
  // --- MAIN (Right ~71%) ---
  main: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    flexDirection: 'column',
  },
  headerCard: {
    backgroundColor: '#ffffff',
    padding: '20pt 24pt 16pt',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  mainName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d2d2d',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  accentLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.5,
    marginTop: 4,
  },
  accentGold: {
    width: 32,
    height: 2,
    backgroundColor: '#c9a84c',
  },
  accentCharcoal: {
    width: 16,
    height: 2,
    backgroundColor: '#2d2d2d',
  },
  mainProfession: {
    fontSize: 8.5,
    color: '#999999',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  mainBody: {
    padding: '16pt 24pt',
    flex: 1,
  },
  sectionBlock: {
    marginBottom: 16,
  },
  // Section Header: 22pt circle #2d2d2d with 8pt gold dot #c9a84c
  sectionHeaderBox: {
    marginBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  circleBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c9a84c',
  },
  sectionTitleMain: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 5,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9.5,
    color: '#666666',
    lineHeight: 1.6,
  },
  expItem: {
    marginBottom: 11,
  },
  expMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expCompany: {
    fontSize: 8.5,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  expDuration: {
    fontSize: 8.5,
    color: '#999999',
  },
  expPosition: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginVertical: 2,
  },
  expDesc: {
    fontSize: 9.5,
    color: '#777777',
    lineHeight: 1.5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 2.5,
  },
  bulletDot: {
    color: '#c9a84c',
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9.5,
    color: '#666666',
    lineHeight: 1.4,
    flex: 1,
  },
});

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeaderBox}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.circleBadge}>
          <View style={styles.innerDot} />
        </View>
        <Text style={styles.sectionTitleMain}>{label}</Text>
      </View>
      <View style={styles.sectionDivider} />
    </View>
  );
}

function SkillRating({ level }: { level: number }) {
  const activeCount = Math.max(1, Math.min(5, Math.round(level <= 5 ? level : (level / 100) * 5)));
  return (
    <View style={styles.skillDotsBox}>
      {[1, 2, 3, 4, 5].map((idx) => (
        <View key={idx} style={idx <= activeCount ? styles.skillDotFilled : styles.skillDotEmpty} />
      ))}
    </View>
  );
}

export function renderExecutivePdf(data: ResumeData) {
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

  const profession = validExperience[0]?.position || title || 'Professional';

  return (
    <Document title={`${name} - Resume`} author={name}>
      <Page size="A4" style={styles.page}>
        {/* --- SIDEBAR --- */}
        <View style={styles.sidebar}>
          {/* Profile Circle */}
          <View style={styles.profileBox}>
            <View style={styles.avatarRing}>
              {photo ? (
                <Image src={photo} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>{name ? name.charAt(0) : '?'}</Text>
              )}
            </View>
            <Text style={styles.sideName}>{name}</Text>
            <View style={styles.goldBar} />
            <Text style={styles.sideProfession}>{profession}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideTitle}>Contact</Text>
            <View style={styles.sideDivider} />
            {email ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>@</Text>
                </View>
                <Text style={styles.contactText}>{email}</Text>
              </View>
            ) : null}
            {phone ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>P</Text>
                </View>
                <Text style={styles.contactText}>{phone}</Text>
              </View>
            ) : null}
            {location ? (
              <View style={styles.contactItem}>
                <View style={styles.contactBadge}>
                  <Text style={styles.contactBadgeText}>L</Text>
                </View>
                <Text style={styles.contactText}>{location}</Text>
              </View>
            ) : null}
          </View>

          {/* Skills */}
          {validSkills.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Skills</Text>
              <View style={styles.sideDivider} />
              {validSkills.map((s, idx) => (
                <View key={idx} style={styles.skillRow}>
                  <Text style={styles.skillName}>{s.name}</Text>
                  <SkillRating level={s.level} />
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {validLanguages.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Languages</Text>
              <View style={styles.sideDivider} />
              {validLanguages.map((l, idx) => (
                <View key={idx} style={styles.skillRow}>
                  <Text style={styles.skillName}>{l.name}</Text>
                  <SkillRating level={l.level} />
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <View style={styles.sideSection}>
              <Text style={styles.sideTitle}>Education</Text>
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

        {/* --- MAIN CONTENT --- */}
        <View style={styles.main}>
          {/* Header Card */}
          <View style={styles.headerCard}>
            <Text style={styles.mainName}>{name}</Text>
            <View style={styles.accentLineRow}>
              <View style={styles.accentGold} />
              <View style={styles.accentCharcoal} />
              <View style={styles.accentCharcoal} />
            </View>
            <Text style={styles.mainProfession}>{profession}</Text>
          </View>

          {/* Body */}
          <View style={styles.mainBody}>
            {/* Profile / Summary */}
            {summary ? (
              <View style={styles.sectionBlock}>
                <SectionHeader label="Profile" />
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            ) : null}

            {/* Work Experience */}
            {validExperience.length > 0 && (
              <View style={styles.sectionBlock}>
                <SectionHeader label="Work Experience" />
                {validExperience.map((exp, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expMetaRow}>
                      <Text style={styles.expCompany}>{exp.company}</Text>
                      {exp.duration ? <Text style={styles.expDuration}>{exp.duration}</Text> : null}
                    </View>
                    <Text style={styles.expPosition}>{exp.position}</Text>
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
              <View style={styles.sectionBlock}>
                <SectionHeader label="Projects" />
                {validProjects.map((proj, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <Text style={styles.expPosition}>{proj.name}</Text>
                    {proj.description ? <Text style={styles.expDesc}>{proj.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Internships */}
            {validInternships.length > 0 && (
              <View style={styles.sectionBlock}>
                <SectionHeader label="Internships" />
                {validInternships.map((intn, idx) => (
                  <View key={idx} style={styles.expItem}>
                    <View style={styles.expMetaRow}>
                      <Text style={styles.expCompany}>{intn.company}</Text>
                      {intn.duration ? <Text style={styles.expDuration}>{intn.duration}</Text> : null}
                    </View>
                    <Text style={styles.expPosition}>{intn.role}</Text>
                    {intn.description ? <Text style={styles.expDesc}>{intn.description}</Text> : null}
                  </View>
                ))}
              </View>
            )}

            {/* Achievements */}
            {validAchievements.length > 0 && (
              <View style={styles.sectionBlock}>
                <SectionHeader label="Achievements" />
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
