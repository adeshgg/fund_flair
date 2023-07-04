'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Success() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const sessionId = localStorage.getItem('fund-flair-sessionId')
  const amount = Number(localStorage.getItem('fund-flair-amount'))
  const fundId = localStorage.getItem('fund-flair-fundId')

  useEffect(() => {
    if (sessionId) {
      setIsLoading(true)
      completeTransaction(sessionId)
    }
  }, [])

  async function completeTransaction(sessionId: string) {
    const data = await fetch(`/api/checkout/${sessionId}`, {
      cache: 'no-store',
    })
    const res = await data.json()
    const amount = res.session.amount_total / 100
    const paymentStatus = res.session.payment_status
    const body = {
      fundId,
      amount,
      paymentStatus,
    }

    const result = await fetch('/api/transact/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    localStorage.removeItem('fund-flair-sessionId')

    console.log(result)
    if (result.status === 200) {
      router.push('/')
    }

    setIsLoading(false)
  }

  return (
    <div>
      Thank you for your valuble contribution. We have recieved {amount} INR.
      Please don't close the window, we are redirecting you to the home page.
    </div>
  )
}
