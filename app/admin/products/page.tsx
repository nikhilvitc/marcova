'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import toast from 'react-hot-toast'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function AdminProducts() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold">Products</h1>
        <button
          onClick={() => router.push('/admin/products/new')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiPlus />
          Add New Product
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-cream-400">Loading products...</div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-chocolate-900 rounded-lg overflow-hidden">
            <thead className="bg-chocolate-800">
              <tr>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Featured</th>
                <th className="px-6 py-3 text-left text-cream-100 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(products as any[]).map((product: any) => (
                <tr key={product.id} className="border-t border-chocolate-800 hover:bg-chocolate-800">
                  <td className="px-6 py-4 text-cream-200">{product.name}</td>
                  <td className="px-6 py-4 text-cream-300">{product.category}</td>
                  <td className="px-6 py-4 text-gold-500 font-semibold">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {product.stock || 0} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-cream-300">{product.featured ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Edit product"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete product"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 text-cream-400">
          <p>No products found. Add your first product!</p>
        </div>
      )}
    </AdminLayout>
  )
}
