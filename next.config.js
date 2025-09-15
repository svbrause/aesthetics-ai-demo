/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Enable Framer Motion
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig