import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') || 'Developer';
    
    // Server-side private credentials from environment variables with fallback
    const appId = process.env.ADZUNA_APP_ID || '0780283e';
    const appKey = process.env.ADZUNA_APP_KEY || '69766986420556637378370774780517';

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=5&what=${encodeURIComponent(role)}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Job fetch error:', error?.message || error);
    return NextResponse.json(
      { results: [], error: 'Failed to fetch job matches' },
      { status: 200 } // Return 200 with fallback empty list to prevent UI breakage
    );
  }
}
