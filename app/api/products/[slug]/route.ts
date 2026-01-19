import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Transform the data to include the translated fields directly
    const transformedProduct = {
      id: product.id,
      slug: product.slug,
      images: product.images,
      price: product.price,
      specs: product.specs,
      order: product.order,
      featured: product.featured,
      name: product.translations[0]?.name || '',
      description: product.translations[0]?.description || '',
      shortDescription: product.translations[0]?.shortDescription || '',
      category: product.translations[0]?.category || '',
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
