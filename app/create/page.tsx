import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import FundForm from './FundForm'

export default async function CreateFund() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/api/auth/signin')

  const currentUserEmail = session.user?.email!
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  })

  return (
    <>
      <h1>Create Fund</h1>
      <FundForm user={user} />
    </>
  )
}