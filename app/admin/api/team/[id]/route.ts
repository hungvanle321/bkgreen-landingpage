import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { requireAdmin } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

const teamMemberSchema = z.object({
  name: z.string().min(1).optional(),
  name_en: z.string().optional(),
  name_fr: z.string().optional(),
  position: z.string().min(1).optional(),
  position_en: z.string().optional(),
  position_fr: z.string().optional(),
  bio: z.string().min(1).optional(),
  bio_en: z.string().optional(),
  bio_fr: z.string().optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      const member = await prisma.teamMember.findUnique({
        where: { id },
      })

      if (!member) {
        return NextResponse.json(
          { error: 'Team member not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(member)
    } catch (error) {
      console.error('Error fetching team member:', error)
      return NextResponse.json(
        { error: 'Failed to fetch team member' },
        { status: 500 }
      )
    }
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (req, _user) => {
    try {
      const { id } = await params
      const body = await req.json()
      const data = teamMemberSchema.parse(body)

      const member = await prisma.teamMember.update({
        where: { id },
        data,
      })

      return NextResponse.json(member)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid data', details: error.issues },
          { status: 400 }
        )
      }
      console.error('Error updating team member:', error)
      return NextResponse.json(
        { error: 'Failed to update team member' },
        { status: 500 }
      )
    }
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(request, async (_req, _user) => {
    try {
      const { id } = await params
      await prisma.teamMember.delete({
        where: { id },
      })

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error deleting team member:', error)
      return NextResponse.json(
        { error: 'Failed to delete team member' },
        { status: 500 }
      )
    }
  })
}

