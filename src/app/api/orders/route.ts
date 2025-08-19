import { NextRequest, NextResponse } from "next/server";

import connectDB from "../../../../config/db";

import BuyNowOrder from "../../../../models/BuyNowOrder";
import Order from "../../../../models/Order"; // Import the Order model
import User from "../../../../models/User"; // Import the User model

const LoadDB = async () => {
  await connectDB();
};

export async function GET(request: NextRequest) {
    
  try {
    await LoadDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: "Email is required" 
      }, { status: 400 });
    }
    
    // 1. Fetch user data by email to get userId
    const user = await User.findOne({ email: email }).lean();
    let userOrders = [];

    if (user) {
      // 2. If user found, fetch orders from the 'Order' collection using userId
      userOrders = await Order.find({ userId: user._id })
        .populate('items.product') // Assuming 'product' ref in Order schema points to a Product model
        .lean();
    }
    
    // 3. Fetch orders from the 'BuyNowOrder' collection directly by email
    const directOrders = await BuyNowOrder.find({ email: email })
      .lean();

    // Combine all orders
    const allOrders = [...directOrders, ...userOrders];

    // Sort all orders by date (newest first)
    allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      success: true,
      orders: allOrders, // Return combined and sorted orders
      user: user // Still include user data
    });
    
  } catch (error) {
    console.error("Error fetching orders and user data:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch data"
    }, { status: 500 });
  }
}
