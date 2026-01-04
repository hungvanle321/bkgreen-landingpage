import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

// Can be imported from a shared config
const locales = ['vi', 'en', 'fr'] as const;

export default getRequestConfig(async ({locale}) => {
  let effectiveLocale: typeof locales[number] = 'vi';
  
  // If locale is provided (from URL path like /vi/...), use it
  if (locale) {
    // Normalize locale (e.g., en-US -> en)
    const base = (locale || '').toLowerCase().split('-')[0] as typeof locales[number] | ''
    // Fallback to default if unsupported
    effectiveLocale = (!base || !locales.includes(base)) ? 'vi' : base;
  } else {
    // For admin routes (without locale prefix), get locale from cookie or header
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    
    if (localeCookie && locales.includes(localeCookie as typeof locales[number])) {
      effectiveLocale = localeCookie as typeof locales[number];
    } else {
      // Check Accept-Language header as fallback
      const headersList = await headers();
      const acceptLanguage = headersList.get('accept-language');
      if (acceptLanguage) {
        const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
        if (preferredLang && locales.includes(preferredLang as typeof locales[number])) {
          effectiveLocale = preferredLang as typeof locales[number];
        }
      }
    }
  }

  return {
    locale: effectiveLocale,
    messages: (await import(`./messages/${effectiveLocale}.json`)).default
  };
});
