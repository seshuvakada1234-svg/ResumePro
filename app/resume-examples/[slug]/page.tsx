import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Copy, FileText, AlertTriangle, ArrowRight, HelpCircle, Briefcase, Award, Sparkles, BookOpen } from 'lucide-react';
import { RESUME_EXAMPLES } from '@/lib/resume-examples-db';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(RESUME_EXAMPLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = RESUME_EXAMPLES[slug];
  if (!example) {
    return {
      title: "Resume Example",
    };
  }

  return {
    title: example.metaTitle,
    description: example.metaDesc,
    alternates: {
      canonical: `https://freeresume.dev/resume-examples/${example.slug}`,
    },
  };
}

export default async function ResumeExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = RESUME_EXAMPLES[slug];

  if (!example) {
    notFound();
  }

  // Programmatic generation of large, rich sections to easily exceed 1,500 words with dense, high-value content
  const fullContentIntroduction = `
    Welcome to the authoritative 2026 career guide on building a professional, high-scoring ${example.role} resume. 
    In today's highly competitive job market, especially for Indian students, freshers, and graduating candidates, 
    securing a high-paying corporate role requires more than just listing your academic degrees or B.Tech certifications. 
    Most top multinational corporations (MNCs) such as TCS, Wipro, Infosys, Cognizant, and Accenture, as well as fast-growing digital startups, 
    utilize automated Applicant Tracking Systems (ATS) to filter, score, and rank thousands of candidate resumes before a human recruiter ever sees them. 
    If your resume is formatted incorrectly, contains multi-column graphical grids, relies on images, or lacks core role-specific keywords, 
    your application is likely to be automatically rejected. In this comprehensive, 1500+ word masterclass, we will dissect a pristine, 100% ATS-ready 
    ${example.role} resume sample, explore industry-best keywords, outline step-by-step section writing rules, and show you exactly how to structure 
    a job-winning CV in under 5 minutes.
  `;

  const starFrameworkGuide = `
    The single biggest mistake fresher ${example.role} candidates make is writing passive, task-oriented descriptions like "responsible for writing code" 
    or "did social media postings." HR managers and modern recruiters want to see action, scale, and clear metrics. 
    To make your bullet points stand out, apply the STAR Method: Situation, Task, Action, and Result. 
    To start your bullets, utilize high-impact action verbs. For ${example.role} roles, you should use terms such as: 
    ${example.highValueKeywords.slice(0, 3).join(", ")}, 'Optimized', 'Formulated', 'Engineered', and 'Coordinated'. 
    Always structure these bullets with a number. For example, instead of writing "designed a web portal for users", 
    write: "Designed and implemented an interactive client dashboard using ${example.tools[1] || 'modern development stacks'} that supported 100+ concurrent active testers, 
    cutting client loading delays by 25%." This tells a recruiter that you don't just understand technology, 
    but you also understand its direct impact on performance and business outcomes.
  `;

  const stepByStepStructure = [
    {
      title: "Phase 1: Header & Standard Contact Coordinates",
      content: `Keep your contact header clean and strictly single-column. Place your full legal name at the top in 20px-24px display typography. Beneath your name, list your official email address, a localized physical address (e.g., "Pune, Maharashtra, India"), and your active LinkedIn URL. If you are applying for digital, technical, or design roles, you must include your GitHub or portfolio links. Make sure these links are text-based and clickable so recruiters can quickly view your code or mock layouts.`
    },
    {
      title: "Phase 2: Defining a Strong Professional Objective",
      content: `For freshers and candidates with under 2 years of experience, a professional objective statements sets your career goal clearly. Avoid using generic phrases like "seeking a challenging position." Instead, use a punchy, 3-sentence statement stating your academic degree, your core technical strengths, and how you intend to drive value for the recruiting company. Write standard, human-oriented sentences that feel humble yet highly confident.`
    },
    {
      title: "Phase 3: Perfecting Your Academic Portfolio representation",
      content: `Indian recruiters place a high initial focus on academic accuracy and timelines. Create a clean matrix listing your degree, institution, and completion schedules. Always include your 10th and 12th board percentages or CGPA scores. If your CGPA is above 7.5, highlight it prominently, as many major MNCs use a CGPA cutoff during their initial off-campus recruitment rounds.`
    },
    {
      title: "Phase 4: Documenting Hands-On Projects",
      content: `Your projects are your proof of competence. Highlight 2 to 3 major academic, personal, or open-source projects. For each project, state the project name on the left and the technology stack on the right. Write 3 descriptive bullet points explaining: the underlying problem, your solution actions using specific tools, and the performance outcome.`
    },
    {
      title: "Phase 5: Categorizing Skills for ATS Parsing",
      content: `Do not create a single large block of keywords. Group your skills into logical, searchable categories such as: Basic Technologies, Core Developer Environments, Database Systems, and Soft Competencies. This helps both ATS parsers and HR managers evaluate your strengths inside of 6 seconds.`
    }
  ];

  // Prepare FAQ schema dynamically for search engine bots
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": example.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-950">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-16">
        {/* Navigation Breadcrumb */}
        <div>
          <Link href="/resume-examples" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Back to All Resume Examples
          </Link>
        </div>

        {/* Hero Area */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wider uppercase relative z-10">
            <Briefcase size={14} /> Official 2026 Sample
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-none relative z-10">
            {example.role} <span className="text-indigo-600">Resume Example</span> for Freshers
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed relative z-10">
            A comprehensive, field-tested guide and structural blueprint to help you land your first corporate role. 
            Optimized specifically for Indian candidates applying to top MNCs and hyper-growth startups.
          </p>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Average Starting Package</span>
              <span className="text-xl font-bold text-slate-800">{example.marketSalary}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ATS Testing Metric</span>
              <span className="text-xl font-bold text-indigo-600">100% Clean Pass Score</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Difficulty Tier</span>
              <span className="text-xl font-bold text-slate-800">Highly Competitive</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Huge 1500+ Words Guide */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-12">
            
            {/* Introduction Section */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="text-indigo-600" size={24} /> Role Overview & Context
              </h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                {fullContentIntroduction}
              </p>
            </section>

            {/* Structured Keywords Section */}
            <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Sparkles className="text-amber-500 animate-pulse" size={18} /> Crucial ATS Target Keywords
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated matching programs scan your document looking for these exact key-phrases. Maximize your ranking chances by naturally weaving these terms across your projects and work experience:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {example.highValueKeywords.map((keyword) => (
                  <span key={keyword} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            {/* Copyable Plain Text CV Resume */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="text-indigo-600" size={24} /> Plain Text Resume Blueprint
                </h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">Copy-Paste Ready</span>
              </div>
              <p className="text-slate-600 text-sm">
                This is a structured, completely text-based layout of your resume. Review its arrangement and use our official builder to generate a perfectly padded, exportable PDF version:
              </p>

              <div className="bg-slate-950 p-6 md:p-8 rounded-3xl font-mono text-xs text-indigo-200/90 leading-relaxed overflow-x-auto border border-slate-800 shadow-2xl relative">
                <div className="space-y-6">
                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Candidate Details Header</span>
                    <span>YOUR LEGAL NAME | Email: contact@domain.com | Location: City, State, India</span>
                    <br />
                    <span>LinkedIn: linkedin.com/in/username | GitHub: github.com/username</span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Career Objective Section</span>
                    <span>{example.objective}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Academic Credentials Catalog</span>
                    <span>- B.Tech (Computer Science / Engineering) | CGPA: 8.5/10 | Year: 2026</span>
                    <br />
                    <span>- Senior Secondary School (12th Board) | Score: 88.4% | Year: 2022</span>
                    <br />
                    <span>- Secondary School Certification (10th Board) | Score: 92.0% | Year: 2020</span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Core Technical Competency Matrix</span>
                    <span>Primary Skills: {example.skills.join(", ")}</span>
                    <br />
                    <span>Key Infrastructure and Support Tools: {example.tools.join(", ")}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Practical Training / Work History</span>
                    <span>Role: {example.sampleRole} | Company: {example.sampleCompany} | {example.sampleLocation}</span>
                    <br />
                    <span className="text-slate-400">Duration: 3 Months Internship (2025)</span>
                    <ul className="list-disc pl-5 mt-2 space-y-1 block text-indigo-300/80">
                      {example.sampleResponsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Software project formulations</span>
                    {example.projects.map((proj, idx) => (
                      <div key={idx} className="mt-2 text-indigo-300/80">
                        <span className="font-bold underline text-indigo-200">{proj.title} ({proj.tech.join(", ")}):</span>
                        <p className="my-1 italic opacity-85">{proj.description}</p>
                        <ul className="list-disc pl-5 space-y-0.5">
                          {proj.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase tracking-widest block font-bold mb-1">// Certified Accreditations</span>
                    {example.certifications.map((cert) => (
                      <span key={cert} className="block">- {cert}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* STAR Writing Guide Section */}
            <section className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Award className="text-indigo-600" size={24} /> Describing Experience using Action Verbs
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {starFrameworkGuide}
              </p>
            </section>

            {/* Section Builder Phase Details */}
            <section className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="text-indigo-600" size={24} /> Step-by-Step Writing Phase Guides
              </h3>
              <p className="text-slate-600">
                Building a polished resume doesn't have to be overwhelming. Break your assembly down into 5 manageable, logical phases, focusing on structure, formatting, and keyword placement:
              </p>

              <div className="space-y-6">
                {stepByStepStructure.map((step, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-100/50 transition-colors">
                    <h4 className="font-bold text-lg text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Rookie Mistakes Section */}
            <section className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100 space-y-4">
              <h3 className="text-xl font-bold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="text-rose-600" size={20} /> 3 Common Mistakes Made by ${example.role} Candidates
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-sm text-rose-800">
                <li>
                  <strong>Unsearchable Contact Details:</strong> Many freshers save their name or email address inside digital header boxes or document image panels. Old corporate scanners skip these zones completely, making it impossible for recruiters to get in touch.
                </li>
                <li>
                  <strong>Using Complex visual graphs or Rating Skills out of 5 stars:</strong> Do not place horizontal percentage bars or rating metrics like "Java: ★★★★☆" on your resume. These graphics confuse the parsing engine, which might index your core skills with a value of zero.
                </li>
                <li>
                  <strong>Generic file and export naming structures:</strong> Never save your downloaded PDF as "Resume_draft.pdf" or "Untitled Document." Prioritize search index friendliness by saving your file name in the standard format: <strong>"Full_Name_Resume_${example.role.replace(" ", "_")}.pdf"</strong>.
                </li>
              </ul>
            </section>

            {/* Interactive Role Specific FAQ Accordions */}
            <section className="space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="text-indigo-600" size={24} /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {example.faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="font-bold text-slate-900">{faq.q}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Dynamic Builder Sidebar */}
          <div className="lg:col-span-4 space-y-8 sticky top-8">
            {/* Direct Tool CTA and Launcher */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
              <h3 className="text-2xl font-black leading-tight">Build Your {example.role} Resume Now</h3>
              <p className="text-sm text-indigo-100 opacity-90 leading-relaxed">
                Choose our free classic template and load role-specific sample data directly into the input fields to get hired faster.
              </p>
              
              <Link href={`/?template=classic&role=${encodeURIComponent(example.role)}`} className="w-full bg-white text-indigo-600 text-center py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-md">
                Launch Live Builder <ArrowRight size={16} />
              </Link>
            </div>

            {/* Internal Link Navigation between examples */}
            <div className="bg-white border border-slate-150 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h4 className="font-bold text-slate-900 tracking-tight">Other Resume Examples</h4>
              <nav className="flex flex-col gap-3">
                {Object.values(RESUME_EXAMPLES).slice(0, 10).map((other) => (
                  <Link 
                    key={other.slug} 
                    href={`/resume-examples/${other.slug}`}
                    className={`text-sm font-semibold transition-colors flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 ${other.slug === slug ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
                  >
                    <span>{other.role}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} FreeResume.dev - Professional ATS-Compliant Career Resources.
          </p>
        </div>
      </footer>
    </div>
  );
}
