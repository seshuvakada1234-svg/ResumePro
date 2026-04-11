'use client';

import React, { useState } from 'react';
import { ResumeTemplate } from '@/types/resume';
import { Check, Eye, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import TemplateThumbnail from "@/components/TemplateThumbnail";
import { templates, categories } from "@/constants/templates";
import { AdBanner } from './AdBanner';

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: ResumeTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedId, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8 py-8">
      {/* Category Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border-2 ${
              selectedCategory === category
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map((template, index) => (
          <React.Fragment key={template.id}>
            <div
              className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 ${
                selectedId === template.id ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-100'
              }`}
            >
              <div className="relative bg-gray-50 flex items-center justify-center">
                <TemplateThumbnail Template={template.component} />

                {/* Hover overlay */}
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
                
                {/* ✅ UPDATED ATS Badge */}
                {template.ats && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-md">
                    <CheckCircle size={12} />
                    ATS FRIENDLY
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                    {template.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              {selectedId === template.id && (
                <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-10">
                  <Check size={14} />
                </div>
              )}
            </div>

            {/* Ad insertion */}
            {(index + 1) % 6 === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full">
                <AdBanner adSlot="template-grid-middle" className="my-8 px-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            No templates found in this category yet.
          </p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="mt-4 text-indigo-600 font-bold hover:underline"
          >
            View all templates
          </button>
        </div>
      )}
    </div>
  );
};