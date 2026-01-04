import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (req, _user) => {
    const cookieStore = await cookies()
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'vi'
    const messages = (await import(`@/messages/${locale}.json`)).default

    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get('status')

      const where: any = {}
      if (status) {
        where.status = status
      }

      const forms = await prisma.contactForm.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(forms)
    } catch (error) {
      console.error('Error fetching contact forms:', error)
      return NextResponse.json(
        { error: messages.errors.fetchContactFormsFailed },
        { status: 500 }
      )
    }
  })
}

