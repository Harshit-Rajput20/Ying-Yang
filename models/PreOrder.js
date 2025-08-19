import mongoose from "mongoose";

const preOrderSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Clerk user ID
    preOrderValue: { type: Boolean, default: false }
}, { timestamps: true });

const PreOrder = mongoose.models.preorder || mongoose.model("preorder", preOrderSchema);

export default PreOrder;
