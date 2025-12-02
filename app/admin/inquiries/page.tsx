'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import toast from 'react-hot-toast'
import { FiMail, FiTrash2, FiCheck } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      // Try to fetch inquiries from Supabase
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        // If table doesn't exist, show a helpful message
        if (error.code === '42P01') {
          setError('Inquiries table not created yet. The contact feature will be available once the table is set up.')
        } else {
          throw error
        }
      } else {
        setInquiries(data || [])
      }
    } catch (error: any) {
      console.error('Error fetching inquiries:', error)
      setError('Inquiries table not yet created. This feature is coming soon!')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Status updated')
      fetchInquiries()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Inquiry deleted')
      fetchInquiries()
    } catch (error) {
      toast.error('Failed to delete inquiry')
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold mb-6">Customer Inquiries</h1>

      {loading ? (
        <div className="text-center py-20 text-cream-400">Loading inquiries...</div>
      ) : error ? (
        <div className="card text-center py-20">
          <div className="text-6xl mb-4">✉️</div>
          <h2 className="text-xl font-semibold text-cream-200 mb-2">Inquiries Feature Coming Soon</h2>
          <p className="text-cream-400">{error}</p>
          <p className="text-cream-500 mt-4 text-sm">
            To enable contact inquiries, create an 'inquiries' table in your Supabase database.
          </p>
        </div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-4">
          {(inquiries as any[]).map((inquiry: any) => (
            <div key={inquiry.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-cream-100 mb-2">{inquiry.name}</h3>
                  <p className="text-cream-300 mb-1">
                    <FiMail className="inline mr-2" />
                    {inquiry.email}
                  </p>
                  {inquiry.phone && <p className="text-cream-300">{inquiry.phone}</p>}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    inquiry.status === 'pending'
                      ? 'bg-yellow-600'
                      : inquiry.status === 'responded'
                      ? 'bg-blue-600'
                      : 'bg-green-600'
                  } text-white`}
                >
                  {inquiry.status}
                </span>
              </div>
              
              {inquiry.subject && (
                <p className="text-cream-200 font-semibold mb-2">Subject: {inquiry.subject}</p>
              )}
              
              <p className="text-cream-300 mb-4">{inquiry.message}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-cream-400 text-sm">
                  {new Date(inquiry.created_at).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(inquiry.id, 'responded')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FiCheck />
                    Mark Responded
                  </button>
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-cream-400">
          <p>No inquiries found.</p>
        </div>
      )}
    </AdminLayout>
  )
}
