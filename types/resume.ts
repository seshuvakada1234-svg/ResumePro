export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profileImage?: string;
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
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
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
  | 'fresher-india';

export interface ResumeData {
  id?: string;
  uid: string;
  title: string;
  template: ResumeTemplate;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
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