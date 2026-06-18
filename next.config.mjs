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
  // All Notion-sourced images are served through our own /api/v2/image proxy.
  // YouTube thumbnails are used directly as video poster images.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      }
    ]
  }
};

export default nextConfig;
