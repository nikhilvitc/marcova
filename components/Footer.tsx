import Link from 'next/link'
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-black via-chocolate-950/50 to-black border-t border-gold-500/20 mt-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-display font-bold text-gradient-animate mb-4 tracking-wider">MARCOVA</h3>
            <p className="text-cream-200 mb-4 leading-relaxed">
              Premium handcrafted chocolates and celebration cakes made with love and finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:scale-125 transform p-2 hover:bg-gold-500/10 rounded-full">
                <FiFacebook size={22} />
              </a>
              <a href="#" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:scale-125 transform p-2 hover:bg-gold-500/10 rounded-full">
                <FiInstagram size={22} />
              </a>
              <a href="#" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:scale-125 transform p-2 hover:bg-gold-500/10 rounded-full">
                <FiTwitter size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4 text-cream-50 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Products
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Cakes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4 text-cream-50 tracking-wide">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/category/bar-chocolates" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Bar Chocolates
                </Link>
              </li>
              <li>
                <Link href="/products/category/chocolate-bites" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Chocolate Bites
                </Link>
              </li>
              <li>
                <Link href="/products/category/bonbon-chocolates" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Bonbon Chocolates
                </Link>
              </li>
              <li>
                <Link href="/products/category/celebration-chocolates" className="text-cream-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium">
                  → Celebration Chocolates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4 text-cream-50 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-cream-200 group hover:text-gold-400 transition-colors cursor-pointer">
                <FiMapPin className="text-gold-400 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">Kolkata, West Bengal</span>
              </li>
              <li className="flex items-center space-x-3 text-cream-200 group hover:text-gold-400 transition-colors cursor-pointer">
                <FiPhone className="text-gold-400 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-3 text-cream-200 group hover:text-gold-400 transition-colors cursor-pointer">
                <FiMail className="text-gold-400 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">marcovachocolates@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/30 pt-8 mt-8">
          <p className="text-center text-cream-300 font-medium">&copy; {currentYear} <span className="text-gold-400 font-bold">MARCOVA</span>. All rights reserved.</p>
          <p className="text-center text-cream-400 text-sm mt-2">Crafted with passion & premium ingredients 🍫</p>
        </div>
      </div>
    </footer>
  )
}
