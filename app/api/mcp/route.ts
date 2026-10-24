import { NextRequest, NextResponse } from 'next/server';
import { createFreeResumeMcpServer } from '@/lib/mcp/server';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { MCP_TEMPLATES } from '@/lib/mcp/templates';

export const dynamic = 'force-dynamic';

// Simple sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// CORS Headers helper
function getCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, mcp-session-id, last-event-id, x-requested-with',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function GET(req: NextRequest) {
  const accept = req.headers.get('accept') || '';

  // If the client requested SSE stream, initiate SSE transport
  if (accept.includes('text/event-stream')) {
    const server = createFreeResumeMcpServer();
    const transport = new WebStandardStreamableHTTPServerTransport();
    await server.connect(transport);
    return await transport.handleRequest(req);
  }

  // Otherwise, return MCP server discovery & status document for human/custom GPT inspection
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://freeresume.dev';

  return NextResponse.json(
    {
      name: 'FreeResume AI MCP Server',
      version: '1.0.0',
      description: 'Official MCP Server for FreeResume — allows ChatGPT to generate, evaluate (ATS score), edit, and download resumes using real FreeResume templates and logic.',
      status: 'healthy',
      protocol: 'Model Context Protocol (Streamable HTTP & SSE)',
      transport: {
        type: 'streamable-http',
        endpoint: `${baseUrl}/api/mcp`,
        supportedMethods: ['POST', 'GET', 'OPTIONS'],
      },
      tools: [
        {
          name: 'get_resume_templates',
          description: 'Retrieve all 18 authentic FreeResume templates with ATS suitability ratings, styles, and preview links.',
        },
        {
          name: 'create_resume',
          description: 'Generate an ATS-optimized resume, persist it, and receive preview & PDF download links.',
        },
        {
          name: 'get_resume',
          description: 'Retrieve a previously created resume using its resumeId and secret accessToken.',
        },
        {
          name: 'update_resume',
          description: 'Update specific sections or switch templates on an existing resume while preserving untouched content.',
        },
        {
          name: 'generate_resume_pdf',
          description: 'Render a vector A4 PDF using the website template engine and receive an expiring download link.',
        },
        {
          name: 'check_ats_score',
          description: "Analyze resume content against FreeResume's ATS scoring engine with actionable keyword and section recommendations.",
        },
      ],
      templatesAvailable: MCP_TEMPLATES.length,
      documentation: `${baseUrl}/api/mcp/manifest`,
    },
    {
      status: 200,
      headers: {
        ...getCorsHeaders(),
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  // Rate limiting check
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Too many requests. Rate limit exceeded.' },
        id: null,
      },
      {
        status: 429,
        headers: getCorsHeaders(),
      }
    );
  }

  try {
    const originalAccept = req.headers.get('accept') || '';
    const wantsRawJson = originalAccept.includes('application/json') && !originalAccept.includes('text/event-stream');

    // Normalize accept header so WebStandardStreamableHTTPServerTransport accepts it
    const headers = new Headers(req.headers);
    if (!headers.get('accept')?.includes('text/event-stream')) {
      headers.set('accept', 'application/json, text/event-stream');
    }

    const normalizedReq = new Request(req.url, {
      method: req.method,
      headers,
      body: req.body,
      // @ts-expect-error duplex required for streaming bodies in Node
      duplex: 'half',
    });

    const server = createFreeResumeMcpServer();
    const transport = new WebStandardStreamableHTTPServerTransport();
    await server.connect(transport);

    const response = await transport.handleRequest(normalizedReq);

    // Apply CORS headers to response
    const resHeaders = new Headers(response.headers);
    for (const [k, v] of Object.entries(getCorsHeaders())) {
      resHeaders.set(k, v);
    }

    // If caller specifically wanted standard JSON (e.g. non-SSE REST/JSON-RPC caller), unwrap data line
    if (wantsRawJson && resHeaders.get('content-type')?.includes('text/event-stream')) {
      const rawText = await response.text();
      const dataLines = rawText
        .split('\n')
        .filter(l => l.startsWith('data: '))
        .map(l => l.slice(6).trim());

      if (dataLines.length > 0) {
        const lastPayload = dataLines[dataLines.length - 1];
        resHeaders.set('content-type', 'application/json');
        return new Response(lastPayload, {
          status: response.status,
          headers: resHeaders,
        });
      }
    }

    return new Response(response.body, {
      status: response.status,
      headers: resHeaders,
    });
  } catch (error: any) {
    // Shield internal error details
    console.error('MCP Server POST error:', error);
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error while processing MCP request',
        },
        id: null,
      },
      {
        status: 500,
        headers: getCorsHeaders(),
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}
