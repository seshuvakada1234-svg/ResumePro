import React from 'react';
import { CheckCircle2, AlertCircle, FileText, Search, Zap, Layout, Target, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';

const tips = [
  {
    icon: <FileText className="text-blue-500" />,
    title: 'Use a Standard Format',
    description: 'ATS systems prefer standard, simple formats. Avoid complex layouts, tables, or graphics that can confuse the software.'
  },
  {
    icon: <Search className="text-indigo-500" />,
    title: 'Optimize for Keywords',
    description: 'Identify keywords from the job description and naturally incorporate them into your resume, especially in the skills and experience sections.'
  },
  {
    icon: <Zap className="text-yellow-500" />,
    title: 'Focus on Achievements',
    description: 'Use action verbs and quantify your results. Instead of "Responsible for sales," say "Increased sales by 20% over 6 months."'
  },
  {
    icon: <Layout className="text-purple-500" />,
    title: 'Keep it Simple',
    description: 'Stick to common fonts like Arial, Calibri, or Times New Roman. Use standard section headings like "Experience" and "Education."'
  },
  {
    icon: <Target className="text-red-500" />,
    title: 'Tailor Each Resume',
    description: 'Customize your resume for every job application. A generic resume is less likely to pass the ATS screening.'
  },
  {
    icon: <Sparkles className="text-green-500" />,
    title: 'Check for Errors',
    description: 'Spelling and grammar mistakes can lead to rejection. Proofread your resume multiple times and use tools like Grammarly.'
  }
];

export const ATSTips: React.FC = () => {
  return (
    <div className="space-y-12 py-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          ATS <span className="text-indigo-600">Resume Tips</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master the Applicant Tracking System (ATS) and get your resume noticed by top recruiters in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip, i) => (
          <React.Fragment key={i}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {tip.description}
              </p>
            </div>
            {/* Ad insertion: after 2nd and 5th tips */}
            {(i === 1 || i === 4) && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <AdBanner adSlot={`ats-tips-middle-${i}`} className="my-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Common ATS Mistakes to Avoid</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-red-50 p-2 rounded-lg h-fit">
                  <AlertCircle className="text-red-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Using Images or Icons</h4>
                  <p className="text-sm text-gray-500">ATS systems often cannot read text embedded in images or icons. Keep it text-based.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-red-50 p-2 rounded-lg h-fit">
                  <AlertCircle className="text-red-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Uncommon Section Titles</h4>
                  <p className="text-sm text-gray-500">Stick to standard titles like "Work Experience" instead of "My Journey" or "Where I've Been."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-red-50 p-2 rounded-lg h-fit">
                  <AlertCircle className="text-red-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Putting Info in Headers/Footers</h4>
                  <p className="text-sm text-gray-500">Some ATS systems ignore information placed in the header or footer of a document.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">The Golden Rule</h3>
            <p className="text-gray-600 leading-relaxed">
              "Write for the ATS, but design for the human. Your resume needs to pass the software screening first, but it ultimately needs to impress a human recruiter."
            </p>
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-indigo-100">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <CheckCircle2 className="text-white" size={20} />
              </div>
              <span className="font-bold text-indigo-900">100% ATS Compatible Templates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
