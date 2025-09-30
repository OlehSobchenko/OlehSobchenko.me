import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: process.env.PAGES_BASE_PATH,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = config.resolve || {};
            config.resolve.alias = {
                ...(config.resolve?.alias || {}),
                'node:url': 'url',
                'clean-stack': path.resolve(
                    __dirname,
                    'src/shims/clean-stack.ts',
                ),
            };
            config.resolve.fallback = {
                ...(config.resolve?.fallback || {}),
                url: require.resolve('url/'),
            };
        }

        return config;
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
