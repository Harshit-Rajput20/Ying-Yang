"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react"
// import { Header } from "@/components/header"

// Interface for items within the 'Order' schema
interface OrderItemFromOrderSchema {
  product:
    | {
        _id: string
        name: string
        price: number
        imageUrl?: string
      }
    | string // Can be populated object or just ID
  quantity: number
}

// Interface for the 'Order' schema (logged-in user orders)
interface UserOrder {
  _id: string
  userId:
    | {
        _id: string
        name: string
        email: string
        imageUrl?: string
      }
    | string // Can be populated object or just ID
  items: OrderItemFromOrderSchema[]
  amount: number
  address: string // Assuming this is an ID or string
  status: string
  date: number // Stored as a number (timestamp)
}

// Interface for items within the 'BuyNowOrder' schema
interface OrderItemFromBuyNowSchema {
  productId: string
  name: string
  quantity: number
  price: number
}

// Interface for the 'BuyNowOrder' schema (direct purchases)
interface DirectOrder {
  _id: string
  name: string // Customer name
  email: string
  phoneNumber: string
  shippingAddress: string
  product: OrderItemFromBuyNowSchema[] // Note: 'product' is an array of objects here
  totalAmount: number
  status: string
  date: string // Stored as a string (Date object)
  notes?: string
}

// Combined type for all orders
type CombinedOrder = UserOrder | DirectOrder

export default function OrdersPage() {
  const [orders, setOrders] = useState<CombinedOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(`/api/sellerorder`)
        const data = await response.json()

        if (data.success) {
          setOrders(data.orders)
          if (data.orders.length === 0) {
            setError("No orders found in the database.")
          }
        } else {
          setError(data.message || "Failed to fetch data")
          setOrders([])
        }
      } catch (err) {
        console.log(err)
        setError("Failed to fetch data. Please try again.")
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllOrders()
  }, []) // Empty dependency array means this runs once on mount

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateInput: string | number) => {
    let date
    if (typeof dateInput === "number") {
      // If it's a number, assume it's a Unix timestamp (seconds or milliseconds)
      // Convert to milliseconds if it's in seconds (e.g., if it's less than 13 digits)
      date = new Date(dateInput < 1000000000000 ? dateInput * 1000 : dateInput)
    } else {
      date = new Date(dateInput)
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }



  const handleDelete = async (id: string, type: "direct" | "user") => {
  if (!confirm("Are you sure you want to delete this order?")) return;

  try {
    const res = await fetch("/api/sellerorder", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });

    const data = await res.json();
    if (data.success) {
      setOrders((prev) => prev.filter((o) => o._id !== id));
      alert("Order deleted successfully!");
    } else {
      alert(data.message || "Failed to delete order");
    }
  } catch (error) {

    alert("Error deleting order");
    console.log(error)
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-yellow-200/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-yellow-300/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Package className="w-10 h-10 text-orange-500" />
              All Orders
            </h1>
            <p className="text-gray-700 text-lg">Displaying all orders from the database.</p>
          </div>
        </div>

        {/* Orders Display */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-300/50">
              <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg">Loading all orders...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 rounded-xl text-red-700 text-center p-4">{error}</div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-yellow-200/40 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-300/50 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-yellow-200/30 backdrop-blur-sm p-6 border-b border-yellow-300/40">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Order #{order._id.slice(-8).toUpperCase()} {/* Differentiate order types */}
                        {"email" in order ? (
                          <span className="text-sm text-gray-600">(Direct Purchase)</span>
                        ) : (
                          <span className="text-sm text-gray-600">(User Account Order)</span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {"product" in order ? order.product.length : order.items.length} item
                          {("product" in order ? order.product.length : order.items.length) !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="font-medium">{order.status}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{"totalAmount" in order ? order.totalAmount : order.amount}
                        </div>
                        <div className="text-sm text-gray-600">Total Amount</div>
                      </div>

                      {/* 🗑 Delete button */}
  <button
    onClick={() =>
      handleDelete(order._id, "email" in order ? "direct" : "user")
    }
    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
  >
    Delete
  </button>
                    </div>
                  </div>
                </div>
                {/* Order Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Customer/Shipping Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">
                            {"name" in order
                              ? order.name
                              : typeof order.userId === "object"
                                ? order.userId.name
                                : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">
                            {"email" in order
                              ? order.email
                              : typeof order.userId === "object"
                                ? order.userId.email
                                : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">{"phoneNumber" in order ? order.phoneNumber : "N/A"}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                          <span className="text-gray-700">
                            {"shippingAddress" in order ? order.shippingAddress : order.address || "N/A"}
                          </span>
                        </div>
                        {"notes" in order && order.notes && (
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                            <span className="text-gray-700">{order.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Order Items */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {"product" in order // Check if it's a DirectOrder
                          ? order.product.map((item, index) => (
                              <div
                                key={index}
                                className="bg-yellow-200/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-300/40"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-semibold text-gray-900">{item.name}</h5>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900">₹{item.price}</div>
                                    <div className="text-sm text-gray-600">per item</div>
                                  </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-yellow-300/30">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Subtotal:</span>
                                    <span className="font-semibold text-gray-900">₹{item.quantity * item.price}</span>
                                  </div>
                                </div>
                              </div>
                            )) // Otherwise, it's a UserOrder
                          : order.items.map((item, index) => (
                              <div
                                key={index}
                                className="bg-yellow-200/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-300/40"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-semibold text-gray-900">
                                      {typeof item.product === "object" && item.product !== null
                                        ? item.product.name
                                        : `Product ID: ${item.product}`}
                                    </h5>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900">
                                      ₹
                                      {typeof item.product === "object" && item.product !== null
                                        ? item.product.price
                                        : "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-600">per item</div>
                                  </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-yellow-300/30">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Subtotal:</span>
                                    <span className="font-semibold text-gray-900">
                                      ₹
                                      {typeof item.product === "object" && item.product !== null
                                        ? item.quantity * item.product.price
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-300/50">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Orders Found</h3>
              <p className="text-gray-500 mb-6">There are currently no orders in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
