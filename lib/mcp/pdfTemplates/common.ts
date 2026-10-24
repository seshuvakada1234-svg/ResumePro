import { ResumeData } from '@/types/resume';

export const DEFAULT_SANS = 'Helvetica';
export const DEFAULT_SERIF = 'Times-Roman';

export interface ExtractedResumeData {
  p: NonNullable<ResumeData['personalInfo']>;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  photo: string;
  summary: string;
  firstName: string;
  lastName: string;
  validEducation: ResumeData['education'];
  validExperience: ResumeData['experience'];
  validProjects: ResumeData['projects'];
  validSkills: { name: string; level: number }[];
  validLanguages: { name: string; level: number }[];
  validCertifications: string[];
  validAchievements: NonNullable<ResumeData['achievements']>;
  validInternships: NonNullable<ResumeData['internships']>;
}

export function extractResumeFields(data: ResumeData): ExtractedResumeData {
  const p = data.personalInfo || {
    fullName: 'Candidate',
    email: '',
    phone: '',
    location: '',
    summary: '',
  };

  const name = p.fullName || (p as any).name || 'Your Name';
  const title = (p as any).title || data.title || '';
  const email = p.email || '';
  const phone = p.phone || '';
  const location = p.location || '';
  const linkedin = p.linkedin || '';
  const github = p.github || '';
  const website = p.website || '';
  const photo = p.profileImage || (p as any).photo || '';
  const summary = p.summary || data.summary || '';

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] ?? 'Candidate';
  const lastName = nameParts.slice(1).join(' ');

  const validEducation = (data.education || []).filter(e => Boolean(e.school || e.degree));
  const validExperience = (data.experience || []).filter(e => Boolean(e.company || e.position));
  const validProjects = (data.projects || []).filter(pr => Boolean(pr.name));

  const validSkills: { name: string; level: number }[] = (data.skills || [])
    .map(s => (typeof s === 'string' ? { name: s, level: 85 } : { name: s.name, level: s.level || 85 }))
    .filter(s => Boolean(s.name));

  const validLanguages: { name: string; level: number }[] = (data.languages || [])
    .map(l => (typeof l === 'string' ? { name: l, level: 90 } : { name: l.name, level: l.level || 90 }))
    .filter(l => Boolean(l.name));

  const validCertifications: string[] = (data.certifications || [])
    .map(c => (typeof c === 'string' ? c : (c as any).name))
    .filter(Boolean);

  const validAchievements = (data.achievements || []).filter(a => Boolean(a.title || a.description));
  const validInternships = (data.internships || []).filter(i => Boolean(i.company || i.role));

  return {
    p,
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    github,
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
    validAchievements,
    validInternships,
  };
}
