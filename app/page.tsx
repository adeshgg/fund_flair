import FundCard from '@/components/FundCard'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

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
        <Link href={'/funds'} className='cursor-pointer bg-cyan-200 rounded'>
          <button className='bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-700 bg-clip-text text-transparent text-2xl font-bold py-2 px-4 rounded'>
            Explore Funds
          </button>
        </Link>
        <Link href={'/create'} className='cursor-pointer bg-cyan-200 rounded'>
          <button className='bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-700 bg-clip-text text-transparent text-2xl font-bold py-2 px-4 rounded'>
            Create Funds
          </button>
        </Link>
      </section>
      <section>
        {/* Search Section */}
        {/* <div className='flex-1 flex justify-center lg:justify-end'>
          <div className='w-full px-2 lg:px-6'>
            <label htmlFor='search' className='sr-only'>
              Search projects
            </label>
            <div className='relative text-indigo-200 focus-within:text-gray-400'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <SearchIcon className='h-5 w-5' aria-hidden='true' />
              </div>
              <input
                id='search'
                name='search'
                className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-indigo-400 bg-opacity-25 text-indigo-100 placeholder-indigo-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm'
                placeholder='Search projects'
                type='search'
              />
            </div>
          </div>
        </div> */}
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
