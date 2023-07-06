import Link from 'next/link'

export default function Cancel() {
  return (
    <h2>
      Sorry, Your payment was not complete please try again. Go Back to{' '}
      <Link href={'/'} className='font-bold underline text-blue-700'>
        Home
      </Link>{' '}
    </h2>
  )
}
