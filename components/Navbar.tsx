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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-gold-500/30 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:scale-110 transition-all duration-300 drop-shadow-lg group">
            {!logoError ? (
              <Image
                src="/assets/images/logo.png"
                alt="Marcova Logo"
                width={150}
                height={60}
                className="h-12 w-auto group-hover:drop-shadow-[0_0_10px_rgba(255,195,0,0.5)] transition-all"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <span className="text-3xl lg:text-4xl font-display font-bold text-gradient-animate tracking-wider">
                MARCOVA
              </span>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-cream-50 hover:text-gold-400 transition-all duration-300 font-semibold text-base relative group tracking-wide ${
                  pathname === link.href ? 'text-gold-400' : ''
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 rounded-full ${
                  pathname === link.href ? 'w-full shadow-[0_0_10px_rgba(255,195,0,0.5)]' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative text-cream-50 hover:text-gold-400 transition-all duration-300 hover:scale-110 transform"
            >
              <FiShoppingCart size={24} className="drop-shadow-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-gold-400 to-gold-600 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-gold-500/50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/cart"
              className="relative text-cream-50 hover:text-gold-400 transition-all duration-300 hover:scale-110 transform"
            >
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-gold-400 to-gold-600 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-gold-500/50 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              className="text-cream-50 hover:text-gold-400 transition-all duration-300 hover:scale-110 transform active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-black/95 backdrop-blur-xl rounded-b-2xl border-b border-gold-500/30 shadow-2xl animate-slide-down">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-3 text-cream-50 hover:bg-gradient-to-r hover:from-chocolate-700 hover:to-chocolate-600 hover:text-gold-400 transition-all duration-300 rounded-xl font-semibold ${
                  pathname === link.href ? 'bg-gradient-to-r from-chocolate-700 to-chocolate-600 text-gold-400 border-l-4 border-gold-400 shadow-lg shadow-gold-500/20' : ''
                }`}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
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
