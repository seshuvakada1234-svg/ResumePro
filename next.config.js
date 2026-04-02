/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@react-pdf/renderer'],
  // Turbopack is enabled by default in Next.js 16
  turbopack: {},
};

export default nextConfig;
