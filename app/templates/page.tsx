'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ResumeTemplate } from '@/types/resume';
import { AdBanner } from '@/components/AdBanner';
import { FileText, Home, Layout, Zap, Menu, X, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Auth } from '@/components/Auth';

export default function TemplatesPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume Templates',
        text: 'Check out these professional ATS resume templates!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <FileText className="text-white" size={20} />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
                Free<span className="text-indigo-600">Resume</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-500">
              <Link href="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Home size={16} /> Home
              </Link>
              <Link href="/templates" className="text-indigo-600 flex items-center gap-1.5">
                Templates
              </Link>
              <Link href="/tips" className="hover:text-indigo-600 transition-colors">
                ATS Tips
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                Contact
              </Link>
              <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Share2 size={16} /> Share
              </button>
              <Auth />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <Auth />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <Home size={18} /> Home
              </Link>
              <Link href="/templates" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm bg-indigo-50 text-indigo-600">
                <Layout size={18} /> Templates
              </Link>
              <Link href="/tips" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <Zap size={18} /> ATS Tips
              </Link>
              <Link href="/contact" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all">
                <Mail size={18} /> Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Choose Your <span className="text-indigo-600">Template</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed, ATS-optimized templates to get started.
          </p>
        </div>

        <TemplateSelector
          selectedId="modern"
          onSelect={(id: ResumeTemplate) => {
            router.push(`/?template=${id}`);
          }}
        />
        
        <AdBanner adSlot="templates-bottom" className="mt-16" />
      </main>
    </div>
  );
}
