// "use client";

// import { FC, useRef, useState } from "react";
// import { Content } from "@prismicio/client";
// import { SliceComponentProps } from "@prismicio/react";
// import FloatingCan from "@/components/FloatingCan";
// import { Center, Environment, View } from "@react-three/drei";
// import clsx from "clsx";
// import { Group } from "three";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { WavyCircles } from "./WavyCircles";
// import { ArrowIcon } from "./ArrowIcon";
// import { SodaCanProps } from "@/components/SodaCan";
// import { runThreeCleanup } from "@/lib/threeCleanup"
// import { useRouter } from "next/navigation";



// gsap.registerPlugin(useGSAP);


// const SPINS_ON_CHANGE = 8;



// const FLAVORS: {
//   flavor: SodaCanProps["flavor"];
//   color: string;
//   name: string;
//   id: string; // or slug if you use that
// }[] = [
//   { flavor: "blackCherry", color: "#710523", name: "Black Cherry", id: "689267c846e14b1cdadcd21e" },
//   { flavor: "grape", color: "#572981", name: "Grape Goodness", id: "6892688546e14b1cdadcd220" },
//   { flavor: "lemonLime", color: "#164405", name: "Lemon Lime", id: "689266aa46e14b1cdadcd216" },
//   { flavor: "strawberryLemonade", color: "#690B3D", name: "Strawberry Lemonade", id: "689263f446e14b1cdadcd20e" },
//   { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush", id: "6892690e46e14b1cdadcd222" },
// ];

// export type CarouselProps = Partial<SliceComponentProps<Content.CarouselSlice>>;

// const Carousel: FC<CarouselProps> = () => {
//   const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
//   const sodaCanRef = useRef<Group>(null);
//   const router = useRouter();


//   function changeFlavor(index: number) {
//     if (!sodaCanRef.current) return;

//     const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

//     const t1 = gsap.timeline();

//     t1.set(sodaCanRef.current.rotation, {
//       y: Math.PI / 2,
//     });

//     const direction = index > currentFlavorIndex ? "-" : "+";

//     t1.to(
//       sodaCanRef.current.rotation,
//       {
//         y: `${direction}=${Math.PI * 2 * SPINS_ON_CHANGE}`,
//         ease: "power2.inOut",
//         duration: 1,
//       },
//       0
//     )
//       .to(
//         ".background, .wavy-circles-outer, .wavy-circles-inner",
//         {
//           backgroundColor: FLAVORS[nextIndex].color,
//           fill: FLAVORS[nextIndex].color,
//           ease: "power2.inOut",
//           duration: 1,
//         },
//         0
//       )
//       .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
//       .to(
//         {},
//         {
//           onStart: () => setCurrentFlavorIndex(nextIndex),
//         },
//         0.5
//       )
//       .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
//   }

//   return (
//    <section className="carousel relative grid min-h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">

//       <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

//       <WavyCircles className="absolute left-1/2 top-1/2 h-[120min] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />
//       <h2 className="relative text-center text-5xl font-bold">
//         Explore Our Flavor Carousel!
//       </h2>

//       <div className="grid grid-cols-[auto,auto,auto] items-center">
//         <ArrowButton
//           onClick={() => changeFlavor(currentFlavorIndex - 1)}
//           direction="left"
//           label="Previous Flavor"
//         />

//         <View className="aspect-square h-[70vmin] min-h-40">
//           <Center position={[0, 0, 0]}>
//             <FloatingCan
//               ref={sodaCanRef}
//               floatIntensity={0.3}
//               rotationIntensity={1}
//               flavor={FLAVORS[currentFlavorIndex].flavor}
//             />
//           </Center>

//           <Environment
//             files="/hdr/lobby.hdr"
//             environmentIntensity={0.6}
//             environmentRotation={[0, 3, 0]}
//           />
//           <directionalLight intensity={6} position={[0, 1, 1]} />
//         </View>

//         <ArrowButton
//           onClick={() => changeFlavor(currentFlavorIndex + 1)}
//           direction="right"
//           label="Next Flavor"
//         />
//       </div>

//       <div className="relative text-area mx-auto text-center">
//   <div className="text-wrapper text-4xl font-medium">
//     <p>{FLAVORS[currentFlavorIndex].name}</p>
//   </div>

//   <div className="mt-2 text-2xl font-normal opacity-90">
//     Price 300/bottle
//   </div>

//   <button
//   onClick={() => {
//     runThreeCleanup(); // ✅ Clean up before navigation
//     router.push(`/product/${FLAVORS[currentFlavorIndex].id}`);
//   }}
//   className="mt-4 px-6 py-2 bg-white text-black rounded-full font-medium shadow-md hover:bg-gray-100 transition"
// >
//   Buy Now
// </button>

// </div>

//     </section>
//   );
// };

// export default Carousel;

// type ArrowButtonProps = {
//   direction?: "right" | "left";
//   label: string;
//   onClick: () => void;
// };

// function ArrowButton({ label, onClick, direction = "right" }: ArrowButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
//     >
//       <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
//       <span className="sr-only">{label}</span>
//     </button>
//   );
// }



"use client"
import { type FC, useRef, useState } from "react"
import type React from "react"

import type { Content } from "@prismicio/client"
import type { SliceComponentProps } from "@prismicio/react"
import FloatingCan from "@/components/FloatingCan"
import { Center, Environment, View } from "@react-three/drei"
import clsx from "clsx"
import type { Group } from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { WavyCircles } from "./WavyCircles"
import { ArrowIcon } from "./ArrowIcon"
import type { SodaCanProps } from "@/components/SodaCan"
import { runThreeCleanup } from "@/lib/threeCleanup"
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"

gsap.registerPlugin(useGSAP)

const SPINS_ON_CHANGE = 8
const FLAVORS: {
  flavor: SodaCanProps["flavor"]
  color: string
  name: string
  id: string
  images: string[]
}[] = [
  {
    flavor: "blackCherry",
    color: "#710523",
    name: "Black Cherry",
    id: "689267c846e14b1cdadcd21e",
    images: [
      "/fruits/strawberry/st1.png",
      "/fruits/strawberry/st2.png",
      "/fruits/strawberry/st3.png",
      "/fruits/strawberry/st4.png",
       
    ],
  },
  {
    flavor: "grape",
    color: "#572981",
    name: "Grape Goodness",
    id: "6892688546e14b1cdadcd220",
    images: [
      "/fruits/strawberry/st1.png",
      "/fruits/strawberry/st2.png",
      "/fruits/strawberry/st3.png",
      "/fruits/strawberry/st4.png",
       
    ],
  },
  // {
  //   flavor: "lemonLime",
  //   color: "#164405",
  //   name: "Lemon Lime",
  //   id: "689266aa46e14b1cdadcd216",
  //    images: [
  //     "/fruits/strawberry/st1.png",
  //     "/fruits/strawberry/st2.png",
  //     "/fruits/strawberry/st3.png",
  //     "/fruits/strawberry/st4.png",
       
  //   ],
  // },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
    id: "689263f446e14b1cdadcd20e",
     images: [
      "/fruits/strawberry/st1.png",
      "/fruits/strawberry/st2.png",
      "/fruits/strawberry/st3.png",
      "/fruits/strawberry/st4.png",
       
    ],
  },
  {
    flavor: "watermelon",
    color: "#4B7002",
    name: "Watermelon Crush",
    id: "6892690e46e14b1cdadcd222",
     images: [
      "/fruits/strawberry/st1.png",
      "/fruits/strawberry/st2.png",
      "/fruits/strawberry/st3.png",
      "/fruits/strawberry/st4.png",
       
    ],
  },
]


export type CarouselProps = Partial<SliceComponentProps<Content.CarouselSlice>>

const Carousel: FC<CarouselProps> = () => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)
  const sodaCanRef = useRef<Group>(null)
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width : 768px)", true)


  

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length
    const t1 = gsap.timeline()

    t1.set(sodaCanRef.current.rotation, {
      y: Math.PI / 2,
    })

    const direction = index > currentFlavorIndex ? "-" : "+"

    t1.to(
      sodaCanRef.current.rotation,
      {
        y: `${direction}=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to(
        {},
        {
          onStart: () => setCurrentFlavorIndex(nextIndex),
        },
        0.5,
      )
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7)
  }

  function changeFlavorMobile(index: number) {
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length
    setCurrentFlavorIndex(nextIndex)
  }

  return (
    <section className="carousel relative grid min-h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div
        className="background pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundColor: FLAVORS[currentFlavorIndex].color }}
      />
      <WavyCircles
  className="absolute left-1/2 top-1/2 h-[120min] -translate-x-1/2 -translate-y-1/2 hidden md:block"
  style={{ color: FLAVORS[currentFlavorIndex].color }}
/>


      <h2 className="relative text-center text-5xl font-bold">Our Flavors</h2>

      {isDesktop && (
        <div className="grid grid-cols-[auto,auto,auto] items-center">
            
          <ArrowButton onClick={() => changeFlavor(currentFlavorIndex - 1)} direction="left" label="Previous Flavor"/>
                    <View className="relative z-10 w-[70vmin] h-[70vmin] aspect-square min-w-80 min-h-80">
                      <Center position={[0, 0, 0]}>
                        <FloatingCan ref={sodaCanRef} floatIntensity={0.3} rotationIntensity={1} flavor={FLAVORS[currentFlavorIndex].flavor} />
                      </Center>
                      <Environment
                        files="/hdr/lobby.hdr"
                        environmentIntensity={0.6}
                        environmentRotation={[0, 3, 0]}
                      />
                      <directionalLight intensity={6} position={[0, 1, 1]} />
                    </View>

                    {/* 👇 Fruit image outside R3F */}
                     
                      {/* <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={FLAVORS[currentFlavorIndex].images[3]}
                        alt={FLAVORS[currentFlavorIndex].name}
                        width={2100}  // ✅ Bigger size
                        height={2100}
                        className="w-1072 h-1072 object-contain"
                      />
                      
                    </div> */}



          <ArrowButton onClick={() => changeFlavor(currentFlavorIndex + 1)} direction="right" label="Next Flavor" />
        </div>
      )}

    {!isDesktop && (
  <div className="relative flex flex-col items-center mt-40">   {/* 👈 added mt-12 */}
    {/* Mobile slider container */}
    <div className="relative z-10 overflow-hidden w-full">
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentFlavorIndex * 100}%)` }}
      >
        {FLAVORS.map((flavor, index) => (
          <div
            key={flavor.id}
            className="w-full flex-shrink-0 flex justify-center items-center px-4 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <WavyCircles
                className="aspect-square h-[80vmin] w-[80vmin] max-h-[600px] max-w-[600px] opacity-40"
                style={{ color: flavor.color }}
              />
            </div>
            <View className="relative z-10 w-[70vmin] h-[70vmin] aspect-square min-w-80 min-h-80">
              <Center position={[0, 0, 0]}>
                <FloatingCan
                  floatIntensity={0.3}
                  rotationIntensity={1}
                  flavor={flavor.flavor}
                />
              </Center>
              <Environment
                files="/hdr/lobby.hdr"
                environmentIntensity={0.6}
                environmentRotation={[0, 3, 0]}
              />
              <directionalLight intensity={6} position={[0, 1, 1]} />
            </View>
          </div>
        ))}
      </div>
    </div>


          <div className="relative z-20 flex justify-between items-center w-full max-w-md px-4 mt-8">
            <MobileArrowButton
              onClick={() => changeFlavorMobile(currentFlavorIndex - 1)}
              direction="left"
              label="Previous Flavor"
            />

            {/* Dot indicators */}
            <div className="flex space-x-3">
              {FLAVORS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeFlavorMobile(index)}
                  className={clsx(
                    "w-4 h-4 rounded-full transition-colors border-2 border-white shadow-lg",
                    index === currentFlavorIndex ? "bg-white" : "bg-transparent",
                  )}
                />
              ))}
            </div>

            <MobileArrowButton
              onClick={() => changeFlavorMobile(currentFlavorIndex + 1)}
              direction="right"
              label="Next Flavor"
            />
          </div>
        </div>
      )}

      <div className="relative text-area mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">Price 300/bottle</div>
        <button
  onClick={() => {
    if (isDesktop) {
      // ✅ Desktop → normal navigation
      runThreeCleanup()
      router.push(`/product/${FLAVORS[currentFlavorIndex].id}`)
    } else {
      // ✅ Mobile → navigate + refresh
      window.location.href = `/product/${FLAVORS[currentFlavorIndex].id}`
    }
  }}
  className="mt-4 px-6 py-2 bg-white text-black rounded-full font-medium shadow-md hover:bg-gray-100 transition"
>
  Buy Now
</button>

      </div>
    </section>
  )
}

export default Carousel

type ArrowButtonProps = {
  direction?: "right" | "left"
  label: string
  onClick: () => void
}

function ArrowButton({ label, onClick, direction = "right" }: ArrowButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  )
}

type MobileArrowButtonProps = {
  direction?: "right" | "left"
  label: string
  onClick: () => void
}

function MobileArrowButton({ label, onClick, direction = "right" }: MobileArrowButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "size-14 rounded-full border-2 border-white bg-white/50 backdrop-blur-sm p-3",
        "shadow-xl hover:shadow-2xl transition-all duration-200",
        "hover:bg-white/70 hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-white/50",
      )}
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100", "text-white drop-shadow-sm")} />
      <span className="sr-only">{label}</span>
    </button>
  )
}
