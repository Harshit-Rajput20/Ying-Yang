"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartButton() {
  const [cartCount, setCartCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const count = localStorage.getItem("cartCount");
    if (count) setCartCount(Number(count));
  }, []);

  if (!isMounted) {
    // Don't render button until mounted to avoid hydration mismatch
    return null;
  }

  return (
    <Link href="/cart">
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
          {cartCount}
        </span>
      </button>
    </Link>
  );
}
