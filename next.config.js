/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "www.vectorlogo.zone",
      "cdn.jsdelivr.net",
    ],
  },
};

module.exports = nextConfig;
