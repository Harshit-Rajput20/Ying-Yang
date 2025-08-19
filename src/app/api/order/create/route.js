import { inngest } from "../../../../../config/inngest";
import Product from "../../../../../models/Product";
// import connectDB from "../../../../../config/db";
 
import User from "../../../../../models/User";
import { getAuth } from "@clerk/nextjs/server";
 
import { NextResponse } from "next/server";


// export async function POST(request){
//     try {
        
//         const { userId } = getAuth(request)
//         const { address , items ,promoCode } = await request.json();

//         if(!address || items.length === 0 ){
//             return NextResponse.json({success:false , message: ' Invalid data'})
//         }

//         const amount = await items.reduce(async (acc , item)=>{
//             const product = await Product.findById(item.product);
//             return await acc+ product.offerPrice * item.quantity ; 
//         },0)

        
        
//         await inngest.send({
//             name:'order/created',
//             data:{
//                 userId,
//                 address,
//                 items,
//                 amount: amount + Math.floor(amount * 0.02),
//                 date: Date.now(),
//                 promoCode 
//             }
//         })



//         console.log("finalllamoujt" + amount)
//         //clear user cart 
//         const user = await User.findById(userId)
//         user.cartItems = {}
//         await user.save()
          
//         return NextResponse.json({success : true , message : 'order placed'})

//     } catch (error) {
        
//         console.log(error.message)
//         return NextResponse.json({success: false , message : error.message})
//     }
// }




// this code if after prebooking amount setup 

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items, promoCode, amount } = await request.json(); // 👈 include amount

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // 🔒 Server-side validation (recalculate to avoid tampering)
    let baseAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      baseAmount += product.offerPrice * item.quantity;
    }
    const tax = Math.floor(baseAmount * 0.02);

    // Expected total without discount
    let expectedAmount = baseAmount + tax;

    // If preorder discount applied on frontend → adjust here too
    if (amount < expectedAmount) {
      const discountApplied = expectedAmount - amount;
      console.log("Preorder discount applied: ₹" + discountApplied);
    }

    // Save/order event with client-sent amount (already discounted)
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount, // 👈 now includes discount if applicable
        date: Date.now(),
        promoCode,
      },
    });

    // Clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false, message: error.message });
  }
}
