import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skeleton phase: keep deploys unblocked by lint; types are still checked.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
