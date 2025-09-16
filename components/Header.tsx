'use client'

import { Menu, X, Home, Info, Wrench, Package, FolderOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {useLocale, useTranslations} from 'next-intl'
import { useState, useEffect } from 'react'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/gioi-thieu', icon: Info },
  { key: 'services', href: '/dich-vu', icon: Wrench },
  { key: 'products', href: '/san-pham', icon: Package },
  { key: 'projects', href: '/du-an', icon: FolderOpen },
]

export default function Header() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          ? 'bg-white shadow-lg backdrop-blur-md' 
          : 'bg-transparent backdrop-blur-none'
      }`
    : 'bg-white shadow-sm fixed w-full top-0 z-50'

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
                <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-lg sm:hidden">
                  <Image 
                    src="/logo-transparent-square.svg" 
                    alt="BK Green Logo" 
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    priority
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-square.svg" 
                  alt="BK Green Logo" 
                  width={48}
                  height={48}
                  className="w-12 h-12 sm:hidden"
                  priority
                />
              )}
              {/* Tablet Logo */}
              {isHomePage && !isScrolled ? (
                <div className="hidden sm:flex lg:hidden w-36 h-10 bg-white/90 rounded-lg items-center justify-center shadow-lg px-2">
                  <Image 
                    src="/logo-transparent-rectangle.svg" 
                    alt="BK Green Logo" 
                    width={112}
                    height={24}
                    className="w-28 h-6"
                    priority
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-rectangle.svg" 
                  alt="BK Green Logo" 
                  width={128}
                  height={32}
                  className="hidden sm:block lg:hidden w-32 h-8"
                  priority
                />
              )}
              {/* Desktop Logo */}
              {isHomePage && !isScrolled ? (
                <div className="hidden lg:flex bg-white/90 rounded-lg items-center justify-center shadow-lg">
                  <Image 
                    src="/logo-transparent-rectangle.svg" 
                    alt="BK Green Logo" 
                    width={160}
                    height={40}
                    className="w-40 h-10"
                    priority
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-rectangle.svg" 
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
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isHomePage && !isScrolled
                  ? 'text-white hover:text-primary-red'
                  : 'text-gray-900 hover:text-primary-red'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
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
          <div className="fixed inset-y-0 right-0 z-[100] w-full h-screen overflow-y-auto overscroll-contain bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
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
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3">
                  <Image 
                    src="/logo-transparent-square.svg" 
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
                      className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{t(item.key)}</span>
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0" onClick={() => setMobileMenuOpen(false)}>
                      {t('contact')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
