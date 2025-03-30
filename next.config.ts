import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "static1.s123-cdn-static-a.com",
    ],
  },
};

export default nextConfig;
