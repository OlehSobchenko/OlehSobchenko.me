import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: process.env.PAGES_BASE_PATH,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: 'raw-loader',
        });

        return config;
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
