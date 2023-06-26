'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton() {
  const { data: session, status } = useSession()
  console.log(session, status)

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'authenticated') {
    return (
      <Link href={'/dashboard'}>
        <Image
          alt={session.user?.name || ''}
          height={32}
          width={32}
          src={session.user?.image ?? '/vercel.svg'}
          className='rounded-full cursor-pointer'
        />
      </Link>
    )
  }

  return <button onClick={() => signIn()}>Sign In</button>
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>
}
