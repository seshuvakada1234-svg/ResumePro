'use client';

import React from 'react';
import { ResumeTemplate } from '@/types/resume';
import { Check, Eye } from 'lucide-react';
import Link from 'next/link';
import TemplateThumbnail from "@/components/TemplateThumbnail";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { TwoColumnTemplate } from "@/components/templates/TwoColumnTemplate";
import PremiumTemplate from "@/components/templates/PremiumTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { RedlineTemplate } from "@/components/templates/RedlineTemplate";
import { NavyTemplate } from "@/components/templates/NavyTemplate";
import { SerifTemplate } from "@/components/templates/SerifTemplate";

const templateComponents: Record<string, any> = {
  'classic': ClassicTemplate,
  'modern': ModernTemplate,
  'minimal': MinimalTemplate,
  'two-column': TwoColumnTemplate,
  'premium': PremiumTemplate,
  'executive': ExecutiveTemplate,
  'redline': RedlineTemplate,
  'navy': NavyTemplate,
  'serif': SerifTemplate,
};

const templates = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional serif design, perfect for conservative industries.',
    thumbnail: '/templates/classic.png',
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Bold headers and clean sans-serif typography.',
    thumbnail: '/templates/modern.png',
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Elegant whitespace and subtle typography.',
    thumbnail: '/templates/minimal.png',
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Efficient use of space with a dedicated sidebar.',
    thumbnail: '/templates/two-column.png',
  },
  {
    id: 'premium',
    name: 'Premium Indigo',
    description: 'A professional two-column design with a bold indigo sidebar.',
    thumbnail: '/templates/premium.png',
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    description: 'Dark sidebar with gold accents. Perfect for senior roles.',
    thumbnail: '/templates/executive.png',
  },
  {
    id: 'redline',
    name: 'Redline Bold',
    description: 'Dark sidebar with striking red accents and timeline layout.',
    thumbnail: '/templates/redline.png',
  },
  {
    id: 'navy',
    name: 'Navy Pro',
    description: 'Navy blue sidebar with photo support and clean typography.',
    thumbnail: '/templates/navy.png',
  },
  {
    id: 'serif',
    name: 'Serif Classic',
    description: 'Elegant serif fonts with a dark photo sidebar. Timeless design.',
    thumbnail: '/templates/serif.png',
  },
];

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: ResumeTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
            selectedId === template.id ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-100'
          }`}
        >
          {/* FIX: removed aspect-[3/4] — it forced a fixed tall container that
              left a blank gap below the 202px thumbnail. Now the wrapper is
              sized naturally by TemplateThumbnail's own computed dimensions. */}
          <div className="relative bg-gray-50 flex items-center justify-center">
            <TemplateThumbnail Template={templateComponents[template.id]} />

            {/* Hover overlay — stretched to fill whatever height the thumbnail is */}
            <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
              <button
                onClick={() => onSelect(template.id as ResumeTemplate)}
                className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
              >
                <Check size={18} /> Use Template
              </button>
              <Link
                href={`/preview?template=${template.id}`}
                className="w-full py-2.5 bg-indigo-500/20 text-white font-bold rounded-xl border border-white/30 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <Eye size={18} /> Preview
              </Link>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{template.description}</p>
          </div>

          {selectedId === template.id && (
            <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
              <Check size={14} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};