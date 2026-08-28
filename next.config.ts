import type { NextConfig } from "next";
import path from "node:path";
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@intlayer/config/built": path.resolve(
          process.cwd(),
          ".intlayer/config/configuration.mjs",
        ),
      };
    }
    return config;
  },
};

export default withIntlayerSync(nextConfig);
