/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages — no Node runtime on Pages.
  output: "export",
  // Pages serves directories as `/path/`; trailing slashes keep links correct.
  trailingSlash: true,
  images: {
    // Pages can't run next/image's optimizer. We pre-resize source images via
    // scripts/optimize-images.mjs (≤2000px, JPEG q82) so this is fine.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
