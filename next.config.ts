import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure compatibility with Vercel
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;
