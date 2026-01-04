"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

import { useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/LanguageSwitcher"

import {
  Calendar,
  Folder,
  Home,
  Settings,
  Users,
  Wrench,
  Building,
  FileText,
  Image as ImageIcon,
  LogOut,
  Cog,
  Workflow,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const t = useTranslations('admin')
  const logoSrc = theme === 'dark' ? '/logo-white-rectangle.svg' : '/logo-transparent-rectangle.svg'

  const navItems = [
    {
      title: t('dashboard.title'),
      url: "/admin",
      icon: Home,
    },
    {
      title: t('navigation.pages'),
      url: "/admin/pages",
      icon: FileText,
    },
    {
      title: t('navigation.services'),
      url: "/admin/services",
      icon: Wrench,
    },
    {
      title: t('navigation.projects'),
      url: "/admin/projects",
      icon: Folder,
    },
    {
      title: t('navigation.products'),
      url: "/admin/products",
      icon: Building,
    },
    {
      title: t('navigation.equipment'),
      url: "/admin/equipment",
      icon: Cog,
    },
    {
      title: t('navigation.process'),
      url: "/admin/process",
      icon: Workflow,
    },
    {
      title: t('navigation.team'),
      url: "/admin/team",
      icon: Users,
    },
    {
      title: t('navigation.media'),
      url: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: t('navigation.contactForms'),
      url: "/admin/contact-forms",
      icon: Calendar,
    },
    {
      title: t('navigation.settings'),
      url: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="bg-background border-b">
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
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="md:pt-0">
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.main')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.language')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <LanguageSwitcher />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild={false} onClick={() => {
              // Clear auth cookie client-side and redirect
              document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict; secure'
              router.push('/admin/login')
            }}>
              <LogOut />
              <span>{t('navigation.logout')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}