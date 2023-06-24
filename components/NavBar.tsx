import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className='flex justify-between bg-blue-600 p-4'>
      <Link href={'/'}>
        <Image src='/next.svg' alt='App Logo' width={216} height={30} />
      </Link>
      <ul className='flex items-center'>
        <li className='mr-4 hover:underline'>
          <Link href={'/about'}>About</Link>
        </li>
        <li className='hover:underline'>
          <Link href={'/leaderboard'}>Leaderboard</Link>
        </li>
      </ul>
    </nav>
  )
}
