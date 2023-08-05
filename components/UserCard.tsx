interface Props {
  username: string
  image: string
  rewards: number
}

export default function UserCard({ username, image, rewards }: Props) {
  return (
    <div className='sm:max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3'>
      <div className='flex gap-5'>
        <div className='md:flex-shrink-0'>
          <img
            className='h-32 w-32 md:h-48 object-cover md:w-48'
            src={image}
            alt={username}
          />
        </div>
        <div className='p-8'>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
            {username}
          </div>
          <p className='mt-2 text-gray-500'>Rewards: {rewards}</p>
        </div>
      </div>
    </div>
  )
}
