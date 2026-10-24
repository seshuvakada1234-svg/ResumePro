import { NextRequest, NextResponse } from 'next/server';
import { getResume } from '@/lib/mcp/storage';
import { generateResumePdfBuffer } from '@/lib/mcp/pdfRenderer';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!id) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: Access token is required to download this resume' },
        { status: 401 }
      );
    }

    const record = await getResume(id, token);
    if (!record) {
      return NextResponse.json(
        { error: 'Resume not found or invalid authorization token' },
        { status: 404 }
      );
    }

    // Generate the PDF buffer
    const pdfBuffer = await generateResumePdfBuffer(record.data);

    // Sanitize filename
    const candidateName = record.data.personalInfo?.fullName || 'Candidate';
    const cleanName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Resume_${cleanName}.pdf`;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Error generating resume PDF download:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF resume' },
      { status: 500 }
    );
  }
}
