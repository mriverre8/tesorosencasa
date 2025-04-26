import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zeedvysnmkikbwtnjzet.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // ver que hacer con esto
    },
  },
};

export default nextConfig;
