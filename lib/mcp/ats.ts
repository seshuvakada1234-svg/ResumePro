import { calculateATSScore, ScoringResult } from '@/constants/atsScorer';
import { generateAIFeedback, AIFeedback } from '@/constants/generateAIFeedback';
import { ResumeData } from '@/types/resume';

export interface TargetRoleAnalysis {
  targetRole?: string;
  keywordMatchPercentage: number; // 0 - 100%
  matchedJobKeywords: string[];
  missingJobKeywords: string[];
  distinctionNote: string;
}

export interface ATSEvaluationResult {
  overallAtsScore: number; // 0 - 100 (Overall resume readiness & parsing compatibility)
  overallRating: 'Exceptional (85-100)' | 'Strong (70-84)' | 'Moderate (50-69)' | 'Needs Work (<50)';
  categoryScores: {
    keywords: number;
    experience: number;
    formatting: number;
    completeness: number;
    readability: number;
  };
  matchedGeneralKeywords: string[];
  missingGeneralKeywords: string[];
  targetRoleKeywordMatch?: TargetRoleAnalysis;
  strengths: string[];
  weaknesses: string[];
  actionableImprovements: string[];
  suggestedBulletRewrites: { original: string; rewritten: string }[];
  summaryFeedback: string;
  scoringClarification: string;
}

export function resumeDataToText(data: Partial<ResumeData>): string {
  const parts: string[] = [];

  // Personal Info
  if (data.personalInfo) {
    const p = data.personalInfo;
    parts.push(p.fullName || '');
    if (p.email) parts.push(`Email: ${p.email}`);
    if (p.phone) parts.push(`Phone: ${p.phone}`);
    if (p.location) parts.push(`Location: ${p.location}`);
    if (p.linkedin) parts.push(`LinkedIn: ${p.linkedin}`);
    if (p.github) parts.push(`GitHub: ${p.github}`);
    if (p.summary) parts.push(`Summary: ${p.summary}`);
  }

  // Summary
  if (data.summary && (!data.personalInfo || data.personalInfo.summary !== data.summary)) {
    parts.push(`Summary: ${data.summary}`);
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    parts.push('Experience:');
    for (const exp of data.experience) {
      parts.push(`${exp.position || ''} at ${exp.company || ''} (${exp.duration || ''})`);
      if (exp.description) parts.push(exp.description);
      if (exp.bullets && exp.bullets.length > 0) {
        parts.push(exp.bullets.join('\n'));
      }
    }
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    parts.push('Projects:');
    for (const proj of data.projects) {
      parts.push(`${proj.name || ''}: ${proj.description || ''}`);
      if (proj.technologies) parts.push(`Technologies: ${proj.technologies}`);
      if (proj.bullets && proj.bullets.length > 0) {
        parts.push(proj.bullets.join('\n'));
      }
    }
  }

  // Education
  if (data.education && data.education.length > 0) {
    parts.push('Education:');
    for (const edu of data.education) {
      parts.push(`${edu.degree || ''} - ${edu.school || ''} (${edu.year || ''})`);
    }
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    parts.push('Skills:');
    const skillNames = data.skills.map(s => (typeof s === 'string' ? s : s.name)).filter(Boolean);
    parts.push(skillNames.join(', '));
  }

  // Languages
  if (data.languages && data.languages.length > 0) {
    parts.push('Languages:');
    const langNames = data.languages.map(l => (typeof l === 'string' ? l : l.name)).filter(Boolean);
    parts.push(langNames.join(', '));
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    parts.push('Certifications:');
    const certNames = data.certifications.map(c => (typeof c === 'string' ? c : c.name)).filter(Boolean);
    parts.push(certNames.join(', '));
  }

  // Achievements
  if (data.achievements && data.achievements.length > 0) {
    parts.push('Achievements:');
    for (const ach of data.achievements) {
      parts.push(`${ach.title || ''} (${ach.organization || ''}, ${ach.date || ''}): ${ach.description || ''}`);
    }
  }

  // Internships
  if (data.internships && data.internships.length > 0) {
    parts.push('Internships:');
    for (const int of data.internships) {
      parts.push(`${int.role || ''} at ${int.company || ''} (${int.duration || ''}): ${int.description || ''}`);
    }
  }

  return parts.join('\n\n');
}

export function extractKeywordsFromJobDescription(text: string): string[] {
  const commonStopWords = new Set([
    'and', 'the', 'with', 'for', 'you', 'will', 'are', 'our', 'have', 'that', 'this',
    'from', 'your', 'team', 'work', 'years', 'experience', 'ability', 'must', 'should',
    'strong', 'about', 'role', 'looking', 'join', 'plus', 'preferred', 'required',
    'skills', 'candidates', 'environment', 'equal', 'opportunity', 'employer', 'responsibilities',
    'requirements', 'qualifications', 'including', 'knowledge', 'understanding', 'working',
    'across', 'closely', 'apply', 'degree', 'equivalent', 'related', 'field', 'position',
    'opportunity', 'successful', 'candidate', 'proficiency', 'good', 'great', 'ideal'
  ]);

  const clean = text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
  const tokens = clean.split(/\s+/).filter(w => w.length > 2 && !commonStopWords.has(w));

  const freq: Record<string, number> = {};
  for (const token of tokens) {
    freq[token] = (freq[token] || 0) + 1;
  }

  // Pick top distinctive keywords that are genuinely in the job description
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([w]) => w);
}

export function evaluateResumeATS(
  input: {
    text?: string;
    resumeData?: Partial<ResumeData>;
    targetRole?: string;
    targetJobDescription?: string;
  }
): ATSEvaluationResult {
  const resumeText = input.text || (input.resumeData ? resumeDataToText(input.resumeData) : '');
  
  if (!resumeText || resumeText.trim().length === 0) {
    return {
      overallAtsScore: 0,
      overallRating: 'Needs Work (<50)',
      categoryScores: {
        keywords: 0,
        experience: 0,
        formatting: 0,
        completeness: 0,
        readability: 0,
      },
      matchedGeneralKeywords: [],
      missingGeneralKeywords: ['Add work experience', 'Add skills', 'Add contact details'],
      strengths: [],
      weaknesses: ['Resume is completely empty'],
      actionableImprovements: ['Add complete contact details, work history, skills, and education.'],
      suggestedBulletRewrites: [],
      summaryFeedback: 'Resume content is empty. Please provide resume details to evaluate ATS score.',
      scoringClarification: 'Overall ATS score is 0/100 because no resume content was supplied.',
    };
  }

  const scoring: ScoringResult = calculateATSScore(resumeText);
  const feedback: AIFeedback = generateAIFeedback(resumeText);

  // Target Role & Job Description analysis - DISTINCT FROM OVERALL ATS SCORE
  let targetRoleKeywordMatch: ATSEvaluationResult['targetRoleKeywordMatch'] = undefined;
  if (input.targetJobDescription || input.targetRole) {
    let jobKeywords: string[] = [];
    if (input.targetJobDescription && input.targetJobDescription.trim().length > 10) {
      jobKeywords = extractKeywordsFromJobDescription(input.targetJobDescription);
    } else if (input.targetRole) {
      // Split target role into meaningful tokens (ignore words like 'senior', 'lead' if too generic)
      const roleTokens = input.targetRole.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      jobKeywords = roleTokens;
    }
    
    const resumeLower = resumeText.toLowerCase();
    const matchedJobKeywords = jobKeywords.filter(k => resumeLower.includes(k));
    const missingJobKeywords = jobKeywords.filter(k => !resumeLower.includes(k));
    
    const matchPercentage = jobKeywords.length > 0 
      ? Math.round((matchedJobKeywords.length / jobKeywords.length) * 100)
      : 0;

    targetRoleKeywordMatch = {
      targetRole: input.targetRole,
      keywordMatchPercentage: matchPercentage,
      matchedJobKeywords,
      missingJobKeywords,
      distinctionNote: `Target Role Keyword Match (${matchPercentage}%) measures the presence of target job keywords in the resume. This is separate from the Overall ATS Score (${scoring.score}/100), which evaluates section structure, action verbs, formatting, and measurable results. Having a high keyword match does not imply a high overall score if experience bullets lack quantifiable impact or standard sections.`,
    };
  }

  let rating: ATSEvaluationResult['overallRating'] = 'Needs Work (<50)';
  if (scoring.score >= 85) rating = 'Exceptional (85-100)';
  else if (scoring.score >= 70) rating = 'Strong (70-84)';
  else if (scoring.score >= 50) rating = 'Moderate (50-69)';

  // Extract matched keywords from tech keywords list
  const knownTech = [
    'react', 'next.js', 'vue', 'angular', 'node', 'express', 'typescript',
    'javascript', 'python', 'java', 'sql', 'mongodb', 'postgresql', 'aws',
    'docker', 'kubernetes', 'git', 'rest', 'api', 'graphql', 'ci/cd', 'linux',
    'agile', 'scrum', 'html', 'css', 'tailwind'
  ];
  const matchedGeneralKeywords = knownTech.filter(k => resumeText.toLowerCase().includes(k));

  return {
    overallAtsScore: scoring.score,
    overallRating: rating,
    categoryScores: scoring.breakdown,
    matchedGeneralKeywords,
    missingGeneralKeywords: feedback.missingKeywords,
    targetRoleKeywordMatch,
    strengths: feedback.strengths,
    weaknesses: feedback.weaknesses,
    actionableImprovements: feedback.improvements.length > 0 ? feedback.improvements : scoring.improvements,
    suggestedBulletRewrites: feedback.rewrittenPoints,
    summaryFeedback: feedback.summary,
    scoringClarification: `Overall ATS Score is ${scoring.score}/100 based on keyword density (30%), experience quality (25%), formatting compliance (15%), completeness (15%), and readability (15%).`,
  };
}
