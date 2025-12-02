'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingCartButton() {
  const [cartCount, setCartCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a short delay
    setIsVisible(true)

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

  // Don't show if cart is empty
  if (cartCount === 0) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <Link
            href="/cart"
            className="relative flex items-center gap-3 bg-gold-600 hover:bg-gold-700 text-white px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 group"
          >
            <FiShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold">View Cart</span>
            
            {/* Cart Count Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
