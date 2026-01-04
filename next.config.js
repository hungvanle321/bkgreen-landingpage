import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
    unoptimized: false,
    // Disable lazy loading by default for above-the-fold images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable modern formats
    formats: ['image/webp', 'image/avif'],
    // Optimize loading
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.alias['pg-native'] = false;
    return config;
  },
}

export default withNextIntl(nextConfig)
