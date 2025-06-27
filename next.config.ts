import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'export',
    basePath: process.env.PAGES_BASE_PATH,
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp3)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/chunks/[path][name].[hash][ext]',
            },
        });

        return config;
    },
    publicRuntimeConfig: {
        repoName: process.env.NEXT_PUBLIC_REPO_NAME,
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
