import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { renderRichText } from '@/lib/richtext-render'

interface PageRouteProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

async function getPageBySlug(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
  })

  return page
}

export async function generateMetadata(
  props: PageRouteProps
): Promise<Metadata> {
  const { slug, locale } = await props.params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {}
  }

  const title = locale === 'en' 
    ? (page.metaTitle_en || page.title_en || page.metaTitle || page.title)
    : locale === 'fr'
    ? (page.metaTitle_fr || page.title_fr || page.metaTitle || page.title)
    : (page.metaTitle || page.title)
  
  const description = locale === 'en'
    ? (page.metaDescription_en || page.content_en?.slice(0, 160) || page.metaDescription || page.content?.slice(0, 160))
    : locale === 'fr'
    ? (page.metaDescription_fr || page.content_fr?.slice(0, 160) || page.metaDescription || page.content?.slice(0, 160))
    : (page.metaDescription || page.content?.slice(0, 160))

  return {
    title,
    description,
  }
}

export default async function DynamicPage(props: PageRouteProps) {
  const { slug, locale } = await props.params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const title = locale === 'en' 
    ? (page.title_en || page.title)
    : locale === 'fr'
    ? (page.title_fr || page.title)
    : page.title

  const content = locale === 'en'
    ? (page.content_en || page.content)
    : locale === 'fr'
    ? (page.content_fr || page.content)
    : page.content

  const metaDescription = locale === 'en'
    ? (page.metaDescription_en || page.metaDescription)
    : locale === 'fr'
    ? (page.metaDescription_fr || page.metaDescription)
    : page.metaDescription

  return (
    <div className="min-h-screen pt-16">
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h1>

          {metaDescription && (
            <p className="text-lg text-muted-foreground mb-6">
              {metaDescription}
            </p>
          )}

          <article className="prose prose-slate dark:prose-invert max-w-none">
            {renderRichText(content)}
          </article>
        </div>
      </section>
    </div>
  )
}

