import React from 'react';
import { Zap, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const PreviewFeatures = () => {
  const features = [
    {
      title: 'ATS Optimized',
      description: 'Tested against major ATS systems like TCS, Infosys, and Wipro.',
      icon: <Zap size={18} className="text-indigo-600" />,
    },
    {
      title: '100% Free',
      description: 'No hidden subscriptions. Everything is free for freshers.',
      icon: <CheckCircle2 size={18} className="text-indigo-600" />,
    },
    {
      title: 'Privacy First',
      description: 'Your data is secure. We don\'t store or share your personal info.',
      icon: <ShieldCheck size={18} className="text-indigo-600" />,
    },
    {
      title: 'Professional Design',
      description: 'Clean, modern, recruiter-friendly resume templates.',
      icon: <Award size={18} className="text-indigo-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex gap-3 hover:border-indigo-100 transition-all group"
        >
          <div className="bg-indigo-50 p-2 rounded-lg h-fit group-hover:bg-indigo-100 transition-colors">
            {feature.icon}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
