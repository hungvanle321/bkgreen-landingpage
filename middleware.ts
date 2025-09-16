import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const handleI18n = createMiddleware({
  locales: ['vi', 'en', 'fr'],
  localePrefix: 'always',
  defaultLocale: 'vi'
});

export default function middleware(request: NextRequest) {
  return handleI18n(request)
}

export const config = {
  // Apply to all paths except next internals & static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
