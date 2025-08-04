import connectDB from "../../../../../config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "../../../../../models/User"; // 

 export async function GET(request) {


    try {
        const { userId } = getAuth(request)
        await connectDB()
        const user = await User.findById(userId)
        if(!user) {
            return NextResponse.json({success : false , message : "User Not Found"})

        }
    
        return NextResponse.json({success : true , user})

    } catch (error) {

        return NextResponse.json({success : false , message : error.message})
        
    }
    
 }

// import connectDB from "../../../../../config/db";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import User from "../../../../../models/User"; // ✅ This is your Mongoose model

// export async function GET(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const user = await User.findOne({userId}); // ✅ Assuming your user has `clerkId`

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User Not Found" });
//     }

//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
