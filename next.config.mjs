/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // {
      //   source: '/admin',
      //   destination: '/admin/index.html',
      // },
    ];
  },
  // All images are served through our own /api/v2/image proxy, so no
  // external image hosts need to be whitelisted here.
};

export default nextConfig;
