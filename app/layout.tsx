import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hina Ali | AI-Powered Full Stack Developer',
  description: 'I build what others imagine. AI-Powered Full Stack Developer from Karachi, Pakistan specializing in intelligent web experiences.',
  keywords: ['AI Developer', 'Full Stack Developer', 'Next.js', 'React', 'Python', 'Machine Learning'],
  authors: [{ name: 'Hina Ali' }],
  openGraph: {
    title: 'Hina Ali | AI-Powered Full Stack Developer',
    description: 'I build what others imagine.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
