"use client";
import { useState } from "react";
import { Search, Package, Calendar, MapPin, Phone, Mail, User, FileText, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

// Interface for items within the 'Order' schema
interface OrderItemFromOrderSchema {
  product: string; // This will be the product ID
  quantity: number;
}

// Interface for the 'Order' schema (logged-in user orders)
interface UserOrder {
  _id: string;
  userId: string;
  items: OrderItemFromOrderSchema[];
  amount: number;
  address: string; // Assuming this is an ID or string
  status: string;
  date: number; // Stored as a number (timestamp)
}

// Interface for items within the 'BuyNowOrder' schema
interface OrderItemFromBuyNowSchema {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

// Interface for the 'BuyNowOrder' schema (direct purchases)
interface DirectOrder {
  _id: string;
  name: string; // Customer name
  email: string;
  phoneNumber: string;
  shippingAddress: string;
  product: OrderItemFromBuyNowSchema[]; // Note: 'product' is an array of objects here
  totalAmount: number;
  status: string;
  date: string; // Stored as a string (Date object)
  notes: string;
}

// Combined type for all orders
type CombinedOrder = UserOrder | DirectOrder;

interface UserData {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  cartItems: Record<string, any>;
}

export default function OrdersPage() {
  const [searchEmail, setSearchEmail] = useState("");
  const [orders, setOrders] = useState<CombinedOrder[]>([]); // Now holds combined orders
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setError("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(searchEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setOrders([]);
    setUserData(null);

    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(searchEmail)}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setUserData(data.user);
        if (data.orders.length === 0 && !data.user) {
          setError("No orders or user found for this email.");
        }
      } else {
        setError(data.message || "Failed to fetch data");
        setOrders([]);
        setUserData(null);
      }
    } catch (error) {
                console.log(error)
        setError("Failed to fetch data. Please try again.");
      setOrders([]);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateInput: string | number) => {
    let date;
    if (typeof dateInput === 'number') {
      // If it's a number, assume it's a Unix timestamp (seconds or milliseconds)
      // Convert to milliseconds if it's in seconds
      date = new Date(dateInput < 10000000000 ? dateInput * 1000 : dateInput);
    } else {
      date = new Date(dateInput);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-yellow-200/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-yellow-300/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Package className="w-10 h-10 text-orange-500" />
              Track Your Orders
            </h1>
            <p className="text-gray-700 text-lg">Enter your email address to view your order history</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-yellow-300/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search Orders'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Orders Display */}
        {searched && (
          <div className="space-y-6">
            {loading ? (
              <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-300/50">
                <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-700 text-lg">Searching for your orders...</p>
              </div>
            ) : (orders.length > 0 || userData) ? (
              <>
                <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-6 border border-yellow-300/50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Results for {searchEmail}
                  </h2>
                  <p className="text-gray-700">
                    {orders.length > 0 ? `Found ${orders.length} order${orders.length !== 1 ? 's' : ''}.` : "No orders found for this email."}
                    {userData && " User profile found."}
                  </p>
                </div>

                {/* Display User Data if available */}
                {userData && (
                  <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-300/50 overflow-hidden p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-6 h-6 text-blue-500" />
                      User Profile
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={userData.imageUrl || "/placeholder.svg?height=80&width=80&query=user profile"}
                        alt={userData.name || "User Profile"}
                        className="w-20 h-20 rounded-full object-cover border-2 border-orange-400"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{userData.name}</p>
                        <p className="text-gray-700">{userData.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Display Orders if available */}
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order._id} className="bg-yellow-200/40 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-300/50 overflow-hidden">
                      {/* Order Header */}
                      <div className="bg-yellow-200/30 backdrop-blur-sm p-6 border-b border-yellow-300/40">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              Order #{order._id.slice(-8).toUpperCase()}
                              {' '}{' '}
                              {/* Differentiate order types */}
                              {'email' in order ? (
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
                                {'product' in order ? order.product.length : order.items.length} item
                                {('product' in order ? order.product.length : order.items.length) !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="font-medium">{order.status}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ₹{'totalAmount' in order ? order.totalAmount : order.amount}
                              </div>
                              <div className="text-sm text-gray-600">Total Amount</div>
                            </div>
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
                                <span className="text-gray-700">{'name' in order ? order.name : userData?.name || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-700">{'email' in order ? order.email : userData?.email || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-700">{'phoneNumber' in order ? order.phoneNumber : 'N/A'}</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                                <span className="text-gray-700">{'shippingAddress' in order ? order.shippingAddress : order.address || 'N/A'}</span>
                              </div>
                              {'notes' in order && order.notes && (
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
                              {'product' in order ? ( // Check if it's a BuyNowOrder
                                order.product.map((item, index) => (
                                  <div key={index} className="bg-yellow-200/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-300/40">
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
                                ))
                              ) : ( // Otherwise, it's a UserOrder
                                order.items.map((item, index) => (
                                  <div key={index} className="bg-yellow-200/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-300/40">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        {/* If 'product' was populated, item.product would be an object */}
                                        <h5 className="font-semibold text-gray-900">
                                          {typeof item.product === 'object' && item.product !== null ? item.product.name : `Product ID: ${item.product}`}
                                        </h5>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                      </div>
                                      <div className="text-right">
                                        {/* You might need to fetch product price if not populated */}
                                        <div className="font-semibold text-gray-900">₹{/* Add price if available */}</div>
                                        <div className="text-sm text-gray-600">per item</div>
                                      </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-yellow-300/30">
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Subtotal:</span>
                                        <span className="font-semibold text-gray-900">₹{/* Add subtotal if price available */}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
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
                    <p className="text-gray-500 mb-6">
                    {"We couldn't find any orders associated with "}<strong>{searchEmail}</strong>.

                    </p>
                    <p className="text-sm text-gray-500">
                      If you believe this is an error, please double-check the email or contact support.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-300/50">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Orders or User Found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any orders or user profile associated with <strong>{searchEmail}</strong>.
                </p>
                <p className="text-sm text-gray-500">
                  Please ensure the email address is correct.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="bg-yellow-200/40 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-300/50">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Ready to Track Your Orders?</h3>
            <p className="text-gray-500 mb-6">
              Enter your email address above to view all your order history and track your purchases.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Order Status</div>
                <div className="text-sm text-gray-600">Track your order progress</div>
              </div>
              <div className="text-center p-4">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Order History</div>
                <div className="text-sm text-gray-600">View all past orders</div>
              </div>
              <div className="text-center p-4">
                <Package className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Order Details</div>
                <div className="text-sm text-gray-600">See complete order info</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
