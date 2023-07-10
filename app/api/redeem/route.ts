import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const data = await req.json()
  const session = await getServerSession(authOptions)
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },
  })

  const updatedUser = await prisma.user.update({
    where: {
      id: user?.id!,
    },
    data: {
      rewards: user?.rewards! - data.price,
    },
  })

  return NextResponse.json(updatedUser)
}
