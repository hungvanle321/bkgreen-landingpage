import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'vi'
    
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' },
    })

    // Map fields according to locale
    const mappedMembers = teamMembers.map((member) => ({
      ...member,
      name: locale === 'en' 
        ? (member.name_en || member.name)
        : locale === 'fr'
        ? (member.name_fr || member.name)
        : member.name,
      position: locale === 'en'
        ? (member.position_en || member.position)
        : locale === 'fr'
        ? (member.position_fr || member.position)
        : member.position,
      bio: locale === 'en'
        ? (member.bio_en || member.bio)
        : locale === 'fr'
        ? (member.bio_fr || member.bio)
        : member.bio,
    }))

    return NextResponse.json(mappedMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}