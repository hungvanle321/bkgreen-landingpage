import './globals.css'
import { getMessages, getLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { AdminLayoutClient } from './components/admin-layout-client'

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-white-square.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-white-square.png" />
        <meta name="theme-color" content="#007a3f" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AdminLayoutClient>
            {children}
          </AdminLayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}