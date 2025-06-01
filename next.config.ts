import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
};

const withNextIntl = createNextIntlPlugin({
    locales: ['uk', 'en'],
    defaultLocale: 'uk'
});

export default withNextIntl(nextConfig);
