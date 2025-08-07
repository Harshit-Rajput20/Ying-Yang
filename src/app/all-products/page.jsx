'use client'

import ProductCard from "@/components/ProductCard"
// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
    const { products } = useAppContext();

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
            {/* <Navbar /> */}
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300 rounded-full animate-bounce"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-400 rounded-full animate-bounce"></div>
            </div>

            <div className="relative z-10 flex flex-col items-start px-6 md:px-16 lg:px-32">
                
                {/* Page Header with Glass Morphism */}
                <div className="w-full pt-12 mb-12">
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                                All Products
                            </h1>
                            <p className="text-lg text-gray-700 mb-4 max-w-2xl">
                                Discover our complete collection of premium products, carefully curated for your needs
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            
                            {/* Product Count Badge */}
                            <div className="mt-6 bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40">
                                <span className="text-gray-800 font-bold">
                                    {products.length} Products Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-full">
                    <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
                        
                        {/* Filter/Sort Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                    <span className="text-gray-800 font-medium text-sm">
                                        Showing {products.length} results
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="text-gray-800 font-medium text-sm">Sort by:</span>
                                <select className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {products.map((product, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-all duration-300">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                             
                            <div className="text-center py-16">
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                    <p className="text-gray-700">We're working on adding more amazing products for you!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="w-full mt-12 mb-16">
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Feature 1 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/40">
                                    <span className="text-2xl">🚚</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Free Shipping</h3>
                                <p className="text-gray-700 text-sm">Free delivery on all orders over $25</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/40">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Payment</h3>
                                <p className="text-gray-700 text-sm">Your payment information is safe with us</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/40">
                                    <span className="text-2xl">↩️</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Returns</h3>
                                <p className="text-gray-700 text-sm">30-day hassle-free return policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AllProducts;
