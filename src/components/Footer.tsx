"use client"

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useSafeNavigation } from "@/hooks/useSafeNavigation"
import CircleText from './CircleText'

export default function Footer() {
  const { navigateTo } = useSafeNavigation()

  const handleNavigation = (path: string) => {
    navigateTo(path)
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br z-10 from-orange-500 via-red-500 to-orange-600">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 -right-10 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-10 left-1/3 w-24 h-24 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>

      
 
 

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-black text-yellow-300 mb-4 tracking-tight">
                SODA
              </h2>
              <p className="text-yellow-100 text-lg font-semibold mb-6 leading-relaxed">
                {'The drink that makes you SMILE! 🥤✨'}
              </p>
              <p className="text-orange-100 text-sm leading-relaxed max-w-md">
                Experience the burst of flavor that brings joy to every sip. 
                Made with love, served with happiness.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/20">
              <h3 className="text-yellow-300 font-bold text-lg mb-3">
                {'Stay Bubbly! 🎉'}
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-yellow-300/30 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-orange-600 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-300 font-bold text-xl mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Store Locator', path: '/stores' },
                { name: 'Careers', path: '/careers' }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-orange-100 hover:text-yellow-300 transition-colors duration-300 font-medium hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-300 font-bold text-xl mb-6 relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-orange-100">
                <div className="p-2 bg-yellow-400/20 rounded-lg">
                  <Phone className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-medium">1-800-SODA-FUN</span>
              </div>
              <div className="flex items-center space-x-3 text-orange-100">
                <div className="p-2 bg-yellow-400/20 rounded-lg">
                  <Mail className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-medium">hello@sodasmile.com</span>
              </div>
              <div className="flex items-start space-x-3 text-orange-100">
                <div className="p-2 bg-yellow-400/20 rounded-lg mt-1">
                  <MapPin className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-medium leading-relaxed">
                  123 Bubble Street<br />
                  Fizz City, FC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-yellow-300/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Social Media */}
            <div className="flex items-center space-x-1">
              <span className="text-yellow-300 font-semibold mr-4">Follow the Fizz:</span>
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' }
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="p-3 bg-yellow-400/20 hover:bg-yellow-400 text-yellow-300 hover:text-orange-600 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-6 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 group-hover:animate-pulse" />
                </button>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-orange-200 text-sm font-medium">
                © 2024 SODA. All rights reserved.
              </p>
              <p className="text-orange-300 text-xs mt-1">
                Made with 💛 and lots of bubbles
              </p>
            </div>
          </div>
        </div>

        {/* Fun Bottom Message */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-yellow-400/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-300/30">
            <p className="text-yellow-300 font-bold text-sm animate-pulse">
              {'🎉 Keep Smiling, Keep Sipping! 🥤'}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-60"></div>
     <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28 z-50">
    <CircleText />
  </div>
    </footer>
  )
}
