const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://codemind-backend-sb3h.onrender.com';
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
