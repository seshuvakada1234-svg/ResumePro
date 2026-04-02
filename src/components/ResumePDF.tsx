"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

// Register fonts for PDF
Font.register({
  family: 'Times-Roman',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/timesnewroman/v1/timesnewroman.ttf' },
    { src: 'https://fonts.gstatic.com/s/timesnewroman/v1/timesnewroman-bold.ttf', fontWeight: 'bold' },
  ],
});

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 10, color: '#333' },
  header: { borderBottom: 1, borderBottomColor: '#000', paddingBottom: 10, marginBottom: 15, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  contact: { flexDirection: 'row', justifyContent: 'center', gap: 10, fontSize: 9, color: '#666' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', borderBottom: 0.5, borderBottomColor: '#ccc', paddingBottom: 2, marginBottom: 5 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic', color: '#666' },
  text: { lineHeight: 1.4, textAlign: 'justify' },
  skillList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  watermark: { position: 'absolute', bottom: 20, right: 20, fontSize: 8, color: '#ccc' },
});

// PDF Component
const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName || 'Your Name'}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email}</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text>{data.personalInfo.location}</Text>
        </View>
      </View>

      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {data.experience.length > 0 && data.experience[0].company && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.itemHeader}>
                <Text style={styles.bold}>{exp.position}</Text>
                <Text style={styles.italic}>{exp.duration}</Text>
              </View>
              <Text style={{ marginBottom: 2 }}>{exp.company}</Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.projects.length > 0 && data.projects[0].name && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <Text style={styles.bold}>{proj.name}</Text>
              <Text style={styles.text}>{proj.description}</Text>
            </View>
          ))}
        </View>
      )}

      {data.education.length > 0 && data.education[0].school && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.itemHeader}>
              <View>
                <Text style={styles.bold}>{edu.school}</Text>
                <Text>{edu.degree}</Text>
              </View>
              <Text style={styles.italic}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillList}>
            {data.skills.map((skill, i) => (
              <Text key={i}>• {skill}</Text>
            ))}
          </View>
        </View>
      )}
      <Text style={styles.watermark}>Built with ResumePro India</Text>
    </Page>
  </Document>
);

export default ResumePDF;
