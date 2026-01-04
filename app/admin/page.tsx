import Link from 'next/link'

import { getMessages } from 'next-intl/server'
import { Users, Folder, Wrench, Building } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  const [totalUsers, totalProjects, totalServices, totalProducts] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.service.count(),
    prisma.product.count(),
  ])

  return {
    totalUsers,
    totalProjects,
    totalServices,
    totalProducts,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const messages = await getMessages()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {messages.admin?.dashboard?.title || 'Admin Dashboard'}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {messages.admin?.dashboard?.stats?.totalUsers || 'Total Users'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {messages.admin?.dashboard?.stats?.totalProjects || 'Total Projects'}
            </CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {messages.admin?.dashboard?.stats?.totalServices || 'Total Services'}
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {messages.admin?.dashboard?.stats?.totalProducts || 'Total Products'}
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {messages.admin?.dashboard?.welcome || 'Welcome to the admin dashboard'}
            </CardTitle>
            <CardDescription>
              {messages.admin?.dashboard?.description || 'Use the navigation menu to manage your website content, users, and settings.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/pages" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">{messages.admin?.dashboard?.quickLinks?.pages?.title || 'Pages'}</h3>
                  <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickLinks?.pages?.description || 'Manage website pages'}</p>
                </Link>
                <Link href="/admin/services" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">{messages.admin?.dashboard?.quickLinks?.services?.title || 'Services'}</h3>
                  <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickLinks?.services?.description || 'Manage services'}</p>
                </Link>
                <Link href="/admin/projects" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">{messages.admin?.dashboard?.quickLinks?.projects?.title || 'Projects'}</h3>
                  <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickLinks?.projects?.description || 'Manage projects'}</p>
                </Link>
                <Link href="/admin/products" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold">{messages.admin?.dashboard?.quickLinks?.products?.title || 'Products'}</h3>
                  <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickLinks?.products?.description || 'Manage products'}</p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{messages.admin?.dashboard?.quickActions?.title || 'Quick Actions'}</CardTitle>
            <CardDescription>
              {messages.admin?.dashboard?.quickActions?.description || 'Perform common administrative tasks quickly.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/admin/team" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">{messages.admin?.dashboard?.quickActions?.team?.title || 'Team Management'}</h3>
                <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickActions?.team?.description || 'Manage team members and their information'}</p>
              </Link>
              <Link href="/admin/media" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">{messages.admin?.dashboard?.quickActions?.media?.title || 'Media Library'}</h3>
                <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickActions?.media?.description || 'Upload and manage media files'}</p>
              </Link>
              <Link href="/admin/contact-forms" className="block p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">{messages.admin?.dashboard?.quickActions?.contactForms?.title || 'Contact Forms'}</h3>
                <p className="text-sm text-muted-foreground">{messages.admin?.dashboard?.quickActions?.contactForms?.description || 'View and manage contact form submissions'}</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}