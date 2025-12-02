'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

export default function NewProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'bar-chocolates',
    featured: false,
    stock: '',
    image: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const categories = [
    'bar-chocolates',
    'chocolate-bites',
    'bonbon-chocolates',
    'celebration-chocolates',
    'cakes',
    'others',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        featured: formData.featured,
        stock: parseInt(formData.stock) || 0,
        image: formData.image || null,
      }

      const { error } = await supabase
        .from('products')
        .insert([productData])
      
      if (error) throw error

      toast.success('Product created successfully!')
      router.push('/admin/products')
    } catch (error: any) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="card max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-cream-200 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-cream-200 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-cream-200 mb-2">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-cream-200 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-cream-200 mb-2">Image URL</label>
            <p className="text-cream-400 text-sm mb-2">Enter the URL of the product image (e.g., from your image hosting or Supabase Storage)</p>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-cream-200 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-chocolate-800 text-cream-100 px-4 py-3 rounded-lg border border-chocolate-700 focus:border-gold-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-4 pt-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-cream-200">Featured Product</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
