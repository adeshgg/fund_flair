import FundCard from '@/components/FundCard'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const feedFunds = await prisma.fund.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 10,
  })
  const updatedFund = await Promise.all(
    feedFunds.map(async fund => {
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
    <main>
      <section className='m-10 mt-20 space-y-5 font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-32'>
        <h1>Fund Flair</h1>
        <p className='bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-700 bg-clip-text text-transparent'>
          Support. Discover. Empower.
        </p>
      </section>
      <section className='m-10 flex justify-around mb-20'>
        <Link href={'/funds'} className='cursor-pointer rounded'>
          <button className=' h-full w-full py-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Explore Funds
          </button>
        </Link>
        <Link href={'/create'} className='cursor-pointe rounded'>
          <button className='rounded-md border h-full w-full py-3 px-6 text-base font-semibold tracking-tight focus:outline-none border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:text-blue-600/70 disabled:opacity-40 disabled:hover:border-blue-300 disabled:hover:bg-transparent'>
            Create Funds
          </button>
        </Link>
      </section>

      <section>
        <h3 className='m-10 text-2xl font-semibold text-gray-800'>
          Trending Funds
        </h3>
        {updatedFund.map(fund => (
          <FundCard
            key={fund.id}
            currentAmount={fund.currentAmount}
            fundName={fund.name}
            fundTotalAmount={fund.amount}
            id={fund.id}
            tags={fund.tags}
            userName={fund.username || ''}
          />
        ))}
      </section>
    </main>
  )
}
