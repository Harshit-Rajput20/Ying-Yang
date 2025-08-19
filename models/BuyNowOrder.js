import mongoose from "mongoose";

const buyNowOrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shippingAddress: { type: String, required: true },

   product: [
  {
    productId: { type: String, required: true, ref: 'product' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
  } 
],

    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Order Placed' },
    date: { type: Date, default: Date.now },
    notes: { type: String }
});

const BuyNowOrder = mongoose.models.buynoworder || mongoose.model("buynoworder", buyNowOrderSchema);

export default BuyNowOrder;
