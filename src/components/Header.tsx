"use client"

import { useState } from "react"
import { FizziLogo } from "@/components/FizziLogo" 
import {   
  UserButton, 
  SignInButton, 
  useUser 
} from "@clerk/nextjs"
import { useAppContext } from "@/context/AppContext"
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets"
import Image from "next/image"
// ✅ Correct (for App Router)
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link"
import CartButton from "./CartButton"
import { runThreeCleanup } from "@/lib/threeCleanup" // ✅ Import this
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

// type Props = {}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current pathname
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSeller } = useAppContext()   
  const { user } = useUser() // ✅ Get user info
   const { isSignedIn } = useAuth();
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // ✅ Helper function to check if route is active
  const isActiveRoute = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.startsWith(route)) return true;
    return false;
  }

  // ✅ Navigation items with their routes
  const navItems = [
    { name: "Home", route: "/" },
    { name: "Product", route: "/all-products" },
    { name: "About", route: "/About" },
    { name: "My orders", route: "/my-orders" }
  ];

  return (
    <header className="relative z-20 w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <FizziLogo className="h-16 cursor-pointer text-sky-800 transition-transform hover:scale-105 md:h-20" />
        </div>

        {/* Center Navigation */}
        <div className="py-4">
          <div className="flex items-center justify-center gap-4 lg:gap-12 max-md:hidden">
            {navItems.map((item) => (
  <button
    key={item.name}
    onClick={() => {
      runThreeCleanup();

      // ✅ Special logic for "My orders"
      if (item.route === "/my-orders") {
        if (user) {
          router.push("/my-orders");
        } else {
          router.push("/Unsigned-myorders");
        }
      } else {
        router.push(item.route);
      }
    }}
    className={`font-semibold transition hover:text-[#d32f2f] no-underline relative ${
      isActiveRoute(item.route)
        ? "text-[#d32f2f]"
        : "text-[#002B56]"
    }`}
  >
    {item.name}
    {/* ✅ Active indicator */}
    {isActiveRoute(item.route) && (
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#d32f2f] rounded-full"></div>
    )}
  </button>
))}

            
            {/* Seller Dashboard */}
            {isSeller && (
              <button
                onClick={() => {
                  runThreeCleanup(); // ✅ Clean up before navigation
                  router.push("/seller");
                }}
                className={`text-xs border px-4 py-1.5 rounded-full transition-all ${
                  isActiveRoute("/seller")
                    ? "border-[#d32f2f] text-[#d32f2f] bg-[#d32f2f]/10"
                    : "border-[#002B56] text-[#002B56] hover:border-[#d32f2f] hover:text-[#d32f2f]"
                }`}
              >
                Seller Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Shopping Bag */}
          <button
            onClick={() => {
              runThreeCleanup(); // ✅ cleanup Three.js and GSAP
               if (isSignedIn) {
      // ✅ Signed in → go to cart
      router.push("/cart");
    } else {
      // ❌ Not signed in → go to buynow page
      const productDataid = "6892688546e14b1cdadcd220"
      router.push(
        `/buynow?productId=${productDataid} 
        )}`
      );
    } // ✅ navigate safely
            }}
            className={`hover:text-orange-600 transition-colors duration-200 relative group ${
              isActiveRoute("/cart") ? "text-orange-600" : "text-sky-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
            {/* ✅ Active indicator for cart */}
            {isActiveRoute("/cart") && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
            )}
          </button>

          {/* 👤 User / Account */}
          {user ? (
            <UserButton>
              {/* <UserButton.MenuItems>
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
              </UserButton.MenuItems> */}                         
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image
                  src={assets.user_icon || "/placeholder.svg"}
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
          <button 
            onClick={() => {
              runThreeCleanup();
              router.push("/cart");
            }}
            className={`hover:text-orange-600 transition-colors duration-200 relative ${
              isActiveRoute("/cart") ? "text-orange-600" : "text-sky-900"
            }`}
          >
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
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  runThreeCleanup();
                  router.push(item.route);
                  setIsMobileMenuOpen(false);
                }}
                className={`block font-semibold text-lg hover:text-orange-600 transition-colors duration-200 w-full text-left relative ${
                  isActiveRoute(item.route) 
                    ? "text-orange-600" 
                    : "text-sky-900"
                }`}
              >
                {item.name}
                {/* ✅ Active indicator for mobile */}
                {isActiveRoute(item.route) && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-orange-600 rounded-r"></div>
                )}
              </button>
            ))}

            {/* Mobile Seller Dashboard */}
            {isSeller && (
              <button
                onClick={() => {
                  runThreeCleanup();
                  router.push("/seller");
                  setIsMobileMenuOpen(false);
                }}
                className={`block text-sm border px-4 py-2 rounded-full transition-all w-full text-center ${
                  isActiveRoute("/seller")
                    ? "border-orange-600 text-orange-600 bg-orange-600/10"
                    : "border-sky-900 text-sky-900 hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                Seller Dashboard
              </button>
            )}

            {/* Mobile User Section */}
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
                    src={assets.user_icon || "/placeholder.svg"}
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
