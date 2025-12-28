import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "yueinfortech.local" },
      { protocol: "https", hostname: process.env.AWS_S3_HOST ?? "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Allow local WP images during development despite private IP resolution
    unoptimized: isDev,
  },
};

export default nextConfig;
