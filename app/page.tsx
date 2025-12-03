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
      name: 'Aarohi Sharma',
      text: 'Marcova की chocolates बिल्कुल लाजवाब हैं! हर bite में premium quality feel होती है। दिवाली में सभी को बहुत पसंद आई!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Rohit Verma',
      text: 'Anniversary के लिए celebration cake order किया था। Looked stunning और taste भी amazing था! Highly recommend करूंगा।',
      rating: 5,
    },
    {
      id: 3,
      name: 'Priya Nair',
      text: 'हर product में love और quality दिखती है। Handcrafted chocolates का असली मज़ा। मेरे बच्चों को भी बहुत पसंद आई!',
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
      image: '/assets/images/bar_chocolate.png',
    },
    {
      name: 'Chocolate Bites',
      href: '/products/category/chocolate-bites',
      image: '/assets/images/chocolate_bites.png',
    },
    {
      name: 'Bonbon Chocolates',
      href: '/products/category/bonbon-chocolates',
      image: '/assets/images/bonbon_chocolate.png',
    },
    {
      name: 'Celebration Chocolates',
      href: '/products/category/celebration-chocolates',
      image: '/assets/images/celebration_chocolate.png',
    },
  ]

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-chocolate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-950"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-chocolate.jpg')] bg-cover bg-center opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-chocolate-950/80"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-gold-500/30 rounded-full animate-float" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
          <div className="absolute w-3 h-3 bg-gold-400/20 rounded-full animate-float" style={{top: '40%', left: '80%', animationDelay: '1s'}}></div>
          <div className="absolute w-2 h-2 bg-gold-500/25 rounded-full animate-float" style={{top: '60%', left: '20%', animationDelay: '2s'}}></div>
          <div className="absolute w-3 h-3 bg-gold-400/30 rounded-full animate-float" style={{top: '80%', left: '70%', animationDelay: '1.5s'}}></div>
          <div className="absolute w-2 h-2 bg-gold-500/20 rounded-full animate-float" style={{top: '30%', left: '90%', animationDelay: '0.5s'}}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 py-8"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-5 md:mb-6 text-cream-50 leading-tight drop-shadow-2xl px-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Indulge In The Art Of <span className="text-gradient-animate">Homemade Chocolate</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-cream-200 mb-8 md:mb-10 max-w-3xl mx-auto px-6 drop-shadow-lg font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium handcrafted chocolates and celebration cakes, made with passion and finest ingredients
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center px-6 sm:px-4 max-w-md sm:max-w-none mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/products" className="btn-primary inline-flex items-center justify-center w-full sm:w-auto group">
              Explore Products <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center justify-center w-full sm:w-auto">
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gradient-to-b from-chocolate-950 via-chocolate-900 to-chocolate-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">Featured Products</h2>
            <p className="text-cream-200 text-base sm:text-lg leading-relaxed">Handpicked favorites from our collection</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-cream-400 py-16">
                <p className="text-base">Loading featured products...</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10 md:mt-12 px-4">
            <Link href="/products" className="btn-primary inline-flex items-center w-full sm:w-auto justify-center">
              View All Products <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-gradient-to-b from-chocolate-900 via-chocolate-800 to-chocolate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">Our Categories</h2>
            <p className="text-cream-200 text-base md:text-lg leading-relaxed">Explore our diverse range of premium chocolates</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={category.href} className="group block">
                  <div className="card h-full text-center hover:scale-105 active:scale-95">
                    <div className="relative w-full h-40 sm:h-48 bg-chocolate-800 rounded-lg mb-3 md:mb-4 overflow-hidden group-hover:ring-2 group-hover:ring-gold-500 transition-all">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 group-hover:text-gold-400 transition-colors px-2">
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
      <section className="section-padding bg-gradient-to-b from-chocolate-950 via-chocolate-900 to-chocolate-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                About <span className="text-gradient">Marcova</span>
              </h2>
              <p className="text-cream-200 text-lg mb-4">
                At Marcova, we believe that chocolate is more than just a treat—it's an experience. Our journey began
                with a passion for creating handcrafted chocolates and celebration cakes that celebrate life's sweetest moments.
              </p>
              <p className="text-cream-200 text-lg mb-6">
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
              <div className="absolute inset-0 bg-gradient-to-br from-chocolate-700/40 to-chocolate-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center p-12 border border-gold-500/20">
                <div className="relative w-full h-full">
                  <Image 
                    src="/assets/images/logo.png" 
                    alt="Marcova Logo" 
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-b from-chocolate-900 via-chocolate-800 to-chocolate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">What Our Customers Say</h2>
            <p className="text-cream-200 text-lg">Testimonials from chocolate lovers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-gold-500/20 hover:border-gold-500/30"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-gold-400 fill-current" />
                  ))}
                </div>
                <p className="text-cream-200 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold text-cream-50">— {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
