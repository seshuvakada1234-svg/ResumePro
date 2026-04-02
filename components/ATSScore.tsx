'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const ATSScore: React.FC<Props> = ({ data }) => {
  const calculateScore = () => {
    let score = 0;
    const suggestions: string[] = [];

    // Summary check
    if (data.personalInfo.summary && data.personalInfo.summary.length > 50) {
      score += 20;
    } else {
      suggestions.push('Improve your professional summary (aim for 50+ characters)');
    }

    // Skills check
    if (data.skills && data.skills.length >= 5) {
      score += 20;
    } else {
      suggestions.push('Add at least 5 key skills to improve discoverability');
    }

    // Experience check
    if (data.experience && data.experience.length > 0 && data.experience[0].company) {
      score += 20;
    } else {
      suggestions.push('Add detailed work experience with clear descriptions');
    }

    // Keywords check (simulated based on description length and variety)
    const hasKeywords = data.experience.some(exp => exp.description.length > 100) || data.skills.length > 8;
    if (hasKeywords) {
      score += 20;
    } else {
      suggestions.push('Include more industry-specific keywords in your experience descriptions');
    }

    // Education check
    if (data.education && data.education.length > 0 && data.education[0].school) {
      score += 20;
    } else {
      suggestions.push('Add your educational background');
    }

    return { score, suggestions };
  };

  const { score, suggestions } = calculateScore();

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Info size={20} className="text-indigo-500" />
          ATS Optimization Score
        </h3>
        <span className={`text-2xl font-black ${getScoreTextColor(score)}`}>{score}%</span>
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 font-medium">
          {score >= 80 ? 'Excellent! Your resume is highly optimized.' : 
           score >= 50 ? 'Good start, but there is room for improvement.' : 
           'Your resume needs significant optimization for ATS.'}
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-gray-50">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Suggestions</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle size={14} className="text-yellow-500 mt-0.5 shrink-0" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {score >= 80 && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-green-700 text-sm font-medium">
          <CheckCircle2 size={16} />
          Your resume follows best practices for ATS readability.
        </div>
      )}
    </div>
  );
};
