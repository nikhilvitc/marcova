'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { FiEye, FiX } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)

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

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedOrder(null)
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
      
      if (error) throw error
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }
      
      toast.success('Order status updated successfully')
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  const handleUpdatePaymentStatus = async (orderId: string, newPaymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newPaymentStatus })
        .eq('id', orderId)
      
      if (error) throw error
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, payment_status: newPaymentStatus } : order
      ))
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, payment_status: newPaymentStatus })
      }
      
      toast.success('Payment status updated successfully')
    } catch (error) {
      console.error('Error updating payment status:', error)
      toast.error('Failed to update payment status')
    }
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
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Order Number</th>
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
                  <td className="px-6 py-4 text-cream-200 font-semibold">{order.order_number || `#${order.id.slice(-8)}`}</td>
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
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-400 hover:text-blue-300 transition-colors" 
                      title="View and edit order details"
                    >
                      <FiEye size={20} />
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

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-chocolate-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-chocolate-900 border-b border-chocolate-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold">Order Details</h2>
              <button 
                onClick={handleCloseModal}
                className="text-cream-400 hover:text-cream-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Number & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-chocolate-800 p-4 rounded-lg">
                  <p className="text-cream-400 text-sm mb-1">Order Number</p>
                  <p className="text-cream-100 font-semibold text-lg">
                    {selectedOrder.order_number || `#${selectedOrder.id.slice(-8)}`}
                  </p>
                </div>
                <div className="bg-chocolate-800 p-4 rounded-lg">
                  <p className="text-cream-400 text-sm mb-1">Order Date</p>
                  <p className="text-cream-100 font-semibold">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-chocolate-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-cream-100">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-cream-400 text-sm">Name</p>
                    <p className="text-cream-100">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-cream-400 text-sm">Email</p>
                    <p className="text-cream-100">{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-cream-400 text-sm">Phone</p>
                    <p className="text-cream-100">{selectedOrder.customer_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-cream-400 text-sm">Address</p>
                    <p className="text-cream-100">{selectedOrder.customer_address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-chocolate-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-cream-100">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items && Array.isArray(selectedOrder.items) ? (
                    selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-chocolate-700 last:border-0">
                        <div>
                          <p className="text-cream-100 font-medium">{item.name || item.product_name}</p>
                          <p className="text-cream-400 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-gold-500 font-semibold">₹{item.price}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-cream-400">No items found</p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-chocolate-700 flex justify-between items-center">
                  <p className="text-cream-100 font-semibold text-lg">Total Amount</p>
                  <p className="text-gold-500 font-bold text-xl">₹{selectedOrder.total_amount}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-chocolate-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-cream-100">Order Status</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-cream-400 text-sm mb-2">Order Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                      className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cream-400 text-sm mb-2">Payment Status</label>
                    <select
                      value={selectedOrder.payment_status}
                      onChange={(e) => handleUpdatePaymentStatus(selectedOrder.id, e.target.value)}
                      className="w-full bg-chocolate-700 text-cream-100 px-4 py-2 rounded-lg border border-chocolate-600 focus:border-gold-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-chocolate-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-cream-100">Notes</h3>
                  <p className="text-cream-300">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-chocolate-900 border-t border-chocolate-700 px-6 py-4">
              <button
                onClick={handleCloseModal}
                className="w-full btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
