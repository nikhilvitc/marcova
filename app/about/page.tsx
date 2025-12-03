'use client'

import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiFeather } from 'react-icons/fi'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: FiAward,
      title: 'Premium Quality',
      description: 'We source only the finest ingredients to create exceptional chocolates and cakes.',
    },
    {
      icon: FiHeart,
      title: 'Handcrafted with Love',
      description: 'Every product is carefully crafted by our skilled artisans with attention to detail.',
    },
    {
      icon: FiFeather,
      title: 'Sustainable Practices',
      description: 'We are committed to sustainable sourcing and environmentally friendly practices.',
    },
  ]

  return (
    <div className="pt-20 min-h-screen bg-chocolate-950">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-chocolate-950 to-chocolate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cream-200 leading-relaxed">
              Welcome to Markova, where passion meets craftsmanship in every bite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">The Markova Journey</h2>
              <p className="text-cream-300 text-base sm:text-lg mb-3 md:mb-4 leading-relaxed">
                Markova was born from a simple belief: that chocolate should be more than just a sweet treat—it should be
                an experience that celebrates life's most precious moments. Our journey began when we discovered the art
                of handcrafted chocolates and saw an opportunity to share something truly special with the world.
              </p>
              <p className="text-cream-300 text-base sm:text-lg mb-3 md:mb-4 leading-relaxed">
                What started as a small passion project has grown into a brand dedicated to creating premium chocolates
                and celebration cakes that bring joy to every occasion. From birthdays to anniversaries, from Diwali to
                Christmas, Markova is there to make your celebrations even sweeter.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-chocolate-800 p-8 sm:p-10 md:p-12"
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/assets/images/logo.png" 
                  alt="Marcova Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Process Section */}
          <div className="mb-12 md:mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">Our Handmade Process</h2>
              <p className="text-cream-300 text-base sm:text-lg">From bean to bar, every step is crafted with care</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  step: '01',
                  title: 'Selecting Ingredients',
                  description: 'We carefully source premium cocoa beans and finest ingredients from trusted suppliers.',
                },
                {
                  step: '02',
                  title: 'Artisan Crafting',
                  description: 'Our skilled chocolatiers handcraft each piece with traditional techniques and modern innovation.',
                },
                {
                  step: '03',
                  title: 'Quality Assurance',
                  description: 'Every product undergoes rigorous quality checks to ensure it meets our high standards.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-6xl font-bold text-gold-600 mb-4">{item.step}</div>
                  <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                  <p className="text-cream-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold mb-4">Our Values</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-gold-500" />
                  <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                  <p className="text-cream-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ingredients & Sustainability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card bg-gradient-to-br from-chocolate-900 to-chocolate-950"
          >
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Ingredients & Sustainability
            </h2>
            <p className="text-cream-300 text-lg leading-relaxed mb-4">
              At Markova, we believe that great taste starts with great ingredients. We use only the finest cocoa,
              premium dairy products, and natural flavors. Our commitment to sustainability means we work with
              suppliers who share our values of ethical sourcing and environmental responsibility.
            </p>
            <p className="text-cream-300 text-lg leading-relaxed">
              We are continuously working towards reducing our environmental footprint while maintaining the highest
              quality standards. Every chocolate bar and cake we create is a testament to our dedication to both
              excellence and sustainability.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
