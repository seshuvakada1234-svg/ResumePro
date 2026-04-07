import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // redirect www → non-www ONLY
  if (url.hostname.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.hostname = url.hostname.replace('www.', '');
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};