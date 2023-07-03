'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function CheckoutForm({ fundId }: { fundId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleInvest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const amount = formData.get('amount')

    const body = {
      amount,
    }

    setIsLoading(true)

    const stripe = await stripePromise
    const res = await fetch('/api/checkout/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setIsLoading(false)

    const { sessionId } = await res.json()
    localStorage.setItem('fund-flair-sessionId', sessionId)
    localStorage.setItem('fund-flair-amount', amount as string)
    localStorage.setItem('fund-flair-fundId', fundId)
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2 className='bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-700 bg-clip-text text-transparent font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mt-14 mb-6'>
        INVEST NOW
      </h2>
      <form onSubmit={handleInvest}>
        <label
          htmlFor='amount'
          className='block mb-1 text-gray-700 text-sm font-semibold text-left'
        >
          Amount (in ₹)
        </label>
        <input
          type='number'
          name='amount'
          className='border border-gray-300 w-full p-2 rounded-md mb-6 text-black'
          placeholder='Who much do you want to invest?'
        />
        <button
          type='submit'
          className='block bg-blue-500 text-white py-2 px-4 rounded-md'
          disabled={isLoading}
        >
          {isLoading ? 'Redirecting...' : 'Invest'}
        </button>
      </form>
    </div>
  )
}
