import { templates as existingTemplates } from '@/constants/templates';
import { ResumeTemplate } from '@/types/resume';

export interface TemplateMetadata {
  id: ResumeTemplate;
  name: string;
  category: string;
  ats: boolean;
  description: string;
  designStyle: string;
  atsSuitability: string;
  supportedSections: string[];
  recommendedFor: string[];
  previewUrl: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freeresume.dev';

export const MCP_TEMPLATES: TemplateMetadata[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    category: 'Business',
    ats: true,
    description: 'Traditional serif design with clean horizontal dividers, centered header, and linear section flow.',
    designStyle: 'Single-column traditional serif with horizontal rule dividers and centered header block.',
    atsSuitability: '100% ATS-Compliant — Simple linear hierarchy parseable by all legacy and modern ATS systems.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'achievements'],
    recommendedFor: ['Finance', 'Legal', 'Management Consulting', 'Corporate Roles', 'Healthcare Administration'],
    previewUrl: `${BASE_URL}/preview?template=classic`,
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    category: 'Tech',
    ats: true,
    description: 'Crisp sans-serif typography with high contrast indigo headers and clear timeline accents.',
    designStyle: 'Single-column modern sans-serif with subtle indigo accent highlights and timeline bullets.',
    atsSuitability: 'High — Standard header tags and sequential section markup make it easily readable by parsers.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'education', 'internships', 'certifications'],
    recommendedFor: ['Software Engineers', 'Product Managers', 'DevOps', 'Data Scientists', 'Tech Startups'],
    previewUrl: `${BASE_URL}/preview?template=modern`,
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    category: 'Fresher',
    ats: true,
    description: 'Elegant whitespace, refined typography, and distraction-free layout focusing entirely on achievements.',
    designStyle: 'Single-column minimalist layout with high whitespace, clean typography, and zero clutter.',
    atsSuitability: '100% ATS-Compliant — Clean text layout with no columns or complex graphic elements.',
    supportedSections: ['personalInfo', 'summary', 'education', 'skills', 'projects', 'experience', 'achievements'],
    recommendedFor: ['Recent Graduates', 'Entry-Level Roles', 'Academics', 'Researchers', 'General Business'],
    previewUrl: `${BASE_URL}/preview?template=minimal`,
  },
  {
    id: 'two-column',
    name: 'Two Column',
    category: 'Engineering',
    ats: true,
    description: 'Space-efficient two-column layout with dedicated technical sidebar for skills, contact, and education.',
    designStyle: 'Two-column structured grid with dedicated left sidebar for contact details and skills.',
    atsSuitability: 'High — Logical column separation retains clear semantic text blocks for ATS scanning.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'projects'],
    recommendedFor: ['Full-Stack Engineers', 'System Architects', 'Civil/Mechanical Engineers', 'IT Specialists'],
    previewUrl: `${BASE_URL}/preview?template=two-column`,
  },
  {
    id: 'premium',
    name: 'Premium Indigo',
    category: 'Marketing',
    ats: true,
    description: 'Two-column design featuring a bold indigo sidebar, structured experience timeline, and modern badges.',
    designStyle: 'Left sidebar with deep indigo background, high-contrast white text, and clean content panel.',
    atsSuitability: 'Good — High text-to-code ratio with standard headings, ideal for tech and agency applications.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'projects', 'certifications'],
    recommendedFor: ['Digital Marketers', 'Growth Leads', 'Content Strategists', 'UI/UX Designers'],
    previewUrl: `${BASE_URL}/preview?template=premium`,
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    category: 'Legal & Finance',
    ats: true,
    description: 'Commanding dark sidebar with gold and slate accents designed for senior leadership and director roles.',
    designStyle: 'Sidebar layout with slate-900 background, elegant gold headers, and spacious content cards.',
    atsSuitability: 'High — Uses standardized semantic headings while presenting a premium executive visual aesthetic.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'achievements', 'certifications'],
    recommendedFor: ['C-Suite Executives', 'Directors', 'VP of Engineering', 'Partners', 'Senior Leadership'],
    previewUrl: `${BASE_URL}/preview?template=executive`,
  },
  {
    id: 'redline',
    name: 'Redline Bold',
    category: 'Creative',
    ats: true,
    description: 'Dark sidebar with striking crimson red accents and a chronological timeline layout.',
    designStyle: 'Bold high-contrast sidebar with vivid red timeline markers and clean right column.',
    atsSuitability: 'Good — Standard text content with visually bold timeline markers that do not impede ATS parsers.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'education', 'achievements'],
    recommendedFor: ['Creative Directors', 'Game Designers', 'Video Editors', 'Brand Managers'],
    previewUrl: `${BASE_URL}/preview?template=redline`,
  },
  {
    id: 'navy',
    name: 'Navy Pro',
    category: 'Healthcare',
    ats: true,
    description: 'Deep navy sidebar with clean clinical typography, skill badges, and balanced white space.',
    designStyle: 'Classic two-column navy blue sidebar with crisp sans-serif body typography.',
    atsSuitability: 'High — Crisp section boundaries and unambiguous standard labels favored by hospital/health ATS systems.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'certifications', 'volunteerExperience'],
    recommendedFor: ['Healthcare Professionals', 'Nurses', 'Biomedical Engineers', 'Clinical Researchers', 'Pharmacists'],
    previewUrl: `${BASE_URL}/preview?template=navy`,
  },
  {
    id: 'serif',
    name: 'Serif Classic',
    category: 'Education',
    ats: true,
    description: 'Timeless serif typography with a dark photo sidebar, ideal for academic and publishing careers.',
    designStyle: 'Academic serif typography with deep charcoal sidebar and dignified section separators.',
    atsSuitability: '100% ATS-Compliant — Text-first hierarchy with clear standard academic sections.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'publications', 'achievements'],
    recommendedFor: ['Professors', 'Teachers', 'Publishers', 'Writers', 'Historians', 'Academic Researchers'],
    previewUrl: `${BASE_URL}/preview?template=serif`,
  },
  {
    id: 'photo-sidebar',
    name: 'Photo Classic',
    category: 'Business',
    ats: false,
    description: 'Classic photo layout with serif fonts, portrait placeholder, and clean section dividers.',
    designStyle: 'Portrait photo sidebar with serif body typography and warm neutral palette.',
    atsSuitability: 'Moderate — Best for direct human recruiters, client-facing consultants, and international CV formats.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    recommendedFor: ['Consultants', 'Real Estate Agents', 'Sales Executives', 'European/Middle East applications requiring photos'],
    previewUrl: `${BASE_URL}/preview?template=photo-sidebar`,
  },
  {
    id: 'photo-circle',
    name: 'Photo Circle',
    category: 'Business',
    ats: false,
    description: 'Circular photo badge with soft gray sidebar, skills rating panel, and contact icons.',
    designStyle: 'Circular avatar header with cool gray left panel and structured white main area.',
    atsSuitability: 'Moderate — Includes circular photo asset; ideal when applying directly or via LinkedIn recruiter messages.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'projects'],
    recommendedFor: ['Account Executives', 'Public Relations', 'Hospitality Managers', 'Customer Success'],
    previewUrl: `${BASE_URL}/preview?template=photo-circle`,
  },
  {
    id: 'lawyer-classic',
    name: 'Lawyer Classic',
    category: 'Legal & Finance',
    ats: true,
    description: 'Formal legal layout with dotted dividers, traditional Roman headers, and rigorous section spacing.',
    designStyle: 'Traditional single-column legal format with dotted line accents and conservative typography.',
    atsSuitability: '100% ATS-Compliant — Highly favored by legal and institutional compliance applicant tracking systems.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'certifications', 'references'],
    recommendedFor: ['Attorneys', 'Paralegals', 'Compliance Officers', 'Auditors', 'Risk Analysts'],
    previewUrl: `${BASE_URL}/preview?template=lawyer-classic`,
  },
  {
    id: 'minimal-pro',
    name: 'Minimal Pro',
    category: 'Business',
    ats: true,
    description: 'Clean minimal serif layout engineered specifically for HR, operations, and management roles.',
    designStyle: 'Minimalist editorial styling with elegant serif headers and generous margin breathing room.',
    atsSuitability: '100% ATS-Compliant — Flawless linear text parsing with universal standard headers.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'achievements'],
    recommendedFor: ['HR Managers', 'Operations Directors', 'Recruiters', 'Executive Assistants'],
    previewUrl: `${BASE_URL}/preview?template=minimal-pro`,
  },
  {
    id: 'pink-header',
    name: 'Pink Header',
    category: 'Business',
    ats: true,
    description: 'Vibrant pink top accent bar with left-aligned section labels and modern clean typography.',
    designStyle: 'Top banner accent with left-aligned section markers and two-level hierarchy.',
    atsSuitability: 'High — Top header accent does not obstruct text parser flow.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'languages'],
    recommendedFor: ['Communications', 'Event Planners', 'Brand Ambassadors', 'Design Strategists'],
    previewUrl: `${BASE_URL}/preview?template=pink-header`,
  },
  {
    id: 'dark-navy',
    name: 'Dark Navy',
    category: 'Business',
    ats: false,
    description: 'Dark navy sidebar with hexagon photo frame, visual skill bars, and language proficiency rings.',
    designStyle: 'Dark navy sidebar featuring geometric frames, skill progress bars, and high contrast accents.',
    atsSuitability: 'Moderate — Contains graphical skill bars; ideal for creative tech or direct email outreach.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'references'],
    recommendedFor: ['Frontend Developers', 'Graphic Designers', 'Creative Technologists'],
    previewUrl: `${BASE_URL}/preview?template=dark-navy`,
  },
  {
    id: 'crimson',
    name: 'Crimson',
    category: 'Business',
    ats: false,
    description: 'Crimson sidebar with modern diagonal cut, circular photo frame, and references block.',
    designStyle: 'Deep crimson sidebar with geometric diagonal division and circular photo asset.',
    atsSuitability: 'Moderate — Best suited for portfolio attachments, direct hiring manager review, or executive presentations.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', 'references'],
    recommendedFor: ['Marketing Executives', 'Agency Leads', 'Art Directors'],
    previewUrl: `${BASE_URL}/preview?template=crimson`,
  },
  {
    id: 'black-yellow',
    name: 'Black & Yellow Pro',
    category: 'Creative',
    ats: false,
    description: 'Bold black sidebar with energetic yellow accents designed specifically for creatives and visual thinkers.',
    designStyle: 'High-contrast midnight black sidebar with neon yellow accent borders and badges.',
    atsSuitability: 'Moderate — Visually striking portfolio style; recommended when submitting to creative agencies.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'education'],
    recommendedFor: ['UI/UX Designers', 'Motion Graphic Artists', 'Animators', 'Architects'],
    previewUrl: `${BASE_URL}/preview?template=black-yellow`,
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    category: 'Executive',
    ats: true,
    description: 'Ultra high-end design featuring champagne gold accents, rich slate tones, and refined executive spacing.',
    designStyle: 'Dark slate sidebar with champagne gold titles, fine rule dividers, and luxury styling.',
    atsSuitability: 'High — Semantic linear flow with luxury typographic styling.',
    supportedSections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'achievements', 'certifications'],
    recommendedFor: ['Managing Directors', 'Investment Bankers', 'Chief Strategy Officers', 'Senior Consultants'],
    previewUrl: `${BASE_URL}/preview?template=luxury-gold`,
  },
];

export function getTemplateById(id: string): TemplateMetadata | undefined {
  return MCP_TEMPLATES.find(t => t.id === id);
}

export function getAllTemplates(category?: string, atsFriendlyOnly?: boolean): TemplateMetadata[] {
  let list = MCP_TEMPLATES;
  if (category && category.toLowerCase() !== 'all') {
    list = list.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  if (atsFriendlyOnly) {
    list = list.filter(t => t.ats);
  }
  return list;
}
