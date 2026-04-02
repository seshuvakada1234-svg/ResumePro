export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
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

export type ResumeTemplate = 'classic' | 'modern' | 'minimal' | 'executive' | 'fresher-india' | 'two-column';

export interface ResumeData {
  id?: string;
  uid: string;
  title: string;
  template: ResumeTemplate;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  createdAt?: string;
  updatedAt?: string;
}

export const defaultResumeData: ResumeData = {
  uid: '',
  title: 'My Resume',
  template: 'classic',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [{ school: '', degree: '', year: '' }],
  experience: [{ company: '', position: '', duration: '', description: '' }],
  skills: [],
  projects: [{ name: '', description: '', link: '' }],
};
