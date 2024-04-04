/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            { protocol: "https", hostname: "*" },
            { protocol: "http", hostname: "*" },
        ],
    },
    experimental: {
        turbo: {
            rules: {
                '*.md': [
                    {
                        loader: '@mdx-js/loader',
                        options: {
                            format: 'md',
                        },
                    },
                ],
                '*.mdx': ['@mdx-js/loader'],
            },
        },
    },
};

export default nextConfig;
