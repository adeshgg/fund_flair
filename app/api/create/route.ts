import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const data = await req.json()
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  const fundData = {
    ...data,
    creatorId: user?.id,
  }

  const createdFund = await prisma.fund.create({
    data: fundData,
  })

  return NextResponse.json(createdFund)
}
