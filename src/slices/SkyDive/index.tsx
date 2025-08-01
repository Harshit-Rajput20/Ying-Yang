"use client";

import { FC } from "react";
import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Content } from "@prismicio/client"; // for the flavor type

interface StaticSkyDiveProps {
  sentence?: string;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
}

const SkyDive: FC<StaticSkyDiveProps> = ({
  sentence = "Experience the Sky",
  flavor,
}) => {
  return (
    <Bounded className="skydive h-screen">
      <h2 className="sr-only">{sentence}</h2>
      <View className="h-screen w-screen">
        <Scene flavor={flavor} sentence={sentence} />
      </View>
    </Bounded>
  );
};

export default SkyDive;
