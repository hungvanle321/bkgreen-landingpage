'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Info, Wrench, Package, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Trang Chủ', href: '/', icon: Home },
  { name: 'Giới Thiệu', href: '/gioi-thieu', icon: Info },
  { name: 'Dịch Vụ', href: '/dich-vu', icon: Wrench },
  { name: 'Sản Phẩm', href: '/san-pham', icon: Package },
  { name: 'Dự Án', href: '/du-an', icon: FolderOpen },
]

export default function Header() {
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

  const isHomePage = pathname === '/'
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
          <Link href="/" className="-m-1.5 p-1.5 focus:outline-none focus:ring-0">
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
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-square.svg" 
                  alt="BK Green Logo" 
                  width={48}
                  height={48}
                  className="w-12 h-12 sm:hidden"
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
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-rectangle.svg" 
                  alt="BK Green Logo" 
                  width={128}
                  height={32}
                  className="hidden sm:block lg:hidden w-32 h-8"
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
                  />
                </div>
              ) : (
                <Image 
                  src="/logo-transparent-rectangle.svg" 
                  alt="BK Green Logo" 
                  width={160}
                  height={40}
                  className="hidden lg:block w-40 h-10"
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
            <span className="sr-only">Mở menu chính</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                isHomePage && !isScrolled
                  ? 'text-white hover:text-primary-red'
                  : 'text-gray-900 hover:text-primary-red'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button 
            asChild 
            className={isHomePage && !isScrolled 
              ? "bg-transparent text-white border-white hover:bg-white hover:text-primary-blue" 
              : "bg-primary-red text-white hover:bg-primary-red/90"
            }
          >
            <Link href="/lien-he" className="focus:outline-none focus:ring-0">Liên Hệ</Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 focus:outline-none focus:ring-0">
                <span className="sr-only">BK Green</span>
                <div className="flex items-center space-x-2">
                  <Image 
                    src="/logo-transparent-square.svg" 
                    alt="BK Green Logo" 
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-lg font-bold text-primary-blue">BK GREEN</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Đóng menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button asChild className="w-full">
                    <Link href="/lien-he" className="focus:outline-none focus:ring-0">Liên Hệ</Link>
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
