import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AOSInit from '@/components/AOSInit'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bkgreen.vn'),
  title: {
    default: 'BK Green - Công ty kỹ thuật xử lý nước',
    template: '%s | BK Green'
  },
  description: 'CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải. Giải pháp toàn diện cho xử lý nước thải, hệ thống RO, thiết bị PCCC.',
  keywords: [
    'xử lý nước thải',
    'hệ thống RO',
    'thiết bị PCCC',
    'vận hành hệ thống',
    'BK Green',
    'công ty kỹ thuật nước',
    'giải pháp nước',
    'xử lý nước cấp',
    'thiết bị ngành nước',
    'tư vấn môi trường'
  ],
  authors: [{ name: 'BK Green', url: 'https://bkgreen.vn' }],
  creator: 'BK Green',
  publisher: 'BK Green',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-white-square.png',
    shortcut: '/logo-white-square.png',
    apple: '/logo-white-square.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://bkgreen.vn',
    siteName: 'BK Green',
    title: 'BK Green - Giải Pháp Nước Toàn Diện',
    description: 'CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải',
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
    title: 'BK Green - Giải Pháp Nước Toàn Diện',
    description: 'CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải',
    images: ['/logo-white-square.png'],
  },
  alternates: {
    canonical: 'https://bkgreen.vn',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        <link rel="icon" href="/logo-white-square.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-white-square.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-white-square.png" />
      </head>
      <body className={`${inter.className} font-sans`} suppressHydrationWarning={true}>
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
              "foundingDate": "2024",
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
      </body>
    </html>
  )
}
