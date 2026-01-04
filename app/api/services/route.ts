import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const services = await prisma.service.findMany({
      include: {
        translations: {
          where: { locale },
        },
      },
      orderBy: { order: 'asc' },
    })

    // Transform the data to include the translated fields directly
    const transformedServices = services.map(service => ({
      id: service.id,
      slug: service.slug,
      icon: service.icon,
      image: service.image,
      order: service.order,
      title: service.translations[0]?.title || '',
      description: service.translations[0]?.description || '',
    }))

    return NextResponse.json(transformedServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}