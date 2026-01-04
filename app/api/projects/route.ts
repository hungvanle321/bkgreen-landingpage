import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'
    const limit = parseInt(searchParams.get('limit') || '6')
    const featured = searchParams.get('featured') === 'true'

    const whereClause: any = {}
    if (featured) {
      whereClause.featured = true
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { locale },
        },
      },
      orderBy: { order: 'asc' },
      take: limit,
    })

    // Transform the data to include the translated fields directly
    const transformedProjects = projects.map(project => ({
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
      category: project.translations[0]?.category || '',
    }))

    return NextResponse.json(transformedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}