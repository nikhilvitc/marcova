/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Legacy domains support (deprecated but still works)
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
  },
}

module.exports = nextConfig
