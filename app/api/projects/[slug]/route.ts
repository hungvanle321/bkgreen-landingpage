import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const transformed = {
      id: project.id,
      slug: project.slug,
      images: project.images,
      location: project.location,
      type: project.type,
      status: project.status,
      year: project.year,
      capacity: project.capacity,
      order: project.order,
      featured: project.featured,
      title: project.translations[0]?.title || '',
      description: project.translations[0]?.description || '',
      shortDescription: project.translations[0]?.shortDescription || '',
      category: project.translations[0]?.category || '',
    }

    return NextResponse.json(transformed)
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}
