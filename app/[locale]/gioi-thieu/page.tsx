import {getTranslations} from 'next-intl/server'

import ClientAboutPage from '../../gioi-thieu/ClientPage'

import type {Metadata} from 'next'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'aboutPage'})
  const baseUrl = 'https://bkgreen.vn'
  const path = `/${locale}/gioi-thieu`
  return {
    metadataBase: new URL(baseUrl),
    title: { default: t('meta.title', { default: 'Giới Thiệu' }), template: '%s | BK Green' },
    description: t('meta.description', { default: 'Giới thiệu BK Green' }),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { vi: `${baseUrl}/vi/gioi-thieu`, en: `${baseUrl}/en/gioi-thieu`, fr: `${baseUrl}/fr/gioi-thieu` }
    },
    openGraph: {
      type: 'website', url: `${baseUrl}${path}`, siteName: 'BK Green',
      title: t('meta.title', { default: 'Giới Thiệu' }), description: t('meta.description', { default: 'Giới thiệu BK Green' }),
      images: [{ url: '/logo-white-square.png', width: 512, height: 512, alt: 'BK Green Logo' }]
    },
    twitter: { card: 'summary_large_image', title: t('meta.title', { default: 'Giới Thiệu' }), description: t('meta.description', { default: 'Giới thiệu BK Green' }), images: ['/logo-white-square.png'] }
  }
}

export default function AboutPage() {
  return <ClientAboutPage />
}
