'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FiShoppingCart } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
      
      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    // Check if out of stock
    if (product.stock === 0) {
      toast.error('This product is currently out of stock')
      return
    }
    
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already in cart
    const existingIndex = cart.findIndex((item: any) => item.id === product.id)
    
    if (existingIndex > -1) {
      // Update quantity
      cart[existingIndex].quantity += quantity
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'))
    
    toast.success(`${product.name} added to cart!`)
    setQuantity(1) // Reset quantity after adding
  }
  
  const isOutOfStock = product?.stock === 0

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-chocolate-950 flex items-center justify-center">
        <p className="text-cream-400">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen bg-chocolate-950 flex items-center justify-center">
        <p className="text-cream-400">Product not found</p>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden bg-chocolate-800">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className={`text-8xl ${isOutOfStock ? 'grayscale opacity-50' : ''}`}>🍫</span>
                </div>
              )}
              {/* Out of Stock Badge */}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-2xl shadow-lg transform rotate-[-12deg]">
                    OUT OF STOCK
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-gold-500">₹{product.price}</p>
                {isOutOfStock && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                    Out of Stock
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-cream-100">Description</h2>
                <p className="text-cream-300 leading-relaxed">{product.description}</p>
              </div>

              {product.category && (
                <div className="mb-6">
                  <span className="inline-block bg-chocolate-800 text-cream-200 px-4 py-2 rounded-lg">
                    {product.category}
                  </span>
                </div>
              )}

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-cream-100 mb-2 font-semibold">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-cream-100 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'btn-primary'
                }`}
              >
                <FiShoppingCart />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              {isOutOfStock && (
                <p className="mt-4 text-cream-400 text-sm">
                  This product is currently unavailable. Please check back later!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
