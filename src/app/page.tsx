// import { type Metadata } from "next";

// import { asText } from "@prismicio/client";
// import { SliceZone } from "@prismicio/react";

// import { createClient } from "@/prismicio";
// import { components } from "@/slices";

// export default async function Home() {
//   const client = createClient();
//   const home = await client.getByUID("page", "home");

//   // <SliceZone> renders the page's slices.
//   return <SliceZone slices={home.data.slices} components={components} />;
// }

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient();
//   const home = await client.getByUID("page", "home");

//   return {
//     title: asText(home.data.title),
//     description: home.data.meta_description,
//     openGraph: {
//       title: home.data.meta_title ?? undefined,
//       images: [{ url: home.data.meta_image.url ?? "" }],
//     },
//   };
// }



import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
// import HomeProducts from "@/components/HomeProducts";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
 
import SkyDive from "@/slices/SkyDive";
import Carousel from "@/slices/Carousel";
import AlternatingText from "@/slices/AlternatingText";
import BigText from "@/slices/BigText";
import Footer from "@/components/Footer";
 
// Mocked slice data

export default async function Home() {
  
  const client = createClient();
  const home = await client.getByUID("page", "home");

  // Exclude slices that you’re manually rendering
  const filteredSlices = home.data.slices.filter(
    (slice) => !["sky_dive", "carousel"].includes(slice.slice_type)
  );

  return (
    <>
      <SliceZone slices={filteredSlices} components={components} />

      {/* Manually rendered custom slices */}
      <SkyDive sentence="Art of Ying Yang!" flavor="strawberryLemonade" />
      <Carousel slice={undefined} index={0} slices={[]} context={undefined} />
 <AlternatingText
         
      />  
      
      <BigText/>    {/* <HomeProducts/> */}
      <Footer/>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
