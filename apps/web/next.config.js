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
  ],
  async rewrites() {
    return [
      {
        source: '/business',
        destination: 'https://harricom.vercel.app/business',
      },
      {
        source: '/business/:path*',
        destination: 'https://harricom.vercel.app/business/:path*',
      },
    ]
  }
};

module.exports = nextConfig;
