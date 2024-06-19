/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
  images: {
    domains: [
      'cdn.sanity.io'
    ]
  }
};

export default nextConfig;
