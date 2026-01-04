import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-white-square.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-white-square.png" />
        <meta name="theme-color" content="#007a3f" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
