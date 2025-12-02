'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FiCheckCircle } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    try {
      const cartData = localStorage.getItem('cart')
      if (cartData) {
        const parsedCart = JSON.parse(cartData)
        if (parsedCart.length === 0) {
          router.push('/cart')
        }
        setCart(parsedCart)
      } else {
        router.push('/cart')
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      router.push('/cart')
    }
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)

    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: cart.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: getTotal(),
        status: 'pending',
        payment_status: 'pending'
      }

      // Insert order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()

      if (error) throw error

      // Clear cart
      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('cartUpdated'))

      // Show success message
      toast.success('Order placed successfully!')

      // Redirect to success page
      router.push(`/order-success?orderId=${data[0].id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-chocolate-900 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Customer Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-cream-100 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-chocolate-800 border border-chocolate-700 rounded-lg text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-cream-100 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-chocolate-800 border border-chocolate-700 rounded-lg text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-cream-100 font-semibold mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-chocolate-800 border border-chocolate-700 rounded-lg text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="10-digit mobile number"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-cream-100 font-semibold mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-chocolate-800 border border-chocolate-700 rounded-lg text-cream-100 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Enter your complete delivery address"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-chocolate-900 rounded-xl p-6 sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-chocolate-800 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl">🍫</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-cream-100 text-sm font-semibold">{item.name}</h3>
                        <p className="text-cream-400 text-sm">Qty: {item.quantity}</p>
                        <p className="text-gold-500 text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-chocolate-700 pt-4 space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
