import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Award, BookOpen, Sparkles } from 'lucide-react';
import { BLOG_POSTS_DB, BlogPost } from '@/lib/blog-db';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS_DB).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS_DB[slug];
  if (!post) {
    return {
      title: "Career Guide | FreeResume",
    };
  }

  return {
    title: `${post.title} | FreeResume Career Guides`,
    description: post.metaDesc,
    alternates: {
      canonical: `https://freeresume.dev/blog/${post.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS_DB[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-[#5B4DFF]/10 selection:text-[#5B4DFF] pb-24">
      
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#5B4DFF] font-black text-sm hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Career Guides
          </Link>
        </div>

        {/* HERO HEADER */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-8 md:p-16 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B4DFF]/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          
          <div className="flex flex-wrap items-center gap-4 relative z-10 text-xs text-slate-400 font-extrabold">
            <span className="px-3 py-1.5 bg-[#5B4DFF]/10 text-[#5B4DFF] rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">
              <Calendar size={13} className="text-slate-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1">
              <Clock size={13} className="text-slate-400" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight relative z-10">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-slate-500 font-semibold max-w-3xl leading-relaxed relative z-10">
            {post.description}
          </p>
        </div>

        {/* ARTICLE BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[32px] p-8 md:p-12 shadow-sm space-y-10">
            
            {/* Intro paragraph */}
            <section className="space-y-4">
              <span className="text-2xl">⚡</span>
              <p className="text-slate-600 font-medium text-base leading-relaxed italic border-l-4 border-slate-200 pl-4">
                {post.intro}
              </p>
            </section>

            {/* Rendered Chapters */}
            {post.sections.map((sect, i) => (
              <section key={i} className="space-y-4 border-t border-slate-100 pt-8 first:border-0 first:pt-0">
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {sect.title}
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                  {sect.content}
                </p>
              </section>
            ))}

            {/* Specific FAQS under post if present */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="space-y-6 border-t border-slate-100 pt-8">
                <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Award size={20} className="text-[#5B4DFF]" /> Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {post.faqs.map((f, i) => (
                    <div key={i} className="bg-slate-50/60 border border-slate-100 rounded-2xl p-5 space-y-2">
                      <p className="font-extrabold text-slate-800 text-sm">{f.q}</p>
                      <p className="text-slate-500 font-medium text-xs leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Widgets Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Build CTA */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-[28px] space-y-4 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B4DFF]/15 rounded-full blur-2xl" />
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#5B4DFF]">100% Free Builder</span>
                <h4 className="font-extrabold text-lg tracking-tight">Ready to build your high-scoring CV?</h4>
                <p className="text-slate-300 text-xs font-semibold leading-relaxed">
                  Put these guidelines directly into practice. Select an ATS-optimized template and export clean vector PDFs instantly.
                </p>
              </div>
              <Link 
                href="/templates" 
                className="block w-full py-3 bg-[#5B4DFF] hover:bg-opacity-90 transition-all font-extrabold text-xs text-center rounded-xl tracking-wide shadow-sm"
              >
                Choose Resume Template
              </Link>
            </div>

            {/* Sourced terms */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-[28px] space-y-4">
              <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Sparkles size={16} className="text-[#5B4DFF]" /> Priority Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.keyKeywords.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-extrabold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
