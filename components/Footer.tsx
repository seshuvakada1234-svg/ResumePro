'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Facebook, Linkedin, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50/50 py-12 md:py-16 mt-20" id="global-sitemap-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Rounded Card (Apple, Linear & Canva-inspired design) */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 md:p-12 shadow-sm space-y-12">
          
          {/* Responsive Grid System: Stacks on mobile (<768px), 2 columns on tablet, 4 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center md:text-left w-full">
            
            {/* Column 1: Brand Info */}
            <div className="w-full flex flex-col items-center md:items-start space-y-6">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="bg-gradient-to-r from-[#5B4DFF] to-indigo-600 p-2.5 rounded-xl shadow-inner">
                  <FileText className="text-white" size={20} />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">FreeResume</span>
              </Link>
              
              <p className="text-slate-500 font-medium text-sm leading-[1.8] w-full md:max-w-sm">
                Build professional ATS-friendly resumes, optimize your score, and download high-quality PDFs for free.
              </p>
              
              {/* Social row with gap-4 (16px) and perfect centering on mobile */}
              <div className="flex gap-4 justify-center md:justify-start w-full">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#5B4DFF]/10 text-slate-400 hover:text-[#5B4DFF] flex items-center justify-center transition-all duration-300 border border-slate-100"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#5B4DFF]/10 text-slate-400 hover:text-[#5B4DFF] flex items-center justify-center transition-all duration-300 border border-slate-100"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#5B4DFF]/10 text-slate-400 hover:text-[#5B4DFF] flex items-center justify-center transition-all duration-300 border border-slate-100"
                  aria-label="X (Twitter)"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#5B4DFF]/10 text-slate-400 hover:text-[#5B4DFF] flex items-center justify-center transition-all duration-300 border border-slate-100"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-[#5B4DFF]/10 text-slate-400 hover:text-[#5B4DFF] flex items-center justify-center transition-all duration-300 border border-slate-100"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (Rendered as premium card on mobile) */}
            <div className="w-full border border-slate-100 bg-slate-50/30 rounded-[20px] p-5 md:border-0 md:bg-transparent md:p-0">
              <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-500">
                <li>
                  <Link href="/" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/builder" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/ats-score" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    ATS Resume Checker
                  </Link>
                </li>
                <li>
                  <Link href="/resume-examples" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Resume Examples
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Career Guides
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support (Rendered as premium card on mobile) */}
            <div className="w-full border border-slate-100 bg-slate-50/30 rounded-[20px] p-5 md:border-0 md:bg-transparent md:p-0">
              <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase mb-5">Support</h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-500">
                <li>
                  <Link href="/about" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/#faq-section" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#5B4DFF] transition-colors py-1 block">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact (Rendered as premium card on mobile) */}
            <div className="w-full border border-slate-100 bg-slate-50/30 rounded-[20px] p-5 md:border-0 md:bg-transparent md:p-0 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase mb-5">Contact</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-semibold w-full">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#5B4DFF] shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">General Contact</span>
                    <a href="mailto:contact@freeresume.dev" className="hover:text-[#5B4DFF] transition-colors text-xs font-bold block truncate">contact@freeresume.dev</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#5B4DFF] shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Technical Support</span>
                    <a href="mailto:support@freeresume.dev" className="hover:text-[#5B4DFF] transition-colors text-xs font-bold block truncate">support@freeresume.dev</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#5B4DFF] shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Business & Ads</span>
                    <a href="mailto:ads@freeresume.dev" className="hover:text-[#5B4DFF] transition-colors text-xs font-bold block truncate">ads@freeresume.dev</a>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Section: Center Aligned everything */}
          <div className="border-t border-slate-100 pt-8 flex flex-col items-center justify-center gap-4 text-center">
            
            <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">
              © 2026 FreeResume.dev. Built with ❤️ for students, freshers and professionals.
            </p>

            <div className="flex items-center gap-2 sm:gap-4 uppercase tracking-wider text-[10px] font-black text-slate-400 justify-center">
              <Link href="/privacy" className="hover:text-[#5B4DFF] transition-colors">Privacy Policy</Link>
              <span className="text-slate-200">•</span>
              <Link href="/terms" className="hover:text-[#5B4DFF] transition-colors">Terms</Link>
              <span className="text-slate-200">•</span>
              <Link href="/contact" className="hover:text-[#5B4DFF] transition-colors">Contact</Link>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
