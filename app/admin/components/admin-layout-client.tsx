"use client"

import { SidebarProvider } from '@/components/ui/sidebar'
import { AdminSidebar } from './admin-sidebar'
import { AdminHeader } from './admin-header'
import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'next-themes'

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background">
          <Toaster />
          {children}
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Toaster />
        <SidebarProvider>
          <AdminSidebar />
          <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
              <div className="max-w-full">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}