import {getTranslations} from 'next-intl/server'

import ProjectsPageClient from '../../du-an/ClientPage'

import type {Metadata} from 'next'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'projectsPage'})
  const baseUrl = 'https://bkgreen.vn'
  const path = `/${locale}/du-an`
  return {
    metadataBase: new URL(baseUrl),
    title: { default: t('header.title'), template: '%s | BK Green' },
    description: t('header.subtitle'),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: { vi: `${baseUrl}/vi/du-an`, en: `${baseUrl}/en/du-an`, fr: `${baseUrl}/fr/du-an` }
    },
    openGraph: {
      type: 'website', url: `${baseUrl}${path}`, siteName: 'BK Green',
      title: t('header.title'), description: t('header.subtitle'),
      images: [{ url: '/logo-white-square.png', width: 512, height: 512, alt: 'BK Green Logo' }]
    },
    twitter: {
      card: 'summary_large_image', title: t('header.title'), description: t('header.subtitle'), images: ['/logo-white-square.png']
    }
  }
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}

