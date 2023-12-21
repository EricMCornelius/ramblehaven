import { Inter } from 'next/font/google'
import './globals.css'
import '@/styles/global.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ramblehaven',
  description: 'Ramblehaven Ranch Off-Grid Living',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
