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
  })

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
              fundName={fund.name}
              fundTotalAmount={fund.amount}
              currentAmount={fund.currentAmount}
              tags={fund.tags}
              userName={user?.name}
              key={fund.id}
            />
          )
        })}
      </div>
    </div>
  )
}
