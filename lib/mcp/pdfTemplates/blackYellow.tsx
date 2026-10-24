import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { DEFAULT_SANS, extractResumeFields } from './common';

const byStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: DEFAULT_SANS,
    padding: 0,
  },
  sidebar: {
    width: '28.2%', // exactly 224px / 794px
    backgroundColor: '#1a1a1a',
    flexDirection: 'column',
    minHeight: '100%',
  },
  photoContainer: {
    width: '100%',
    height: 155,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#666666',
  },
  sidebarContent: {
    paddingVertical: 14,
    paddingHorizontal: 11,
    flexDirection: 'column',
    flex: 1,
  },
  yellowBadge: {
    backgroundColor: '#f5c518',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginBottom: 7,
  },
  yellowBadgeText: {
    fontSize: 6.8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: '#000000',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 1.5,
  },
  eduSchool: {
    fontSize: 6.8,
    color: '#aaaaaa',
    marginBottom: 1,
  },
  eduYear: {
    fontSize: 6.5,
    color: '#888888',
  },
  certItem: {
    fontSize: 6.8,
    color: '#cccccc',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  contactSection: {
    marginTop: 'auto',
    paddingTop: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  contactYellowBar: {
    width: 2.2,
    minHeight: 20,
    backgroundColor: '#f5c518',
    marginRight: 6,
    marginTop: 1,
  },
  contactLabel: {
    fontSize: 7.2,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactValue: {
    fontSize: 6.5,
    color: '#aaaaaa',
    marginTop: 1,
  },
  mainColumn: {
    width: '71.8%', // exactly 570px / 794px
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 24,
    flexDirection: 'column',
  },
  mainHeader: {
    marginBottom: 16,
  },
  headerFirstName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 0.95,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  headerLastName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 0.95,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#888888',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  sectionBox: {
    marginBottom: 13,
  },
  bodySummary: {
    fontSize: 7.5,
    color: '#555555',
    lineHeight: 1.5,
  },
  expItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  expDateCol: {
    width: 44,
    marginRight: 8,
  },
  expDateText: {
    fontSize: 6.8,
    color: '#888888',
    lineHeight: 1.4,
  },
  expContentCol: {
    flex: 1,
  },
  expPosition: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
  },
  expCompany: {
    fontSize: 6.8,
    color: '#888888',
    marginTop: 1,
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 1.5,
  },
  bulletDot: {
    fontSize: 7.2,
    color: '#888888',
    marginRight: 4,
  },
  bulletText: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.4,
    flex: 1,
  },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 6,
  },
  gridItemName: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  yellowBarUnderline: {
    height: 1.6,
    width: 26,
    backgroundColor: '#f5c518',
    borderRadius: 1,
  },
  projItem: {
    marginBottom: 7,
  },
  projName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 1,
  },
  projDesc: {
    fontSize: 7.2,
    color: '#555555',
    lineHeight: 1.35,
  },
});

function ByYellowBadge({ title }: { title: string }) {
  return (
    <View style={byStyles.yellowBadge} wrap={false}>
      <Text style={byStyles.yellowBadgeText}>{title}</Text>
    </View>
  );
}

export function renderBlackYellowPdf(data: ResumeData) {
  const fields = extractResumeFields(data);
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    website,
    photo,
    summary,
    firstName,
    lastName,
    validEducation,
    validExperience,
    validProjects,
    validSkills,
    validLanguages,
    validCertifications,
  } = fields;

  return (
    <Document title={`${name} - Resume`} author="FreeResume.dev" subject="ATS-Optimized Resume">
      <Page size="A4" style={byStyles.page} wrap>
        {/* LEFT DARK SIDEBAR */}
        <View style={byStyles.sidebar}>
          <View style={byStyles.photoContainer}>
            {photo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={photo} style={byStyles.photoImg} />
            ) : (
              <View style={byStyles.avatarCircle}>
                <Text style={byStyles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
              </View>
            )}
          </View>

          <View style={byStyles.sidebarContent}>
            {validEducation.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <ByYellowBadge title="EDUCATION" />
                {validEducation.map((edu, i) => (
                  <View key={i} style={byStyles.eduItem} wrap={false}>
                    <Text style={byStyles.eduDegree}>{edu.degree || 'Degree'}</Text>
                    <Text style={byStyles.eduSchool}>{edu.school || 'University'}</Text>
                    <Text style={byStyles.eduYear}>
                      {edu.startDate ? `${edu.startDate} — ${edu.endDate ?? 'Present'}` : edu.year || ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {validCertifications.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <ByYellowBadge title="CERTIFICATIONS" />
                {validCertifications.map((cert, i) => (
                  <Text key={i} style={byStyles.certItem} wrap={false}>{cert}</Text>
                ))}
              </View>
            )}

            <View style={{ flex: 1 }} />

            <View style={byStyles.contactSection}>
              {phone ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Phone</Text>
                    <Text style={byStyles.contactValue}>{phone}</Text>
                  </View>
                </View>
              ) : null}

              {email ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Email</Text>
                    <Text style={byStyles.contactValue}>{email}</Text>
                  </View>
                </View>
              ) : null}

              {linkedin ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>LinkedIn</Text>
                    <Text style={byStyles.contactValue}>{linkedin.replace('https://', '')}</Text>
                  </View>
                </View>
              ) : null}

              {website ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Website</Text>
                    <Text style={byStyles.contactValue}>{website.replace('https://', '')}</Text>
                  </View>
                </View>
              ) : null}

              {location ? (
                <View style={byStyles.contactRow} wrap={false}>
                  <View style={byStyles.contactYellowBar} />
                  <View style={{ flex: 1 }}>
                    <Text style={byStyles.contactLabel}>Address</Text>
                    <Text style={byStyles.contactValue}>{location}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={byStyles.mainColumn}>
          <View style={byStyles.mainHeader}>
            <Text style={byStyles.headerFirstName}>{firstName}</Text>
            {lastName ? <Text style={byStyles.headerLastName}>{lastName}</Text> : null}
            {title ? <Text style={byStyles.headerTitle}>{title}</Text> : null}
          </View>

          {summary ? (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="ABOUT ME" />
              <Text style={byStyles.bodySummary}>{summary}</Text>
            </View>
          ) : null}

          {validExperience.length > 0 && (
            <View style={byStyles.sectionBox}>
              <ByYellowBadge title="WORK EXPERIENCE" />
              {validExperience.map((exp, i) => (
                <View key={i} style={byStyles.expItem} wrap={false}>
                  <View style={byStyles.expDateCol}>
                    <Text style={byStyles.expDateText}>
                      {exp.startDate || (exp.duration?.includes('-') ? exp.duration.split('-')[0]?.trim() : exp.duration || '')}
                    </Text>
                    <Text style={byStyles.expDateText}>
                      {exp.endDate || (exp.duration?.includes('-') ? exp.duration.split('-')[1]?.trim() : 'Present')}
                    </Text>
                  </View>
                  <View style={byStyles.expContentCol}>
                    <Text style={byStyles.expPosition}>{exp.position}</Text>
                    <Text style={byStyles.expCompany}>{exp.company}</Text>
                    {exp.description ? <Text style={byStyles.expDesc}>{exp.description}</Text> : null}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <View style={{ marginTop: 2 }}>
                        {exp.bullets.map((b, bi) => (
                          <View key={bi} style={byStyles.bulletRow}>
                            <Text style={byStyles.bulletDot}>•</Text>
                            <Text style={byStyles.bulletText}>{b}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {validSkills.length > 0 && (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="KEY SKILLS" />
              <View style={byStyles.twoColGrid}>
                {validSkills.map((s, i) => (
                  <View key={i} style={byStyles.gridItem}>
                    <Text style={byStyles.gridItemName}>{s.name}</Text>
                    <View style={byStyles.yellowBarUnderline} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {validLanguages.length > 0 && (
            <View style={byStyles.sectionBox} wrap={false}>
              <ByYellowBadge title="LANGUAGES" />
              <View style={byStyles.twoColGrid}>
                {validLanguages.map((lang, i) => (
                  <View key={i} style={byStyles.gridItem}>
                    <Text style={byStyles.gridItemName}>{lang.name}</Text>
                    <View style={byStyles.yellowBarUnderline} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {validProjects.length > 0 && (
            <View style={byStyles.sectionBox}>
              <ByYellowBadge title="PROJECTS" />
              {validProjects.map((proj, i) => (
                <View key={i} style={byStyles.projItem} wrap={false}>
                  <Text style={byStyles.projName}>{proj.name}</Text>
                  {proj.description ? <Text style={byStyles.projDesc}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
