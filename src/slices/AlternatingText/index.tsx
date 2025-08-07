"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { JSX } from "react";

// Manually defined mockSlice data for use inside the component
const mockSlice: Content.AlternatingTextSlice = {
  slice_type: "alternating_text",
  slice_label: null,
  variation: "default",
  primary: {
    text_group: [
      {
        heading: [
          {
            type: "heading1",
            text: "Gut-Friendly Goodness",
            spans: [],
          },
        ],
        body: [
          {
            type: "paragraph",
            text:
              "Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.",
            spans: [],
          },
        ],
      },
            {
        heading: [
          {
            type: "heading1",
            text: "Naturally Refreshing",
            spans: [],
          },
        ],
        body: [
          {
            type: "paragraph",
            text:
              "Made with only the best natural ingredients, our soda is free from artificial sweeteners and flavors. It’s a crisp, clean taste that feels as good as it tastes, giving you a boost of real, natural refreshment.",
            spans: [],
          },
        ],
      },
      {
        heading: [
          {
            type: "heading1",
            text: "Light Calories, Big Flavor",
            spans: [],
          },
        ],
        body: [
          {
            type: "paragraph",
            text:
              "Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise.",
            spans: [],
          },
        ],
      },
    ],
  },
  items: [],
};

const AlternatingText = (): JSX.Element => {
  const slice = mockSlice;

  return (
   <div
  data-slice-type="alternating_text"
  data-slice-variation="default"
  className="alternating-text-container relative bg-yellow-300 text-sky-950"
>
  <div>
    <div className="relative z-[100] grid">
      <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
        <Scene />
      </View>

      {slice.primary.text_group.map((item, index) => (
        <div
          key={asText(item.heading)}
          className="alternating-section grid h-screen items-center place-items-center md:grid-cols-2 gap-x-4 px-4 md:px-12"
        >
          <div
            className={clsx(
              index % 2 === 0 ? "col-start-1" : "md:col-start-2",
              "rounded-lg p-4 max-w-xl backdrop-blur-lg max-md:bg-white/30"
            )}
          >
            <h2 className="text-balance text-4xl md:text-6xl font-bold leading-tight">
              <PrismicText field={item.heading} />
            </h2>
            <div className="mt-4 text-base md:text-xl">
              <PrismicRichText field={item.body} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default AlternatingText;
