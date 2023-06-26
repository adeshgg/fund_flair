import React from 'react'

interface Props {
  fundName: string
  fundTotalAmount: number
  currentAmount: number
  tags: string[]
  userName: string
}

const FundCard = ({
  fundName,
  fundTotalAmount,
  currentAmount,
  tags,
  userName,
}: Props) => {
  const percentage = Math.min((currentAmount / fundTotalAmount) * 100, 100)

  return (
    <div className='bg-white shadow-xl m-5 rounded-lg p-4'>
      <h3 className='text-lg font-semibold mb-2'>{fundName}</h3>
      <p className='text-gray-500 mb-4'>Total Amount: {fundTotalAmount}</p>
      <div className='bg-gray-200 rounded-lg h-2 mb-4'>
        <div
          className='bg-green-500 rounded-lg h-2'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className='mb-4'>
        {tags.map((tag, index) => (
          <span
            key={index}
            className='bg-blue-500 text-white text-sm px-2 py-1 rounded mr-2'
          >
            {tag}
          </span>
        ))}
      </div>
      <p className='text-gray-600'>User: {userName}</p>
    </div>
  )
}

export default FundCard
