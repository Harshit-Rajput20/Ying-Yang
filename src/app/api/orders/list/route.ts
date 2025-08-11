import { NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import BuyNowOrder from "../../../../../models/BuyNowOrder";

 
import Order from "../../../../../models/Order"; // Import the Order model
import User from "../../../../../models/User"; // Import the User model (needed for populating user orders)
// Assuming you have a Product model if 'Order' items are populated
import Product from "../../../../../models/Product"; // Assuming you have a Product model

const LoadDB = async () => {
  await connectDB();
};

export async function GET() {
  try {
    await LoadDB();

    // Fetch all orders from the 'BuyNowOrder' collection
    const directOrders = await BuyNowOrder.find({}).lean();

    // Fetch all orders from the 'Order' collection and populate related data
    const userOrders = await Order.find({})
      .populate({
        path: 'userId',
        model: User, // Specify the User model for population
        select: 'name email imageUrl' // Select specific fields from the User
      })
      .populate({
        path: 'items.product',
        model: Product, // Specify the Product model for population
        select: 'name price imageUrl' // Select specific fields from the Product
      })
      .lean();

    // Combine all orders
    const allOrders = [...directOrders, ...userOrders];

    // Sort all orders by date (newest first)
    allOrders.sort((a, b) => {
      const dateA = 'date' in a ? (typeof a.date === 'number' ? a.date : new Date(a.date).getTime()) : 0;
      const dateB = 'date' in b ? (typeof b.date === 'number' ? b.date : new Date(b.date).getTime()) : 0;
      return dateB - dateA;
    });

    return NextResponse.json({
      success: true,
      orders: allOrders,
    });

  } catch (error) {
    console.error("Error fetching all orders:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch data"
    }, { status: 500 });
  }
}
