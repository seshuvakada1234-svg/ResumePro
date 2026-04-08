export interface ScoringResult {
  score: number;
  breakdown: {
    keywords: number;
    experience: number;
    formatting: number;
    completeness: number;
    readability: number;
  };
  improvements: string[];
}

export function calculateATSScore(text: string): ScoringResult {
  // 🔹 Normalize text
  const t = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = t.split(' ').filter(Boolean);
  const wordCount = words.length;

  // 🔹 Smart match
  function match(word: string) {
    return new RegExp(`\\b${word}\\w*`, 'i').test(t);
  }

  // =========================
  // 1. KEYWORDS (STRICT)
  // =========================
  const keywords = [
    'react','node','javascript','typescript','python','java',
    'sql','mongodb','aws','docker','api','rest','graphql',
    'html','css','git','linux'
  ];

  const foundKeywords = keywords.filter(k => match(k));
  const keywordDensity = foundKeywords.length / keywords.length;

  let keywordsScore =
    keywordDensity === 0 ? 5 :
    keywordDensity < 0.2 ? 20 :
    keywordDensity < 0.4 ? 40 :
    keywordDensity < 0.6 ? 60 :
    keywordDensity < 0.8 ? 75 : 90;

  // =========================
  // 2. EXPERIENCE (REAL QUALITY)
  // =========================
  const verbs = [
    'develop','build','implement','design','create',
    'improve','optimize','reduce','increase',
    'manage','analyze','deliver','lead'
  ];

  const foundVerbs = verbs.filter(v => match(v));

  const hasMetrics =
    /\d+%|\d+\s+(users|projects|clients|apps|systems)/.test(t);

  let experienceScore =
    foundVerbs.length === 0 ? 10 :
    foundVerbs.length < 2 ? 30 :
    foundVerbs.length < 4 ? 50 :
    foundVerbs.length < 6 ? 70 : 85;

  if (hasMetrics) experienceScore += 10;
  experienceScore = Math.min(100, experienceScore);

  // =========================
  // 3. COMPLETENESS (REAL CHECK)
  // =========================
  const hasSkills =
    t.includes('skills') && t.split('skills')[1]?.length > 30;

  const hasProjects =
    t.includes('project') && t.split('project')[1]?.length > 40;

  const hasExperienceSection =
    t.includes('experience') && foundVerbs.length > 0;

  const hasEducation =
    /b\.?tech|degree|university|college/.test(t);

  let completenessScore = 0;

  if (hasSkills) completenessScore += 25;
  if (hasProjects) completenessScore += 25;
  if (hasExperienceSection) completenessScore += 25;
  if (hasEducation) completenessScore += 25;

  // =========================
  // 4. FORMATTING (REAL ATS)
  // =========================
  const isTooShort = wordCount < 150;
  const isTooLong = wordCount > 1000;

  let formattingScore =
    isTooShort ? 20 :
    isTooLong ? 60 :
    80;

  // =========================
  // 5. READABILITY
  // =========================
  let readabilityScore =
    hasMetrics ? 85 : 50;

  // =========================
  // FINAL SCORE (NO FAKE BOOST)
  // =========================
  const finalScore = Math.round(
    keywordsScore * 0.30 +
    experienceScore * 0.25 +
    formattingScore * 0.15 +
    completenessScore * 0.15 +
    readabilityScore * 0.15
  );

  // =========================
  // IMPROVEMENTS
  // =========================
  const improvements: string[] = [];

  if (keywordsScore < 50) {
    improvements.push("Add job-specific keywords like React, SQL, APIs.");
  }

  if (experienceScore < 50) {
    improvements.push("Use strong action verbs and describe impact.");
  }

  if (!hasMetrics) {
    improvements.push("Add measurable results (e.g., improved performance by 30%).");
  }

  if (!hasProjects) {
    improvements.push("Add a Projects section (very important for freshers).");
  }

  if (wordCount < 150) {
    improvements.push("Resume is too short — add more content.");
  }

  if (improvements.length === 0) {
    improvements.push("Strong resume — tailor it to job descriptions.");
  }

  return {
    score: finalScore,
    breakdown: {
      keywords: Math.round(keywordsScore),
      experience: Math.round(experienceScore),
      formatting: Math.round(formattingScore),
      completeness: Math.round(completenessScore),
      readability: Math.round(readabilityScore),
    },
    improvements: improvements.slice(0, 4),
  };
}