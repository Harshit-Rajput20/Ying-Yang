// "use client"

// import FloatingCan from "@/components/FloatingCan"
// import { Environment, OrbitControls } from "@react-three/drei"
// import { useRef ,useEffect } from "react"
// import * as THREE from "three"
// import { useStore } from "@/hooks/useStore"

// import { ScrollTrigger } from "gsap/ScrollTrigger"

// import gsap from "gsap"
// import { useGSAP } from "@gsap/react"
// gsap.registerPlugin(useGSAP,ScrollTrigger)

// // type Props = {}

// export default function Scene() {

   


//   const isReady = useStore((state) => state.isReady)
//   const can1Ref = useRef<THREE.Group>(null)
//   const can2Ref = useRef<THREE.Group>(null)
//   const can3Ref = useRef<THREE.Group>(null)
//   const can4Ref = useRef<THREE.Group>(null)
//   const can5Ref = useRef<THREE.Group>(null)

//   const can1GroupRef = useRef<THREE.Group>(null)
//   const can2GroupRef = useRef<THREE.Group>(null)

//   const groupRef = useRef<THREE.Group>(null)

//   const FLOAT_SPEED = 1.5


  

//   useGSAP(
//     () => {
//       if (
//         !can1Ref.current ||
//         !can2Ref.current ||
//         !can3Ref.current ||
//         !can4Ref.current ||
//         !can5Ref.current ||
//         !can1GroupRef.current ||
//         !can2GroupRef.current ||
//         !groupRef.current
//       )
//         return

//         isReady();
// gsap.set(can1Ref.current.position, {
//   x: -1.5,
//   z: -0.2,
// })

// gsap.set(can1Ref.current.rotation, {
//   x: -Math.PI / 10, // 30 degrees tilt forward
//   z: -Math.PI / 10, // slight left tilt
//   y: Math.PI / 2,
// })

// // Tilt can2 forward and to the right
// gsap.set(can2Ref.current.position, {
//   x: 1.5,
//   z: 0.5,
// })

// gsap.set(can2Ref.current.rotation, {
//   x: -Math.PI / 6, // 30 degrees backward tilt
//   z: Math.PI / 8, // slight right tilt
//    y: Math.PI / 2,
// })


// gsap.set(can3Ref.current.position, {
//   y:5 , z:2
  
// })

//  gsap.set(can4Ref.current.position, {
//   x: 2,
//   y:4,
//   z:2
// })


// gsap.set(can5Ref.current.position, {
  
//   y:-5
  
// })


// gsap.set(can3Ref.current.rotation, {
 
//    y: Math.PI / 2,
// })
// gsap.set(can4Ref.current.rotation, {
 
//    y: Math.PI / 2,
// })


// gsap.set(can5Ref.current.rotation, {
 
//    y: Math.PI / 4,
// })






// const introT1 = gsap.timeline({
//     defaults:{
//         duration:3,
//         ease:"back.out(1.4)"
//     }
// })
 

// if(window.scrollY < 20 )
// {

    
//     introT1
//     .from(can1GroupRef.current.position,{y:-5 , x:1},0)
//     .from(can1GroupRef.current.rotation,{z:3},0)
    
//     .from(can2GroupRef.current.position,{y:5 , x:1},0)
    
//     .from(can2GroupRef.current.rotation,{z:3},0)
// }


// const scrollT1 = gsap.timeline({
//     defaults:{
//         duration:2,
//     },
//     scrollTrigger:{
//         trigger:".hero",
//         start:"top top",
//         end:"bottom bottom",
//         scrub:1.5,
//     },
// });


// scrollT1
// .to(groupRef.current.rotation,{y:Math.PI*2})

// // Bottle 1 (Front Left, Cherry)
//   .to(can1Ref.current.position, { x: -0.3,y: -0.5, z: -0.9 }, 0)
//   .to(can1Ref.current.rotation, { z: 0.25, x: -0.1 }, 0)

//   // Bottle 2 (Top Right, Watermelon)
//   .to(can2Ref.current.position, { x: 1.4, y: -0.5, z: -1.3 }, 0)
//   .to(can2Ref.current.rotation, { z: -0.15, x: 0.2 }, 0)

//   // Bottle 3 (Middle Front, Strawberry Lemonade)
//   .to(can3Ref.current.position, { x: 0.2, y: -0.5, z: -1.3 }, 0)
//   .to(can3Ref.current.rotation, { z: 0.1, x: -0.05 }, 0)

//   // Bottle 4 (Top Left, Lemon Lime)
//   .to(can4Ref.current.position, { x: -0.8, y: -0.5, z: -1.3 }, 0)
//   .to(can4Ref.current.rotation, { z: -0.3, x: 0.1 }, 0)

//   // Bottle 5 (Back Right, Grape)
//   .to(can5Ref.current.position, { x: 0.8,y: -0.5, z: -1.3 }, 0)
//   .to(can5Ref.current.rotation, { z: 0.2, x: -0.15 }, 0)
//   .to(groupRef.current.position,{x:1,duration:3,ease:"sine.inOut"},1.3)


  

//       // You can add more animations for other cans here if needed
//     },
    
   
//   )
  

//   return (
//     <group ref={groupRef}>
//       <group ref={can1GroupRef}>
//         <FloatingCan ref={can1Ref} flavor="lemonLime" floatSpeed={FLOAT_SPEED} />
//       </group>

//       <group ref={can2GroupRef}>
//         <FloatingCan ref={can2Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />
//       </group>

//       <FloatingCan ref={can3Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
//       <FloatingCan ref={can4Ref} flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED} />
//       <FloatingCan ref={can5Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
//       <OrbitControls/>    
//       <Environment files="/hdr/lobby.hdr" environmentIntensity={1} />
//     </group>
//   )
// }

 "use client";

import FloatingCan from "@/components/FloatingCan";
import { Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useStore } from "@/hooks/useStore";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { registerThreeCleanup } from "@/lib/threeCleanup"; 

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene() {
  const isReady = useStore((state) => state.isReady);

  const can1Ref = useRef<THREE.Group>(null);
  const can2Ref = useRef<THREE.Group>(null);
  const can3Ref = useRef<THREE.Group>(null);
  const can4Ref = useRef<THREE.Group>(null);
  const can5Ref = useRef<THREE.Group>(null);

  const can1GroupRef = useRef<THREE.Group>(null);
  const can2GroupRef = useRef<THREE.Group>(null);

  const groupRef = useRef<THREE.Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    // === Initial positions ===
    gsap.set(can1Ref.current.position, { x: -1.5, z: -0.2 });
    gsap.set(can1Ref.current.rotation, {
      x: -Math.PI / 10,
      z: -Math.PI / 10,
      y: Math.PI / 2,
    });

    gsap.set(can2Ref.current.position, { x: 1.5, z: 0.5 });
    gsap.set(can2Ref.current.rotation, {
      x: -Math.PI / 6,
      z: Math.PI / 8,
      y: Math.PI / 2,
    });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    gsap.set(can3Ref.current.rotation, { y: Math.PI / 2 });
    gsap.set(can4Ref.current.rotation, { y: Math.PI / 2 });
    gsap.set(can5Ref.current.rotation, { y: Math.PI / 4 });

    // === Intro animation (only on page load) ===
    const introT1 = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.4)" },
    });

    if (window.scrollY < 20) {
      introT1
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    // === Scroll animation (rotate + position cans) ===
    const scrollT1 = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollT1
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      .to(can1Ref.current.position, { x: -0.3, y: -0.5, z: -0.9 }, 0)
      .to(can1Ref.current.rotation, { z: 0.25, x: -0.1 }, 0)
      .to(can2Ref.current.position, { x: 1.4, y: -0.5, z: -1.3 }, 0)
      .to(can2Ref.current.rotation, { z: -0.15, x: 0.2 }, 0)
      .to(can3Ref.current.position, { x: 0.2, y: -0.5, z: -1.3 }, 0)
      .to(can3Ref.current.rotation, { z: 0.1, x: -0.05 }, 0)
      .to(can4Ref.current.position, { x: -0.8, y: -0.5, z: -1.3 }, 0)
      .to(can4Ref.current.rotation, { z: -0.3, x: 0.1 }, 0)
      .to(can5Ref.current.position, { x: 0.8, y: -0.5, z: -1.3 }, 0)
      .to(can5Ref.current.rotation, { z: 0.2, x: -0.15 }, 0)
      .to(groupRef.current.position, {
        x: 1,
        duration: 3,
        ease: "sine.inOut",
      }, 1.3);

    // === Clean up specific GSAP instances ===
    registerThreeCleanup(() => {
      console.log("[Three Cleanup] Disposing GSAP and removing DOM")
      introT1.kill()
      scrollT1.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    })

    return () => {
      // 🔁 Kill on unmount too, for safety
      introT1.kill()
      scrollT1.kill()
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])



  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="lemonLime" floatSpeed={FLOAT_SPEED} />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan ref={can2Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />
      </group>

      <FloatingCan ref={can3Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can4Ref} flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can5Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />

      <OrbitControls />
      
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1} />
    </group>
  );
}
