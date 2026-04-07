import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const hostname = nextUrl.hostname;

  // ✅ Only redirect EXACT www → non-www (no startsWith)
  if (hostname === 'www.freeresume.dev') {
    const url = new URL(request.url);

    url.hostname = 'freeresume.dev';
    url.protocol = 'https:'; // enforce HTTPS

    return NextResponse.redirect(url, 301);
  }

  // ✅ Prevent any accidental loops
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all pages except static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};