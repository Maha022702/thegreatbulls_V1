import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Check if it's the admin subdomain
  if (hostname.startsWith('admin.')) {
    // Redirect to /admin route
    if (!pathname.startsWith('/admin')) {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/admin${pathname}`;
      return NextResponse.rewrite(newUrl);
    }
  } else {
    // For main domain, don't show /admin directly - redirect to /admin page
    if (pathname === '/admin' || pathname.startsWith('/admin/')) {
      // Only allow /admin and /admin/* on admin subdomain
      return NextResponse.redirect(new URL('https://admin.thegreatbulls.in' + pathname, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
