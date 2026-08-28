import type { NextConfig } from "next";
import { withIntlayerSync } from "next-intlayer/server";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit", "swissqrbill"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default withIntlayerSync(nextConfig);
