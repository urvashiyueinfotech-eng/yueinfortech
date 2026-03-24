// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SPAM_PATTERNS = [
  '/products/',
  '/product/',
  '/class/',
  '/petpooja_captain/',
  '/home',
  '/shopdetail/'
];

const SPAM_REGEX = /^\/\d+\.html?$/;

function isSpamRequest(pathname: string): boolean {
  return (
    SPAM_PATTERNS.some((pattern) => pathname.startsWith(pattern)) ||
    SPAM_REGEX.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isSpamRequest(pathname)) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const logData = {
      type: '🚨 SPAM_REQUEST',
      time: new Date().toISOString(),
      path: pathname,
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || 'none',
      // Vercel injects these headers automatically
      country: request.headers.get('x-vercel-ip-country') || 'unknown',
      city: request.headers.get('x-vercel-ip-city') || 'unknown',
      region: request.headers.get('x-vercel-ip-country-region') || 'unknown',
    };

    console.log(JSON.stringify(logData, null, 2));

    return new Response('Not Found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
};