'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Target, 
  Zap, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  MessageSquare, 
  Heart 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Empowering the Next Generation
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                About FreeResume: <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Land Your Dream Job
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                Welcome to the official <strong>FreeResume.dev</strong>. We simplify resume creation with high-authority, ATS-friendly templates designed for the modern job market.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/" 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
                >
                  Create Resume Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 bg-gray-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
              <Target className="text-indigo-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed text-left">
              The mission of <strong>FreeResume</strong> is to democratize career growth. We believe every student deserves a fair chance at their first job without the burden of expensive tools. <strong>FreeResume.dev</strong> removes complexity and provides freshers with professional, ATS-friendly resumes at zero cost.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-gray-500">Everything you need to build a winning resume in minutes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="text-amber-500" size={24} />,
                  title: "ATS-Optimized Templates",
                  desc: "Designed to pass Applicant Tracking Systems used by major companies."
                },
                {
                  icon: <FileText className="text-indigo-500" size={24} />,
                  title: "Easy Resume Builder",
                  desc: "Create a professional resume in minutes with guided, simple steps."
                },
                {
                  icon: <ShieldCheck className="text-green-500" size={24} />,
                  title: "Completely Free",
                  desc: "No hidden charges. Build and download resumes without paying a single rupee."
                },
                {
                  icon: <Globe className="text-blue-500" size={24} />,
                  title: "Made for India",
                  desc: "Focused on Indian students, freshers, and job seekers entering the market."
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us?</h2>
                <div className="space-y-6">
                  {[
                    "Simple and fast builder experience",
                    "No signup required — start building instantly",
                    "Mobile-friendly experience for building on the go",
                    "Instant high-quality PDF download",
                    "Designed for real hiring systems and human recruiters"
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="bg-white/20 p-1 rounded-full">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                      <span className="text-lg font-medium text-indigo-50">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 transform rotate-3">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/20 rounded-full" />
                    <div className="h-4 w-1/2 bg-white/20 rounded-full" />
                    <div className="h-32 w-full bg-white/10 rounded-2xl" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-12 bg-white/20 rounded-xl" />
                      <div className="h-12 bg-white/20 rounded-xl" />
                      <div className="h-12 bg-white/20 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-50 rounded-xl mb-6">
                <Heart className="text-pink-500" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative">
              <div className="absolute -top-4 -left-4 text-6xl text-indigo-100 font-serif">“</div>
              <p className="text-xl text-gray-600 leading-relaxed italic text-center">
                "FreeResume started with a simple goal — to help students who struggle to create resumes that actually get noticed. While many tools are expensive or complicated, the official FreeResume.dev makes it accessible, simple, and highly effective for everyone entering the Indian job market."
              </p>
              <div className="absolute -bottom-4 -right-4 text-6xl text-indigo-100 font-serif">”</div>
            </div>
          </div>
        </section>

        {/* Contact / Support */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-500">Have questions or feedback? We're here to help.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mail className="text-indigo-600" size={24} />,
                  label: "General Contact",
                  email: "contact@freeresume.dev"
                },
                {
                  icon: <MessageSquare className="text-blue-600" size={24} />,
                  label: "Technical Support",
                  email: "support@freeresume.dev"
                },
                {
                  icon: <Zap className="text-amber-600" size={24} />,
                  label: "Business & Ads",
                  email: "ads@freeresume.dev"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mb-6">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</h4>
                  <a href={`mailto:${item.email}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                    {item.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
