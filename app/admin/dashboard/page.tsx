'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { FiPackage, FiShoppingBag, FiMail, FiDollarSign } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch products count from Supabase
      const { count: totalProducts, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      if (productsError) throw productsError

      // Fetch featured products
      const { data: featured, error: featuredError } = await supabase
        .from('products')
        .select('name, stock')
        .eq('featured', true)
        .limit(5)
      
      if (featuredError) throw featuredError

      setStats({
        totalProducts: totalProducts || 0,
        totalOrders: 0, // Will be implemented when orders table exists
        pendingInquiries: 0, // Will be implemented when inquiries table exists
        totalRevenue: 0, // Will be implemented when orders table exists
      })
      
      setTopProducts(featured || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: FiPackage,
      color: 'bg-blue-600',
    },
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: FiShoppingBag,
      color: 'bg-green-600',
    },
    {
      label: 'Pending Inquiries',
      value: stats?.pendingInquiries || 0,
      icon: FiMail,
      color: 'bg-yellow-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: FiDollarSign,
      color: 'bg-gold-600',
    },
  ]

  return (
    <AdminLayout>
      {loading ? (
        <div className="text-center py-20 text-cream-400">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cream-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-cream-100">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-display font-bold mb-4">Top Products</h2>
              {topProducts.length > 0 ? (
                <div className="space-y-3">
                  {topProducts.map((product: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-chocolate-800 rounded-lg">
                      <span className="text-cream-200">{product.name}</span>
                      <span className={`font-semibold ${
                        (product.stock || 0) > 10 ? 'text-green-400' : 
                        (product.stock || 0) > 0 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {product.stock || 0} in stock
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-cream-400">No featured products available</p>
              )}
            </div>

            <div className="card">
              <h2 className="text-xl font-display font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/admin/products/new"
                  className="block w-full bg-gold-600 hover:bg-gold-700 text-white px-4 py-3 rounded-lg text-center transition-colors"
                >
                  Add New Product
                </a>
                <a
                  href="/admin/orders"
                  className="block w-full bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 px-4 py-3 rounded-lg text-center transition-colors"
                >
                  View All Orders
                </a>
                <a
                  href="/admin/inquiries"
                  className="block w-full bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 px-4 py-3 rounded-lg text-center transition-colors"
                >
                  View Inquiries
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
