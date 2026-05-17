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
                console.log('Template selected:', id);
                localStorage.setItem('selectedTemplate', id);
                router.push('/builder');
              }}
            />

            <div className="mt-24 prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Understanding Our ATS Resume Templates</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Every template on <strong>FreeResume.dev</strong> is built with one goal: to help you clear the first hurdle of the job application process. Major recruiters in India, such as <strong>TCS, Infosys, and HDFC</strong>, use software to scan your resume. If your template is too complex, the software fails.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">What makes a template ATS-friendly?</h3>
                  <ul className="space-y-3 text-gray-600 list-disc pl-5">
                    <li><strong>Parseable Text:</strong> No information is trapped inside images or non-standard text boxes.</li>
                    <li><strong>Clear Hierarchy:</strong> Standard headings like "Work Experience" and "Education" are used to guide the software.</li>
                    <li><strong>Standard Ordering:</strong> Information is laid out in a way that logic-driven systems can follow.</li>
                    <li><strong>Inter Font Family:</strong> We use clean, sans-serif fonts that are easy for both machines and humans to read.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">How to choose the right one?</h3>
                  <p className="text-gray-600 mb-4">The choice depends on your industry and career level:</p>
                  <ul className="space-y-2 text-gray-600 list-inside list-decimal pl-2 font-medium">
                    <li><strong>Classic Professional:</strong> Best for high-volume corporate roles and engineering roles (TCS, WIPRO).</li>
                    <li><strong>Modern Minimal:</strong> Best for startups, product companies, and design roles.</li>
                    <li><strong>Premium Executive:</strong> Best for those with some internship or leadership experience.</li>
                  </ul>
                </div>
              </div>
            </div>
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
