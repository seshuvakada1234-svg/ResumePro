'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ResumeTemplate } from '@/types/resume';
import { AdBanner } from '@/components/AdBanner';
import { FileText, Home, Layout, Zap, Menu, X, Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Auth } from '@/components/Auth';

import { TemplatesSidebarATSCard } from '@/components/TemplatesSidebarATSCard';

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Choose Your <span className="text-indigo-600">Template</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Select from our professionally designed, ATS-optimized templates to get started.
              </p>
            </div>

            <TemplateSelector
              selectedId="modern"
              onSelect={(id: ResumeTemplate) => {
                router.push(`/?template=${id}`);
              }}
            />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <TemplatesSidebarATSCard />
              <AdBanner adSlot="templates-sidebar" adFormat="rectangle" className="h-[400px]" />
            </div>
          </div>
        </div>
        
        <AdBanner adSlot="templates-bottom" className="mt-16" />
      </main>
    </div>
  );
}
