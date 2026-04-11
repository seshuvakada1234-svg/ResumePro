import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { TwoColumnTemplate } from "@/components/templates/TwoColumnTemplate";
import PremiumTemplate from "@/components/templates/PremiumTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { RedlineTemplate } from "@/components/templates/RedlineTemplate";
import { NavyTemplate } from "@/components/templates/NavyTemplate";
import { SerifTemplate } from "@/components/templates/SerifTemplate";
import PhotoSidebarTemplate from "@/components/templates/PhotoSidebarTemplate";
import PhotoCircleTemplate from "@/components/templates/PhotoCircleTemplate";
import LawyerClassicTemplate from "@/components/templates/LawyerClassicTemplate";
import MinimalProTemplate from "@/components/templates/MinimalProTemplate";
import PinkHeaderTemplate from "@/components/templates/PinkHeaderTemplate";
import DarkNavyTemplate from "@/components/templates/DarkNavyTemplate";
import CrimsonTemplate from "@/components/templates/CrimsonTemplate";
import BlackYellowTemplate from "@/components/templates/BlackYellowTemplate";

export const templateComponents: Record<string, any> = {
  'classic': ClassicTemplate,
  'modern': ModernTemplate,
  'minimal': MinimalTemplate,
  'two-column': TwoColumnTemplate,
  'premium': PremiumTemplate,
  'executive': ExecutiveTemplate,
  'redline': RedlineTemplate,
  'navy': NavyTemplate,
  'serif': SerifTemplate,
  'photo-sidebar': PhotoSidebarTemplate,
  'photo-circle': PhotoCircleTemplate,
  'lawyer-classic': LawyerClassicTemplate,
  'minimal-pro': MinimalProTemplate,
  'pink-header': PinkHeaderTemplate,
  'dark-navy': DarkNavyTemplate,
  'crimson': CrimsonTemplate,
  'black-yellow': BlackYellowTemplate,
};

export const categories = [
  'All',
  'Tech',
  'Healthcare',
  'Business',
  'Creative',
  'Legal & Finance',
  'Education',
  'Marketing',
  'Engineering',
  'Fresher',
];

export const templates = [
  {
    id: 'photo-sidebar',
    name: 'Photo Classic',
    category: 'Business',
    ats: false,
    description: 'Classic photo layout with serif font and clean section dividers.',
    thumbnail: '/templates/classic.png',
    component: PhotoSidebarTemplate,
  },
  {
    id: 'photo-circle',
    name: 'Photo Circle',
    category: 'Business',
    ats: false,
    description: 'Circular photo with gray sidebar and skills panel.',
    thumbnail: '/templates/modern.png',
    component: PhotoCircleTemplate,
  },
  {
    id: 'lawyer-classic',
    name: 'Lawyer Classic',
    category: 'Legal & Finance',
    ats: true,
    description: 'Dotted lines and gray headers. Perfect for legal professionals.',
    thumbnail: '/templates/classic.png',
    component: LawyerClassicTemplate,
  },
  {
    id: 'minimal-pro',
    name: 'Minimal Pro',
    category: 'Business',
    ats: true,
    description: 'Clean minimal serif layout for HR and management roles.',
    thumbnail: '/templates/minimal.png',
    component: MinimalProTemplate,
  },
  {
    id: 'pink-header',
    name: 'Pink Header',
    category: 'Business',
    ats: true,
    description: 'Pink top bar with left-aligned section labels and clean content.',
    thumbnail: '/templates/modern.png',
    component: PinkHeaderTemplate,
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    category: 'Business',
    ats: true,
    description: 'Traditional serif design, perfect for conservative industries.',
    thumbnail: '/templates/classic.png',
    component: ClassicTemplate,
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    category: 'Tech',
    ats: true,
    description: 'Bold headers and clean sans-serif typography.',
    thumbnail: '/templates/modern.png',
    component: ModernTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    category: 'Fresher',
    ats: true,
    description: 'Elegant whitespace and subtle typography.',
    thumbnail: '/templates/minimal.png',
    component: MinimalTemplate,
  },
  {
    id: 'two-column',
    name: 'Two Column',
    category: 'Engineering',
    ats: true,
    description: 'Efficient use of space with a dedicated sidebar.',
    thumbnail: '/templates/two-column.png',
    component: TwoColumnTemplate,
  },
  {
    id: 'premium',
    name: 'Premium Indigo',
    category: 'Marketing',
    ats: true,
    description: 'A professional two-column design with a bold indigo sidebar.',
    thumbnail: '/templates/premium.png',
    component: PremiumTemplate,
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    category: 'Legal & Finance',
    ats: true,
    description: 'Dark sidebar with gold accents. Perfect for senior roles.',
    thumbnail: '/templates/executive.png',
    component: ExecutiveTemplate,
  },
  {
    id: 'redline',
    name: 'Redline Bold',
    category: 'Creative',
    ats: true,
    description: 'Dark sidebar with striking red accents and timeline layout.',
    thumbnail: '/templates/redline.png',
    component: RedlineTemplate,
  },
  {
    id: 'navy',
    name: 'Navy Pro',
    category: 'Healthcare',
    ats: true,
    description: 'Navy blue sidebar with photo support and clean typography.',
    thumbnail: '/templates/navy.png',
    component: NavyTemplate,
  },
  {
    id: 'serif',
    name: 'Serif Classic',
    category: 'Education',
    ats: true,
    description: 'Elegant serif fonts with a dark photo sidebar. Timeless design.',
    thumbnail: '/templates/serif.png',
    component: SerifTemplate,
  },
  {
    id: 'dark-navy',
    name: 'Dark Navy',
    category: 'Business',
    ats: false,
    description: 'Dark navy sidebar with hexagon photo, skill bars and language circles.',
    thumbnail: '/templates/dark-navy.png',
    component: DarkNavyTemplate,
  },
  {
    id: 'crimson',
    name: 'Crimson',
    category: 'Business',
    ats: false,
    description: 'Crimson sidebar with diagonal cut, circular photo and references section.',
    thumbnail: '/templates/crimson.png',
    component: CrimsonTemplate,
  },
  {
    id: 'black-yellow',
    name: 'Black & Yellow Pro',
    category: 'Creative',
    ats: false,
    description: 'Bold black sidebar with yellow accents. Perfect for designers and creatives.',
    thumbnail: '/templates/modern.png',
    component: BlackYellowTemplate,
  },
];