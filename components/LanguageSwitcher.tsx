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
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale}`
    setOpen(false)
    router.push(newPath)
  }

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

      {/* Mobile inline options (no layer) */}
      <div className="sm:hidden flex flex-col items-stretch gap-2 w-full">
        {languages.map(language => (
          <button
            key={language.code}
            aria-label={language.name}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm border transition-colors duration-150 ${
              locale === language.code ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <language.Flag title={language.name} className="h-4 w-6 rounded-sm" />
            <span className="text-xs">{language.name}</span>
            {locale === language.code && <Check className="h-4 w-4" />}
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

          {/* Mobile no-layer mode: dropdown disabled */}
        </>
      )}
    </div>
  )
}
