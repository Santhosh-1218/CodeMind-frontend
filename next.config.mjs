/** @type {import('next').NextConfig} */
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://127.0.0.1:8000';
const backendBase = rawApiUrl.replace(/\/api\/?$/, '');

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendBase}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
