"use client"

import { useState } from "react"
import { FizziLogo } from "@/components/FizziLogo"
import { UserButton, SignInButton, useUser, useAuth } from "@clerk/nextjs"
import { useAppContext } from "@/context/AppContext"
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { runThreeCleanup } from "@/lib/threeCleanup"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSeller } = useAppContext()
  const { user } = useUser()
  const { isSignedIn } = useAuth()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // ✅ Active route check
  const isActiveRoute = (route: string) => {
    if (route === "/" && pathname === "/") return true
    if (route !== "/" && pathname.startsWith(route)) return true
    return false
  }

  // ✅ Common navigation handler (Desktop → SPA)
  const handleNavigation = (route: string) => {
    runThreeCleanup()
    if (route === "/my-orders") {
      if (user) {
        router.push("/my-orders")
      } else {
        router.push("/Unsigned-myorders")
      }
      return
    }
    router.push(route)
  }

  // ✅ Navigation items with icons
  const navItems = [
    {
      name: "Home",
      route: "/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Product",
      route: "/all-products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: "About",
      route: "/About",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "My orders",
      route: "/my-orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ]

  return (
    <header className="relative z-20 w-full">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <FizziLogo className="h-16 cursor-pointer text-sky-800 transition-transform hover:scale-105 md:h-20" />
        </div>

        {/* Center Navigation (Desktop) */}
        <div className="py-4">
          <div className="flex items-center justify-center gap-4 lg:gap-12 max-md:hidden">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.route)}
                className={`font-semibold transition hover:text-[#d32f2f] no-underline relative ${
                  isActiveRoute(item.route) ? "text-[#d32f2f]" : "text-[#002B56]"
                }`}
              >
                {item.name}
                {isActiveRoute(item.route) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#d32f2f] rounded-full"></div>
                )}
              </button>
            ))}

            {/* Seller Dashboard (Desktop) */}
            {isSeller && (
              <button
                onClick={() => handleNavigation("/seller")}
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

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Shopping Bag */}
          <button
            onClick={() => {
              runThreeCleanup()
              if (isSignedIn) {
                router.push("/cart")
              } else {
                const productDataid = "6892688546e14b1cdadcd220"
                router.push(`/buynow?productId=${productDataid}`)
              }
            }}
            className={`hover:text-orange-600 transition-colors duration-200 relative group ${
              isActiveRoute("/cart") ? "text-orange-600" : "text-sky-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
            </svg>
            {isActiveRoute("/cart") && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
            )}
          </button>

          {/* User / Account */}
          {user ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon || "/placeholder.svg"} alt="user icon" width={20} height={20} className="w-5 h-5" />
                Account
              </button>
            </SignInButton>
          )}

          {/* Contact */}
          <a
            href="#contact"
            onClick={() => runThreeCleanup()}
            className="bg-sky-800 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-sky-900 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Contact
          </a>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Cart Button (Mobile) */}
          <button
            onClick={() => {
              runThreeCleanup()
              if (isSignedIn) {
                window.location.href = "/cart" // ✅ full refresh
              } else {
                const productDataid = "6892688546e14b1cdadcd220"
                window.location.href = `/buynow?productId=${productDataid}` // ✅ full refresh
              }
            }}
            className={`hover:text-orange-600 transition-colors duration-200 relative group ${
              isActiveRoute("/cart") ? "text-orange-600" : "text-sky-900"
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
            </svg>
            {isActiveRoute("/cart") && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></div>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="text-sky-900 hover:text-orange-600 transition-colors duration-200">
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-0.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] z-50 bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 backdrop-blur-lg animate-in slide-in-from-top duration-300">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-sky-800 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-8 w-16 h-16 bg-orange-500 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-sky-600 rounded-full blur-xl"></div>
          </div>

          <div className="relative px-6 py-8 h-full overflow-y-auto">
            {/* Navigation Items (Mobile) */}
            <div className="space-y-3 mb-8">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    runThreeCleanup()
                    setIsMobileMenuOpen(false)
                    window.location.href = item.route // ✅ full refresh
                  }}
                  className={`group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    isActiveRoute(item.route)
                      ? "bg-white/90 text-sky-800 shadow-xl border-2 border-sky-200"
                      : "bg-white/20 text-sky-900 hover:bg-white/40 backdrop-blur-sm"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`p-2 rounded-xl transition-colors duration-300 ${
                      isActiveRoute(item.route)
                        ? "bg-sky-100 text-sky-700"
                        : "bg-white/30 text-sky-800 group-hover:bg-white/50"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-semibold text-lg">{item.name}</span>
                  {isActiveRoute(item.route) && (
                    <div className="ml-auto w-2 h-2 bg-sky-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Seller Dashboard (Mobile) */}
            {isSeller && (
              <div className="mb-6">
                <button
                  onClick={() => {
                    runThreeCleanup()
                    setIsMobileMenuOpen(false)
                    window.location.href = "/seller" // ✅ full refresh
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isActiveRoute("/seller")
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl"
                      : "bg-white/20 text-sky-900 hover:bg-white/40 backdrop-blur-sm border-2 border-white/30"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-semibold">Seller Dashboard</span>
                </button>
              </div>
            )}

            {/* User Section (Mobile) */}
            <div className="mb-6">
              {user ? (
                <div className="flex items-center gap-3 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <UserButton />
                  <span className="font-medium text-sky-900">Welcome back!</span>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button
                    onClick={() => runThreeCleanup()}
                    className="w-full flex items-center gap-4 p-4 bg-white/20 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/40 backdrop-blur-sm text-sky-900"
                  >
                    <div className="p-2 rounded-xl bg-white/30">
                      <Image src={assets.user_icon || "/placeholder.svg"} alt="user icon" width={20} height={20} className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg">Account</span>
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Contact Button (Mobile) */}
            <a
              href="#contact"
              onClick={() => {
                runThreeCleanup()
                setIsMobileMenuOpen(false)
                window.location.href = "/#contact" // ✅ full refresh
              }}
              className="block w-full bg-gradient-to-r from-sky-700 to-sky-800 text-white font-bold text-lg px-6 py-4 rounded-2xl text-center hover:from-sky-800 hover:to-sky-900 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Contact Us
            </a>

            {/* Decorative bottom element */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-sky-800/60 text-sm font-medium">
                <div className="w-8 h-0.5 bg-sky-800/30 rounded-full"></div>
                <span>Fizzi</span>
                <div className="w-8 h-0.5 bg-sky-800/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
