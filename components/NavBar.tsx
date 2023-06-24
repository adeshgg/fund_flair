import Image from 'next/image'
import Link from 'next/link'
import AuthCheck from './AuthCheck'
import { SignInButton, SignOutButton } from './buttons'

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
        <li className='mr-4 hover:underline'>
          <Link href={'/leaderboard'}>Leaderboard</Link>
        </li>
        <li>
          <SignInButton />
        </li>
        <li className='ml-4'>
          {/*  @ts-ignore */}
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  )
}
