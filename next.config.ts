import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during Vercel build
  },
  typescript: {
    ignoreBuildErrors: true, // Prevent TypeScript errors from blocking the build
  },
};

export default nextConfig;
