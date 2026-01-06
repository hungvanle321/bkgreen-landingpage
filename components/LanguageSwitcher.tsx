'use client'

import { VN, GB, FR } from 'country-flag-icons/react/3x2'
import { Check, Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'


const languages = [
  { code: 'vi', name: 'Tiếng Việt', Flag: VN },
  { code: 'en', name: 'English', Flag: GB },
  { code: 'fr', name: 'Français', Flag: FR }
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === locale)

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)
  }, [])

  const handleLanguageChange = async (newLocale: string) => {
    // Check if we're in admin area
    const isAdminRoute = pathname.startsWith('/admin')

    if (isAdminRoute) {
      // For admin routes, store locale in cookie and reload
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000` // 1 year
      setOpen(false)
      router.refresh() // Refresh to apply new locale
    } else {
      // For regular routes, change URL with locale prefix
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      const newPath = `/${newLocale}${pathWithoutLocale}`
      setOpen(false)
      router.push(newPath)
    }
  }

  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-2">
        {languages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
              locale === language.code ? 'bg-accent' : ''
            }`}
          >
            <language.Flag title={language.name} className="h-4 w-6 rounded-sm" />
            <span className="text-sm font-medium">{language.name}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop/Tablet trigger */}
      <Button
        variant="outline"
        size="sm"
        className="hidden sm:flex items-center justify-center gap-1 h-9 px-2 w-16 shrink-0 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <Globe className="h-4 w-4" />
        {currentLanguage && (
          <currentLanguage.Flag title={currentLanguage.name} className="h-4 w-6 rounded-sm" />
        )}
        <span className="sr-only">Change language</span>
      </Button>

      {/* Mobile inline options */}
      <div className="sm:hidden flex gap-2">
        {languages.map(language => (
          <button
            key={language.code}
            aria-label={language.name}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-center rounded-lg px-2 py-2 border transition-colors duration-150 ${
              locale === language.code ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <language.Flag title={language.name} className="h-6 w-8 rounded-sm" />
            {locale === language.code && <Check className="h-3 w-3 ml-1" />}
          </button>
        ))}
      </div>

      {open && (
        <>
          {/* Desktop dropdown */}
          <div
            role="menu"
            aria-label="Language selector"
            className="hidden sm:block absolute right-0 mt-2 z-[60] rounded-md border border-gray-200 bg-white text-gray-900 shadow-lg p-2 min-w-[10rem] space-y-1"
          >
            {languages.map(language => (
              <button
                key={language.code}
                role="menuitemradio"
                aria-checked={locale === language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 ${
                  locale === language.code ? 'bg-accent' : ''
                }`}
              >
                <language.Flag title={language.name} className="h-4 w-6 rounded-sm" />
                <span className="text-xs">{language.name}</span>
                {locale === language.code && <Check className="h-4 w-4 ml-1" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
