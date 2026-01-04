"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  Settings,
  Users,
  Wrench,
  Building,
  FileText,
  Image as ImageIcon,
  Calendar,
  LogOut,
  Cog,
  Workflow,
  Globe,
} from 'lucide-react'
import { VN, GB, FR } from 'country-flag-icons/react/3x2'

const navItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Pages',
    url: '/admin/pages',
    icon: FileText,
  },
  {
    title: 'Services',
    url: '/admin/services',
    icon: Wrench,
  },
  {
    title: 'Projects',
    url: '/admin/projects',
    icon: Building,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Building,
  },
  {
    title: 'Equipment',
    url: '/admin/equipment',
    icon: Cog,
  },
  {
    title: 'Process',
    url: '/admin/process',
    icon: Workflow,
  },
  {
    title: 'Team',
    url: '/admin/team',
    icon: Users,
  },
  {
    title: 'Media',
    url: '/admin/media',
    icon: ImageIcon,
  },
  {
    title: 'Contact Forms',
    url: '/admin/contact-forms',
    icon: Calendar,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
]

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()
  const t = useTranslations('admin')
  
  const logoSrc = theme === 'dark' ? '/logo-white-rectangle.svg' : '/logo-transparent-rectangle.svg'

  const handleLogout = () => {
    // Clear auth cookie client-side and redirect
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict; secure'
    router.push('/admin/login')
  }

  const handleLanguageChange = (locale: string) => {
    // For admin routes, store locale in cookie and reload
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000` // 1 year
    setIsOpen(false)
    router.refresh() // Refresh to apply new locale
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-card border-b z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/admin" className="cursor-pointer">
            <div className="p-2 bg-white rounded-[10px]">
              <Image
                src={logoSrc}
                alt="BK Green Logo"
                width={120}
                height={30}
                className="h-8 w-auto hover:opacity-80 transition-opacity"
                priority
                suppressHydrationWarning
              />
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <nav className={`fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b">
            <div className="p-2 bg-white rounded-[10px]">
              <Image
                src={logoSrc}
                alt="BK Green Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
                suppressHydrationWarning
              />
            </div>
          </div>
          
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t space-y-4">
            {/* Language Selection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 rounded-md bg-muted">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t('navigation.language')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleLanguageChange('vi')}
                  className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <VN className="h-4 w-6 rounded-sm" />
                  <span className="text-xs">VI</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <GB className="h-4 w-6 rounded-sm" />
                  <span className="text-xs">EN</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className="flex-1 min-w-[80px] flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <FR className="h-4 w-6 rounded-sm" />
                  <span className="text-xs">FR</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted transition-colors w-full"
            >
              <LogOut className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">{t('navigation.logout')}</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}