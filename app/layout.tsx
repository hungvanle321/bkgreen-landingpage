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
  title: 'BK Green - Công ty kỹ thuật xử lý nước',
  description: 'CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải',
  keywords: 'xử lý nước, nước thải, hệ thống RO, thiết bị PCCC, BK Green',
  authors: [{ name: 'BK Green' }],
  openGraph: {
    title: 'BK Green - CREATE REAL VALUES',
    description: 'Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải',
    type: 'website',
    locale: 'vi_VN',
  },
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
      </head>
      <body className={`${inter.className} font-sans`} suppressHydrationWarning={true}>
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
