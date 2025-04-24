import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
  // Make sure experimental features are compatible with Tailwind
  experimental: {
    // Add any needed experimental features
  }
};

export default nextConfig;