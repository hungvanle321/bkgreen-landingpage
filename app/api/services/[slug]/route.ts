import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale },
        },
      },
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Transform the data to include the translated fields directly
    const transformedService = {
      id: service.id,
      slug: service.slug,
      icon: service.icon,
      image: service.image,
      order: service.order,
      featured: service.featured,
      title: service.translations[0]?.title || '',
      description: service.translations[0]?.description || '',
      features: service.translations[0]?.features ? JSON.parse(service.translations[0].features) : [],
    }

    return NextResponse.json(transformedService)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}
