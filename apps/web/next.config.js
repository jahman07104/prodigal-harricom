/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.prodigal.io']
  },
  experimental: {
    serverActions: true
  },
  transpilePackages: [
    "@prodigal/ui",
    "@prodigal/utils"
  ]
};

module.exports = nextConfig;

