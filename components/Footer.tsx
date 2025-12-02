import Link from 'next/link'
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-chocolate-900 border-t border-chocolate-800 mt-20">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">Marcova</h3>
            <p className="text-cream-300 mb-4">
              Premium handcrafted chocolates and celebration cakes made with love and finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-300 hover:text-gold-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-cream-300 hover:text-gold-400 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-cream-300 hover:text-gold-400 transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-cream-100">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream-300 hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-cream-100">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/category/bar-chocolates" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Bar Chocolates
                </Link>
              </li>
              <li>
                <Link href="/products/category/chocolate-bites" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Chocolate Bites
                </Link>
              </li>
              <li>
                <Link href="/products/category/bonbon-chocolates" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Bonbon Chocolates
                </Link>
              </li>
              <li>
                <Link href="/products/category/celebration-chocolates" className="text-cream-300 hover:text-gold-400 transition-colors">
                  Celebration Chocolates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-cream-100">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-cream-300">
                <FiMapPin />
                <span>Kolkata, West Bengal</span>
              </li>
              <li className="flex items-center space-x-2 text-cream-300">
                <FiPhone />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-2 text-cream-300">
                <FiMail />
                <span>marcovachocolates@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-chocolate-800 pt-8 text-center text-cream-400">
          <p>&copy; {currentYear} Marcova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
