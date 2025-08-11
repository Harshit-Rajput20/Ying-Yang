"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { ShoppingCart, Heart, Share2, Zap, Award, Truck, Shield, Star, ChevronLeft, ChevronRight, MapPin, Clock, Package, CreditCard, RotateCcw, CheckCircle } from 'lucide-react';








const Product = () => {
         const { id } = useParams();
    const { products, router, addToCart } = useAppContext()
    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [quantity, setQuantity] = useState(1);

      const { isSignedIn } = useAuth();
    const quantity = 1;

    const fetchProductData = () => {
        if (!products || products.length === 0) return;
        const product = products.find(p => p._id === id);
        setProductData(product || null);
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products])

    // Auto-slider functionality
    useEffect(() => {
        if (!productData?.image || productData.image.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % productData.image.length;
                setMainImage(productData.image[nextIndex]);
                return nextIndex;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [productData?.image]);

    useEffect(() => {
        if (productData?.image && productData.image.length > 0) {
            setMainImage(productData.image[0]);
            setCurrentImageIndex(0);
        }
    }, [productData]);




const handleAddToCart = async () => {
  if (isSignedIn) {
    // ✅ Signed in → Add to server cart
    setIsAddingToCart(true);
    for (let i = 0; i < quantity; i++) {
      await addToCart(productData._id);
    }
    setTimeout(() => {
      setIsAddingToCart(false);
       toast.success("Product added to cart successfully!");
      router.push("/cart");
    }, 500);
  } else {
    // ❌ Not signed in → Save to guest cart in localStorage
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    // Push the product with quantity
    guestCart.push({
      productId: productData._id,
      name: productData.name,
      price: productData.offerPrice,
      image: productData.image[0],
      quantity
    });

    console.log(guestCart)

    localStorage.setItem("guestCart", JSON.stringify(guestCart));
     toast.success("Product added to cart successfully!");

    // Redirect to buynow without query params
    router.push("/all-products")
 

  }
};


//     const handleBuyNow = () => {
//   router.push(
//     `/buynow?productId=${productData._id}&name=${encodeURIComponent(
//       productData.name
//     )}&price=${productData.offerPrice}&image=${encodeURIComponent(
//       productData.image[0]
//     )}`
//   );
// };



const handleBuyNow = async () => {
    if (isSignedIn) {
      // Logged-in user → Add to cart then redirect
      setIsBuying(true);
      for (let i = 0; i < quantity; i++) {
        await addToCart(productData._id);
      }
      router.push("/cart");
    } else {
      // Not logged in → Redirect to buynow page with query params
      router.push(
    `/buynow?productId=${productData._id}&name=${encodeURIComponent(
      productData.name
    )}&price=${productData.offerPrice}&image=${encodeURIComponent(
      productData.image[0]
    )}`
  );
    }
  };
    const handleThumbnailClick = (image, index) => {
        setMainImage(image);
        setCurrentImageIndex(index);
    };

    const handlePrevImage = () => {
        const prevIndex = currentImageIndex === 0 ? productData.image.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        setMainImage(productData.image[prevIndex]);
    };

    const handleNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % productData.image.length;
        setCurrentImageIndex(nextIndex);
        setMainImage(productData.image[nextIndex]);
    };

    return productData ? (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
            
            

            <div className="max-w-[90rem] mx-auto px-4 py-8">
                <div className="bg-yellow-200/40 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-yellow-300/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        
                        {/* Left Column - Product Images */}
                        <div className="p-10 bg-yellow-200/30 backdrop-blur-sm">
                            {/* Main Image */}
                            <div className="relative group mb-6">
                                <div className="bg-yellow-200/50 backdrop-blur-sm rounded-2xl p-8 relative border border-yellow-300/40">
                                    <div className="aspect-square relative">
                                        <Image
                                            src={mainImage || productData.image[0]}
                                            alt="Product Image"
                                            className="w-full h-full object-contain"
                                            width={500}
                                            height={500}
                                        />
                                        
                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-200/50 backdrop-blur-sm hover:bg-yellow-200/70 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-yellow-300/40"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-200/50 backdrop-blur-sm hover:bg-yellow-200/70 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-yellow-300/40"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {productData.image.length}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3 justify-center">
                                {productData.image.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleThumbnailClick(image, index)}
                                        className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ${
                                            currentImageIndex === index
                                                ? 'ring-3 ring-orange-400 shadow-lg' 
                                                : 'hover:ring-2 hover:ring-yellow-400'
                                        }`}
                                    >
                                        <div className="bg-yellow-200/50 backdrop-blur-sm p-3 border border-yellow-300/40">
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt={`Product view ${index + 1}`}
                                                className="w-16 h-16 object-contain"
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Product Details */}
                        <div className="p-10">
                            
                            {/* Product Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {productData.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i}
                                            className={`h-5 w-5 ${i < 4 ? 'text-orange-400 fill-current' : 'text-yellow-300/40'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-700">(4.5)</span>
                                <span className="text-sm text-gray-600">2,847 reviews</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-800 mb-6 leading-relaxed">
                                {productData.description}. Premium quality ingredients for maximum effectiveness, fast-acting formula for quick results, and safe for daily use.
                            </p>

                            {/* Price */}
                            <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-yellow-300/50">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-gray-900">${productData.offerPrice}</span>
                                    <span className="text-xl text-gray-600 line-through">${productData.price}</span>
                                </div>
                                <span className="text-sm text-orange-700 font-medium">
                                    Limited offer - Save ${(productData.price - productData.offerPrice).toFixed(0)} ({Math.round(((productData.price - productData.offerPrice) / productData.price) * 100)}%)
                                </span>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-200/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-300/50">
                                        <Zap className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">Energy Boost</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-200/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-300/50">
                                        <Award className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">Premium Quality</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-200/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-300/50">
                                        <Truck className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">Fast Delivery</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-yellow-200/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-300/50">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">100% Safe</div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between py-2 border-b border-yellow-300/30">
                                    <span className="text-gray-700">Brand</span>
                                    <span className="font-medium text-gray-900">Generic</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-yellow-300/30">
                                    <span className="text-gray-700">Color</span>
                                    <span className="font-medium text-gray-900">Multi</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-yellow-300/30">
                                    <span className="text-gray-700">Category</span>
                                    <span className="font-medium text-gray-900">{productData.category}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-yellow-300/30">
                                    <span className="text-gray-700">Weight</span>
                                    <span className="font-medium text-gray-900">250g</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-yellow-300/30">
                                    <span className="text-gray-700">Shipping</span>
                                    <span className="font-medium text-green-600">Free Worldwide</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-700">Stock Status</span>
                                    <span className="font-medium text-green-600 flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" />
                                        In Stock
                                    </span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                    Quantity:
                                </label>
                                <select 
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-24 px-3 py-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-300/50 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-6">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </button>

                                <button 
                                    onClick={handleBuyNow}
                                    disabled={isBuying}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Zap className="w-5 h-5" />
                                    {isBuying ? 'Processing...' : 'Buy Now'}
                                </button>
                            </div>

                            {/* Additional Options */}
                            <div className="flex justify-center gap-6 text-sm">
                                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                    <Heart className="w-4 h-4" />
                                    Add to Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information Sections */}
                <div className="mt-8 space-y-6">
                    
                    {/* Delivery Information */}
                    <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-yellow-300/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Truck className="w-6 h-6 text-blue-500" />
                            Delivery Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-yellow-200/30 backdrop-blur-sm rounded-xl border border-yellow-300/40">
                                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Fast Delivery</div>
                                <div className="text-sm text-gray-700">2-3 business days</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-200/30 backdrop-blur-sm rounded-xl border border-yellow-300/40">
                                <Package className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Free Shipping</div>
                                <div className="text-sm text-gray-700">On orders over $25</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-200/30 backdrop-blur-sm rounded-xl border border-yellow-300/40">
                                <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Worldwide</div>
                                <div className="text-sm text-gray-700">Global delivery available</div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-yellow-300/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4">
                                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Secure Payment</div>
                                <div className="text-xs text-gray-700">SSL Protected</div>
                            </div>
                            <div className="text-center p-4">
                                <RotateCcw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Easy Returns</div>
                                <div className="text-xs text-gray-700">30-day policy</div>
                            </div>
                            <div className="text-center p-4">
                                <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Safe Payment</div>
                                <div className="text-xs text-gray-700">Multiple options</div>
                            </div>
                            <div className="text-center p-4">
                                <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                <div className="font-medium text-gray-900">Quality Assured</div>
                                <div className="text-xs text-gray-700">Premium grade</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-12">
                    <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-yellow-300/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            You Might Also Like
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {products.slice(0, 5).map((product, index) => (
                                <div key={index} className="bg-yellow-200/30 backdrop-blur-sm border border-yellow-300/40 rounded-xl p-3 hover:bg-yellow-200/40 transition-all duration-200">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    ) : <Loading />;
};

export default Product;
