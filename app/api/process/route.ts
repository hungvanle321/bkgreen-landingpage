import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'

    const processSteps = await prisma.processStep.findMany({
      include: {
        translations: {
          where: { locale },
        },
      },
      orderBy: { order: 'asc' },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedSteps = processSteps.map((step: any) => ({
      id: step.id,
      step: step.step,
      image: step.image,
      order: step.order,
      title: step.translations[0]?.title || '',
      description: step.translations[0]?.description || '',
    }))

    return NextResponse.json(transformedSteps)
  } catch (error) {
    console.error('Error fetching process steps:', error)
    return NextResponse.json(
      { error: 'Failed to fetch process steps' },
      { status: 500 }
    )
  }
}