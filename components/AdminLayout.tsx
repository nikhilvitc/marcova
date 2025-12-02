'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FiHome, FiPackage, FiMail, FiShoppingBag, FiBarChart2, FiLogOut } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken')
    const email = localStorage.getItem('adminEmail')
    
    if (!token) {
      router.push('/admin/login')
      return
    }

    try {
      // Verify session with Supabase
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        throw new Error('Invalid session')
      }
      
      setAdmin({ email: email || session.user.email })
      setLoading(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      document.cookie = 'admin-session=; path=/; max-age=0'
      router.push('/admin/login')
      toast.error('Session expired. Please login again.')
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      document.cookie = 'admin-session=; path=/; max-age=0'
      router.push('/admin/login')
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Error logging out')
    }
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { href: '/admin/products', label: 'Products', icon: FiPackage },
    { href: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
    { href: '/admin/inquiries', label: 'Inquiries', icon: FiMail },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-chocolate-950 flex items-center justify-center">
        <div className="text-cream-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chocolate-950">
      {/* Top Bar with Logo, Navigation, and Logout */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-chocolate-900/95 backdrop-blur-sm shadow-lg border-b border-chocolate-800">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/admin/dashboard" className="text-xl sm:text-2xl font-display font-bold text-gradient hover:scale-105 transition-transform">
              Marcova
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1 sm:space-x-3 md:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gold-600 text-white'
                        : 'text-cream-300 hover:bg-chocolate-800 hover:text-cream-100'
                    }`}
                    style={{ minHeight: '44px', minWidth: '44px' }}
                  >
                    <Icon size={18} className="sm:text-lg" />
                    <span className="hidden lg:inline text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-2 rounded-lg bg-chocolate-800 text-cream-300 hover:bg-chocolate-700 hover:text-red-400 transition-all active:scale-95"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-16 sm:pt-20">
        <div className="p-3 sm:p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
