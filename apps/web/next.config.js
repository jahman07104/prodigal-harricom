/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    const demos = [
      "/work/boss-installations",
      "/work/exquisite-roots-craft",
      "/work/normans-kitchen",
      "/work/normans-kitchen/order",
      "/work/normans-kitchen/order/confirmation",
      "/work/normans-kitchen/dashboard",
      "/work/normans-kitchen/orders",
      "/work/normans-kitchen/admin/login",
      "/work/yellowapp",
      "/work/yellowapp/products",
      "/work/yellowapp/cart",
    ];
    return [
      ...demos.flatMap((path) => [
        { source: path, destination: `${path}/index.html` },
        { source: `${path}/`, destination: `${path}/index.html` },
      ]),
      {
        source: "/work/yellowapp/products/:handle",
        destination: "/work/yellowapp/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
