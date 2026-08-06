import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use server-side rendering for API routes (contact form submission).
  // Pages are still pre-rendered at build time for static content.
  output: "standalone",
  // Each route becomes a folder with an index.html (e.g. /about/index.html),
  // which serves cleanly from S3.
  trailingSlash: true,
  // Can use the Next.js image optimizer at runtime.
  images: { unoptimized: true },
};

export default nextConfig;
