import { NextResponse } from "next/server";
 
 

import connectDB from "../../../../config/db";
 
 
import PreOrder from "../../../../models/PreOrder";

export async function POST(req) {
    try {
        await connectDB();
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        // Save or update pre-order
        const preOrder = await PreOrder.findOneAndUpdate(
            { userId },
            { preOrderValue: true },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, message: "Pre-order saved", preOrder });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
