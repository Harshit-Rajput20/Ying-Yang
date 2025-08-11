// /app/api/sellerorder/route.ts
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import BuyNowOrder from "../../../../models/BuyNowOrder";
import Order from "../../../../models/Order";

const LoadDB = async () => {
  await connectDB();
};

export async function GET() {
  try {
    await LoadDB();

    const directOrders = await BuyNowOrder.find({}).lean();
    const userOrders = await Order.find({})
      .populate("items.product")
      .lean();

    const allOrders = [...directOrders, ...userOrders];
    allOrders.sort((a, b) => {
      const dateA = "date" in a ? (typeof a.date === "number" ? a.date : new Date(a.date).getTime()) : 0;
      const dateB = "date" in b ? (typeof b.date === "number" ? b.date : new Date(b.date).getTime()) : 0;
      return dateB - dateA;
    });

    return NextResponse.json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await LoadDB();
    const { id, type } = await request.json(); // type = "direct" or "user"

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "Missing id or type" }, { status: 400 });
    }

    if (type === "direct") {
      await BuyNowOrder.findByIdAndDelete(id);
    } else if (type === "user") {
      await Order.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ success: false, message: "Failed to delete order" }, { status: 500 });
  }
}
