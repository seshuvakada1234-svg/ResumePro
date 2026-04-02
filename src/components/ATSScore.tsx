import React, { useState, useMemo } from 'react';
import { ResumeData } from '../types/resume';
import { CheckCircle2, AlertCircle, Info, Zap, Search, Plus, X, Sparkles } from 'lucide-react';

interface ATSScoreProps {
  data: ResumeData;
}

const SUGGESTED_KEYWORDS = [
  'Java', 'Python', 'React', 'Node.js', 'SQL', 'Data Structures', 'Algorithms', 
  'Problem Solving', 'Communication', 'Teamwork', 'Git', 'JavaScript', 'C++',
  'Machine Learning', 'Cloud Computing', 'Leadership', 'Analytical'
];

export const ATSScore: React.FC<ATSScoreProps> = ({ data }) => {
  const [targetKeywords, setTargetKeywords] = useState<string[]>(['React', 'Problem Solving', 'Git']);
  const [newKeyword, setNewKeyword] = useState('');

  const keywordMatches = useMemo(() => {
    const allText = [
      data.personalInfo.summary,
      ...data.experience.map(exp => `${exp.position} ${exp.company} ${exp.description}`),
      ...data.projects.map(proj => `${proj.name} ${proj.description}`),
      ...data.skills,
      ...data.education.map(edu => `${edu.school} ${edu.degree}`)
    ].join(' ').toLowerCase();

    return targetKeywords.filter(kw => allText.includes(kw.toLowerCase()));
  }, [data, targetKeywords]);

  const calculateScore = () => {
    let score = 0;
    const { personalInfo, education, experience, skills, projects } = data;

    // Contact Info (15%)
    if (personalInfo.fullName) score += 5;
    if (personalInfo.email) score += 5;
    if (personalInfo.phone) score += 5;

    // Summary (15%)
    if (personalInfo.summary) {
      if (personalInfo.summary.length > 150) score += 15;
      else if (personalInfo.summary.length > 50) score += 10;
      else score += 5;
    }

    // Education (15%)
    if (education.length > 0) {
      const firstEdu = education[0];
      if (firstEdu.school && firstEdu.degree && firstEdu.year) score += 15;
      else if (firstEdu.school) score += 10;
    }

    // Experience (20%)
    if (experience.length > 0) {
      experience.forEach((exp, idx) => {
        if (idx === 0) {
          if (exp.company && exp.position && exp.duration) score += 10;
          if (exp.description && exp.description.length > 150) score += 10;
        }
      });
    }

    // Skills (10%)
    if (skills.length >= 8) score += 10;
    else if (skills.length >= 4) score += 7;
    else if (skills.length > 0) score += 3;

    // Projects (10%)
    if (projects.length >= 2) score += 10;
    else if (projects.length >= 1) score += 7;

    // Keywords (15%)
    if (targetKeywords.length > 0) {
      const matchRatio = keywordMatches.length / targetKeywords.length;
      score += Math.round(matchRatio * 15);
    }

    return Math.min(score, 100);
  };

  const score = calculateScore();
  const getStatus = () => {
    if (score >= 85) return { color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle2 className="text-green-500" />, text: 'ATS Optimized' };
    if (score >= 60) return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <Info className="text-yellow-500" />, text: 'Good Foundation' };
    return { color: 'text-red-600', bg: 'bg-red-50', icon: <AlertCircle className="text-red-500" />, text: 'Needs Work' };
  };

  const status = getStatus();

  const getSuggestions = () => {
    const suggestions = [];
    const { personalInfo, education, experience, skills, projects } = data;

    if (!personalInfo.summary || personalInfo.summary.length < 100) {
      suggestions.push("Write a stronger professional summary (150+ chars) with keywords.");
    }
    if (skills.length < 6) {
      suggestions.push("Add at least 6-8 technical and soft skills.");
    }
    if (experience.length === 0 || (experience[0] && experience[0].description.length < 100)) {
      suggestions.push("Detail your work experience using bullet points and action verbs.");
    }
    if (projects.length < 2) {
      suggestions.push("Add at least 2 significant projects to showcase your practical skills.");
    }
    if (keywordMatches.length < targetKeywords.length) {
      const missing = targetKeywords.filter(kw => !keywordMatches.includes(kw));
      suggestions.push(`Try to include these target keywords: ${missing.slice(0, 3).join(', ')}`);
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  const addKeyword = (kw: string) => {
    if (kw && !targetKeywords.includes(kw)) {
      setTargetKeywords([...targetKeywords, kw]);
    }
    setNewKeyword('');
  };

  const removeKeyword = (kw: string) => {
    setTargetKeywords(targetKeywords.filter(k => k !== kw));
  };

  return (
    <div className={`p-6 rounded-xl border border-gray-100 shadow-sm ${status.bg} transition-all duration-500 space-y-6`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            ATS Optimization Score
            <span className="text-xs font-normal text-gray-500">(Beta)</span>
          </h3>
          <div className={`text-2xl font-bold ${status.color}`}>{score}%</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className={`h-2.5 rounded-full transition-all duration-1000 ${score >= 85 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }}></div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          {status.icon}
          <span className={status.color}>{status.text}</span>
        </div>
      </div>

      {/* Keyword Targeting Section */}
      <div className="bg-white/60 p-4 rounded-xl border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Search size={14} /> Keyword Targeting
          </h4>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {keywordMatches.length}/{targetKeywords.length} Matched
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {targetKeywords.map((kw, i) => (
            <span key={i} className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${keywordMatches.includes(kw) ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
              {kw}
              <button onClick={() => removeKeyword(kw)} className="hover:text-red-500">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword(newKeyword)}
            placeholder="Add target keyword..."
            className="flex-grow text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={() => addKeyword(newKeyword)}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={10} className="text-indigo-500" /> Suggested for Freshers
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_KEYWORDS.filter(kw => !targetKeywords.includes(kw)).slice(0, 8).map((kw, i) => (
              <button 
                key={i} 
                onClick={() => addKeyword(kw)}
                className="text-[10px] px-2 py-1 bg-white border border-gray-100 text-gray-500 rounded-md hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              >
                + {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Suggestions to Improve</h4>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600 bg-white/50 p-2 rounded-lg border border-gray-100">
                <Zap size={12} className="text-yellow-500 mt-0.5 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
