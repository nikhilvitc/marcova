'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { FiEye } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      // Try to fetch orders from Supabase
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        // If table doesn't exist, show a helpful message
        if (error.code === '42P01') {
          setError('Orders table not created yet. The orders feature will be available once the table is set up.')
        } else {
          throw error
        }
      } else {
        setOrders(data || [])
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      setError('Orders table not yet created. This feature is coming soon!')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-600',
      processing: 'bg-blue-600',
      shipped: 'bg-purple-600',
      delivered: 'bg-green-600',
      cancelled: 'bg-red-600',
    }
    return colors[status] || 'bg-gray-600'
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold mb-6">Orders</h1>

      {loading ? (
        <div className="text-center py-20 text-cream-400">Loading orders...</div>
      ) : error ? (
        <div className="card text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-cream-200 mb-2">Orders Feature Coming Soon</h2>
          <p className="text-cream-400">{error}</p>
          <p className="text-cream-500 mt-4 text-sm">
            To enable orders, create an 'orders' table in your Supabase database.
          </p>
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-chocolate-900 rounded-lg overflow-hidden">
            <thead className="bg-chocolate-800">
              <tr>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(orders as any[]).map((order: any) => (
                <tr key={order.id} className="border-t border-chocolate-800 hover:bg-chocolate-800">
                  <td className="px-6 py-4 text-cream-200">#{order.id.slice(-8)}</td>
                  <td className="px-6 py-4 text-cream-200">{order.customer_name}</td>
                  <td className="px-6 py-4 text-gold-500 font-semibold">₹{order.total_amount}</td>
                  <td className="px-6 py-4">
                    <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm capitalize`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-cream-300">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300" title="View details">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 text-cream-400">
          <p>No orders found.</p>
        </div>
      )}
    </AdminLayout>
  )
}
