import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
