import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import AuthProvider from './AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fund Flair',
  description: 'Support. Discover. Empower.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={`${inter.className} m-10`}>
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
