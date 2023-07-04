'use client'
import FundCard from '@/components/FundCard'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'

interface Fund {
  id: string
  name: string
  description: string
  amount: number
  currentAmount: number
  tags: string[]
  username: string
  cretorId: string
  createdAt: string
  updatedAt: string
}

export default function Funds() {
  const [funds, setFunds] = useState<[] | Fund[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchInitialFunds = async () => {
      setIsLoading(true)
      const res = await fetch('/api/search')
      const data = await res.json()
      setFunds(data)
      setIsLoading(false)
    }
    fetchInitialFunds()
  }, [])

  const fetchFunds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')

    setIsLoading(true)
    const res = await fetch(`/api/search/${search}`)
    const data = await res.json()
    setFunds(data)
    setIsLoading(false)
  }

  return (
    <div>
      <div className='ml-8'>
        <h1 className='text-4xl font-bold text-gray-800'>Explore</h1>
        <p className='text-base text-gray-800 leading-relaxed mb-3'>
          Support. Discover. Empower.
        </p>
      </div>
      <form onSubmit={fetchFunds}>
        <div className='relative m-8'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search Funds, tags...'
            name='search'
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>
      <div>
        {isLoading ? (
          <div className='flex w-full h-full justify-center align-middle mt-36'>
            <HashLoader loading={isLoading} color={'#1D4ED8'} />
          </div>
        ) : (
          funds.map(fund => {
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
          })
        )}
      </div>
    </div>
  )
}
