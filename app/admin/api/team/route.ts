import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import { translateTeamFields } from '@/lib/azure-translate'

const teamMemberSchema = z.object({
  name: z.string().min(1),
  name_en: z.string().optional(),
  name_fr: z.string().optional(),
  position: z.string().min(1),
  position_en: z.string().optional(),
  position_fr: z.string().optional(),
  bio: z.string().min(1),
  bio_en: z.string().optional(),
  bio_fr: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
})

export async function GET(request: NextRequest) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const members = await prisma.teamMember.findMany({
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(members)
    } catch (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json(
        { error: 'Failed to fetch team members' },
        { status: 500 }
      )
    }
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    try {
      const body = await req.json()
      const parsed = teamMemberSchema.parse(body)

      // Auto-translate missing EN/FR fields
      const translatedFields = await translateTeamFields({
        name: parsed.name,
        name_en: parsed.name_en,
        name_fr: parsed.name_fr,
        position: parsed.position,
        position_en: parsed.position_en,
        position_fr: parsed.position_fr,
        bio: parsed.bio,
        bio_en: parsed.bio_en,
        bio_fr: parsed.bio_fr,
      })

      const member = await prisma.teamMember.create({
        data: {
          name: translatedFields.name || parsed.name,
          name_en: translatedFields.name_en,
          name_fr: translatedFields.name_fr,
          position: translatedFields.position || parsed.position,
          position_en: translatedFields.position_en,
          position_fr: translatedFields.position_fr,
          bio: translatedFields.bio || parsed.bio,
          bio_en: translatedFields.bio_en,
          bio_fr: translatedFields.bio_fr,
          email: parsed.email,
          phone: parsed.phone,
          image: parsed.image,
          userId: user.id,
        },
      })

      return NextResponse.json(member, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error creating team member:', error)
      return NextResponse.json(
        { error: 'Failed to create team member' },
        { status: 500 }
      )
    }
  })
}

