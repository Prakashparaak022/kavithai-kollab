import type { NextConfig } from "next";
// @ts-ignore
import withPWA from "next-pwa";
// @ts-ignore
import runtimeCaching from "next-pwa/cache";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // swcMinify: true,

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production",
  // },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
};

// withPWA
const PWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

export default { ...nextConfig, ...PWAConfig };
