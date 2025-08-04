// 'use client'
// import { productsDummyData, userDummyData } from "@/assets/assets";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";

// export const AppContext = createContext();
// export const useAppContext = () => useContext(AppContext);

// export const AppContextProvider = ({ children }) => {
//     const currency = process.env.NEXT_PUBLIC_CURRENCY;
//     const router = useRouter();

//     const [products, setProducts] = useState([]);
//     const [userData, setUserData] = useState(false); // Default fallback
//     const [isSeller, setIsSeller] = useState(false);
//     const [cartItems, setCartItems] = useState({});

//     const { user } = useUser()

//     const fetchProductData = async () => {
//         setProducts(productsDummyData);
//     };

//     const fetchUserData = async () => {

//         try{

//             if(user.publicMetadata.role === 'seller'){
//             setIsSeller(true)
//         }
//         setUserData(userDummyData);

//         }catch(error){

//         }
//     };

//     const addToCart = async (itemId) => {
//         const cartData = structuredClone(cartItems);
//         cartData[itemId] = (cartData[itemId] || 0) + 1;
//         setCartItems(cartData);
//     };

//     const updateCartQuantity = async (itemId, quantity) => {
//         const cartData = structuredClone(cartItems);
//         if (quantity === 0) {
//             delete cartData[itemId];
//         } else {
//             cartData[itemId] = quantity;
//         }
//         setCartItems(cartData);
//     };

//     const getCartCount = () =>
//         Object.values(cartItems).reduce((sum, val) => sum + val, 0);

//     const getCartAmount = () => {
//         return Math.floor(
//             Object.entries(cartItems).reduce((total, [id, qty]) => {
//                 const item = products.find((p) => p._id === id);
//                 return item ? total + item.offerPrice * qty : total;
//             }, 0) * 100
//         ) / 100;
//     };

//     useEffect(() => {
//         if(user){

//             fetchProductData();
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const value = {
//         user,
//         currency,
//         router,
//         isSeller,
//         setIsSeller,
//         userData,
//         fetchUserData,
//         products,
//         fetchProductData,
//         cartItems,
//         setCartItems,
//         addToCart,
//         updateCartQuantity,
//         getCartCount,
//         getCartAmount,
//     };

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     );
// };


// "use client"
// import { productsDummyData, userDummyData } from "@/assets/assets"
// import { useUser } from "@clerk/nextjs"
// import { useRouter } from "next/navigation"
// import { createContext, useContext, useEffect, useState } from "react"

// export const AppContext = createContext()
// export const useAppContext = () => useContext(AppContext)

// export const AppContextProvider = ({ children }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY
//   const router = useRouter()
//   const [products, setProducts] = useState([])
//   const [userData, setUserData] = useState(null) // Changed default to null for clarity
//   const [isSeller, setIsSeller] = useState(false)
//   const [cartItems, setCartItems] = useState({})
//   const { user } = useUser()

//   const fetchProductData = async () => {
//     setProducts(productsDummyData)
//   }

//   const addToCart = async (itemId) => {
//     const cartData = structuredClone(cartItems)
//     cartData[itemId] = (cartData[itemId] || 0) + 1
//     setCartItems(cartData)
//   }

//   const updateCartQuantity = async (itemId, quantity) => {
//     const cartData = structuredClone(cartItems)
//     if (quantity === 0) {
//       delete cartData[itemId]
//     } else {
//       cartData[itemId] = quantity
//     }
//     setCartItems(cartData)
//   }

//   const getCartCount = () => Object.values(cartItems).reduce((sum, val) => sum + val, 0)

//   const getCartAmount = () => {
//     return (
//       Math.floor(
//         Object.entries(cartItems).reduce((total, [id, qty]) => {
//           const item = products.find((p) => p._id === id)
//           return item ? total + item.offerPrice * qty : total
//         }, 0) * 100,
//       ) / 100
//     )
//   }

//   useEffect(() => {
//     if (user) {
//       fetchProductData()
//       // Update isSeller and userData when the user object is available
//       setIsSeller(user.publicMetadata?.role === "seller")
//       setUserData(userDummyData) // Assuming userDummyData is a placeholder for actual user data
//     } else {
//       // Reset states if user logs out or is not logged in
//       setIsSeller(false)
//       setUserData(null)
//       setProducts([]) // Clear products if user logs out
//       setCartItems({}) // Clear cart if user logs out
//     }
//   }, [user]) // This useEffect now handles both product and user data fetching based on user changes

//   const value = {
//     user,
//     currency,
//     router,
//     isSeller,
//     setIsSeller,
//     userData,
//     // fetchUserData, // No longer needed as a separate function in context value
//     products,
//     fetchProductData,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateCartQuantity,
//     getCartCount,
//     getCartAmount,
//   }

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }


"use client"

import { userDummyData } from "@/assets/assets"
// import { useUser } from "@clerk/nextjs"
// import { getAuth } from "@clerk/nextjs/server";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
// import { err } from "inngest/types";

export const AppContext = createContext(null) // Initialize with null for better type inference

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [userData, setUserData] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const { user } = useUser()
const { getToken } = useAuth()

// console.log("appppppppp-------------" + getToken)

  const fetchProductData = async () => {
   
    try {
      const { data } = await axios.get('/api/product/list')
        
      if(data.success){
        setProducts(data.products)
      }else{
        console.log(data.message)
      }

    } catch (error) {

      console.log(error.message)
      
    }
    
  }

  const fetchUserData = async () => {
    try {
      if (user) {
        // Ensure user object is available before accessing its properties
        if (user.publicMetadata?.role === "seller") {
          setIsSeller(true)
        }  

        const token = await getToken()

        // console.log("ttttttttttttttttt"+token)

        // Make API call to your backend
        const { data } = await axios.get("/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // console.log("dataaaaaaaa"+data.user)

        if(data.success){
            setUserData(data.user)
            setCartItems(data.user.cartItems)
        }else{
            console.log("error in axio")
        }


        // In a real application, you would fetch actual user data based on user.id or similar
        setUserData(userDummyData) // Assuming userDummyData is a placeholder for actual user data
      } else {
        // Reset user-related states if user is not logged in
        setIsSeller(false)
        setUserData(null)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Handle error, e.g., set default states or show a message
      setIsSeller(false)
      setUserData(null)
    }
  }

  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems)
    cartData[itemId] = (cartData[itemId] || 0) + 1
    setCartItems(cartData);
   

    if(user){

      try{

        const token = await getToken()

        await axios.post('/api/cart/update',{cartData} , {headers: {Authorization:`Bearer ${token}`}})
           console.log("item added to cart")
         
      } catch (error) {

        console.log(error.message)
        
      }

    }
  }

  const updateCartQuantity = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems)
    if (quantity === 0) {
      delete cartData[itemId]
    } else {
      cartData[itemId] = quantity
    }
    setCartItems(cartData)

    
    if(user){

      try{

        const token = await getToken()

        await axios.post('/api/cart/update',{cartData} , {headers: {Authorization:`Bearer ${token}`}})
           console.log("cart updated")
         
      } catch (error) {

        console.log(error.message)
        
      }

    }
  }

  const getCartCount = () => Object.values(cartItems).reduce((sum, val) => sum + val, 0)

  const getCartAmount = () => {
    return (
      Math.floor(
        Object.entries(cartItems).reduce((total, [id, qty]) => {
          const item = products.find((p) => p._id === id)
          return item ? total + item.offerPrice * qty : total
        }, 0) * 100,
      ) / 100
    )
  }

  useEffect(() => {
    if (user) {
      fetchProductData()
      fetchUserData() // Call fetchUserData when the user object changes
    } else {
      // Reset states if user logs out or is not logged in
      setIsSeller(false)
      setUserData(null)
      setProducts([]) // Clear products if user logs out
      setCartItems({}) // Clear cart if user logs out
    }
  }, [user]) // This useEffect now handles both product and user data fetching based on user changes

  const value = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData, // Now included in the context value
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
     getToken, 
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}



// "use client";
// import { productsDummyData } from "@/assets/assets";
// import { getAuth } from "@clerk/nextjs/server";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";

// export const AppContext = createContext();
// export const useAppContext = () => useContext(AppContext);

// export const AppContextProvider = ({ children }) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY;
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const { user } = useUser();
//   const { getToken } = useAuth()

//   const fetchProductData = async () => {
//     setProducts(productsDummyData);
//   };

// const fetchUserData = async () => {
//   try {
//     const token = await getToken(); // 🔐 Get the user's token

//     const res = await fetch("/api/user/data", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error("Failed to fetch user data");

//     const data = await res.json();
//     console.log("✅ User data:", data);

//     setUserData(data);
//     setIsSeller(data?.user?.role === "seller");
//   } catch (err) {
//     console.error("❌ Error fetching user data:", err);
//     setUserData(null);
//     setIsSeller(false);
//   }
// };


//   const addToCart = (itemId) => {
//     const cartData = structuredClone(cartItems);
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);
//   };

//   const updateCartQuantity = (itemId, quantity) => {
//     const cartData = structuredClone(cartItems);
//     if (quantity === 0) {
//       delete cartData[itemId];
//     } else {
//       cartData[itemId] = quantity;
//     }
//     setCartItems(cartData);
//   };

//   const getCartCount = () => Object.values(cartItems).reduce((sum, val) => sum + val, 0);

//   const getCartAmount = () => {
//     return (
//       Math.floor(
//         Object.entries(cartItems).reduce((total, [id, qty]) => {
//           const item = products.find((p) => p._id === id);
//           return item ? total + item.offerPrice * qty : total;
//         }, 0) * 100,
//       ) / 100
//     );
//   };

//   useEffect(() => {
//     if (user) {
//       fetchProductData();
//       fetchUserData(); // ✅ Fetch user data on login
//     } else {
//       setIsSeller(false);
//       setUserData(null);
//       setProducts([]);
//       setCartItems({});
//     }
//   }, [user]);

//   const value = {
//     user,
//     currency,
//     router,
//     isSeller,
//     setIsSeller,
//     userData,
//     fetchUserData, // ✅ exposed in context
//     products,
//     fetchProductData,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateCartQuantity,
//     getCartCount,
//     getCartAmount,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
