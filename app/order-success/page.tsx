'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FiCheckCircle, FiPackage } from 'react-icons/fi'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950 flex items-center justify-center">
      <div className="section-padding w-full">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-chocolate-900 rounded-xl p-8 md:p-12">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                <FiCheckCircle className="w-12 h-12 text-green-500" />
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Order Placed Successfully!
              </h1>
              
              <p className="text-cream-300 text-lg mb-6">
                Thank you for your order. We've received your order and will process it shortly.
              </p>

              {/* Order ID */}
              {orderId && (
                <div className="bg-chocolate-800 rounded-lg p-4 mb-8">
                  <p className="text-cream-400 text-sm mb-1">Order ID</p>
                  <p className="text-cream-100 font-mono text-lg font-semibold">
                    {orderId}
                  </p>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-6 mb-8 text-left">
                <div className="flex gap-3">
                  <FiPackage className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-cream-100 mb-2">What's Next?</h3>
                    <ul className="text-cream-300 space-y-2 text-sm">
                      <li>• You'll receive an order confirmation email shortly</li>
                      <li>• We'll notify you when your order is out for delivery</li>
                      <li>• Our team will contact you if we need any additional information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-primary">
                  Continue Shopping
                </Link>
                <Link 
                  href="/" 
                  className="px-6 py-3 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 rounded-lg font-semibold transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
