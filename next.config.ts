import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // To support images
    domains: [
      "www.gutenberg.org",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        // pathname: '',
      },
    ],
  },
};

export default nextConfig;
