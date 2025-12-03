import type { Metadata } from 'next'
import { Poppins, Bebas_Neue } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})
const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: ['400'],
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
      <body className={`${poppins.variable} ${bebasNeue.variable} font-sans bg-chocolate-950 text-cream-100 antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
