/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets-in.bmscdn.com"],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hyderabad",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
