// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


















// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["raw.githubusercontent.com", "res.cloudinary.com"],
//   },
// };

// export default nextConfig;














import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
