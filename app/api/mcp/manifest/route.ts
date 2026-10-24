import { NextResponse } from 'next/server';
import { MCP_TEMPLATES } from '@/lib/mcp/templates';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freeresume.dev';

  const manifest = {
    schema_version: 'v1',
    name_for_model: 'freeresume_ai',
    name_for_human: 'FreeResume AI Resume Builder',
    description_for_model:
      'FreeResume AI MCP server allows AI agents and ChatGPT to generate, evaluate, edit, and export ATS-friendly resumes using real FreeResume templates and scoring algorithms.',
    description_for_human:
      'Generate, score, and download professional ATS-friendly resumes using FreeResume templates directly in ChatGPT.',
    auth: {
      type: 'none',
      comment: 'Anonymous session isolation using cryptographically unguessable resumeId and accessToken pairs.',
    },
    api: {
      type: 'mcp-streamable-http',
      url: `${baseUrl}/api/mcp`,
      has_user_authentication: false,
    },
    tools: [
      {
        name: 'get_resume_templates',
        description: 'Lists all 18 authentic FreeResume templates with styles and ATS ratings.',
      },
      {
        name: 'create_resume',
        description: 'Creates a full resume with validation, returning preview and PDF links.',
      },
      {
        name: 'get_resume',
        description: 'Retrieves an authorized resume by resumeId and accessToken.',
      },
      {
        name: 'update_resume',
        description: 'Modifies specific fields or switches templates while preserving untouched sections.',
      },
      {
        name: 'generate_resume_pdf',
        description: 'Generates an authentic vector A4 PDF and returns a direct download link.',
      },
      {
        name: 'check_ats_score',
        description: 'Evaluates ATS compatibility against a role or job description with improvement recommendations.',
      },
    ],
    templates: MCP_TEMPLATES.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category,
      ats: t.ats,
      previewUrl: t.previewUrl,
    })),
  };

  return NextResponse.json(manifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
