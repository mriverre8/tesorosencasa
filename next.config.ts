import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zeedvysnmkikbwtnjzet.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
