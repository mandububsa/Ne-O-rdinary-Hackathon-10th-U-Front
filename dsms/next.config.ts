import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zxcv9203.duckdns.org",
      },
    ],
  },
};

export default nextConfig;
