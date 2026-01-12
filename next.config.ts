import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,

  // swcMinify: true,

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
