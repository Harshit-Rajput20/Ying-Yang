import { NextResponse } from "next/server";
import connectDB from "../../../../../config/db";
import PreOrder from "../../../../../models/PreOrder";
import { getAuth } from "@clerk/nextjs/server"; // Clerk auth for userId

export async function GET(req) {
    try {
        await connectDB();
        const { userId } = getAuth(req)
        // console.log("useerrrrrr"+userId)

        if (!userId) {
            return NextResponse.json({ success: false, message: "Not signed in" }, { status: 401 });
        }

        const preOrder = await PreOrder.findOne({ userId });

        return NextResponse.json({
            success: true,
            preOrderValue: preOrder?.preOrderValue || false
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
