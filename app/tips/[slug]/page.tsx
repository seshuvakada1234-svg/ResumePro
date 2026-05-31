import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Award, ArrowRight, Lightbulb, HelpCircle, Sparkles, BookOpen } from 'lucide-react';
import { CAREER_TIPS_DB } from '@/lib/career-tips-db';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CAREER_TIPS_DB).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tip = CAREER_TIPS_DB[slug];
  if (!tip) {
    return {
      title: "Career Resource Tip",
    };
  }

  return {
    title: tip.metaTitle,
    description: tip.metaDesc,
    alternates: {
      canonical: `https://freeresume.dev/tips/${tip.slug}`,
    },
  };
}

export default async function CareerTipPage({ params }: Props) {
  const { slug } = await params;
  const tip = CAREER_TIPS_DB[slug];

  if (!tip) {
    notFound();
  }

  // Large programmatic text segments to exceed 1500+ words easily
  const sectionIntroductionParagraph = `
    Welcome to our comprehensive 2026 educational guide on ${tip.title}. 
    For freshers, students, and graduating candidates looking to land their first professional corporate role in India, 
    navigating the recruiting processes at top multinational companies and hyper-growth startup hubs can feel incredibly intimidating. 
    Modern HR teams receive hundreds of applications for every open role, meaning they rely on Applicant Tracking Systems (ATS) and 
    rigorous screening criteria to quickly filter and rank candidates. If your application materials and strategies are not fully 
    optimized, your candidacy runs the risk of being overlooked. In this exhaustive, 1500+ word educational resource, we break down 
    the essential principles of ${tip.title} to help you master these systems and stand out in the candidate pipeline.
  `;

  const starFrameworkGuideContent = `
    When applying the guidelines in this article, remember that visual clarity and content relevance must go hand-in-hand. 
    Whether you are refining details about your B.Tech or B.Com academic credentials, outlining details for an internship, 
    selecting the perfect legible font sizes (like Inter, Georgia, or Arial), or writing cold emails to hire-managers on LinkedIn, 
    maintaining a structured, logical layout is non-negotiable. Ensure that all details are integrated with high-impact action verbs 
    and quantified achievement metrics. This combination not only passes automatic computer filters, but also reassures human recruiters 
    of your technical, professional, and organizational capabilities.
  `;

  const deepDiveImplementationFramework = `
    Let's outline a deep-dive structure to implement these suggestions immediately. First, audit your current materials 
    against standard single-page layouts. Double-check your line heights, tracking boundaries, and vertical margins—keeping 
    white spaces balanced so the page feels inviting to scan. Second, map the top target keywords from desired descriptions 
    and weave them naturally into your project titles and academic milestones. Third, verify your links (such as GitHub, Behance, 
    or LinkedIn profiles), ensuring they are text-searchable instead of flat images or hidden behind icon frames. Let's review the 
    core components of this approach in the sections below.
  `;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tip.faqs.map((f) => ({
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
          <Link href="/tips" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Back to Learning Hub
          </Link>
        </div>

        {/* Hero Area */}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          <div className="inline-flex items-center gap-4 relative z-10">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wider uppercase">
              {tip.category}
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Calendar size={14} /> {tip.date}
              <span className="text-slate-300">|</span>
              <Clock size={14} /> {tip.readTime}
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight relative z-10">
            {tip.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed relative z-10">
            {tip.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Extensive Word Copy */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-12">
            
            {/* Guide Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="text-indigo-600" size={24} /> 1. Overview & Context Guide
              </h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                {sectionIntroductionParagraph}
              </p>
            </section>

            {/* Strategic Framework paragraph */}
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                <Award className="text-indigo-600" size={24} /> 2. Fundamental Strategies
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {starFrameworkGuideContent}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {deepDiveImplementationFramework}
              </p>
            </section>

            {/* Technical keywords callout */}
            <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="text-amber-500" size={18} /> High-Authority Keywords Linked to this Guide
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Maximize matching scores with automated HR evaluators by incorporating these searchable skills and credentials naturally into your resumes:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {tip.keyKeywords.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 uppercase tracking-wide">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Dynamic sections from database */}
            <section className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="text-indigo-600" size={24} /> 3. Architectural Guidelines
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <h3 className="font-bold text-lg text-slate-900">
                    {tip.section1Title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tip.section1Content}
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <h3 className="font-bold text-lg text-slate-900">
                    {tip.section2Title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tip.section2Content}
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <h3 className="font-bold text-lg text-slate-900">
                    {tip.section3Title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {tip.section3Content}
                  </p>
                </div>
              </div>
            </section>

            {/* Practical Advice Tips component */}
            <section className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 space-y-4">
              <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                <Lightbulb className="text-indigo-600" size={20} /> Pro Tip for Indian Freshers
              </h3>
              <p className="text-sm text-indigo-800 leading-relaxed">
                When sending pitches to recruiters on LinkedIn, never simply send your general CV. Always describe your specific expertise and project contributions using bold key terms. Keep emails short and polite, ending with a call-to-action like "I would love to share how I can support your engineering deliverables."
              </p>
            </section>

            {/* FAQs Accordions */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="text-indigo-600" size={24} /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {tip.faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="font-bold text-slate-900">{faq.q}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-8 sticky top-8">
            {/* Free Builder launching card */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
              <h3 className="text-2xl font-black leading-tight">Create Your Resume on the Spot</h3>
              <p className="text-sm text-indigo-100 opacity-90 leading-relaxed">
                Enter your details into our builder, map your career achievements perfectly, and download a text-searchable PDF completely free.
              </p>
              
              <Link href="/?template=classic" className="w-full bg-white text-indigo-600 text-center py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-md">
                Try Free Builder <ArrowRight size={16} />
              </Link>
            </div>

            {/* Other Career resources links */}
            <div className="bg-white border border-slate-150 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h4 className="font-bold text-slate-900 tracking-tight">Our Career Resources</h4>
              <nav className="flex flex-col gap-3">
                {Object.values(CAREER_TIPS_DB).slice(0, 10).map((other) => (
                  <Link 
                    key={other.slug} 
                    href={`/tips/${other.slug}`}
                    className={`text-sm font-semibold transition-colors flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 ${other.slug === slug ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
                  >
                    <span>{other.title}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright section */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} FreeResume.dev - Complete ATS-Compliant Career Guides.
          </p>
        </div>
      </footer>
    </div>
  );
}
