import { NextResponse } from 'next/server';

export function GET() {
  const fileContent = 'google.com, pub-6397085715997255, DIRECT, f08c47fec0942fa0\n';
  
  return new NextResponse(fileContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
