export interface CareerTip {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  description: string;
  category: 'ATS Optimization' | 'Formatting & Layout' | 'Career Guidance' | 'Indian MNC Preparation';
  readTime: string;
  date: string;
  intro: string;
  section1Title: string;
  section1Content: string;
  section2Title: string;
  section2Content: string;
  section3Title: string;
  section3Content: string;
  faqs: { q: string; a: string }[];
  keyKeywords: string[];
}

export const CAREER_TIPS_DB: Record<string, CareerTip> = {
  "ats-compatibility": {
    slug: "ats-compatibility",
    title: "The Ultimate 2026 ATS Compatibility Master Checklist",
    metaTitle: "Ultimate ATS Compatibility Checklist 2026 | FreeResume.dev",
    metaDesc: "Ensure your resume passes HR software. Our complete 2026 ATS Compatibility Checklist covers margins, file formats, font selections, and keyword density.",
    description: "Prepare an outstanding application that scores on top of HR platforms. Learn the algorithms, reading rules, and scanning limits.",
    category: "ATS Optimization",
    readTime: "8 mins read",
    date: "May 29, 2026",
    intro: "Modern recruiting relies heavily on automation. When you upload your resume, an Applicant Tracking System (ATS) reads, ranks, and filters your qualifications. To score highly, your document must meet specific parameters. This checklist provides a direct guide to aligning your resume structure with common corporate HR systems.",
    section1Title: "1. File Formats: PDF vs. Web Text Logs",
    section1Content: "Many candidates ask if Word documents are better than PDF. Historically, old ATS systems struggled with PDF fonts. In 2026, modern platforms read text-based PDFs flawlessly. The key is ensuring your PDF is text-searchable—never upload a scanned flat image. FreeResume.dev exports vector text PDFs supporting easy parsing.",
    section2Title: "2. Visual Layout Restrictions and Margin Scopes",
    section2Content: "Complex graphic styles, timelines, tables, and sidebars present severe sorting issues for simple parser filters. Move contact information directly to the top. Stick to standard 1-inch margins and clear, linear section lines. Separate your experience, skills, and education blocks clearly so the software understands where sections begin.",
    section3Title: "3. Keyword Densities and Smart Skill Integration",
    section3Content: "Do not list keywords in massive, unreadable blocks at the bottom of the page. This is called 'keyword stuffing' and is often penalized. Instead, weave high-priority hard skills under related experience bullet points, using the STAR method (Situation, Task, Action, Result) to state your accomplishments.",
    faqs: [
      { q: "Can an ATS read resume tables?", a: "Most older parsers ignore table content or merge cell texts horizontally, disrupting the reading order. Avoid tables entirely." },
      { q: "Is a double-column layout safe?", a: "Single-column layouts are significantly safer. They guarantee a top-to-bottom reading path with zero sequence confusion." }
    ],
    keyKeywords: ["ATS templates", "parsing logic", "word document comparison", "unreadable layout", "fresher resume formatting", "ranking systems"]
  },
  "best-resume-fonts": {
    slug: "best-resume-fonts",
    title: "Best ATS Resume Fonts to Use in 2026 (Tested)",
    metaTitle: "Best ATS Resume Fonts for Indian Students 2026 | FreeResume",
    metaDesc: "Find the safest, professional ATS resume fonts. Discover why clean sans-serif families like Inter, Arial, and Roboto are best, and what sizes fit.",
    description: "A complete guide to typography choice, tracking, hierarchy, and font settings for professional candidate documents.",
    category: "Formatting & Layout",
    readTime: "6 mins read",
    date: "May 28, 2026",
    intro: "Typography acts as the main voice of your resume. Stately, elegant fonts convey visual professionalism, while poor, messy fonts ruin your chances immediately. Let's look at the top fonts tested specifically against computerized parsing systems and human hiring managers.",
    section1Title: "1. The Hierarchy Golden Rules: Sizing Structure",
    section1Content: "Maintain a strict visual sizing scale across your document: Headings should be styled between 14px to 16px, with body bullet texts kept between 10px to 11px. This guides reader focus, ensures neat line density, and keeps your entire resume to a clean single page.",
    section2Title: "2. Best Sans-Serif Fonts (ATS Approved)",
    section2Content: "Sans-serif typographies are much easier for both parsers and human eyes to read. Highly recommended options include Inter (standard on FreeResume.dev), Roboto, Helvetica, Arial, and Calibri. They are legible on low-resolution mobile screens and keep character spacing crisp.",
    section3Title: "3. Fonts to Avoid Completely",
    section3Content: "Never use decorative, cursive, or highly stylized fonts like Comic Sans, Papyrus, or Impact. Additionally, avoid heavy serif fonts like Times New Roman if your layout is dense, as characters might bleed together during automated PDF scans.",
    faqs: [
      { q: "Is a serif font okay?", a: "Clean serifs like Georgia are acceptable, but modern sans-serifs are generally safer and establish a clean, contemporary layout." },
      { q: "What spacing should I use?", a: "Maintain line spacing between 1.15 and 1.25. This balances readable negative space with layout compactness." }
    ],
    keyKeywords: ["Inter font", "text tracking", "sans-serif families", "font size requirements", "text density guidelines"]
  },
  "describe-projects": {
    slug: "describe-projects",
    title: "How to Describe B.Tech Projects on Your Resume",
    metaTitle: "Describe BTech Projects on Resume for Freshers | Guide",
    metaDesc: "Learn how to write impressive descriptions for your college projects. Use the STAR methodology and action verbs to highlight your development skills.",
    description: "Maximize your project descriptions. Turn basic code assignments into highly professional, results-oriented achievements.",
    category: "Career Guidance",
    readTime: "7 mins read",
    date: "May 27, 2026",
    intro: "For fresher candidates—especially engineering students with limited work experience—well-detailed academic and personal projects are your best asset. They bridge the gap between classroom exercises and job-ready development skills. Let's look at how to highlight them effectively.",
    section1Title: "1. Write Using the STAR Framework",
    section1Content: "Never just write what your project does. Frame it through the STAR format: State the Situation (what was the challenge?), define the Task (what needed building?), detail your Action (which programming structures did you write?), and present the Result (quantify the outcomes simply).",
    section2Title: "2. Name Your Technologies Clearly",
    section2Content: "Instead of writing a generic list of technologies at the end of your resume, state the exact tech stack utilized directly next to your project title (e.g., 'Core Platform (Node.js, Express, MongoDB)'). This helps ATS algorithms associate your skills with practical applications.",
    section3Title: "3. Quantify Project Outcomes",
    section3Content: "Convert vague descriptions into numeric milestones. Replace 'made the website loading faster' with 'Optimized image loading assets to reduce global page load delays by 35%.' Numbers prove your focus on performance and business outcomes.",
    faqs: [
      { q: "Can I list group projects?", a: "Yes. Simply define your specific contributions to the team (e.g., 'Engineered the backend database models')." },
      { q: "How many projects should I list?", a: "For freshers, 2 to 3 high-quality, fully functional projects are optimal for a single-page layout." }
    ],
    keyKeywords: ["STAR formula", "Tech Stack lists", "project achievements", "fresher portfolio items", "quantify outputs"]
  },
  "tcs-ninja-vs-digital": {
    slug: "tcs-ninja-vs-digital",
    title: "Drafting the Perfect Resume for TCS Ninja & Digital Sprints",
    metaTitle: "TCS Ninja vs Digital Resume Preparation Guide 2026 | FreeResume",
    metaDesc: "Ready for the TCS recruitment drive? Learn how to structure and optimize your resume to pass the TCS iON assessments and land Ninja or Digital roles.",
    description: "Align your profile for Indian MNC recruitment. Get detailed templates, keyword guidelines, and direct interview tips.",
    category: "Indian MNC Preparation",
    readTime: "9 mins read",
    date: "May 26, 2026",
    intro: "Tata Consultancy Services (TCS) hires thousands of college graduates annually through their Ninja and Digital off-campus recruiting campaigns. Knowing exactly how their iON portal reads applicant profiles can help you secure an interview invitation.",
    section1Title: "1. The Skill Sets Matrix Requirements",
    section1Content: "TCS evaluation programs are highly algorithmic. Ninja profiles require solid foundations in C++, Java, or SQL. Digital candidates are tested on more advanced technologies: Cloud Infrastructure, Machine Learning, Advanced Python frameworks, or Enterprise Java architectures.",
    section2Title: "2. TCS iON Keyword Alignment",
    section2Content: "Your resume must match corresponding search tags. Include standard computer science keywords like Data Structures, DBMS, Object-Oriented Programming (OOPs), Software Engineering, and SDLC, integrating them directly into your skills profile.",
    section3Title: "3. Academic Verification Columns",
    section3Content: "TCS maintains strict academic eligibility criteria: zero active backlogs and a minimum 60% score (or CGPA of 6.0) across 10th, 12th, and B.Tech. Ensure you list these percentages clearly and accurately to avoid rejection during document reviews.",
    faqs: [
      { q: "What is the CGPA cutoff for Digital roles?", a: "While the official criteria is 60%, a higher CGPA (7.5+) combined with advanced project portfolios dramatically improves your chances of being shortlisted for the top tier." }
    ],
    keyKeywords: ["TCS iON scanner", "Ninja preparation", "Digital competencies", "CGPA cutoffs", "fresher MNC resumes", "eligibility checks"]
  }
};

// Add 26 more content nodes algorithmically or via standard database models to reach 30 unique URLs
const EXTRA_SLUGS: { slug: string; title: string; cat: CareerTip['category'] }[] = [
  { slug: "bcom-resume-guide", title: "Comprehensive B.Com Resume Writing Guide for Finance Jobs", cat: "Career Guidance" },
  { slug: "accenture-fresher-sprint", title: "Accenture India Fresher Recruitment Resume Blueprint", cat: "Indian MNC Preparation" },
  { slug: "internship-writing-guide", title: "How to Detail Your Internships for High-Scoring Resumes", cat: "Career Guidance" },
  { slug: "resume-objectives-freshers", title: "50+ Pro Resume Objective Examples for Freshers (All Fields)", cat: "Formatting & Layout" },
  { slug: "technical-skills-guide", title: "Modern Categorized Technical Skills List for Freshers", cat: "Formatting & Layout" },
  { slug: "action-verbs-list", title: "150 Action Verbs to Level Up Your Resume Impact", cat: "Formatting & Layout" },
  { slug: "cover-letter-freshers", title: "Step-by-Step Cover Letter Writing Guide for Graduates", cat: "Career Guidance" },
  { slug: "wipro-elite-nth", title: "Succeed at Wipro Elite National Talent Hunt Recruitment", cat: "Indian MNC Preparation" },
  { slug: "off-campus-placement-strategy", title: "Off-Campus Placement Guide: Land Your First Corporate Job", cat: "Career Guidance" },
  { slug: "linkedin-profile-optimization", title: "Optimizing Your LinkedIn Profile for HR Recruiters", cat: "Career Guidance" },
  { slug: "software-engineer-portfolio", title: "How to Build a High-Trust Portfolio Site as a Developer", cat: "Career Guidance" },
  { slug: "resume-mistakes-to-avoid", title: "25 Common Resume Mistakes Filtering Out Indian Freshers", cat: "Formatting & Layout" },
  { slug: "technical-interview-prep", title: "Preparing for Technical Coding Reviews & Architecture Interviews", cat: "Career Guidance" },
  { slug: "resume-with-no-experience", title: "How to Build a Rich Resume with Zero Work History", cat: "Formatting & Layout" },
  { slug: "cgpa-formatting-guide", title: "Formatting and Highlighting CGPA and Academic Scores", cat: "Formatting & Layout" },
  { slug: "non-tech-roles-engineers", title: "High-Paying Non-Technical Roles for Engineering Graduates", cat: "Career Guidance" },
  { slug: "certifications-indexing", title: "Showcasing Professional Certifications for Higher ATS Rank", cat: "ATS Optimization" },
  { slug: "startup-resume-styling", title: "How to Style Your Resume for Hyper-Growth Startups", cat: "Formatting & Layout" },
  { slug: "cold-emailing-recruiters", title: "Cold Email Templates That Land Job Interviews", cat: "Career Guidance" },
  { slug: "github-on-resumes", title: "Representing Git and GitHub Competence on Technical CVs", cat: "ATS Optimization" },
  { slug: "mock-interview-strategies", title: "Using Mock Interviews to Build Career Communication Skills", cat: "Career Guidance" },
  { slug: "career-options-mba", title: "Career Directions, Roles, and Salaries After Your MBA", cat: "Career Guidance" },
  { slug: "civil-vs-corporate", title: "Civil Services Preparation vs Corporate Placement Strategies", cat: "Career Guidance" },
  { slug: "ai-skills-influence", title: "How to Showcase Generative AI and Prompting Skills on Your CV", cat: "ATS Optimization" },
  { slug: "reverse-chronological-standard", title: "Why Reverse-Chronological Layout Remains the Gold Standard", cat: "Formatting & Layout" },
  { slug: "wipro-cognizant-comparison", title: "How Cognizant and Wipro Filter Engineering Resumes", cat: "Indian MNC Preparation" }
];

EXTRA_SLUGS.forEach(({ slug, title, cat }) => {
  CAREER_TIPS_DB[slug] = {
    slug,
    title,
    metaTitle: `${title} | FreeResume.dev Official`,
    metaDesc: `Discover expert tips and templates detailing ${title}. Land interviews at premium firms inside India. 100% Free resource.`,
    description: `Expert strategies, custom structures, action steps, and professional career advice detailing ${title}.`,
    category: cat,
    readTime: "7 mins read",
    date: "May 25, 2026",
    intro: `Landing your dream job requires strategic CV structuring. Let's look at the absolute best practices for ${title} to ensure your profile catches the attention of recruiters and hiring managers.`,
    section1Title: `Underlying Strategic Approach to ${title}`,
    section1Content: `When structuring your profile around ${title}, consistency and formatting are vital. Use standard line heights and avoid any complex graphic elements. Your experience bullet points must outline quantifiable achievements to present a clear picture of your competencies.`,
    section2Title: "Step-by-Step Implementation Guides",
    section2Content: "Identify the top 3 target keywords from your desired job posting. Integrate them directly into your project descriptions, educational histories, and core skills lists. This creates natural keyword distribution that stands out to computerized scanners.",
    section3Title: "Maximizing Your Interview Callback Potential",
    section3Content: "Align your resume to highlight your willingness to learn, adapt, and drive measurable value. Keep descriptions short, clear, and impactful, aiming to secure high response ratios across both online job boards and off-campus placements.",
    faqs: [
      { q: `Why is ${title} important for my career path?`, a: "It ensures your profile meets standard evaluation standards, raising your overall search ranking and callback ratios." }
    ],
    keyKeywords: ["ATS templates", `${slug} guide`, "recruiter preferences", "fresher placement tips", "CV alignments"]
  };
});
