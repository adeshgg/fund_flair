import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CheckoutForm from './CheckoutForm'

export default async function Fund({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  const fund = await prisma.fund.findFirst({
    where: {
      id: params.id,
    },
  })

  const user = await prisma.user.findFirst({
    where: {
      id: fund?.creatorId,
    },
  })

  const percentage = Math.min((fund?.currentAmount! / fund?.amount!) * 100, 100)

  return (
    <div className='bg-white drop-shadow-2xl m-5 rounded-lg p-4'>
      <h2 className='text-lg font-semibold mt-6 mb-12'>{fund?.name}</h2>
      <h3 className='text-lg font-medium mb-2'>Description</h3>
      <p className='mb-12 text-gray-700'>{fund?.description}</p>
      <h3 className='text-lg font-medium mb-2'>Usage</h3>
      <p className='mb-12 text-gray-700'>{fund?.usage}</p>
      <p className='text-gray-500 mb-4'>Total Amount: {fund?.amount}</p>
      <div className='bg-gray-200 rounded-lg h-2 mb-4'>
        <div
          className='bg-green-500 rounded-lg h-2'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className='mb-4'>
        {fund?.tags.map((tag, index) => (
          <span
            key={index}
            className='bg-blue-500 text-white text-sm px-2 py-1 rounded mr-2'
          >
            {tag}
          </span>
        ))}
      </div>
      <p className='text-gray-600'>User: {user?.name}</p>
      <CheckoutForm fundId={fund?.id!} />
    </div>
  )
}
