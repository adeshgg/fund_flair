import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ rewards: 0 })

  const currentUserEmail = session?.user?.email!

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  return NextResponse.json({ rewards: user?.rewards })
}
