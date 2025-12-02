'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image?: string
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already in cart
    const existingIndex = cart.findIndex((item: any) => item.id === product.id)
    
    if (existingIndex > -1) {
      // Update quantity
      cart[existingIndex].quantity += 1
      toast.success(`Added another ${product.name} to cart!`)
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
      toast.success(`${product.name} added to cart!`)
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'))
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="card group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 sm:h-56 md:h-64 mb-3 md:mb-4 rounded-lg overflow-hidden bg-chocolate-800 group-hover:bg-chocolate-700 transition-colors">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl sm:text-6xl">🍫</span>
            </div>
          )}
        </div>
      </Link>
      
      <div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 group-hover:text-gold-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-cream-300 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl sm:text-2xl font-bold text-gold-500">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gold-600 hover:bg-gold-700 active:bg-gold-800 text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <FiShoppingCart className="text-lg" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
