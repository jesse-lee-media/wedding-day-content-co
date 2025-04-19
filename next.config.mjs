import process from 'node:process';

import { withPayload } from '@payloadcms/next/withPayload';

const production = process.env.NODE_ENV === 'production';
const domain = process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_URL : process.env.DOMAIN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: production ? 'https' : 'http',
        hostname: production ? domain : 'localhost',
        pathname: '/api/**',
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
