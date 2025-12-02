'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      if (data.session) {
        // Set admin session cookie
        document.cookie = `admin-session=${data.session.access_token}; path=/; max-age=86400; SameSite=Strict; Secure`
        
        // Also store in localStorage for API calls
        localStorage.setItem('adminToken', data.session.access_token)
        localStorage.setItem('adminEmail', data.user.email || '')
        
        toast.success('Login successful!')
        
        // Wait a bit for cookie to be set, then redirect
        setTimeout(() => {
          window.location.href = '/admin/dashboard'
        }, 500)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-chocolate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <h1 className="text-3xl font-display font-bold mb-2 text-center">Admin Login</h1>
          <p className="text-cream-300 text-center mb-8">Sign in to manage Marcova</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cream-200 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                placeholder="admin@marcova.com"
              />
            </div>
            <div>
              <label className="block text-cream-200 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
