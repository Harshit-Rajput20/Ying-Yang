// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { ShoppingCart, Minus, Plus, ChevronRight, ArrowLeft } from 'lucide-react';

// export default function BuyNowPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const productId = searchParams.get("productId");
//   const nameFromQuery = searchParams.get("name");
//   const priceFromQuery = searchParams.get("price");
//   const imageFromQuery = searchParams.get("image");
//    const [guestCart, setGuestCart] = useState([]);

//   const [product, setProduct] = useState<any>(
//     nameFromQuery && priceFromQuery && imageFromQuery
//       ? {
//           _id: productId,
//           name: decodeURIComponent(nameFromQuery),
//           offerPrice: Number(priceFromQuery),
//           image: [decodeURIComponent(imageFromQuery)],
//         }
//       : null
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     shippingAddress: "",
//     quantity: 1,
//     notes: "",
//     promoCode: "",
//   });

//   const [loading, setLoading] = useState(!product);

//     useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
//     setGuestCart(storedCart);
//   }, []);

//   useEffect(() => {
//     if (!product && productId) {
//       setLoading(true);
//       axios
//         .get(`/api/products/${productId}`)
//         .then((res) => setProduct(res.data))
//         .finally(() => setLoading(false));
//     }
//   }, [productId, product]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleQuantityChange = (increment: boolean) => {
//     const newQuantity = increment ? formData.quantity + 1 : Math.max(1, formData.quantity - 1);
//     setFormData({ ...formData, quantity: newQuantity });
//   };

//   const handleOrderSubmit = async () => {
//     try {
//       const orderData = {
//         ...formData,
//         product: {
//           productId: product._id,
//           name: product.name,
//           quantity: Number(formData.quantity),
//           price: product.offerPrice,
//         },
//         totalAmount: Number(formData.quantity) * product.offerPrice,
//       };
//       await axios.post("/api/buynow", orderData);
//       alert("Order placed successfully!");
//       router.push("/order-confirmation");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-gray-800">Loading...</div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
//         <div className="text-2xl font-semibold text-gray-800">Product not found</div>
//       </div>
//     );
//   }

//   const subtotal = formData.quantity * product.offerPrice;
//   const tax = Math.round(subtotal * 0.02); // 2% tax
//   const total = subtotal + tax;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <ShoppingCart className="w-8 h-8 text-gray-700" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
//                 <p className="text-gray-600">Review your selected items</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-gray-800">1</div>
//               <div className="text-sm text-blue-600">Items</div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Product Details Section */}
          
//           <div className="lg:col-span-2">
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
//               {/* Table Header */}
//               <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-6">
//                 <div className="col-span-5 font-semibold text-gray-700">Product Details</div>
//                 <div className="col-span-2 font-semibold text-gray-700 text-center">Price</div>
//                 <div className="col-span-3 font-semibold text-gray-700 text-center">Quantity</div>
//                 <div className="col-span-2 font-semibold text-gray-700 text-center">Subtotal</div>
//               </div>

//               {/* Product Row */}
//               <div className="grid grid-cols-12 gap-4 items-center">
//                 <div className="col-span-5 flex items-center gap-4">
//                   <img
//                     src={product.image[0] || "/placeholder.svg"}
//                     alt={product.name}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{product.name}</h3>
//                     <button className="text-red-500 text-sm hover:underline">🗑 Remove</button>
//                   </div>
//                 </div>
//                 <div className="col-span-2 text-center font-semibold">₹{product.offerPrice}</div>
//                 <div className="col-span-3 flex items-center justify-center gap-2">
//                   <button
//                     onClick={() => handleQuantityChange(false)}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="w-12 text-center font-semibold">{formData.quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange(true)}
//                     className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="col-span-2 text-center font-semibold">₹{subtotal.toFixed(2)}</div>
//               </div>

//               {/* Continue Shopping */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium">
//                   <ArrowLeft className="w-4 h-4" />
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
//               <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

//               {/* Address Selection */}
//               <div>
//                 <h3 className="font-semibold text-gray-700 mb-3">SELECT ADDRESS</h3>
//                 <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-600">
//                       <div className="font-medium text-gray-800">{formData.name || "Your Name"}</div>
//                       <div>{formData.shippingAddress || "Your shipping address"}</div>
//                     </div>
//                     <ChevronRight className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               {/* Customer Details Form */}
//               <div className="space-y-3">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <textarea
//                   name="shippingAddress"
//                   placeholder="Shipping Address"
//                   value={formData.shippingAddress}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Promo Code */}
//               <div>
//                 <h3 className="font-semibold text-gray-700 mb-3">PROMO CODE</h3>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     name="promoCode"
//                     placeholder="Enter promo code"
//                     value={formData.promoCode}
//                     onChange={handleChange}
//                     className="flex-1 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
//                     Apply
//                   </button>
//                 </div>
//               </div>

//               {/* Order Totals */}
//               <div className="space-y-3 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">ITEMS 1</span>
//                   <span className="font-semibold">₹{subtotal}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping Fee</span>
//                   <span className="font-semibold text-green-600">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax (2%)</span>
//                   <span className="font-semibold">₹{tax}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </div>
//               </div>

//               {/* Place Order Button */}
//               <button
//                 onClick={handleOrderSubmit}
//                 className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg"
//               >
//                 Place Order
//               </button>

//               {/* Order Notes */}
//               <textarea
//                 name="notes"
//                 placeholder="Order Notes (Optional)"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image" // Import Next.js Image component
import { ShoppingCart, Minus, Plus, ChevronRight, ArrowLeft, Trash2 } from "lucide-react"

// Define interfaces for better type safety
interface Product {
  _id: string
  name: string
  offerPrice: number
  image: string[]
}

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function BuyNowPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("productId")
  const nameFromQuery = searchParams.get("name")
  const priceFromQuery = searchParams.get("price")
  const imageFromQuery = searchParams.get("image")

  const [guestCart, setGuestCart] = useState<CartItem[]>([])
  const [product, setProduct] = useState<Product | null>(
    nameFromQuery && priceFromQuery && imageFromQuery
      ? {
          _id: productId || "", // Ensure _id is a string
          name: decodeURIComponent(nameFromQuery),
          offerPrice: Number(priceFromQuery),
          image: [decodeURIComponent(imageFromQuery)],
        }
      : null,
  )
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    shippingAddress: "",
    quantity: 1,
    notes: "",
    promoCode: "",
  })
  const [loading, setLoading] = useState(!product && !!productId) // Only load if product is null and productId exists
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
    setGuestCart(storedCart)
  }, [])

  useEffect(() => {
    if (!product && productId) {
      setLoading(true)
      axios
        .get(`/api/products/${productId}`)
        .then((res) => setProduct(res.data))
        .finally(() => setLoading(false))
    }
  }, [productId, product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment ? formData.quantity + 1 : Math.max(1, formData.quantity - 1)
    setFormData({ ...formData, quantity: newQuantity })
  }

  const handleGuestCartQuantityChange = (index: number, increment: boolean) => {
    const updatedCart = [...guestCart]
    const newQuantity = increment ? updatedCart[index].quantity + 1 : Math.max(1, updatedCart[index].quantity - 1)

    updatedCart[index].quantity = newQuantity
    setGuestCart(updatedCart)
    localStorage.setItem("guestCart", JSON.stringify(updatedCart))
  }

  const removeFromGuestCart = (index: number) => {
    const updatedCart = guestCart.filter((_, i) => i !== index)
    setGuestCart(updatedCart)
    localStorage.setItem("guestCart", JSON.stringify(updatedCart))
  }

  const calculateTotals = () => {
    let subtotal = 0

    // Add single product if exists
    if (product) {
      subtotal += formData.quantity * product.offerPrice
    }

    // Add guest cart products
    guestCart.forEach((item) => {
      subtotal += item.quantity * item.price
    })

    const tax = Math.round(subtotal * 0.02) // 2% tax
    const total = subtotal + tax

    return { subtotal, tax, total }
  }

  const getTotalItems = () => {
    let totalItems = product ? formData.quantity : 0
    totalItems += guestCart.reduce((sum, item) => sum + item.quantity, 0)
    return totalItems
  }

  const handleOrderSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.shippingAddress) {
      alert("Please fill in all required fields")
      return
    }
    const currentTotalItems = getTotalItems()
    if (currentTotalItems === 0) {
      alert("No items in cart")
      return
    }
    setIsSubmitting(true)

    // Create products array combining both single product and guest cart
    const products = []

    // Add single product if exists
    if (product) {
      products.push({
        productId: product._id,
        name: product.name,
        quantity: formData.quantity,
        price: product.offerPrice,
      })
    }

    // Add guest cart products (fix the productId issue)
    guestCart.forEach((item) => {
      products.push({
        productId: item.productId, // Use productId instead of _id
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })
    })

    const { total } = calculateTotals() // Recalculate total just before submission

    const orderDetails = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      shippingAddress: formData.shippingAddress,
      totalAmount: total,
      status: "Order Placed",
      notes: formData.notes || "",
      product: products, // Use the combined products array
      date: new Date(),
    }
    console.log("Order Details:", orderDetails)

    try {
      const res = await fetch("/api/buynow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Order failed")
      }

      const data = await res.json()
      console.log("Order successful:", data)

      // Clear guest cart after successful order
      localStorage.removeItem("guestCart")

      // Show success message
      alert("🎉 Order placed successfully! Thank you for your purchase.")

      // Redirect to home page or products page instead of order-confirmation
      router.push("/")
    } catch (error) {
      console.error("Error placing order:", error)
      alert("❌ Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-800">Loading...</div>
      </div>
    )
  }

  const { subtotal, tax, total } = calculateTotals()
  const totalItems = getTotalItems()

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-gray-700" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
                <p className="text-gray-600">Review your selected items</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
              <div className="text-sm text-blue-600">Items</div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-6">
                <div className="col-span-5 font-semibold text-gray-700">Product Details</div>
                <div className="col-span-2 font-semibold text-gray-700 text-center">Price</div>
                <div className="col-span-3 font-semibold text-gray-700 text-center">Quantity</div>
                <div className="col-span-2 font-semibold text-gray-700 text-center">Subtotal</div>
              </div>
              {/* Single Product Row (if exists) */}
              {product && (
                <div className="grid grid-cols-12 gap-4 items-center mb-6 pb-6 border-b border-gray-100">
                  <div className="col-span-5 flex items-center gap-4">
                    <Image
                      src={product.image[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={64} // Added width
                      height={64} // Added height
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <span className="text-blue-600 text-sm">Direct Purchase</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-semibold">₹{product.offerPrice}</div>
                  <div className="col-span-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(false)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{formData.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(true)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="col-span-2 text-center font-semibold">
                    ₹{(formData.quantity * product.offerPrice).toFixed(2)}
                  </div>
                </div>
              )}
              {/* Guest Cart Products */}
              {guestCart.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Cart Items ({guestCart.length})</h3>
                  {guestCart.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="col-span-5 flex items-center gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64} // Added width
                          height={64} // Added height
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <button
                            onClick={() => removeFromGuestCart(index)}
                            className="text-red-500 text-sm hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center font-semibold">₹{item.price}</div>
                      <div className="col-span-3 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleGuestCartQuantityChange(index, false)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleGuestCartQuantityChange(index, true)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="col-span-2 text-center font-semibold">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Empty State */}
              {!product && guestCart.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No products added</h3>
                  <p className="text-gray-500">Add some products to get started!</p>
                </div>
              )}
              {/* Continue Shopping */}
              {(product || guestCart.length > 0) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => router.push("/all-products")}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              {/* Address Selection */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">SELECT ADDRESS</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium text-gray-800">{formData.name || "Your Name"}</div>
                      <div>{formData.shippingAddress || "Your shipping address"}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              {/* Customer Details Form */}
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <textarea
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              {/* Promo Code */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">PROMO CODE</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="promoCode"
                    placeholder="Enter promo code"
                    value={formData.promoCode}
                    onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Apply
                  </button>
                </div>
              </div>
              {/* Order Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">ITEMS {totalItems}</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (2%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              {/* Place Order Button */}
              <button
                onClick={handleOrderSubmit}
                disabled={
                  totalItems === 0 ||
                  !formData.name ||
                  !formData.email ||
                  !formData.phoneNumber ||
                  !formData.shippingAddress ||
                  isSubmitting
                }
                className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing Order..." : "Place Order"}
              </button>
              {/* Order Notes */}
              <textarea
                name="notes"
                placeholder="Order Notes (Optional)"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
