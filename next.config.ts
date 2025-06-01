import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: process.env.PAGES_BASE_PATH || '',
    distDir: 'out',
    images: {
        unoptimized: true
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
