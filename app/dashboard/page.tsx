import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

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
      <div>
        <h1>Dashboard</h1>
        <p>Look at all your good word!</p>
      </div>

      <div>
        <h3>Created</h3>
        {createdFunds.map(fund => {
          return (
            <div key={fund.id}>
              <p>{fund.name}</p>
              <p>{fund.description}</p>
              <p>{fund.usage}</p>
              <p>{fund.amount}</p>
              <p>{fund.currentAmount}</p>
              <p>{fund.tags}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
