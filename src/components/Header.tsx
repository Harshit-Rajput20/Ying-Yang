"use client"

import { useState } from "react"
import { FizziLogo } from "@/components/FizziLogo"
import {   UserButton, SignInButton, useUser } from "@clerk/nextjs"
// import { useAppContext } from "@/context/AppContext"
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets"
import Image from "next/image"
// ✅ Correct (for App Router)
import { useRouter } from "next/navigation";

// type Props = {}

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const { isSeller} = useAppContext()
  const { user } = useUser() // ✅ Get user info

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="relative z-20 w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <FizziLogo className="h-16 cursor-pointer text-sky-800 transition-transform hover:scale-105 md:h-20" />
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {["home", "product", "about", "shop"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sky-900 font-semibold text-lg hover:text-orange-600 transition-colors duration-200 relative group"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Shopping Bag */}
          <button className="text-sky-900 hover:text-orange-600 transition-colors duration-200 relative group">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              2
            </span>
          </button>

          {/* 👤 User / Account */}
          {user ? (
           <UserButton>
            <UserButton.MenuItems>

              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=> router.push('/cart')}/>
              
            </UserButton.MenuItems>

            <UserButton.MenuItems>

              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=> router.push('/my-orders')}/>
              
            </UserButton.MenuItems>
            
             <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=> router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                  <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=> router.push('/all-products')}/>
              </UserButton.MenuItems>
              
           </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image
                  src={assets.user_icon}
                  alt="user icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Account
              </button>
            </SignInButton>
          )}

          {/* Contact */}
          <a
            href="#contact"
            className="bg-sky-800 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-sky-900 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Contact
          </a>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center space-x-3">
          <button className="text-sky-900 hover:text-orange-600 transition-colors duration-200 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
              2
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="text-sky-900 hover:text-orange-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-sky-200 animate-in slide-in-from-top duration-200">
          <div className="px-6 py-4 space-y-4">
            {["home", "product", "about", "shop"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sky-900 font-semibold text-lg hover:text-orange-600 transition-colors duration-200"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

             {user ? (
           <UserButton>
            <UserButton.MenuItems>

              <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=> router.push('/cart')}/>
              
            </UserButton.MenuItems>

            <UserButton.MenuItems>

              <UserButton.Action label="My Orders" labelIcon={<BagIcon/>} onClick={()=> router.push('/my-orders')}/>
              
            </UserButton.MenuItems>
            
             <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=> router.push('/')}/>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                  <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=> router.push('/all-products')}/>
              </UserButton.MenuItems>
              
           </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image
                  src={assets.user_icon}
                  alt="user icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Account
              </button>
            </SignInButton>
          )}

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-sky-800 text-white font-semibold px-5 py-2.5 rounded-full text-center hover:bg-sky-900 transition-all duration-200 mt-4"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
