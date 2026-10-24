import { NextRequest, NextResponse } from 'next/server';
import { getResume } from '@/lib/mcp/storage';

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
        { error: 'Unauthorized: Access token is required to view this resume' },
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

    return NextResponse.json({
      id: record.id,
      resume: record.data,
      targetRole: record.targetRole,
      targetJobDescription: record.targetJobDescription,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  } catch (error: any) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Failed to retrieve resume' }, { status: 500 });
  }
}
