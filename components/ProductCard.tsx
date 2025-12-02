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
      className="card group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-chocolate-800 group-hover:bg-chocolate-700 transition-colors">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🍫</span>
            </div>
          )}
        </div>
      </Link>
      
      <div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-cream-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-500">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
          >
            <FiShoppingCart />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
