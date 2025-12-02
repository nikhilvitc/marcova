import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Markova - Premium Handcrafted Chocolates & Cakes',
  description: 'Experience the finest handcrafted chocolates and celebration cakes. Premium quality ingredients, artisanal craftsmanship.',
  keywords: 'chocolates, cakes, handcrafted, premium, artisanal, celebration cakes, chocolate bars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-chocolate-950 text-cream-100 antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
