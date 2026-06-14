'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, ArrowRight, ArrowLeft, Clock, Calendar, CheckCircle2, 
  ChevronRight, Sparkles, Filter, Briefcase, Award, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS_DB, BlogPost } from '@/lib/blog-db';

export default function BlogRootPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'ATS Optimization' | 'Resume Writing' | 'Career Guidance' | 'Interview Prep'>('All');
  const [isLoading, setIsLoading] = useState(false);

  const posts = Object.values(BLOG_POSTS_DB);
  const categories: ('All' | 'ATS Optimization' | 'Resume Writing' | 'Career Guidance' | 'Interview Prep')[] = [
    'All', 'ATS Optimization', 'Resume Writing', 'Career Guidance', 'Interview Prep'
  ];

  // Simulating loading state for filtering to match high-end SaaS transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.keyKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-[#5B4DFF]/10 selection:text-[#5B4DFF]">
      
      {/* HEADER HERO */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B4DFF]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5B4DFF]/10 text-[#5B4DFF] rounded-full text-xs font-black tracking-widest uppercase">
            <BookOpen size={13} className="stroke-[3]" /> CAREER GUIDES & LEARNING RESOURCE
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Crack the Hiring Algorithms <br /> & Land Your <span className="text-[#5B4DFF] bg-gradient-to-r from-[#5B4DFF] to-indigo-600 bg-clip-text text-transparent">Dream Offer</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Expertly-curated guides on ATS optimization, professional resume formats, high-impact phrasing, and interview techniques.
          </p>

          {/* Sourcing badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-extrabold uppercase tracking-wider pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#5B4DFF]" /> 100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#5B4DFF]" /> ATS Validated
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#5B4DFF]" /> India Recruitment Optimized
            </span>
          </div>

        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-4 sm:p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tutorials, skills, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5B4DFF]/20 focus:border-[#5B4DFF] transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-[#0F172A] text-white shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-600 border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Featured Articles ({filteredPosts.length})</h2>
            <div className="h-px bg-slate-200 flex-1 mx-4 hidden sm:block" />
            <span className="text-xs text-slate-400 font-extrabold uppercase">Interactive Educational Grid</span>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-[24px] p-6 h-64 animate-pulse flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-200 rounded-lg w-1/4" />
                      <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
                      <div className="h-4 bg-slate-200 rounded-lg w-full" />
                    </div>
                    <div className="h-10 bg-slate-200 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="h-full"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col justify-between p-6 bg-white border border-slate-200/90 rounded-[24px] shadow-sm hover:shadow-xl hover:border-[#5B4DFF]/30 transition-all duration-300 h-full"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                            {post.icon}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                            {post.category}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#5B4DFF] transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-3">
                            {post.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-extrabold uppercase">
                          {post.date}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#5B4DFF] text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0">
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-slate-200/60 rounded-[28px] p-12 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto border">
                  <Filter size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800">No guides matching search</h3>
                  <p className="text-slate-400 text-sm">Try broadening your keywords or resetting the filter tags.</p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-4 py-2 bg-[#5B4DFF] text-white text-xs font-bold rounded-xl hover:bg-opacity-95"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>

    </div>
  );
}
