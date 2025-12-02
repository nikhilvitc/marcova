'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar } from 'react-icons/fi'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [testimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      text: 'The most exquisite chocolates I\'ve ever tasted. Markova truly delivers premium quality.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      text: 'Ordered a celebration cake for my anniversary. It was absolutely stunning and delicious!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Williams',
      text: 'Handcrafted with love. You can taste the quality in every bite. Highly recommended!',
      rating: 5,
    },
  ])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch featured products from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(6)

        if (error) {
          console.error('Error fetching featured products from Supabase:', error)
          setFeaturedProducts([])
        } else {
          setFeaturedProducts(data || [])
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
        setFeaturedProducts([])
      }
    }
    fetchFeaturedProducts()
  }, [])

  const categories = [
    {
      name: 'Bar Chocolates',
      href: '/products/category/bar-chocolates',
      image: '/images/bar-chocolate.jpg',
    },
    {
      name: 'Chocolate Bites',
      href: '/products/category/chocolate-bites',
      image: '/images/chocolate-bites.jpg',
    },
    {
      name: 'Bonbon Chocolates',
      href: '/products/category/bonbon-chocolates',
      image: '/images/bonbon.jpg',
    },
    {
      name: 'Celebration Chocolates',
      href: '/products/category/celebration-chocolates',
      image: '/images/celebration.jpg',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-chocolate opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-chocolate.jpg')] bg-cover bg-center opacity-30"></div>
        
        {/* Large Logo Background with 10% Transparency */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center z-5"
        >
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <Image
              src="/assets/images/logo.png"
              alt="Marcova Logo"
              width={1400}
              height={1000}
              className="w-auto h-auto max-w-[80%] max-h-[60%] object-contain opacity-10"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-cream-100">
            Welcome to <span className="text-gradient">Marcova</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-200 mb-8 max-w-2xl mx-auto">
            Premium handcrafted chocolates and celebration cakes, made with passion and finest ingredients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary inline-flex items-center justify-center">
              Explore Products <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center justify-center">
              Our Story
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-chocolate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Products</h2>
            <p className="text-cream-300 text-lg">Handpicked favorites from our collection</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-cream-400 py-12">
                <p>Loading featured products...</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary inline-flex items-center">
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-chocolate-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Categories</h2>
            <p className="text-cream-300 text-lg">Explore our diverse range of premium chocolates</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={category.href} className="group block">
                  <div className="card h-full text-center hover:scale-105">
                    <div className="w-full h-48 bg-chocolate-800 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gold-600 transition-colors">
                      <span className="text-4xl">🍫</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gradient-to-b from-chocolate-950 to-chocolate-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                About <span className="text-gradient">Markova</span>
              </h2>
              <p className="text-cream-300 text-lg mb-4">
                At Markova, we believe that chocolate is more than just a treat—it's an experience. Our journey began
                with a passion for creating handcrafted chocolates and celebration cakes that celebrate life's sweetest moments.
              </p>
              <p className="text-cream-300 text-lg mb-6">
                Every product is carefully crafted using premium ingredients, traditional techniques, and a commitment to
                sustainability. From our artisanal bar chocolates to our custom celebration cakes, each creation tells a story
                of quality, craftsmanship, and love.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center">
                Learn More <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-chocolate-800 rounded-xl flex items-center justify-center">
                <span className="text-6xl">🎂</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-chocolate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What Our Customers Say</h2>
            <p className="text-cream-300 text-lg">Testimonials from chocolate lovers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-cream-300 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold text-cream-100">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
