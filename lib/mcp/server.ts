import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { MCP_TEMPLATES, getTemplateById, getAllTemplates } from './templates';
import { evaluateResumeATS, resumeDataToText } from './ats';
import { saveResume, getResume, updateResume } from './storage';
import { generateResumePdfBuffer } from './pdfRenderer';
import { ResumeData, ResumeTemplate, Skill, Language, Experience } from '@/types/resume';
import { GoogleGenAI } from '@google/genai';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://freeresume.dev';

// Optional AI optimizer using existing server-side Gemini key
async function polishBulletWithAI(text: string, role?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !text || text.trim().length < 10) return text;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are an expert resume writer. Polish this single resume achievement/bullet point to start with an impactful past-tense action verb (e.g. Architected, Spearheaded, Accelerated, Engineered, Streamlined), improve readability, and keep it strictly factual. Do NOT fabricate facts, companies, or metrics. Return ONLY the polished bullet text without bullets, markdown, or commentary.
      Target Role: ${role || 'Professional'}
      Draft bullet: ${text}`,
      config: {
        temperature: 0.3,
      },
    });

    return response.text?.trim() || text;
  } catch (err) {
    // Graceful fallback to original text
    return text;
  }
}

export function createFreeResumeMcpServer(): McpServer {
  const server = new McpServer({
    name: 'FreeResume AI MCP Server',
    version: '1.0.0',
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 1: get_resume_templates
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'get_resume_templates',
    'Retrieve all genuine resume templates supported by FreeResume, including design styles, ATS compatibility ratings, supported sections, and live preview links. Use this before creating a resume so the user can choose the best template for their industry.',
    {
      category: z
        .string()
        .optional()
        .describe("Filter by category, e.g., 'All', 'Tech', 'Healthcare', 'Business', 'Creative', 'Legal & Finance', 'Education', 'Marketing', 'Engineering', 'Fresher', 'Executive'"),
      atsFriendlyOnly: z
        .boolean()
        .optional()
        .describe('If true, returns only templates with confirmed high/100% ATS-friendly single-column or clean-column layouts.'),
    },
    async ({ category, atsFriendlyOnly }) => {
      try {
        const templates = getAllTemplates(category, atsFriendlyOnly);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  count: templates.length,
                  templates: templates.map(t => ({
                    id: t.id,
                    name: t.name,
                    category: t.category,
                    atsFriendly: t.ats,
                    description: t.description,
                    designStyle: t.designStyle,
                    atsSuitability: t.atsSuitability,
                    supportedSections: t.supportedSections,
                    recommendedFor: t.recommendedFor,
                    previewUrl: t.previewUrl,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to retrieve templates: ${err.message}` }],
        };
      }
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 2: create_resume
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'create_resume',
    "Generate and save a complete, professional ATS-optimized resume using FreeResume's real templates. Returns a secure resume ID, access token, interactive web preview URL, and direct PDF download link. Incomplete details are safely accepted without inventing fake qualifications.",
    {
      templateId: z
        .string()
        .optional()
        .describe("The template ID from get_resume_templates (e.g. 'classic', 'modern', 'minimal', 'two-column', 'premium', 'executive', 'navy', 'luxury-gold'). Defaults to 'classic'."),
      targetRole: z
        .string()
        .optional()
        .describe("Target job title (e.g. 'Senior Frontend Engineer', 'Product Manager', 'Financial Analyst')."),
      targetJobDescription: z
        .string()
        .optional()
        .describe('Optional job description to tailor phrasing and keyword alignment.'),
      optimizeWithAI: z
        .boolean()
        .optional()
        .describe('If true, polishes experience bullets with strong action verbs while preserving factual accuracy. Defaults to false.'),
      personalInfo: z.object({
        fullName: z.string().describe("Candidate's full name"),
        email: z.string().describe("Candidate's email address"),
        phone: z.string().describe("Candidate's phone number"),
        location: z.string().describe("City, State or Country (e.g. 'San Francisco, CA' or 'London, UK')"),
        summary: z.string().optional().describe('2-4 sentence executive or professional summary'),
        linkedin: z.string().optional().describe('LinkedIn profile URL or handle'),
        github: z.string().optional().describe('GitHub profile URL or handle (for technical roles)'),
        website: z.string().optional().describe('Personal website or portfolio URL'),
      }),
      education: z
        .array(
          z.object({
            school: z.string().describe('University, college, or school name'),
            degree: z.string().describe('Degree and major (e.g. B.S. in Computer Science)'),
            year: z.string().describe('Graduation year or date range (e.g. 2020 - 2024)'),
            gpa: z.string().optional().describe('Optional GPA'),
          })
        )
        .optional(),
      experience: z
        .array(
          z.object({
            company: z.string().describe('Company or organization name'),
            position: z.string().describe('Job title or role'),
            duration: z.string().describe('Employment dates (e.g. Jan 2022 - Present)'),
            description: z.string().optional().describe('High-level overview of responsibilities'),
            bullets: z.array(z.string()).optional().describe('Quantified achievement bullet points'),
          })
        )
        .optional(),
      projects: z
        .array(
          z.object({
            name: z.string().describe('Project title'),
            description: z.string().describe('Overview of project goals and achievements'),
            technologies: z.string().optional().describe('Technologies and tools used (e.g. Next.js, TypeScript, PostgreSQL)'),
            link: z.string().optional().describe('Live project URL or GitHub repo link'),
            bullets: z.array(z.string()).optional().describe('Specific outcomes or technical highlights'),
          })
        )
        .optional(),
      skills: z
        .array(
          z.union([
            z.string(),
            z.object({
              name: z.string(),
              level: z.number().optional(),
            }),
          ])
        )
        .optional()
        .describe("List of core skills (e.g. ['React', 'TypeScript', 'Node.js', 'PostgreSQL'])"),
      languages: z
        .array(
          z.union([
            z.string(),
            z.object({
              name: z.string(),
              level: z.number().optional(),
            }),
          ])
        )
        .optional(),
      certifications: z
        .array(z.union([z.string(), z.object({ name: z.string() })]))
        .optional(),
      achievements: z
        .array(
          z.object({
            title: z.string(),
            organization: z.string(),
            date: z.string(),
            description: z.string(),
          })
        )
        .optional(),
      internships: z
        .array(
          z.object({
            company: z.string(),
            role: z.string(),
            duration: z.string(),
            description: z.string(),
          })
        )
        .optional(),
    },
    async ({
      templateId = 'classic',
      targetRole,
      targetJobDescription,
      optimizeWithAI = false,
      personalInfo,
      education = [],
      experience = [],
      projects = [],
      skills = [],
      languages = [],
      certifications = [],
      achievements = [],
      internships = [],
    }) => {
      try {
        // Validate templateId against genuine templates
        const selectedTemplate = getTemplateById(templateId);
        if (!selectedTemplate) {
          const validIds = MCP_TEMPLATES.map(t => `'${t.id}'`).join(', ');
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Invalid template ID: '${templateId}'. Please select from genuine FreeResume templates: ${validIds}`,
              },
            ],
          };
        }

        // Standardize skills into { name, level }
        const parsedSkills: Skill[] = skills.map(s =>
          typeof s === 'string' ? { name: s, level: 85 } : { name: s.name, level: s.level || 85 }
        );

        // Standardize languages
        const parsedLanguages: Language[] = languages.map(l =>
          typeof l === 'string' ? { name: l, level: 90 } : { name: l.name, level: l.level || 90 }
        );

        // Standardize certifications
        const parsedCertifications = certifications.map(c =>
          typeof c === 'string' ? c : c.name
        );

        // Optional AI Polish on experience bullets
        let finalExperience = [...experience];
        if (optimizeWithAI && finalExperience.length > 0) {
          finalExperience = await Promise.all(
            finalExperience.map(async exp => {
              if (exp.bullets && exp.bullets.length > 0) {
                const polishedBullets = await Promise.all(
                  exp.bullets.map(b => polishBulletWithAI(b, targetRole || exp.position))
                );
                return { ...exp, bullets: polishedBullets };
              }
              return exp;
            })
          );
        }

        const typedExperience: Experience[] = finalExperience.map(exp => ({
          company: exp.company,
          position: exp.position,
          duration: exp.duration,
          description: exp.description || '',
          bullets: exp.bullets,
        }));

        const resumeData: ResumeData = {
          uid: 'mcp-user',
          title: `${personalInfo.fullName} - Resume`,
          template: selectedTemplate.id,
          personalInfo: {
            fullName: personalInfo.fullName,
            email: personalInfo.email,
            phone: personalInfo.phone,
            location: personalInfo.location,
            summary: personalInfo.summary || '',
            linkedin: personalInfo.linkedin,
            github: personalInfo.github,
            website: personalInfo.website,
          },
          summary: personalInfo.summary || '',
          education,
          experience: typedExperience,
          projects,
          skills: parsedSkills,
          languages: parsedLanguages,
          certifications: parsedCertifications,
          achievements,
          internships,
          experienceType: experience.length > 0 ? 'experienced' : 'fresher',
        };

        // Persist resume securely
        const { id, accessToken } = await saveResume(
          resumeData,
          targetRole,
          targetJobDescription
        );

        // Evaluate ATS Score
        const atsResult = evaluateResumeATS({
          resumeData,
          targetRole,
          targetJobDescription,
        });

        const previewUrl = `${BASE_URL}/preview?id=${encodeURIComponent(id)}&token=${encodeURIComponent(accessToken)}`;
        const pdfDownloadUrl = `${BASE_URL}/api/resumes/download/${encodeURIComponent(id)}?token=${encodeURIComponent(accessToken)}`;

        // Check for missing sections to advise ChatGPT
        const missingSections: string[] = [];
        if (!personalInfo.summary) missingSections.push('Professional Summary');
        if (skills.length === 0) missingSections.push('Key Skills');
        if (experience.length === 0 && projects.length === 0) missingSections.push('Work Experience or Projects');
        if (education.length === 0) missingSections.push('Education');

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  message: `Resume successfully generated and stored using the '${selectedTemplate.name}' template.`,
                  resumeId: id,
                  accessToken,
                  template: {
                    id: selectedTemplate.id,
                    name: selectedTemplate.name,
                    category: selectedTemplate.category,
                    atsFriendly: selectedTemplate.ats,
                  },
                  previewUrl,
                  pdfDownloadUrl,
                  atsScore: {
                    overallScore: atsResult.overallScore,
                    rating: atsResult.rating,
                    breakdown: atsResult.categoryScores,
                  },
                  missingRecommendedSections: missingSections,
                  nextSteps: [
                    'View or share the interactive web preview using previewUrl.',
                    'Download the print-ready PDF using pdfDownloadUrl.',
                    'Use check_ats_score to evaluate alignment against a specific job posting.',
                    'Use update_resume to revise sections or switch templates.',
                  ],
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to create resume: ${err.message}` }],
        };
      }
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 3: get_resume
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'get_resume',
    'Retrieve a previously generated resume using its resumeId and accessToken. Returns full resume details, selected template, and active download links.',
    {
      resumeId: z.string().describe('The unique resume ID returned from create_resume.'),
      accessToken: z.string().describe('The secret access token required to authorize access.'),
    },
    async ({ resumeId, accessToken }) => {
      try {
        const record = await getResume(resumeId, accessToken);
        if (!record) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Resume not found or invalid accessToken for ID '${resumeId}'. Please verify the resumeId and token.`,
              },
            ],
          };
        }

        const template = getTemplateById(record.data.template) || MCP_TEMPLATES[0];
        const previewUrl = `${BASE_URL}/preview?id=${encodeURIComponent(record.id)}&token=${encodeURIComponent(record.accessToken)}`;
        const pdfDownloadUrl = `${BASE_URL}/api/resumes/download/${encodeURIComponent(record.id)}?token=${encodeURIComponent(record.accessToken)}`;

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  resumeId: record.id,
                  template: {
                    id: template.id,
                    name: template.name,
                    category: template.category,
                    ats: template.ats,
                  },
                  personalInfo: record.data.personalInfo,
                  experienceCount: record.data.experience?.length || 0,
                  educationCount: record.data.education?.length || 0,
                  skillsCount: record.data.skills?.length || 0,
                  projectsCount: record.data.projects?.length || 0,
                  resume: record.data,
                  targetRole: record.targetRole,
                  targetJobDescription: record.targetJobDescription,
                  previewUrl,
                  pdfDownloadUrl,
                  createdAt: record.createdAt,
                  updatedAt: record.updatedAt,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to retrieve resume: ${err.message}` }],
        };
      }
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 4: update_resume
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'update_resume',
    'Update specific sections of an existing resume (e.g. add new skills, refine job bullets, update contact details, or switch template). Preserves all untouched sections and requires authorization.',
    {
      resumeId: z.string().describe('The ID of the resume to update.'),
      accessToken: z.string().describe('The secret access token returned when the resume was created.'),
      templateId: z.string().optional().describe('New template ID if switching templates.'),
      targetRole: z.string().optional().describe('Updated target role.'),
      targetJobDescription: z.string().optional().describe('Updated job description.'),
      personalInfo: z
        .object({
          fullName: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          location: z.string().optional(),
          summary: z.string().optional(),
          linkedin: z.string().optional(),
          github: z.string().optional(),
          website: z.string().optional(),
        })
        .optional(),
      education: z
        .array(
          z.object({
            school: z.string(),
            degree: z.string(),
            year: z.string(),
            gpa: z.string().optional(),
          })
        )
        .optional(),
      experience: z
        .array(
          z.object({
            company: z.string(),
            position: z.string(),
            duration: z.string(),
            description: z.string().optional(),
            bullets: z.array(z.string()).optional(),
          })
        )
        .optional(),
      projects: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
            technologies: z.string().optional(),
            link: z.string().optional(),
            bullets: z.array(z.string()).optional(),
          })
        )
        .optional(),
      skills: z
        .array(
          z.union([
            z.string(),
            z.object({
              name: z.string(),
              level: z.number().optional(),
            }),
          ])
        )
        .optional(),
      languages: z
        .array(
          z.union([
            z.string(),
            z.object({
              name: z.string(),
              level: z.number().optional(),
            }),
          ])
        )
        .optional(),
      certifications: z.array(z.union([z.string(), z.object({ name: z.string() })])).optional(),
      achievements: z
        .array(
          z.object({
            title: z.string(),
            organization: z.string(),
            date: z.string(),
            description: z.string(),
          })
        )
        .optional(),
    },
    async ({
      resumeId,
      accessToken,
      templateId,
      targetRole,
      targetJobDescription,
      personalInfo,
      education,
      experience,
      projects,
      skills,
      languages,
      certifications,
      achievements,
    }) => {
      try {
        const existing = await getResume(resumeId, accessToken);
        if (!existing) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Unauthorized or resume '${resumeId}' not found. Please provide the correct resumeId and accessToken.`,
              },
            ],
          };
        }

        // Validate templateId if provided
        let newTemplate = existing.data.template;
        if (templateId) {
          const validated = getTemplateById(templateId);
          if (!validated) {
            return {
              isError: true,
              content: [
                {
                  type: 'text',
                  text: `Invalid template ID: '${templateId}'. Use get_resume_templates to view valid IDs.`,
                },
              ],
            };
          }
          newTemplate = validated.id;
        }

        const updates: Partial<ResumeData> = {
          template: newTemplate,
        };

        if (personalInfo) {
          updates.personalInfo = {
            ...existing.data.personalInfo,
            ...personalInfo,
          };
          if (personalInfo.summary) {
            updates.summary = personalInfo.summary;
          }
        }

        if (education !== undefined) updates.education = education;
        if (experience !== undefined) {
          updates.experience = experience.map(exp => ({
            company: exp.company,
            position: exp.position,
            duration: exp.duration,
            description: exp.description || '',
            bullets: exp.bullets,
          }));
        }
        if (projects !== undefined) updates.projects = projects;
        if (achievements !== undefined) updates.achievements = achievements;

        if (skills !== undefined) {
          updates.skills = skills.map(s =>
            typeof s === 'string' ? { name: s, level: 85 } : { name: s.name, level: s.level || 85 }
          );
        }

        if (languages !== undefined) {
          updates.languages = languages.map(l =>
            typeof l === 'string' ? { name: l, level: 90 } : { name: l.name, level: l.level || 90 }
          );
        }

        if (certifications !== undefined) {
          updates.certifications = certifications.map(c => (typeof c === 'string' ? c : c.name));
        }

        const updated = await updateResume(
          resumeId,
          accessToken,
          updates,
          targetRole,
          targetJobDescription
        );

        if (!updated) {
          return {
            isError: true,
            content: [{ type: 'text', text: 'Failed to apply updates to resume.' }],
          };
        }

        const previewUrl = `${BASE_URL}/preview?id=${encodeURIComponent(updated.id)}&token=${encodeURIComponent(updated.accessToken)}`;
        const pdfDownloadUrl = `${BASE_URL}/api/resumes/download/${encodeURIComponent(updated.id)}?token=${encodeURIComponent(updated.accessToken)}`;

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  message: 'Resume updated successfully. Untouched sections were preserved.',
                  resumeId: updated.id,
                  template: updated.data.template,
                  previewUrl,
                  pdfDownloadUrl,
                  updatedAt: updated.updatedAt,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to update resume: ${err.message}` }],
        };
      }
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 5: generate_resume_pdf
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'generate_resume_pdf',
    'Generate an authentic vector PDF for a resume and receive a secure expiring download link and preview URL. Allows overriding the template before generating.',
    {
      resumeId: z.string().describe('The ID of the resume to generate PDF for.'),
      accessToken: z.string().describe('The authorization access token.'),
      templateId: z.string().optional().describe('Optional template ID override to render with a different style.'),
    },
    async ({ resumeId, accessToken, templateId }) => {
      try {
        const record = await getResume(resumeId, accessToken);
        if (!record) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Resume '${resumeId}' not found or authorization failed.`,
              },
            ],
          };
        }

        // Apply template override if specified
        let activeData = record.data;
        if (templateId) {
          const validTemplate = getTemplateById(templateId);
          if (!validTemplate) {
            return {
              isError: true,
              content: [{ type: 'text', text: `Invalid template ID '${templateId}'.` }],
            };
          }
          activeData = { ...activeData, template: validTemplate.id };
          await updateResume(resumeId, accessToken, { template: validTemplate.id });
        }

        // Pre-validate that PDF rendering succeeds cleanly
        const pdfBuffer = await generateResumePdfBuffer(activeData);

        const previewUrl = `${BASE_URL}/preview?id=${encodeURIComponent(record.id)}&token=${encodeURIComponent(record.accessToken)}`;
        const pdfDownloadUrl = `${BASE_URL}/api/resumes/download/${encodeURIComponent(record.id)}?token=${encodeURIComponent(record.accessToken)}`;

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: true,
                  message: 'PDF generated successfully with vector typography and clean ATS hierarchy.',
                  resumeId: record.id,
                  template: activeData.template,
                  pdfDownloadUrl,
                  previewUrl,
                  pdfSizeBytes: pdfBuffer.length,
                  fileFormat: 'A4 Vector PDF (Standard)',
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to generate PDF: ${err.message}` }],
        };
      }
    }
  );

  // ──────────────────────────────────────────────────────────────────────────
  // TOOL 6: check_ats_score
  // ──────────────────────────────────────────────────────────────────────────
  server.tool(
    'check_ats_score',
    "Analyze resume content against FreeResume's real ATS scoring engine. Evaluates keyword density, action verb strength, measurable achievements (metrics/numbers), formatting compliance, and role-specific alignment against a target job description. Returns detailed scores and specific improvement advice.",
    {
      resumeId: z.string().optional().describe('Optional ID of an existing stored resume.'),
      accessToken: z.string().optional().describe('Access token if resumeId is provided.'),
      resumeText: z.string().optional().describe('Raw resume text to evaluate directly if not using resumeId.'),
      targetRole: z.string().optional().describe("Target job title (e.g. 'Senior Full-Stack Engineer')."),
      targetJobDescription: z.string().optional().describe('Full job posting or description to calculate exact keyword match percentage and missing skills.'),
    },
    async ({ resumeId, accessToken, resumeText, targetRole, targetJobDescription }) => {
      try {
        let textToAnalyze = resumeText || '';
        let targetRoleToUse = targetRole;
        let jobDescToUse = targetJobDescription;

        if (resumeId) {
          const record = await getResume(resumeId, accessToken);
          if (!record) {
            return {
              isError: true,
              content: [
                {
                  type: 'text',
                  text: `Resume '${resumeId}' not found or invalid accessToken.`,
                },
              ],
            };
          }
          textToAnalyze = resumeDataToText(record.data);
          targetRoleToUse = targetRole || record.targetRole;
          jobDescToUse = targetJobDescription || record.targetJobDescription;
        }

        if (!textToAnalyze || textToAnalyze.trim().length === 0) {
          return {
            isError: true,
            content: [
              {
                type: 'text',
                text: 'Please provide either a valid resumeId or resumeText to evaluate ATS score.',
              },
            ],
          };
        }

        const evaluation = evaluateResumeATS({
          text: textToAnalyze,
          targetRole: targetRoleToUse,
          targetJobDescription: jobDescToUse,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  overallScore: evaluation.overallScore,
                  rating: evaluation.rating,
                  categoryScores: evaluation.categoryScores,
                  matchedKeywords: evaluation.matchedKeywords,
                  missingKeywords: evaluation.missingKeywords,
                  targetRoleMatch: evaluation.targetRoleMatch,
                  strengths: evaluation.strengths,
                  weaknesses: evaluation.weaknesses,
                  actionableImprovements: evaluation.actionableImprovements,
                  suggestedBulletRewrites: evaluation.suggestedBulletRewrites,
                  summaryFeedback: evaluation.summaryFeedback,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err: any) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to evaluate ATS score: ${err.message}` }],
        };
      }
    }
  );

  return server;
}
