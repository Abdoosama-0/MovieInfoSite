import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },  
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
    ],
  },
};

export default nextConfig;
