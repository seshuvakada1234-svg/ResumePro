'use client';

import React from 'react';
import { ResumeTemplate } from '@/types/resume';
import { Check, Eye, Layout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          {/* Thumbnail Placeholder (Real images would be in /public/templates/) */}
          <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <Layout size={48} />
            </div>
            {/* Overlay */}
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
