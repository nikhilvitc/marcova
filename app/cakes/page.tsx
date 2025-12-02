'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiPhone, FiMail } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function CakesPage() {
  const [cakes, setCakes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cakeId: '',
    message: '',
  })

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      setLoading(true)
      // Fetch cakes from Supabase - looking for products with 'cake' or 'cakes' category
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('category.ilike.%cake%,category.eq.cakes')
      
      if (error) throw error
      setCakes(data || [])
    } catch (error) {
      console.error('Error fetching cakes:', error)
      setCakes([])
    } finally {
      setLoading(false)
    }
  }

  const handlePreOrder = (cakeId: string) => {
    setFormData({ ...formData, cakeId })
    setShowContactForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Insert inquiry into Supabase
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Cake Pre-Order',
          message: `Product ID: ${formData.cakeId}\n\n${formData.message}`,
          status: 'pending'
        }])
      
      if (error) throw error
      
      toast.success('Your inquiry has been sent! We will contact you soon.')
      setFormData({ name: '', email: '', phone: '', cakeId: '', message: '' })
      setShowContactForm(false)
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      toast.error('Failed to send inquiry. Please try again.')
    }
  }

  const handleWhatsApp = (cakeName: string) => {
    const message = `Hi, I'm interested in pre-ordering: ${cakeName}`
    const whatsappUrl = `https://wa.me/918902232596?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Celebration <span className="text-gradient">Cakes</span>
            </h1>
            <p className="text-cream-300 text-lg max-w-2xl mx-auto">
              Custom-made cakes for every occasion. Order your perfect celebration cake today!
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20 text-cream-400">
              <p>Loading cakes...</p>
            </div>
          ) : cakes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {(cakes as any[]).map((cake: any, index: number) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card group"
                >
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-chocolate-800">
                    {cake.image ? (
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🎂</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold mb-2">{cake.name}</h3>
                  <p className="text-cream-300 text-sm mb-4 line-clamp-2">{cake.description}</p>
                  <p className="text-2xl font-bold text-gold-500 mb-4">₹{cake.price}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreOrder(cake.id)}
                      className="flex-1 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart />
                      Pre-Order
                    </button>
                    <button
                      onClick={() => handleWhatsApp(cake.name)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      <FiPhone />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-cream-400">
              <p>No cakes available at the moment.</p>
            </div>
          )}

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-chocolate-900 rounded-xl p-6 max-w-md w-full border border-chocolate-800"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-display font-bold">Pre-Order Cake</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-cream-400 hover:text-cream-100"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                  />
                  <textarea
                    placeholder="Message (Optional)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-chocolate-800 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                  />
                  <button type="submit" className="btn-primary w-full">
                    Submit Inquiry
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
