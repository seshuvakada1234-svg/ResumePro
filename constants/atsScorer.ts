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
  const lowercaseText = text.toLowerCase();
  
  // 1. Keywords Match (30%)
  const keywords = [
    'react', 'next.js', 'typescript', 'javascript', 'node.js', 'python', 'java',
    'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'git', 'agile', 'scrum',
    'frontend', 'backend', 'fullstack', 'api', 'rest', 'graphql', 'testing',
    'performance', 'optimization', 'security', 'cloud', 'ci/cd'
  ];
  const foundKeywords = keywords.filter(k => lowercaseText.includes(k));
  const keywordsScore = Math.min(100, (foundKeywords.length / 10) * 100);

  // 2. Experience Quality (25%)
  const experienceKeywords = ['achieved', 'developed', 'led', 'managed', 'increased', 'decreased', 'optimized', 'implemented', 'designed'];
  const foundExperience = experienceKeywords.filter(k => lowercaseText.includes(k));
  const experienceScore = Math.min(100, (foundExperience.length / 5) * 100);

  // 3. Formatting (ATS) (15%)
  // Simple heuristic: check for standard sections
  const sections = ['education', 'experience', 'skills', 'projects', 'contact', 'summary'];
  const foundSections = sections.filter(s => lowercaseText.includes(s));
  const formattingScore = (foundSections.length / sections.length) * 100;

  // 4. Sections Completeness (15%)
  const completenessScore = formattingScore; // Reusing section check for simplicity

  // 5. Readability & Impact (15%)
  // Check for bullet points or metrics (numbers)
  const hasMetrics = /\d+%|\d+\s+users|\d+\s+revenue|\d+\s+reduction/.test(lowercaseText);
  const readabilityScore = hasMetrics ? 100 : 60;

  const weightedScore = Math.round(
    (keywordsScore * 0.30) +
    (experienceScore * 0.25) +
    (formattingScore * 0.15) +
    (completenessScore * 0.15) +
    (readabilityScore * 0.15)
  );

  const improvements = [];
  if (keywordsScore < 70) improvements.push("Add more industry-specific keywords related to your target role.");
  if (experienceScore < 70) improvements.push("Use more action verbs like 'Achieved', 'Led', or 'Optimized' in your experience section.");
  if (!hasMetrics) improvements.push("Quantify your achievements with numbers (e.g., 'Increased efficiency by 20%').");
  if (foundSections.length < sections.length) improvements.push("Ensure your resume has all standard sections: Summary, Experience, Education, and Skills.");
  
  if (improvements.length === 0) {
    improvements.push("Your resume looks strong! Consider tailoring it even further for specific job descriptions.");
  }

  return {
    score: weightedScore,
    breakdown: {
      keywords: Math.round(keywordsScore),
      experience: Math.round(experienceScore),
      formatting: Math.round(formattingScore),
      completeness: Math.round(completenessScore),
      readability: Math.round(readabilityScore),
    },
    improvements: improvements.slice(0, 4)
  };
}
