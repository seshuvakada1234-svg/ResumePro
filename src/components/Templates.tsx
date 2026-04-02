import React, { useState } from 'react';
import { Layout, CheckCircle2, ArrowRight, LayoutTemplate, Star } from 'lucide-react';
import { ResumeTemplate } from '../types/resume';

const TEMPLATES: { id: ResumeTemplate; name: string; tag: string; color: string; thumb: string; popular: boolean; description: string; features: string[] }[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    tag: 'ATS Friendly',
    color: '#4f8fa3',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    popular: false,
    description: 'The standard choice for most industries. Clean, traditional, and highly readable.',
    features: ['Single column', 'Traditional fonts', 'ATS-friendly structure']
  },
  {
    id: 'modern',
    name: 'Modern Creative',
    tag: 'Premium',
    color: '#c8874a',
    thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
    popular: true,
    description: 'A contemporary look for tech and creative roles. Subtle use of color and modern typography.',
    features: ['Two-column layout', 'Modern sans-serif fonts', 'Skill bars']
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    tag: 'ATS Friendly',
    color: '#6b7280',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    popular: false,
    description: 'Focus on content with a clean, distraction-free design. Perfect for senior roles.',
    features: ['Ultra-clean design', 'Generous whitespace', 'Elegant typography']
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    tag: 'Premium',
    color: '#2d2d2d',
    thumb: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    popular: false,
    description: 'A sophisticated design for leadership positions. Projects authority and experience.',
    features: ['Bold headers', 'Professional color palette', 'Detailed sections']
  },
  {
    id: 'fresher-india',
    name: 'Fresher India',
    tag: 'Free',
    color: '#0ea5e9',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    popular: false,
    description: 'Specifically designed for freshers in India. Highlights education and projects.',
    features: ['Fresher focused', 'Clean layout', 'Easy to read']
  },
  {
    id: 'two-column',
    name: 'Two Column',
    tag: 'ATS Friendly',
    color: '#7c3aed',
    thumb: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    popular: false,
    description: 'A modern two-column layout that makes efficient use of space.',
    features: ['Two columns', 'Modern look', 'Highly organized']
  },
];

const TAG_COLORS: Record<string, string> = {
  'ATS Friendly': 'bg-green-100 text-green-700',
  'Premium':      'bg-amber-100 text-amber-700',
  'Free':         'bg-blue-100 text-blue-700',
};

interface TemplatesProps {
  onSelect: (templateId: ResumeTemplate) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ onSelect }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-12 py-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Professional <span className="text-indigo-600">Resume Templates</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from our collection of ATS-optimized templates designed to help you land your dream job in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((template) => (
          <div 
            key={template.id} 
            onMouseEnter={() => setHovered(template.id)}
            onMouseLeave={() => setHovered(null)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            style={{ transform: hovered === template.id ? 'translateY(-4px)' : 'translateY(0)' }}
          >
            <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
              <img 
                src={template.thumb} 
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {template.popular && (
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Popular
                </div>
              )}
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${hovered === template.id ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                  onClick={() => onSelect(template.id)}
                  className="bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-indigo-50 transition transform translate-y-4 group-hover:translate-y-0 transition-all"
                >
                  Use Template
                </button>
                <button className="bg-white/20 text-white border border-white/40 text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition transform translate-y-4 group-hover:translate-y-0 transition-all">
                  Preview
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${TAG_COLORS[template.tag] || 'bg-gray-100 text-gray-600'}`}>
                    {template.tag}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: template.color + '22' }}>
                  <LayoutTemplate className="w-4 h-4" style={{ color: template.color }} />
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {template.description}
              </p>
              <ul className="space-y-2">
                {template.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 size={14} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold">Need a custom design?</h3>
        <p className="text-indigo-100 max-w-xl mx-auto">
          Our builder allows you to customize colors, fonts, and layouts to create a unique resume that stands out.
        </p>
        <button 
          onClick={() => onSelect('classic')}
          className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
        >
          Start Building Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
