import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['lv', 'ru', 'lt', 'en'];
const DEFAULT_LOCALE = 'lv';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip API routes, Next.js internals, static files, admin
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/admin/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|map|woff|woff2|ttf|eot|webp|gif|xml|txt|json)$/)
  ) {
    return NextResponse.next();
  }

  // Check if URL already has a locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();
  const hasLocalePrefix = firstSegment ? LOCALES.includes(firstSegment) : false;

  if (hasLocalePrefix) {
    // Redirect duplicate standalone routes to their canonical paths under /pakalpojumi/
    const ROUTE_REDIRECTS: Record<string, string> = {
      '/horeca': '/pakalpojumi/horeca',
      '/industrial': '/pakalpojumi/industrial',
      '/municipal': '/pakalpojumi/municipal',
      '/social': '/pakalpojumi/social',
      '/logistics': '/pakalpojumi/logistics',
    };
    const restPath = pathname.slice(firstSegment!.length + 1); // e.g. "/horeca" from "/lv/horeca"
    const redirectTo = ROUTE_REDIRECTS[restPath];
    if (redirectTo) {
      const url = request.nextUrl.clone();
      url.pathname = `/${firstSegment}${redirectTo}`;
      return NextResponse.redirect(url, 301);
    }

    // Already has locale — set header for root layout and cookie for next visit
    const response = NextResponse.next();
    response.headers.set('x-locale', firstSegment!);
    response.headers.set('x-pathname', pathname);
    response.cookies.set('locale', firstSegment!, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // No locale prefix — determine locale and redirect

  // 1. Check ?lang= query parameter (backwards compat with old URLs)
  const qLang = searchParams.get('lang')?.toLowerCase();
  if (qLang && LOCALES.includes(qLang)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${qLang}${pathname === '/' ? '' : pathname}`;
    url.searchParams.delete('lang');
    return NextResponse.redirect(url, 301);
  }

  // 2. Check cookie (returning visitor)
  const cookieLang = request.cookies.get('locale')?.value?.toLowerCase();
  if (cookieLang && LOCALES.includes(cookieLang)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${cookieLang}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // 3. Check Accept-Language header for known locales
  const acceptLang = request.headers.get('accept-language') || '';
  let detectedLocale = DEFAULT_LOCALE;
  // Priority order: ru, lt, en (lv is default fallback)
  if (acceptLang.includes('ru')) detectedLocale = 'ru';
  else if (acceptLang.includes('lt')) detectedLocale = 'lt';
  else if (acceptLang.includes('en')) detectedLocale = 'en';

  // 4. Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
