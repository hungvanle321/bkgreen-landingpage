import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { prisma } from '@/lib/prisma'
import { getProjectStatusLabel, getProjectStatusColor, getProjectTypeLabel } from '@/types/project'
import { renderRichText } from '@/lib/richtext-render'

interface PageParams {
  locale: 'vi' | 'en' | 'fr'
  slug: string
}

export default async function ProjectDetailPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params
  const t = await getTranslations('projectsPage')

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
      },
    },
  })

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Project not found</div>
          <div className="mt-6">
            <Link href={`/${locale}/du-an`} className="text-blue-600 hover:underline">{t('all.title')}</Link>
          </div>
        </div>
      </div>
    )
  }

  const title = project.translations[0]?.title || ''
  const description = project.translations[0]?.description || ''

  const heroImage = project.images?.[0] || '/service-wastewater.jpg'
  const gallery = project.images?.slice(1) ?? []

  return (
    <div className="min-h-screen pt-16">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl h-[40vh] sm:h-[50vh] lg:h-[60vh]">
            <Image src={heroImage} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.status && (
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${getProjectStatusColor(project.status)}`}>
                    {getProjectStatusLabel(project.status, locale)}
                  </span>
                )}
                <span className="text-white/90 text-sm bg-black/30 rounded-md px-2 py-1">
                  {project.type ? getProjectTypeLabel(project.type, locale) : 'Project'}
                </span>
                {project.year && (
                  <span className="text-white/90 text-sm bg-black/30 rounded-md px-2 py-1">{project.year}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {project.location && (
                  <span className="text-white/90 text-sm bg-black/30 rounded-md px-2 py-1">📍 {project.location}</span>
                )}
                {project.capacity && (
                  <span className="text-white/90 text-sm bg-black/30 rounded-md px-2 py-1">💧 {project.capacity}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6">
            <Link href={`/${locale}/du-an`} className="text-sm text-blue-600 hover:underline">← {t('all.title')}</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">{title}</h1>
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 prose-img:max-w-md prose-img:mx-auto prose-img:rounded-lg">
                {renderRichText(description)}
              </div>
            </div>
            <div>
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Thông tin dự án</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between"><span>Loại</span><span className="font-medium text-emerald-700">{project.type ? getProjectTypeLabel(project.type, locale) : '—'}</span></div>
                  <div className="flex justify-between"><span>Năm</span><span className="font-medium">{project.year || '—'}</span></div>
                  <div className="flex justify-between"><span>Trạng thái</span><span className="font-medium">{project.status ? getProjectStatusLabel(project.status, locale) : '—'}</span></div>
                  <div className="flex justify-between"><span>Địa điểm</span><span className="font-medium">{project.location || '—'}</span></div>
                  <div className="flex justify-between"><span>Công suất</span><span className="font-medium">{project.capacity || '—'}</span></div>
                </div>
                <div className="mt-4">
                  <Link href={`/${locale}/lien-he`} className="inline-flex items-center justify-center rounded-md border border-red-700 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Liên hệ tư vấn</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h3 className="text-xl font-semibold mb-4">Hình ảnh liên quan</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={src} alt={`${title} - ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
