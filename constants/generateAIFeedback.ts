// constants/generateAIFeedback.ts
// Smart rule-based resume feedback — no API required

export interface AIFeedback {
  summary: string;
  summaryTone: 'strong' | 'moderate' | 'weak';
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  missingKeywords: string[];
  rewrittenPoints: { original: string; rewritten: string }[];
}

const TECH_KEYWORDS = [
  'react', 'next.js', 'nextjs', 'vue', 'angular', 'svelte',
  'node', 'node.js', 'express', 'fastapi', 'django', 'flask',
  'javascript', 'typescript', 'python', 'java', 'golang', 'rust', 'c++', 'c#',
  'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch',
  'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'terraform',
  'api', 'rest', 'graphql', 'grpc', 'websocket',
  'git', 'ci/cd', 'github actions', 'jenkins', 'webpack', 'vite',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch',
  'agile', 'scrum', 'jira', 'figma', 'linux',
];

const ACTION_VERBS = [
  'developed', 'built', 'designed', 'led', 'managed', 'implemented',
  'architected', 'engineered', 'optimized', 'improved', 'reduced',
  'increased', 'launched', 'delivered', 'created', 'established',
  'automated', 'migrated', 'integrated', 'deployed', 'scaled',
  'mentored', 'collaborated', 'spearheaded', 'streamlined', 'revamped',
];

const WEAK_PHRASES: { pattern: RegExp; fix: string }[] = [
  { pattern: /worked on/i,            fix: 'developed' },
  { pattern: /\bdid\b/i,              fix: 'implemented' },
  { pattern: /\bmade\b/i,             fix: 'built' },
  { pattern: /helped with/i,          fix: 'contributed to' },
  { pattern: /was responsible for/i,  fix: 'owned' },
  { pattern: /assisted in/i,          fix: 'supported' },
  { pattern: /worked with/i,          fix: 'collaborated with' },
  { pattern: /in charge of/i,         fix: 'led' },
  { pattern: /handled/i,              fix: 'managed' },
  { pattern: /tried to/i,             fix: 'achieved' },
];

const STANDARD_SECTIONS = ['experience', 'education', 'skills', 'projects', 'summary', 'contact'];

function countMatches(text: string, list: string[]): string[] {
  return list.filter(k => text.includes(k));
}

function extractBulletLines(text: string): string[] {
  return text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 20 && l.length < 200)
    .filter(l => WEAK_PHRASES.some(wp => l.toLowerCase().match(wp.pattern)));
}

function rewriteLine(line: string): string {
  let result = line;
  for (const { pattern, fix } of WEAK_PHRASES) {
    result = result.replace(new RegExp(pattern.source, 'i'), fix);
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function generateAIFeedback(text: string): AIFeedback {
  const t = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).length;

  const foundKeywords   = countMatches(t, TECH_KEYWORDS);
  const foundVerbs      = countMatches(t, ACTION_VERBS);
  const foundSections   = STANDARD_SECTIONS.filter(s => t.includes(s));
  const missingSections = STANDARD_SECTIONS.filter(s => !t.includes(s));
  const hasNumbers      = /\d+/.test(t);
  const hasMetrics      = /\d+\s*%|\d+x\s|\d+\+?\s*(users|clients|engineers|projects|services|systems|ms|seconds|hours|days|dollars|usd|inr|revenue|sales|bugs|tickets)/i.test(t);
  const hasLinks        = /github\.com|linkedin\.com|portfolio|website/i.test(t);
  const hasCerts        = /certified|certification|certificate|aws certified|google cloud|microsoft certified/i.test(t);
  const missingKeywords = TECH_KEYWORDS.filter(k => !t.includes(k)).slice(0, 8);

  const weakPhrasesFound = WEAK_PHRASES.filter(wp => t.match(wp.pattern));

  const keywordStrength = foundKeywords.length;
  const verbStrength    = foundVerbs.length;

  // ── Summary ─────────────────────────────────────────────────────────────────
  let summary: string;
  let summaryTone: 'strong' | 'moderate' | 'weak';

  if (keywordStrength >= 10 && hasMetrics && verbStrength >= 5) {
    summary = `Strong technical resume with solid keyword coverage (${keywordStrength} relevant skills detected), quantified achievements, and action-driven language. A few targeted improvements could push this to the top tier.`;
    summaryTone = 'strong';
  } else if (keywordStrength >= 5 || (verbStrength >= 3 && hasNumbers)) {
    summary = `Decent resume with some technical depth (${keywordStrength} keywords found), but it's missing the quantified impact and specificity that make resumes stand out to ATS systems and recruiters.`;
    summaryTone = 'moderate';
  } else {
    summary = `This resume needs significant improvement. Only ${keywordStrength} technical keywords were detected, and there's limited evidence of measurable impact or role-specific language. ATS systems will likely rank this below the threshold.`;
    summaryTone = 'weak';
  }

  // ── Strengths ────────────────────────────────────────────────────────────────
  const strengths: string[] = [];
  if (keywordStrength >= 8)
    strengths.push(`Strong technical skill coverage — ${keywordStrength} in-demand keywords detected including ${foundKeywords.slice(0, 4).join(', ')}.`);
  else if (keywordStrength >= 4)
    strengths.push(`Decent keyword presence with ${keywordStrength} relevant technical terms found.`);
  if (verbStrength >= 5)
    strengths.push(`Excellent use of action-oriented language — verbs like "${foundVerbs.slice(0, 3).join('", "')}" make achievements feel concrete and owned.`);
  else if (verbStrength >= 2)
    strengths.push(`Some action verbs detected (e.g. "${foundVerbs.slice(0, 2).join('", "')}") — good start, but add more to all bullet points.`);
  if (hasMetrics)
    strengths.push('Includes quantified achievements (numbers, percentages, or scale) — this is one of the highest-impact resume improvements.');
  if (foundSections.length >= 4)
    strengths.push(`Good resume structure — ${foundSections.length} of 6 standard sections detected (${foundSections.join(', ')}).`);
  if (hasLinks)
    strengths.push('Includes links to GitHub, LinkedIn, or portfolio — recruiters appreciate easy access to your work.');
  if (hasCerts)
    strengths.push('Certifications detected — these add credibility, especially for cloud or enterprise roles.');
  if (wordCount >= 300)
    strengths.push(`Resume has good depth at approximately ${wordCount} words — enough content for ATS to find context.`);
  if (strengths.length === 0)
    strengths.push('Resume has a basic structure in place — a solid foundation to build from.');

  // ── Weaknesses ───────────────────────────────────────────────────────────────
  const weaknesses: string[] = [];
  if (!hasMetrics)
    weaknesses.push('No measurable achievements found. Resumes without numbers (%, revenue, users, time saved) are consistently ranked lower by both ATS and recruiters.');
  if (keywordStrength < 5)
    weaknesses.push(`Low keyword density — only ${keywordStrength} technical keywords detected. ATS systems score heavily on keyword match against job descriptions.`);
  if (verbStrength < 3)
    weaknesses.push('Weak or missing action verbs. Bullet points that start with passive phrases ("was responsible for", "worked on") are less impactful.');
  if (missingSections.length > 0)
    weaknesses.push(`Missing standard resume sections: ${missingSections.join(', ')}. These are expected by most ATS parsers.`);
  if (wordCount < 200)
    weaknesses.push(`Resume is too short (~${wordCount} words). ATS systems and recruiters expect at least 400–600 words for a mid-level role.`);
  if (!hasLinks)
    weaknesses.push('No portfolio or GitHub link detected. For tech roles, a public portfolio link can significantly increase call-back rates.');
  if (weakPhrasesFound.length > 0)
    weaknesses.push('Passive language detected (e.g. "worked on", "was responsible for"). These reduce perceived impact — replace with strong verbs.');

  // ── Improvements ─────────────────────────────────────────────────────────────
  const improvements: string[] = [];
  if (!hasMetrics)
    improvements.push('Add metrics to every bullet: instead of "improved app performance", write "improved app load time by 40%, reducing bounce rate by 15%".');
  if (keywordStrength < 8)
    improvements.push(`Incorporate missing keywords naturally into your experience bullets. Consider adding: ${missingKeywords.slice(0, 4).join(', ')}.`);
  if (!t.includes('projects'))
    improvements.push('Add a "Projects" section with 2–3 standout builds. Include tech stack, your specific role, and a measurable outcome for each.');
  if (!hasLinks)
    improvements.push('Add your GitHub profile and a deployed project URL. Recruiters spend <10 seconds scanning — give them something to click.');
  if (verbStrength < 5)
    improvements.push('Start every bullet point with a strong action verb (built, scaled, automated, reduced, launched) — never with "I" or passive constructions.');
  if (wordCount < 300)
    improvements.push('Expand each role with 3–5 bullet points. Describe your tech stack, team size, and the business impact of your work.');
  improvements.push('Tailor this resume for each job application by mirroring keywords from the job description — ATS systems reward exact matches.');

  // ── Rewritten bullets ────────────────────────────────────────────────────────
  const weakLines = extractBulletLines(text).slice(0, 4);
  const rewrittenPoints = weakLines.map(line => ({
    original: line,
    rewritten: rewriteLine(line),
  }));

  return {
    summary,
    summaryTone,
    strengths,
    weaknesses,
    improvements: improvements.slice(0, 5),
    missingKeywords,
    rewrittenPoints,
  };
}