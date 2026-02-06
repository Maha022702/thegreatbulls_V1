import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Check if it's the admin subdomain
  if (hostname.startsWith('admin.')) {
    // Prepend /admin to all paths on admin subdomain if not already there
    if (!pathname.startsWith('/admin')) {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = '/admin' + pathname;
      return NextResponse.rewrite(newUrl);
    }
  } else {
    // For main domain, redirect /admin paths to admin subdomain
    if (pathname.startsWith('/admin')) {
      const newPath = pathname.replace(/^\/admin/, '') || '/';
      return NextResponse.redirect('https://admin.thegreatbulls.in' + newPath);
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
