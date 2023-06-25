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

  console.log({
    data: data,
    user: user,
  })
  return NextResponse.json({
    data: data,
    user: user,
  })
}
