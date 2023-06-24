import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import AuthProvider from './AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
