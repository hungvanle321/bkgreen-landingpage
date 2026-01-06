import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const equipment = await prisma.equipment.findMany({
      include: {
        translations: {
          where: { locale },
        },
      },
      orderBy: { order: 'asc' },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedEquipment = equipment.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      image: item.image,
      order: item.order,
      title: item.translations[0]?.title || '',
      description: item.translations[0]?.description || '',
      category: item.translations[0]?.category || '',
    }))

    return NextResponse.json(transformedEquipment)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    )
  }
}