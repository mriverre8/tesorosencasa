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
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // ver que hacer con esto
    },
  },
};

//export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
