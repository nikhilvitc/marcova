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
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group hover:shadow-2xl hover:shadow-gold-500/30 hover:border-gold-500/50 relative overflow-hidden"
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 sm:h-56 md:h-64 mb-3 md:mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-chocolate-700/40 to-chocolate-900/40 group-hover:from-chocolate-600/60 group-hover:to-chocolate-800/60 transition-all duration-500 border border-gold-500/10 group-hover:border-gold-500/30 shadow-inner">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-5xl sm:text-6xl animate-float">🍫</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      
      <div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg sm:text-xl font-display font-bold mb-2 text-cream-50 group-hover:text-gold-400 transition-all duration-300 line-clamp-1 tracking-wide">
            {product.name}
          </h3>
        </Link>
        <p className="text-cream-200 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl sm:text-2xl font-bold text-gradient-animate">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 active:from-gold-600 active:to-gold-800 text-black font-bold px-3 sm:px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base shadow-lg shadow-gold-500/40 hover:shadow-xl hover:shadow-gold-500/60 hover:scale-110 active:scale-95 relative overflow-hidden group"
            style={{ minHeight: '48px', minWidth: '48px' }}
          >
            <FiShoppingCart className="text-lg relative z-10" />
            <span className="hidden sm:inline relative z-10">Add</span>
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
