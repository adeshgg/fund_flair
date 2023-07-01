import FundCard from '@/components/FundCard'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Explore - Fund Flair',
  description: 'Explore page for Fund Flair',
}

export default async function Funds() {
  const funds = await prisma.fund.findMany({})
  const updatedFund = await Promise.all(
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

  return (
    <div>
      <div className='ml-8'>
        <h1 className='text-4xl font-bold text-gray-800'>Explore</h1>
        <p className='text-base text-gray-800 leading-relaxed mb-3'>
          Support. Discover. Empower.
        </p>
      </div>

      <div>
        <h3 className='m-5 ml-8 text-2xl font-semibold text-gray-800'>
          Created
        </h3>
        {updatedFund.map(fund => {
          return (
            <FundCard
              id={fund.id}
              fundName={fund.name}
              fundTotalAmount={fund.amount}
              currentAmount={fund.currentAmount}
              tags={fund.tags}
              userName={fund.username || ''}
              key={fund.id}
            />
          )
        })}
      </div>
    </div>
  )
}
