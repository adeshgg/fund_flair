'use client'
import { prisma } from '@/lib/prisma'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Success() {
  const searchParams = useSearchParams()
  const fundId = searchParams.get('fundId')
  const amount = searchParams.get('amount')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem('fund-flair-sessionId')
    if (sessionId) {
      setIsLoading(true)
      completeTransaction(sessionId)
    }
  }, [])

  async function completeTransaction(sessionId: string) {
    console.log('add data to database')
    const data = await fetch(`/api/checkout/${sessionId}`, {
      cache: 'no-store',
    })
    const res = await data.json()
    console.log(res.session.amount_total / 100)
    console.log(res.session.payment_status)
    localStorage.removeItem('fund-flair-sessionId')

    // fetch the fund
    // const fund = await prisma.fund.findFirst({
    //   where: {
    //     id: fundId!,
    //   },
    // })

    // const { data: session, status } = useSession()
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: session?.user?.email!,
    //   },
    // })

    // console.log('User', user)
    // console.log('Fund', fund)

    // const updatedUser = await prisma.user.update({
    //   where: { id: user?.id! },
    //   data: {
    //     backedFunds: {
    //       connect: { id: fund?.id! },
    //     },
    //   },
    // })

    // const updatedFund = await prisma.fund.update({
    //   where: { id: fundId! },
    //   data: {
    //     backers: {
    //       connect: { id: user?.id! },
    //     },
    //     currentAmount: fund?.currentAmount! + res.session.amount_total / 100,
    //   },
    // })

    // console.log(updatedUser)
    // console.log(updatedFund)

    setIsLoading(false)
  }

  return (
    <div>
      Thank you for your valuble contribution. We have recieved {amount} INR for{' '}
      {fundId} Fund.
    </div>
  )
}
