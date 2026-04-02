import React from 'react';
import { motion } from 'motion/react';
import { Layout, Check } from 'lucide-react';
import { ResumeTemplate } from '../types/resume';
import { cn } from '../lib/utils';

interface TemplateSelectorProps {
  selected: ResumeTemplate;
  onChange: (template: ResumeTemplate) => void;
}

const templates: { id: ResumeTemplate; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional & Professional' },
  { id: 'modern', name: 'Modern', description: 'Clean & Eye-catching' },
  { id: 'minimal', name: 'Minimal', description: 'Simple & Elegant' },
  { id: 'creative', name: 'Creative', description: 'Vibrant & Artistic' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onChange }) => {
  return (
    <section className="space-y-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Layout className="text-indigo-600" size={20} />
        <h3 className="text-lg font-bold text-gray-900">Choose Template</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {templates.map((template) => {
          const isActive = selected === template.id;
          
          return (
            <motion.button
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(template.id)}
              className={cn(
                "relative flex-1 min-w-[140px] p-4 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-left group",
                isActive 
                  ? "border-indigo-600 bg-indigo-50 shadow-md" 
                  : "border-gray-100 bg-gray-50 hover:border-gray-200"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  isActive ? "text-indigo-700" : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {template.name}
                </span>
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-medium opacity-70",
                  isActive ? "text-indigo-600" : "text-gray-400"
                )}>
                  {template.description}
                </span>
              </div>

              {isActive && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-2 right-2 bg-indigo-600 text-white p-0.5 rounded-full"
                >
                  <Check size={10} strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
