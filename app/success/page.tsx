'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'

export default function Success() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('fund-flair-sessionId') != null) {
      const sessionId = localStorage.getItem('fund-flair-sessionId')
      const fundId = localStorage.getItem('fund-flair-fundId')
      setIsLoading(true)
      completeTransaction(sessionId!, fundId!)
    }
  }, [])

  async function completeTransaction(sessionId: string, fundId: string) {
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
      {isLoading ? (
        <div>
          We are processing your payment. Please don't close the window.
          <Loading />
        </div>
      ) : (
        <div>
          Thank you for your valuble contribution. We have recieved your
          payment.
        </div>
      )}
    </div>
  )
}
