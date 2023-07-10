import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const funds = await prisma.fund.findMany({})

  return NextResponse.json(funds)
}
