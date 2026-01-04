import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'
    const limit = parseInt(searchParams.get('limit') || '6')
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')

    const whereClause: any = {}
    if (featured) {
      whereClause.featured = true
    }
    if (category) {
      whereClause.translations = {
        some: {
          locale,
          category: {
            contains: category,
            mode: 'insensitive'
          }
        }
      }
    }

    const products = await prisma.product.findMany({
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
    const transformedProducts = products.map(product => ({
      id: product.id,
      slug: product.slug,
      images: product.images,
      price: product.price,
      specs: product.specs,
      order: product.order,
      featured: product.featured,
      name: product.translations[0]?.name || '',
      description: product.translations[0]?.description || '',
      category: product.translations[0]?.category || '',
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}