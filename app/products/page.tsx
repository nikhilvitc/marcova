'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

function ProductsContent() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const searchParams = useSearchParams()

  const categories = [
    { value: '', label: 'All Products' },
    { value: 'bar-chocolates', label: 'Bar Chocolates' },
    { value: 'chocolate-bites', label: 'Chocolate Bites' },
    { value: 'bonbon-chocolates', label: 'Bonbon Chocolates' },
    { value: 'celebration-chocolates', label: 'Celebration Chocolates' },
    { value: 'others', label: 'Others' },
  ]

  useEffect(() => {
    const category = searchParams.get('category') || ''
    setSelectedCategory(category)
    fetchProducts(category)
  }, [searchParams])

  const fetchProducts = async (category: string = '') => {
    try {
      setLoading(true)
      
      // Fetch products from Supabase
      let query = supabase
        .from('products')
        .select('*')
      
      // Filter by category if provided
      if (category) {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query

      if (error) {
        console.error('Error fetching products from Supabase:', error)
        setProducts([])
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const sortedProducts = [...products].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <div className="mb-6 md:mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 md:mb-4 text-center">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-cream-300 text-center text-base sm:text-lg leading-relaxed">
              Discover our premium collection of handcrafted chocolates
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 md:mb-8 flex flex-col gap-4 px-2">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value)
                    fetchProducts(category.value)
                  }}
                  className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base min-h-[48px] ${
                    selectedCategory === category.value
                      ? 'bg-gold-600 text-white'
                      : 'bg-chocolate-800 text-cream-200 hover:bg-chocolate-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex justify-center md:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-chocolate-800 text-cream-200 px-4 py-2.5 rounded-lg border border-chocolate-700 w-full sm:w-auto min-h-[48px] text-base"
              >
                <option value="name">Sort by Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12 md:py-20 text-cream-400">
              <p className="text-base sm:text-lg">Loading products...</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
              {sortedProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20 text-cream-400">
              <p className="text-base sm:text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-chocolate-950 flex items-center justify-center"><p className="text-cream-400">Loading...</p></div>}>
      <ProductsContent />
    </Suspense>
  )
}
