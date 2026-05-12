import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'impact-logistics.in',
      },
      {
        protocol: 'https',
        hostname: 'flexiblelogisticsllc.com',
      },
    ],
  },
};

export default nextConfig;
