'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      await axios.post(`${API_URL}/inquiries`, formData)
      toast.success('Thank you! Your inquiry has been sent. We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-cream-300 text-base md:text-lg max-w-2xl mx-auto">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card">
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 md:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 md:py-4 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none transition-colors text-base"
                      style={{ minHeight: '44px', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 md:py-4 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none transition-colors text-base"
                      style={{ minHeight: '44px', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <FiMapPin className="w-6 h-6 text-gold-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-cream-300">
                        Kolkata, West Bengal<br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <FiPhone className="w-6 h-6 text-gold-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-cream-300">+91 9876543210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <FiMail className="w-6 h-6 text-gold-500 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-cream-300">marcovachocolates@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="card p-0 overflow-hidden">
                <div className="w-full h-64 bg-chocolate-800 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.70707232826!2d88.18252539373378!3d22.535564937347626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1733247895123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="opacity-80"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
