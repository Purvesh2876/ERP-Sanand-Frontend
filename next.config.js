/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.ambicam.com/ambicamapiv5.asmx/:path*',
      },
      {
        source: '/core/:path*',
        destination: 'http://t1.arcischain.io:4000/:path*',
      },
    
      {
        source: '/camapi',
        destination: 'https://api.ambicam.com/ambicamapiv6.asmx/:path*',
      },
    ];
  },

  reactStrictMode: true,
  swcMinify: true,
  images: {
  unoptimized: true
  }

  
  };
  
  module.exports = nextConfig;