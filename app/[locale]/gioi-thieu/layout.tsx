import { getTranslations } from 'next-intl/server'

import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'aboutPage' })

  const baseUrl = 'https://bkgreen.vn'
  const localePath = locale ? `/${locale}` : ''
  const url = `${baseUrl}${localePath}/gioi-thieu`

  return {
    title: `${t('strengths.title')} | BK Green`,
    description: t('overview.p1'),
    alternates: {
      canonical: url,
      languages: {
        vi: `${baseUrl}/vi/gioi-thieu`,
        en: `${baseUrl}/en/gioi-thieu`,
        fr: `${baseUrl}/fr/gioi-thieu`
      }
    },
    openGraph: {
      title: `${t('strengths.title')} | BK Green`,
      description: t('overview.p1'),
      type: 'website',
      url,
      siteName: 'BK Green',
      images: [{ url: `${baseUrl}/logo-white-square.png`, width: 512, height: 512, alt: 'BK Green' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('strengths.title')} | BK Green`,
      description: t('overview.p1'),
      images: [`${baseUrl}/logo-white-square.png`]
    }
  }
}

export default function AboutLocaleLayout({ children }: { children: React.ReactNode }) {
  return children
}


