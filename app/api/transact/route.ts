import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  const body = await req.json()
  //   const sessionId = body.sessionId
  const fundId = body.fundId
  const amount = body.amount
  const paymentStatus = body.paymentStatus

  const fund = await prisma.fund.findUnique({
    where: {
      id: fundId,
    },
  })

  if (paymentStatus === 'paid') {
    // const { backedFunds } = await prisma.user.findFirst({
    //   where: { id: user?.id },
    //   select: { backedFunds: true },
    // })

    // const { backers } = await prisma.fund.findFirst({
    //   where: { id: fund?.id },
    //   select: { backers: true },
    // })
    const updatedUser = await prisma.user.update({
      where: { id: user?.id! },
      data: {
        backedFunds: {
          connect: { id: fund?.id! },
        },
      },
      include: {
        backedFunds: true,
      },
    })

    const updatedFund = await prisma.fund.update({
      where: { id: fundId! },
      data: {
        backers: {
          connect: { id: user?.id! },
        },
        currentAmount: fund?.currentAmount! + amount,
      },
      include: {
        backers: true,
      },
    })

    console.log('updatedUser', updatedUser)
    console.log('updatedFund', updatedFund)

    return NextResponse.json({
      updatedUser,
      updatedFund,
    })
  }

  return NextResponse.json({ msg: 'Something F*ed up' })
}
