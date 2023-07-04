import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, context) {
  const { slug } = context.params
  const funds = await prisma.fund.findMany({
    where: {
      OR: [
        {
          name: {
            contains: slug,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            has: slug,
          },
        },
      ],
    },
  })

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
