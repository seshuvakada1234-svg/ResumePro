import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // ✅ Redirect www → non-www safely
  if (url.hostname.startsWith('www.')) {
    const newUrl = new URL(request.url);

    newUrl.hostname = url.hostname.replace('www.', '');
    newUrl.protocol = 'https:'; // ensure HTTPS

    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};