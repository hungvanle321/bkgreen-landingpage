import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie, findUserById } from './lib/auth-middleware';

export const runtime = 'nodejs';

const handleI18n = createMiddleware({
  locales: ['vi', 'en', 'fr'],
  localePrefix: 'always',
  defaultLocale: 'vi'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/api/auth')) {
    const userId = getAuthCookie(request);

    if (!userId) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const user = await findUserById(userId);
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Skip i18n routing for admin, but allow the request to proceed
    // The locale will be determined by i18n.ts from cookies/headers
    return NextResponse.next();
  }

  // Exclude admin routes from locale prefix requirement
  // Admin routes will use i18n but without locale in URL (locale stored in cookie)
  if (pathname.startsWith('/admin')) {
    // Skip i18n routing for admin, but allow the request to proceed
    // The locale will be determined by i18n.ts from cookies/headers
    return NextResponse.next();
  }

  // Apply i18n middleware to all other routes (with locale prefix)
  return handleI18n(request);
}

export const config = {
  // Apply to all paths except next internals & static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
