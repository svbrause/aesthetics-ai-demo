/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "player.vimeo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app.ponce.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform.ponce.ai",
        pathname: "/**",
      },
    ],
  },
  // Enable Framer Motion
  transpilePackages: ["framer-motion"],
  // Disable static optimization for dynamic routes
  experimental: {
    // dynamicIO is not a valid option in Next.js 14
  },
  // Ensure proper handling of dynamic routes
  trailingSlash: false,
  // Configure for production deployment
  output: "standalone",
  // Handle custom domain
  async redirects() {
    return [
      {
        source: "/face",
        destination: "/face/demo-form",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
