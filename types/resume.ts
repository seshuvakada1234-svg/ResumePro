export interface PersonalInfo {
  fullName: string;
  name?: string; // For PhotoSidebarTemplate
  title?: string; // For PhotoSidebarTemplate
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage?: string;
  photo?: string; // For PhotoSidebarTemplate
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Language {
  name: string;
  level: number;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  startDate?: string; // For PhotoSidebarTemplate
  endDate?: string; // For PhotoSidebarTemplate
  gpa?: string; // For PhotoSidebarTemplate
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  startDate?: string; // For PhotoSidebarTemplate
  endDate?: string; // For PhotoSidebarTemplate
  description: string;
  bullets?: string[]; // For PhotoSidebarTemplate
}

export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface Reference {
  name: string;
  position: string;
  company?: string;
  phone: string;
  email: string;
}

export type ResumeTemplate =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'two-column'
  | 'premium'
  | 'executive'
  | 'redline'
  | 'navy'
  | 'serif'
  | 'photo-sidebar'
  | 'photo-circle'
  | 'lawyer-classic'
  | 'minimal-pro'
  | 'pink-header'
  | 'dark-navy'
  | 'crimson'
  | 'fresher-india'
  | 'tech-modern'
  | 'business-classic'
  | 'fresher-minimal';

export interface ResumeData {
  id?: string;
  uid: string;
  title: string;
  template: ResumeTemplate;
  personalInfo: PersonalInfo;
  summary?: string; // For PhotoSidebarTemplate
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  certifications?: (string | { name: string })[]; // For PhotoSidebarTemplate
  projects: Project[];
  references?: Reference[]; // For CrimsonTemplate
  createdAt?: string;
  updatedAt?: string;
}

export const defaultResumeData: ResumeData = {
  uid: '',
  title: 'My Resume',
  template: 'premium',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    profileImage: '',
    linkedin: '',
    github: '',
    website: '',
  },
  education: [{ school: '', degree: '', year: '' }],
  experience: [{ company: '', position: '', duration: '', description: '' }],
  skills: [],
  languages: [],
  projects: [{ name: '', description: '', link: '' }],
};