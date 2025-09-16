import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import {getTranslations} from 'next-intl/server'

import '../globals.css'
import AOSInit from '@/components/AOSInit'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const locales = ['vi', 'en', 'fr']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const tHero = await getTranslations({locale, namespace: 'hero'})
  const baseUrl = 'https://bkgreen.vn'
  const localePath = `/${locale}`
  const canonical = `${baseUrl}${localePath}`
  return {
    metadataBase: new URL('https://bkgreen.vn'),
    title: {
      default: tHero('title'),
      template: '%s | BK Green'
    },
    description: tHero('subtitle'),
    alternates: {
      canonical,
      languages: {
        vi: `${baseUrl}/vi`,
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`
      }
    },
    icons: {
      icon: '/logo-white-square.png',
      shortcut: '/logo-white-square.png',
      apple: '/logo-white-square.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      url: 'https://bkgreen.vn',
      siteName: 'BK Green',
      title: tHero('title'),
      description: tHero('subtitle'),
      images: [
        {
          url: '/logo-white-square.png',
          width: 512,
          height: 512,
          alt: 'BK Green Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tHero('title'),
      description: tHero('subtitle'),
      images: ['/logo-white-square.png'],
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const { locale } = await params
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = (await import(`../../messages/${locale}.json`)).default
  return (
    <div className={inter.variable}>
      <NextIntlClientProvider key={locale} messages={messages} locale={locale}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BK Green",
            "alternateName": "CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN",
            "url": "https://bkgreen.vn",
            "logo": "https://bkgreen.vn/logo-white-square.png",
            "description": "CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "517B Lê Trọng Tấn",
              "addressLocality": "Tây Thạnh",
              "addressRegion": "TP. Hồ Chí Minh",
              "addressCountry": "VN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+84-931-252-511",
              "contactType": "customer service",
              "email": "dien.tran@bkgreen.vn"
            },
            "sameAs": [
              "https://fb.com/profile.php?id=61579638492742",
              "https://linkedin.com/company/bk-green"
            ],
            "foundingDate": "2025",
            "industry": "Water Treatment Technology",
            "services": [
              "Xử lý nước thải",
              "Hệ thống RO",
              "Thiết bị PCCC",
              "Vận hành hệ thống",
              "Tư vấn kỹ thuật"
            ]
          })
        }}
      />
      <AOSInit />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      </NextIntlClientProvider>
    </div>
  )
}
