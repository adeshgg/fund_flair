import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import FundCard from '@/components/FundCard'

export const metadata = {
  title: 'Dashboard - Fund Flair',
  description: 'Dashboard page for Fund Flair',
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/api/auth/signin')

  const currentUserEmail = session.user?.email!
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
    include: {
      backedFunds: true,
    },
  })

  let backedFundsIds: String[] = []
  user?.backedFunds.forEach(fund => backedFundsIds.push(fund.id))
  backedFundsIds = Array.from(new Set(backedFundsIds))

  const backedFunds = await Promise.all(
    backedFundsIds.map(
      async fundId =>
        await prisma.fund.findFirst({
          where: {
            id: fundId,
          },
          include: {
            creator: true,
          },
        })
    )
  )

  const createdFunds = await prisma.fund.findMany({
    where: {
      creatorId: user?.id,
    },
  })

  return (
    <div>
      <div className='ml-8'>
        <h1 className='text-4xl font-bold text-gray-800'>Dashboard</h1>
        <p className='text-base text-gray-800 leading-relaxed mb-3'>
          Look at all your good word!
        </p>
      </div>

      <div>
        <h3 className='m-5 ml-8 text-2xl font-semibold text-gray-800'>
          Created
        </h3>
        {createdFunds.map(fund => {
          return (
            <FundCard
              id={fund.id}
              fundName={fund.name}
              fundTotalAmount={fund.amount}
              currentAmount={fund.currentAmount}
              tags={fund.tags}
              userName={user?.name || ''}
              key={fund.id}
            />
          )
        })}
      </div>
      <div>
        <h3 className='m-5 ml-8 text-2xl font-semibold text-gray-800'>
          Backed
        </h3>
        {backedFunds.map(fund => {
          return (
            <FundCard
              id={fund?.id!}
              fundName={fund?.name!}
              fundTotalAmount={fund?.amount!}
              currentAmount={fund?.currentAmount!}
              tags={fund?.tags!}
              userName={fund?.creator.name || ''}
              key={fund?.id}
            />
          )
        })}
      </div>
    </div>
  )
}
