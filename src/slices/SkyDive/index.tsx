// "use client";

// import { FC } from "react";
// import { Bounded } from "@/components/Bounded";
// import { View } from "@react-three/drei";
// import Scene from "./Scene";
// import { Content } from "@prismicio/client"; // for the flavor type

// interface StaticSkyDiveProps {
//   sentence?: string;
//   flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
// }

// const SkyDive: FC<StaticSkyDiveProps> = ({
//   sentence = "Experience the Sky",
//   flavor,
// }) => {
//   return (
//     <Bounded className="skydive h-screen">
//       <h2 className="sr-only">{sentence}</h2>
//       <View className="h-screen w-screen">
//         <Scene flavor={flavor} sentence={sentence} />
//       </View>
//     </Bounded>
//   );
// };

// export default SkyDive;



"use client"
import type { FC } from "react"
// import { Bounded } from "@/components/Bounded" // No longer needed
import { View } from "@react-three/drei"
import Scene from "./Scene"
import type { Content } from "@prismicio/client" // for the flavor type
import clsx from "clsx" // Import clsx for combining classes

interface StaticSkyDiveProps {
  sentence?: string
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"]
}

const SkyDive: FC<StaticSkyDiveProps> = ({ sentence = "Experience the Sky", flavor }) => {
  return (
    <section className={clsx("skydive h-screen px-4 first:pt-10 md:px-6")}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <h2 className="sr-only">{sentence}</h2>
        <View className="h-screen w-screen">
          <Scene flavor={flavor} sentence={sentence} />
        </View>
      </div>
    </section>
  )
}

export default SkyDive
