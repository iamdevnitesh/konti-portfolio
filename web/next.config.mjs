/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Local public images don't need remotePatterns; allow large originals.
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920, 2560],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
