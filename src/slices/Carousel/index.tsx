"use client";

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FloatingCan from "@/components/FloatingCan";
import { Center, Environment, View } from "@react-three/drei";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WavyCircles } from "./WavyCircles";
import { ArrowIcon } from "./ArrowIcon";
import { SodaCanProps } from "@/components/SodaCan";
import { runThreeCleanup } from "@/lib/threeCleanup"
import { useRouter } from "next/navigation";



gsap.registerPlugin(useGSAP);


const SPINS_ON_CHANGE = 8;



const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  id: string; // or slug if you use that
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry", id: "689267c846e14b1cdadcd21e" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness", id: "6892688546e14b1cdadcd220" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime", id: "689266aa46e14b1cdadcd216" },
  { flavor: "strawberryLemonade", color: "#690B3D", name: "Strawberry Lemonade", id: "689263f446e14b1cdadcd20e" },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush", id: "6892690e46e14b1cdadcd222" },
];

export type CarouselProps = Partial<SliceComponentProps<Content.CarouselSlice>>;

const Carousel: FC<CarouselProps> = () => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);
  const router = useRouter();


  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const t1 = gsap.timeline();

    t1.set(sodaCanRef.current.rotation, {
      y: Math.PI / 2,
    });

    const direction = index > currentFlavorIndex ? "-" : "+";

    t1.to(
      sodaCanRef.current.rotation,
      {
        y: `${direction}=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to(
        {},
        {
          onStart: () => setCurrentFlavorIndex(nextIndex),
        },
        0.5
      )
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120min] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />
      <h2 className="relative text-center text-5xl font-bold">
        Explore Our Flavor Carousel!
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="left"
          label="Previous Flavor"
        />

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 0]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="relative text-area mx-auto text-center">
  <div className="text-wrapper text-4xl font-medium">
    <p>{FLAVORS[currentFlavorIndex].name}</p>
  </div>

  <div className="mt-2 text-2xl font-normal opacity-90">
    Price 300/bottle
  </div>

  <button
  onClick={() => {
    runThreeCleanup(); // ✅ Clean up before navigation
    router.push(`/product/${FLAVORS[currentFlavorIndex].id}`);
  }}
  className="mt-4 px-6 py-2 bg-white text-black rounded-full font-medium shadow-md hover:bg-gray-100 transition"
>
  Buy Now
</button>

</div>

    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, onClick, direction = "right" }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
