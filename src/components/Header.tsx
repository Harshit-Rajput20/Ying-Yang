"use client"

import { useState } from "react"
import { FizziLogo } from "@/components/FizziLogo" 
import {   
  UserButton, 
  SignInButton, 
  useUser,
  useAuth
} from "@clerk/nextjs"
import { useAppContext } from "@/context/AppContext"
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation";
import { runThreeCleanup } from "@/lib/threeCleanup"

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSeller } = useAppContext()   
  const { user } = useUser()
  const { isSignedIn } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // ✅ Active route check
  const isActiveRoute = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.startsWith(route)) return true;
    return false;
  }

  // ✅ Common navigation handler with cleanup
  const handleNavigation = (route: string) => {
    runThreeCleanup();

    if (route === "/my-orders") {
      if (user) {
        router.push("/my-orders");
      } else {
        router.push("/Unsigned-myorders");
      }
      return;
    }

    router.push(route);
  };

  // ✅ Navigation items
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

            {/* Seller Dashboard */}
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
              runThreeCleanup();
              if (isSignedIn) {
                router.push("/cart");
              } else {
                const productDataid = "6892688546e14b1cdadcd220"
                router.push(`/buynow?productId=${productDataid}`);
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
              runThreeCleanup();
              if (isSignedIn) {
                router.push("/cart");
              } else {
                const productDataid = "6892688546e14b1cdadcd220"
                router.push(`/buynow?productId=${productDataid}`);
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
                  handleNavigation(item.route);
                  setIsMobileMenuOpen(false);
                }}
                className={`block font-semibold text-lg hover:text-orange-600 transition-colors duration-200 w-full text-left relative ${
                  isActiveRoute(item.route) ? "text-orange-600" : "text-sky-900"
                }`}
              >
                {item.name}
                {isActiveRoute(item.route) && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-orange-600 rounded-r"></div>
                )}
              </button>
            ))}

            {/* Seller Dashboard (Mobile) */}
            {isSeller && (
              <button
                onClick={() => {
                  handleNavigation("/seller");
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

            {/* User Section (Mobile) */}
            {user ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button
                  onClick={() => runThreeCleanup()}
                  className="flex items-center gap-2 hover:text-gray-900 transition"
                >
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
              onClick={() => {
                runThreeCleanup();
                setIsMobileMenuOpen(false);
              }}
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
