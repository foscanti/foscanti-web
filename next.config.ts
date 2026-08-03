import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out for hosting on S3 + CloudFront.
  output: "export",
  // Each route becomes a folder with an index.html (e.g. /about/index.html),
  // which serves cleanly from S3.
  trailingSlash: true,
  // Static export can't use the Next.js image optimizer at runtime.
  images: { unoptimized: true },
};

export default nextConfig;
