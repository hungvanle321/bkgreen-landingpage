"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'

export function AdminHeader() {
  const t = useTranslations('admin.dashboard')
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="p-2 bg-white rounded-[10px]">
          <h1 className="text-lg font-semibold text-gray-900">{t('title')}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}