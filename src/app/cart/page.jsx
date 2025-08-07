'use client'

import React from "react";
// import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image"; 
// import Header from "@/components/Header"
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";

import { ShoppingCart, Minus, Plus, ArrowLeft, Trash2 } from 'lucide-react';

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
      {/* <Header /> */}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page Header */}
        <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/50 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-200/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-yellow-300/40">
                <ShoppingCart className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-700">Review your selected items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{getCartCount()}</p>
              <p className="text-sm text-gray-600">Items</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl border border-yellow-300/50 shadow-lg overflow-hidden">
              
              {Object.keys(cartItems).length === 0 ? (
                /* Empty Cart State */
                <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-yellow-200/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-300/40">
                    <ShoppingCart className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h3>
                  <p className="text-gray-700 mb-6">Add some products to get started!</p>
                  <button 
                    onClick={() => router.push('/all-products')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Header */}
                  <div className="p-6 border-b border-yellow-300/30">
                    <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-800">
                      <div className="col-span-6">Product Details</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-center">Subtotal</div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-yellow-300/20">
                    {Object.keys(cartItems).map((itemId) => {
                      const product = products.find(product => product._id === itemId);
                      if (!product || cartItems[itemId] <= 0) return null;
                      
                      return (
                        <div key={itemId} className="p-6 hover:bg-yellow-200/20 transition-colors duration-200">
                          
                          {/* Mobile Layout */}
                          <div className="md:hidden space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="w-20 h-20 bg-yellow-200/50 rounded-xl flex items-center justify-center border border-yellow-300/40 overflow-hidden">
                                <Image
                                  src={product.image[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover"
                                  width={64}
                                  height={64}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-lg font-bold text-gray-900">${product.offerPrice}</p>
                                <button
                                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                                  onClick={() => updateCartQuantity(product._id, 0)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                                  className="w-8 h-8 bg-yellow-200/50 rounded-lg flex items-center justify-center border border-yellow-300/40 hover:bg-yellow-200/60 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">{cartItems[itemId]}</span>
                                <button 
                                  onClick={() => addToCart(product._id)}
                                  className="w-8 h-8 bg-yellow-200/50 rounded-lg flex items-center justify-center border border-yellow-300/40 hover:bg-yellow-200/60 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">
                                  ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                            
                            {/* Product Details */}
                            <div className="col-span-6 flex items-center gap-4">
                              <div className="w-16 h-16 bg-yellow-200/50 rounded-xl flex items-center justify-center border border-yellow-300/40 overflow-hidden">
                                <Image
                                  src={product.image[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-14 h-14 object-cover"
                                  width={56}
                                  height={56}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <button
                                  className="text-red-500 text-sm flex items-center gap-1 hover:text-red-600 transition-colors"
                                  onClick={() => updateCartQuantity(product._id, 0)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove
                                </button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 text-center">
                              <p className="font-semibold text-gray-900">${product.offerPrice}</p>
                            </div>

                            {/* Quantity */}
                            <div className="col-span-2 flex items-center justify-center gap-2">
                              <button 
                                onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                                className="w-8 h-8 bg-yellow-200/50 rounded-lg flex items-center justify-center border border-yellow-300/40 hover:bg-yellow-200/60 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-semibold text-gray-900">{cartItems[itemId]}</span>
                              <button 
                                onClick={() => addToCart(product._id)}
                                className="w-8 h-8 bg-yellow-200/50 rounded-lg flex items-center justify-center border border-yellow-300/40 hover:bg-yellow-200/60 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="col-span-2 text-center">
                              <p className="font-bold text-gray-900">
                                ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Continue Shopping */}
                  <div className="p-6 border-t border-yellow-300/30">
                    <button 
                      onClick={() => router.push('/all-products')}
                      className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl border border-yellow-300/50 shadow-lg overflow-hidden">
              <OrderSummary />
            </div>
          </div>
        </div>

        {/* Additional Features */}
        {Object.keys(cartItems).length > 0 && (
          <div className="mt-8 bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/50 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-yellow-200/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-300/40">
                  <span className="text-xl">🚚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-700">On orders over $25</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-yellow-200/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-300/40">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-700">Your data is protected</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-yellow-200/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-300/40">
                  <span className="text-xl">↩️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-sm text-gray-700">30-day return policy</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
