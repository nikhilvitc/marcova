'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    try {
      const cartData = localStorage.getItem('cart')
      if (cartData) {
        setCart(JSON.parse(cartData))
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
    toast.success('Item removed from cart')
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleWhatsAppOrder = () => {
    // Create order message
    let message = '🛍️ *New Order from Marcova Website*\n\n'
    message += '📦 *Order Items:*\n'
    
    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`
      message += `   • Quantity: ${item.quantity}\n`
      message += `   • Price: ₹${item.price}\n`
      message += `   • Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n`
    })
    
    message += `\n💰 *Total Amount: ₹${getTotal().toFixed(2)}*\n`
    message += '\n📍 Please confirm my delivery address and payment method.'
    
    const whatsappUrl = `https://wa.me/918902232596?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-chocolate-950 flex items-center justify-center">
        <p className="text-cream-400">Loading cart...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-chocolate-950">
        <div className="section-padding">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <FiShoppingBag className="w-24 h-24 mx-auto mb-6 text-cream-500 opacity-50" />
              <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-cream-400 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link href="/products" className="btn-primary inline-block">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-chocolate-900 rounded-xl p-4 flex gap-4 items-center"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-chocolate-800 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl">🍫</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-cream-100 mb-1">{item.name}</h3>
                    <p className="text-gold-500 font-bold">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="text-cream-100 font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-cream-100 font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                    title="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-chocolate-900 rounded-xl p-6 sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-cream-300">
                    <span>Subtotal</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-chocolate-700 pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-gold-500">₹{getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="btn-primary w-full mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={20} />
                  Order via WhatsApp
                </button>

                <Link
                  href="/products"
                  className="block text-center text-cream-400 hover:text-cream-200 mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
