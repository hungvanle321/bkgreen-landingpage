"use client"

import { useEffect, useState } from "react"
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
  useSidebar,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  UserCog,
  User,
  Key,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const { setOpenMobile, isMobile, state } = useSidebar()
  const t = useTranslations('admin')
  const logoSrc = theme === 'dark' ? '/logo-white-rectangle.svg' : '/logo-transparent-rectangle.svg'
  const isCollapsed = state === 'collapsed'
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatar?: string } | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/admin/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setCurrentUser(data)
        }
      } catch {
        console.log('Could not fetch current user')
      }
    }
    void fetchCurrentUser()
  }, [])

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

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
      title: t('navigation.users'),
      url: "/admin/users",
      icon: UserCog,
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

  const accountItems = [
    {
      title: t('navigation.profile'),
      url: "/admin/profile",
      icon: User,
    },
    {
      title: t('navigation.changePassword'),
      url: "/admin/change-password",
      icon: Key,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-background border-b">
        <div className={`flex items-center p-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link href="/admin" className="cursor-pointer flex-1" onClick={handleNavClick}>
              <div className="p-2 bg-white rounded-[10px] inline-block">
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
          )}
          {isCollapsed ? (
            <div className="flex justify-center w-full">
              <SidebarTrigger />
            </div>
          ) : (
            <SidebarTrigger className="ml-auto" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="md:pt-0">
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>{t('navigation.main')}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>{t('navigation.account')}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {!isCollapsed && isMobile && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('navigation.language')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <LanguageSwitcher />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {currentUser && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/profile" onClick={handleNavClick}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {!isCollapsed && (
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-medium truncate">{currentUser.name}</span>
                          <span className="text-xs text-gray-500 truncate">{currentUser.email}</span>
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild={false} 
              onClick={() => {
                handleNavClick()
                // Clear auth cookie client-side and redirect
                document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict; secure'
                router.push('/admin/login')
              }}
              title={isCollapsed ? t('navigation.logout') : undefined}
            >
              <LogOut />
              {!isCollapsed && <span>{t('navigation.logout')}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}