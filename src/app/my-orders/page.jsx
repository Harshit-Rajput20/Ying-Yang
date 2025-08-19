'use client';

import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import { Package, MapPin, Calendar, CreditCard, Clock, CheckCircle, Truck, User, Phone } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";



const MyOrders = () => {
   const { currency, getToken, user, addToCart, router } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isSignedIn } = useAuth();

    const fetchOrders = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setOrders(data.orders.reverse())
                setLoading(false)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

     const handleReorder = async (order) => {
        const quantity = 1;
        const firstItem = order.items[0]?.product;

        if (!firstItem) return;

        if (isSignedIn) {
            // Logged-in → Add first product to cart
            for (let i = 0; i < quantity; i++) {
                await addToCart(firstItem._id);
            }
            router.push("/cart");
        } else {
            // Guest → Redirect to buynow page with params
            router.push(
                `/buynow?productId=${firstItem._id}&name=${encodeURIComponent(firstItem.name)}&price=${firstItem.offerPrice || firstItem.price}&image=${encodeURIComponent(firstItem.image[0])}`
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
            {/* <Navbar /> */}
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                
                {/* Page Header */}
                <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/50 shadow-lg mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-800">View and track your order history</p>
                </div>

                {/* Orders Container */}
                {loading ? (
                    <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-12 border border-yellow-300/50 shadow-lg text-center">
                        <Loading />
                    </div>
                ) : orders.length === 0 ? (
                    /* Empty State */
                    <div className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-12 border border-yellow-300/50 shadow-lg text-center">
                        <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-700">Start shopping to see your orders here!</p>
                    </div>
                ) : (
                    /* Individual Order Cards */
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <div 
                                key={index} 
                                className="bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/50 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-yellow-300/30">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            Order #{order._id?.slice(-8) || `81503${257 + index}`}
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            {new Date(order.date).toLocaleDateString('en-US', { 
                                                month: 'numeric', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">{currency}{order.amount}</p>
                                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                                    </div>
                                </div>

                                {/* Order Content Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    
                                    {/* Items Section */}
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Package className="w-5 h-5" />
                                            Items
                                        </h4>
                                        <div className="space-y-3">
                                            {order.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-yellow-200/50 rounded-lg flex items-center justify-center border border-yellow-300/40">
                                                        <Image
                                                            src={item.product?.image?.[0] || assets.box_icon}
                                                            alt="product"
                                                            className="w-8 h-8 object-cover rounded"
                                                            width={32}
                                                            height={32}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 text-sm">
                                                            {item.product?.name || 'Product'}
                                                        </p>
                                                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Delivery Address Section */}
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            Delivery Address
                                        </h4>
                                        <div className="text-sm text-gray-800 space-y-1">
                                            <p className="font-semibold">{order.address?.fullName || 'Customer Name'}</p>
                                            {order.address?.area && <p>{order.address.area}</p>}
                                            {order.address?.city && order.address?.state && (
                                                <p>{order.address.city}, {order.address.state}</p>
                                            )}
                                            {order.address?.phoneNumber && (
                                                <p className="flex items-center gap-1 mt-2">
                                                    <Phone className="w-3 h-3" />
                                                    {order.address.phoneNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Info Section */}
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            Order Info
                                        </h4>
                                        <div className="text-sm space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Payment:</span>
                                                <span className="font-semibold text-gray-900">COD</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Status:</span>
                                                <span className="px-3 py-1 bg-yellow-300/60 text-yellow-900 rounded-full text-xs font-semibold">
                                                    Pending
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Date:</span>
                                                <span className="font-semibold text-gray-900">
                                                    {new Date(order.date).toLocaleDateString('en-US', { 
                                                        month: 'numeric', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-yellow-300/30">
                                    <button className="px-6 py-2 bg-yellow-200/50 hover:bg-yellow-200/60 text-gray-800 rounded-xl text-sm font-semibold transition-all duration-200 border border-yellow-300/40">
                                        Track Order
                                    </button>
                                     <button
                                        onClick={() => handleReorder(order)}
                                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold"
                                    >
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Order Summary */}
                {orders.length > 0 && (
                    <div className="mt-8 bg-yellow-200/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/50 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Order Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4">
                                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                                <div className="text-sm text-gray-700 font-medium">Total Orders</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    {currency}{orders.reduce((total, order) => total + order.amount, 0)}
                                </div>
                                <div className="text-sm text-gray-700 font-medium">Total Spent</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                                <div className="text-sm text-gray-700 font-medium">Pending</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold text-gray-900">0</div>
                                <div className="text-sm text-gray-700 font-medium">Delivered</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

             <Footer />
        </div>
    );
};

export default MyOrders;
