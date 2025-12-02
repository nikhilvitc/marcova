"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

const categoryMap: { [key: string]: string } = {
  'bar-chocolates': 'bar-chocolates',
  'chocolate-bites': 'chocolate-bites',
  'bonbon-chocolates': 'bonbon-chocolates',
  'celebration-chocolates': 'celebration-chocolates',
}

const categoryNames: { [key: string]: string } = {
  'bar-chocolates': 'Bar Chocolates',
  'chocolate-bites': 'Chocolate Bites',
  'bonbon-chocolates': 'Bonbon Chocolates',
  'celebration-chocolates': 'Celebration Chocolates',
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params?.category as string
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (categorySlug) {
      fetchProducts()
    }
  }, [categorySlug])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const category = categoryMap[categorySlug] || categorySlug
      
      // Fetch products from Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)

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

  const categoryName = categoryNames[categorySlug] || categorySlug

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      <div className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
              {categoryName}
            </h1>
            <p className="text-cream-300 text-center text-lg">
              Explore our collection of premium {categoryName.toLowerCase()}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-cream-400">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(products as any[]).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-cream-400">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
