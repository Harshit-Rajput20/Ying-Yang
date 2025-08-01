"use client";
import { Canvas } from "@react-three/fiber";
// import { SodaCan } from "./SodaCan";
import {    View} from "@react-three/drei";
// import FloatingCan from "@/components/FloatingCan";
import { Suspense } from "react";
import dynamic from "next/dynamic";
 
const Loader = dynamic(
  ()=> import("@react-three/drei").then((mod)=>mod.Loader),
  {ssr: false},
)

// type Props = {}

export default function ViewCanvas() {
  return (
    <>
    <Canvas
    style={ {
        position :"fixed",
        top:0,
        left :"50%",
        transform :"translateX(-50%)",
        overflow :"hidden",
        pointerEvents : "none",
        zIndex :30,
    }}
    shadows
    dpr = {[1,1.5]}
    gl={{antialias:true}}
    

   camera={{
    fov: 30, // ✅ Correct key
    // position: [0, 0, 5],
  }}
    >
        {/* <mesh rotation={[0.5 , 0.5 , 0]} position={[1,0,0]} >
            <boxGeometry/>
            <meshStandardMaterial color={"hotpink"}/>
        </mesh> */}
       
      {/* <FloatingCan/> */}
          {/* <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={1} />
        <spotLight intensity={2} position={[2,1,1]}/> */}
        {/* <Environment files="/hdr/lobby.hdr" environmentIntensity={1}/> */}


   <Suspense fallback={null}>

   <View.Port/>
   </Suspense>
    
    </Canvas>
   <Loader/>
   
   </>
  )
}