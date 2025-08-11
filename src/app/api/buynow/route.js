import connectDB from "../../../../config/db";
import BuyNowOrder from "../../../../models/BuyNowOrder";
 

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
     console.log("Incoming order:", body);
    const newOrder = await BuyNowOrder.create(body);
    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (err) {
    console.error("Order creation failed:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
