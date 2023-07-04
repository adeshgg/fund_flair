import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const funds = await prisma.fund.findMany({})

  const updatedFunds = await Promise.all(
    funds.map(async fund => {
      const user = await prisma.user.findFirst({
        where: {
          id: fund.creatorId,
        },
      })
      return {
        ...fund,
        username: user?.name,
      }
    })
  )

  return NextResponse.json(updatedFunds)
}
