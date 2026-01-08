'use client'

import { Menu, X, Home, Info, Wrench, Package, FolderOpen, ChevronDown, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {useLocale, useTranslations} from 'next-intl'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import LanguageSwitcher from './LanguageSwitcher'

interface Settings {
  logo_url?: string
}

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/gioi-thieu', icon: Info },
  { key: 'services', href: '/dich-vu', icon: Wrench },
  { key: 'products', href: '/san-pham', icon: Package },
  { key: 'projects', href: '/du-an', icon: FolderOpen },
]

interface Page {
  id: string
  title: string
  slug: string
}

export default function Header() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [settings, setSettings] = useState<Settings>({})
  const [pages, setPages] = useState<Page[]>([])
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings')
        const data = await response.json()
        setSettings(data)
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }

    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages')
        if (response.ok) {
          const data = await response.json()
          setPages(data || [])
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
      }
    }

    void fetchSettings()
    void fetchPages()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow
      const originalHtml = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
        document.documentElement.style.overflow = originalHtml
      }
    }
  }, [mobileMenuOpen])


  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`
  const headerClasses = isHomePage
    ? `fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background shadow-lg backdrop-blur-md'
          : 'bg-transparent backdrop-blur-none'
      }`
    : 'bg-background shadow-sm fixed w-full top-0 z-50'

  const getLogoSrc = (type: 'square' | 'rectangle') => {
    if (settings.logo_url) {
      return settings.logo_url
    }
    return type === 'square' ? '/logo-transparent-square.svg' : '/logo-transparent-rectangle.svg'
  }

  return (
    <header className={headerClasses}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo Container */}
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5 focus:outline-none focus:ring-0">
            <span className="sr-only">BK Green</span>
            <div className="flex items-center space-x-2">
              {/* Mobile Logo - Left aligned */}
              {isHomePage && !isScrolled ? (
                <div className="w-12 h-12 bg-background/90 rounded-lg flex items-center justify-center shadow-lg sm:hidden">
                  <Image
                    src={getLogoSrc('square')}
                    alt="BK Green Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    priority
                  />
                </div>
              ) : (
                <Image
                  src={getLogoSrc('square')}
                  alt="BK Green Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 sm:hidden"
                  priority
                />
              )}
              {/* Tablet Logo */}
              {isHomePage && !isScrolled ? (
                 <div className="hidden sm:flex lg:hidden w-36 h-10 bg-background/90 rounded-lg items-center justify-center shadow-lg px-2">
                   <Image
                     src={getLogoSrc('rectangle')}
                     alt="BK Green Logo"
                     width={112}
                     height={24}
                     className="w-28 h-6"
                     priority
                   />
                 </div>
               ) : (
                 <Image
                   src={getLogoSrc('rectangle')}
                   alt="BK Green Logo"
                   width={128}
                   height={32}
                   className="hidden sm:block lg:hidden w-32 h-8"
                   priority
                 />
               )}
              {/* Desktop Logo */}
              {isHomePage && !isScrolled ? (
                 <div className="hidden lg:flex bg-background/90 rounded-lg items-center justify-center shadow-lg">
                   <Image
                     src={getLogoSrc('rectangle')}
                     alt="BK Green Logo"
                     width={160}
                     height={40}
                     className="w-40 h-10"
                     priority
                   />
                 </div>
               ) : (
                 <Image
                   src={getLogoSrc('rectangle')}
                   alt="BK Green Logo"
                   width={160}
                   height={40}
                   className="hidden lg:block w-40 h-10"
                   priority
                 />
               )}
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${
              isHomePage && !isScrolled
                ? 'text-white hover:text-primary-red'
                : 'text-gray-700 hover:text-primary-red'
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t('openMenu') }</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isHomePage && !isScrolled
                  ? 'text-white hover:text-primary-red'
                  : 'text-foreground hover:text-primary-red'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          {pages.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setPagesDropdownOpen(true)}
                onMouseLeave={() => setPagesDropdownOpen(false)}
                className={`text-sm font-semibold leading-6 transition-colors flex items-center gap-1 ${
                  isHomePage && !isScrolled
                    ? 'text-white hover:text-primary-red'
                    : 'text-foreground hover:text-primary-red'
                }`}
              >
                {t('more') || 'Khác'}
                <ChevronDown className="h-4 w-4" />
              </button>
              {pagesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setPagesDropdownOpen(true)}
                  onMouseLeave={() => setPagesDropdownOpen(false)}
                >
                  {pages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/${locale}/pages/${page.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setPagesDropdownOpen(false)}
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <LanguageSwitcher />
           <Button
            asChild
            className={isHomePage && !isScrolled
              ? "bg-transparent text-white border-white hover:bg-white hover:text-primary-blue"
              : "bg-primary-red text-white hover:bg-primary-red/90"
            }
          >
            <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('contact')}</Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <button 
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[90] bg-black/30"
          />
          <div className="fixed inset-y-0 right-0 z-[100] w-full h-screen overflow-y-auto overscroll-contain bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="sr-only">BK Green</span>
              <div />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">{t('closeMenu')}</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* Big centered logo like footer mobile */}
            <div className="flex flex-col items-center mt-2 mb-6">
              <Link href={`/${locale}`} className="focus:outline-none focus:ring-0">
                <div className="w-20 h-20 bg-background rounded-xl flex items-center justify-center shadow-lg mb-3">
                  <Image
                    src={getLogoSrc('square')}
                    alt="BK Green Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                    priority
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary-blue text-center">BK GREEN</h2>
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.href}`}
                      className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{t(item.key)}</span>
                    </Link>
                  ))}
                  {pages.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        {t('more') || 'Khác'}
                      </div>
                      {pages.map((page) => (
                        <Link
                          key={page.id}
                          href={`/${locale}/pages/${page.slug}`}
                          className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted items-center space-x-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FileText className="h-5 w-5" />
                          <span>{page.title}</span>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
                <div className="py-6 space-y-4">
                  <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0" onClick={() => setMobileMenuOpen(false)}>
                      {t('contact')}
                    </Link>
                  </Button>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
