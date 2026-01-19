"use client"
import { useEffect, useState } from 'react'
import { MapPin, Droplets } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useTranslations, useLocale} from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProjectStatusLabel, getProjectTypeLabel, PROJECT_STATUS, getProjectStatusColor } from '@/types/project'

interface Project {
  id: string
  slug: string
  images: string[]
  location?: string
  type?: string
  status?: string
  year?: string
  capacity?: string
  title: string
  description: string
  shortDescription?: string
  featured: boolean
}

export default function ProjectsPageClient() {
  const t = useTranslations('projectsPage')
  const tu = useTranslations('units')
  const locale = useLocale()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/projects?locale=${locale}&limit=100`)
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }
    
    void fetchProjects()
  }, [locale])

  const projectStats = [
    { 
      label: t('stats.active'), 
      value: projects.filter(p => 
        p.status === PROJECT_STATUS.ACTIVE || 
        p.status === PROJECT_STATUS.IN_PROGRESS
      ).length.toString() 
    },
    { 
      label: t('stats.completed'), 
      value: projects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length.toString() 
    },
    { label: t('stats.capacity'), value: projects.length > 0 ? `${projects.length}` : '0' },
    { label: t('stats.service'), value: '24/7' }
  ]

  const featuredProjects = projects.filter(p => p.featured).slice(0, 2)

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">{t('loading') || 'Đang tải...'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{t('header.title')}</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('header.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {projectStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#1844a7' }}>{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('featured.title')}</h2>
          </div>
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                    <Image 
                      src={project.images[0] || '/service-wastewater.jpg'} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" 
                      className="object-cover" 
                      priority 
                      loading="eager" 
                    />
                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${getProjectStatusColor(project.status)}`}>
                          {getProjectStatusLabel(project.status, locale as 'vi' | 'en' | 'fr')}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                        {project.type ? getProjectTypeLabel(project.type, locale as 'vi' | 'en' | 'fr') : 'Dự án'}
                      </span>
                      <span className="text-sm text-gray-500">{project.year || '2025'}</span>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {project.location && (
                        <div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>{project.location}</span></div>
                      )}
                      {project.capacity && (
                        <div className="flex items-center space-x-1"><Droplets className="h-4 w-4" /><span>{project.capacity}</span></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{project.shortDescription || ''}</CardDescription>
                    <Button asChild variant="outline" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                      <Link href={`/${locale}/du-an/${project.slug}`} className="focus:outline-none focus:ring-0">{t('featured.viewDetail')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {t('noProjects') || 'Chưa có dự án nổi bật'}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('all.title')}</h2>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                    <Image 
                      src={project.images[0] || '/service-wastewater.jpg'} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      className="object-cover" 
                    />
                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getProjectStatusColor(project.status)}`}>
                          {getProjectStatusLabel(project.status, locale as 'vi' | 'en' | 'fr')}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                        {project.type ? getProjectTypeLabel(project.type, locale as 'vi' | 'en' | 'fr') : 'Dự án'}
                      </span>
                      <span className="text-sm text-gray-500">{project.year || '2025'}</span>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {project.location && (
                        <div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>{project.location}</span></div>
                      )}
                      {project.capacity && (
                        <div className="flex items-center space-x-1"><Droplets className="h-4 w-4" /><span>{project.capacity}</span></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">{project.shortDescription || ''}</CardDescription>
                    <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                      <Link href={`/${locale}/du-an/${project.slug}`} className="focus:outline-none focus:ring-0">{t('all.detail')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {t('noProjects') || 'Chưa có dự án'}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('cta.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('cta.subtitle')}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href={`/${locale}/lien-he`} className="focus:outline-none focus:ring-0">{t('cta.primary')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/dich-vu`} className="focus:outline-none focus:ring-0">{t('cta.secondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




