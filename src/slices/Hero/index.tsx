// "use client"
// import { type FC, useRef, useEffect } from "react"
// import { asText, type Content } from "@prismicio/client"
// import { PrismicRichText, type SliceComponentProps } from "@prismicio/react"
// import { PrismicNextImage } from "@prismicio/next"
// import { Bounded } from "@/components/Bounded"
// import Button from "@/components/Button"
// import { TextSplitter } from "@/components/TextSplitter"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import gsap from "gsap"
// import { useGSAP } from "@gsap/react"
// import { View } from "@react-three/drei"
// import Scene from "./Scene"
// import { Bubbles } from "./Bubbles"
// // import { FloatingFruits } from "./FloatingFruits"
// import { useStore } from "@/hooks/useStore"
// import { useMediaQuery } from "@/hooks/useMediaQuery"

// gsap.registerPlugin(useGSAP, ScrollTrigger)

// /** * Props for `Hero`. */
// export type HeroProps = SliceComponentProps<Content.HeroSlice>

// /** * Component for "Hero" Slices. */
// const Hero: FC<HeroProps> = ({ slice }) => {
//   const heroRef = useRef(null)

//   const ready = useStore((state)=> state.ready)
//    const isDesktop = useMediaQuery("(min-width : 768px)",true)

//   useGSAP(
//     () => {


//       if(!ready && isDesktop) return;
//       const introT1 = gsap.timeline()

//       introT1.set(".hero", { opacity: 1 })

//       introT1
//         .set(".hero", { opacity: 1 })
//         .from(".hero-header-word", {
//           scale: 3,
//           opacity: 0,
//           stagger: 1,
//           delay: 0.3,
//           ease: "power4.in",
//         })
//         .from(
//           ".hero-subheading",
//           {
//             opacity: 0,
//             y: 30,
//           },
//           "+=.8",
//         )
//         .from(".hero-body", {
//           opacity: 0,
//           y: 10,
//         })
//         .from(".hero-button", {
//           opacity: 0,
//           y: 10,
//           duration: 0.6,
//         })

//       // Background color animation - fixed version
//       const scrollT1 = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".hero",
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 1.5,
//           // markers: true,
//         },
//       })

//       scrollT1.fromTo(
//         document.body,
//         {
//           backgroundColor: "#FDE047",
//         },
//         {
//           backgroundColor: "#D9F99D",
//           overwrite:"auto",
//         },
//         1,
//       )
//       .from(".text-side-heading .split-char", {
//         scale:1.3,
//         y:40,
//         rotate :-25,
//         opacity:0,
//         stagger :0.1,
//         ease :"back.out(3)",
//         duration:0.5,
//       })
//       .from(".text-side-body", {
//         y:20,
//         opacity:0,
//       })
//     },
//     { dependencies:[ready , isDesktop]},
//   )

//   // Cleanup function to reset background color when component unmounts
//   useEffect(() => {
//     return () => {
//       gsap.set(document.body, { backgroundColor: "" })
//     }
//   }, [])

//   return (
//     <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="hero">


// {isDesktop && (

//   <View className="size-20 hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
//         <Scene/>
         
//         <Bubbles count={300} speed={2} repeat={true}/>
//       </View>
//   )}
   

//       <div className="grid" ref={heroRef}>
//         <div className="grid h-screen place-items-center">
//           <div className="grid auto-rows-min place-items-center text-center">
//             <h1 className="hero-header text-7xl font-black uppercase leading-[.9] text-orange-500 md:text-[6rem] lg:text-[6rem]">
//               <TextSplitter
//                 text="Art_of"
//                 wordDisplayStyle="block"
//                 className="hero-header-word"
//               />
//             </h1>
// <h1 className="hero-header text-7xl font-black uppercase leading-[.9] text-orange-500 md:text-[6rem] lg:text-[8rem]">
//               <TextSplitter
//                 text="yingyang"
//                 wordDisplayStyle="block"
//                 className="hero-header-word"
//               />
//             </h1>
//             <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
//               Be your own bartender
//             </div>
//             <div className="hero-body text-2xl font-normal text-sky-950">
//               <PrismicRichText field={slice.primary.body} />
//             </div>
//             <Button
//               buttonLink={slice.primary.button_link}
//               buttonText={slice.primary.button_text}
//               className="hero-button mt-12"
//             />
//           </div>
//         </div>
//         <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
//           <PrismicNextImage className="w-full md:hidden" field={slice.primary.cans_image} />
//           <div>
//             <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950">
//               <TextSplitter text={asText(slice.primary.second_heading)} />
//             </h2>
//             <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
//               <PrismicRichText field={slice.primary.second_body} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Bounded>
//   )
// }

// export default Hero


"use client"
import { type FC, useRef, useEffect } from "react"
import { asText, type Content } from "@prismicio/client"
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react"
 
// import { Bounded } from "@/components/Bounded" // No longer needed
import Button from "@/components/Button"
import { TextSplitter } from "@/components/TextSplitter"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { View } from "@react-three/drei"
import Scene from "./Scene"
import { Bubbles } from "./Bubbles"
// import { FloatingFruits } from "./FloatingFruits"
import { useStore } from "@/hooks/useStore"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import clsx from "clsx" // Import clsx for combining classes

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const heroRef = useRef(null)
  const ready = useStore((state) => state.ready)
  const isDesktop = useMediaQuery("(min-width : 768px)", true)

  useGSAP(
    () => {
      if (!ready && isDesktop) return
      const introT1 = gsap.timeline()
      introT1.set(".hero", { opacity: 1 })
      introT1
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          stagger: 1,
          delay: 0.3,
          ease: "power4.in",
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        })
      // Background color animation - fixed version
      const scrollT1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          // markers: true,
        },
      })
      scrollT1
        .fromTo(
          document.body,
          {
            backgroundColor: "#FDE047",
          },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        })
    },
    { dependencies: [ready, isDesktop] },
  )

  // Cleanup function to reset background color when component unmounts
  useEffect(() => {
    return () => {
      gsap.set(document.body, { backgroundColor: "" })
    }
  }, [])

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx("hero px-4 first:pt-10 md:px-6")} // Applied Bounded's outer classes
    >
      {isDesktop && (
        <View className="size-20 hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {" "}
        {/* Applied Bounded's inner classes */}
        <div className="grid" ref={heroRef}>
          <div className="grid h-screen place-items-center">
            <div className="grid auto-rows-min place-items-center text-center">
              <h1 className="hero-header text-7xl font-black uppercase leading-[.9] text-orange-500 md:text-[6rem] lg:text-[6rem]">
                <TextSplitter text="Art_of" wordDisplayStyle="block" className="hero-header-word" />
              </h1>
              <h1 className="hero-header text-7xl font-black uppercase leading-[.9] text-orange-500 md:text-[6rem] lg:text-[8rem]">
                <TextSplitter text="yingyang" wordDisplayStyle="block" className="hero-header-word" />
              </h1>
              <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
                Be your own bartender
              </div>
              <div className="hero-body text-2xl font-normal text-sky-950">
                <PrismicRichText field={slice.primary.body} />
              </div>
              <Button
                buttonLink={slice.primary.button_link}
                buttonText={slice.primary.button_text}
                className="hero-button mt-12"
              />
            </div>
          </div>
          <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
            {/* <PrismicNextImage className="w-full md:hidden" field={slice.primary.cans_image} /> */}
            <div>
              <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950">
                <TextSplitter text={asText(slice.primary.second_heading)} />
              </h2>
              <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
                <PrismicRichText field={slice.primary.second_body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
