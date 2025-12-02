'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Update cart count
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const count = cart.reduce((total: number, item: any) => total + item.quantity, 0)
        setCartCount(count)
      } catch (error) {
        console.error('Error reading cart:', error)
      }
    }

    updateCartCount()

    // Listen for cart updates
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/cakes', label: 'Cakes' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-chocolate-950/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            {!logoError ? (
              <Image
                src="/assets/images/logo.png"
                alt="Marcova Logo"
                width={150}
                height={60}
                className="h-12 w-auto"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <span className="text-3xl font-display font-bold text-gradient">
                Marcova
              </span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-cream-100 hover:text-gold-500 transition-colors font-medium ${
                  pathname === link.href ? 'text-gold-500' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-cream-100 hover:text-gold-500 transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-chocolate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/cart"
              className="relative text-cream-100 hover:text-gold-500 transition-colors"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-chocolate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              className="text-cream-100 hover:text-gold-500 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-cream-100 hover:bg-chocolate-800 hover:text-gold-500 transition-colors rounded-lg ${
                  pathname === link.href ? 'bg-chocolate-800 text-gold-500' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
