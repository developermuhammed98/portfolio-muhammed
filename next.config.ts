import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Render profile portrait at maximum quality – no lossy recompression
    qualities: [100],
    deviceSizes: [220, 320, 400, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [220, 320, 400],
  },
};

export default nextConfig;
