// "use client";
// import { Canvas } from "@react-three/fiber";
// // import { SodaCan } from "./SodaCan";
// import {    View} from "@react-three/drei";
// // import FloatingCan from "@/components/FloatingCan";
// import { Suspense } from "react";
// import dynamic from "next/dynamic";
 
// const Loader = dynamic(
//   ()=> import("@react-three/drei").then((mod)=>mod.Loader),
//   {ssr: false},
// )

// // type Props = {}



// export default function ViewCanvas() {
//   return (
//     <>
//     <Canvas
//     style={ {
//         position :"fixed",
//         top:0,
//         left :"50%",
//         transform :"translateX(-50%)",
//         overflow :"hidden",
//         pointerEvents : "none",
//         zIndex :30,
//     }}
//     shadows
//     dpr = {[1,1.5]}
//     gl={{antialias:true}}
    

//    camera={{
//     fov: 30, // ✅ Correct key
//     // position: [0, 0, 5],
//   }}
//     >
//         {/* <mesh rotation={[0.5 , 0.5 , 0]} position={[1,0,0]} >
//             <boxGeometry/>
//             <meshStandardMaterial color={"hotpink"}/>
//         </mesh> */}
       
//       {/* <FloatingCan/> */}
//           {/* <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//         <ambientLight intensity={1} />
//         <spotLight intensity={2} position={[2,1,1]}/> */}
//         {/* <Environment files="/hdr/lobby.hdr" environmentIntensity={1}/> */}


//    <Suspense fallback={null}>

//    <View.Port/>
//    </Suspense>
    
//     </Canvas>
//    <Loader/>
   
//    </>
//   )
// }



"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

// 🔹 Full-screen loader with disco-style flashing text
function FullScreenLoader({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000] px-4">
      <h1
        className="text-white text-center mb-6"
        style={{
          fontFamily: "'Orbitron', sans-serif", // more techno/professional disco vibe
          fontWeight: 400,
          fontSize: "clamp(2rem, 8vw, 5rem)",
          animation: "discoFlash 0.15s infinite", // super-fast flashy disco effect
          textShadow: "0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff",
          letterSpacing: "4px",
        }}
      >
        ART OF YING YANG
      </h1>

      {/* Slim white loading line */}
      <div className="w-full max-w-md h-[2px] bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style>{`
        @keyframes discoFlash {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// 🔹 Main Canvas Component
export default function ViewCanvas() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // ~3 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && <FullScreenLoader progress={progress} />}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ fov: 30, position: [0, 0, 5] }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
    </>
  );
}
