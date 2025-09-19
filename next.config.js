/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  // Enable Framer Motion
  transpilePackages: ["framer-motion"],
  // Disable static optimization for dynamic routes
  experimental: {
    dynamicIO: true,
  },
  // Ensure proper handling of dynamic routes
  trailingSlash: false,
};

module.exports = nextConfig;
