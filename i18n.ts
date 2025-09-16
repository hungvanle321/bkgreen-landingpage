import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['vi', 'en', 'fr'] as const;

export default getRequestConfig(async ({locale}) => {
  // Normalize locale (e.g., en-US -> en)
  const base = (locale || '').toLowerCase().split('-')[0] as typeof locales[number] | ''

  // Fallback to default if unsupported
  const effective = (!base || !locales.includes(base)) ? 'vi' : base

  return {
    locale: effective,
    messages: (await import(`./messages/${effective}.json`)).default
  };
});
