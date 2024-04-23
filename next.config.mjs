/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            { protocol: "https", hostname: "localhost:3000" },
            { protocol: "http", hostname: "localhost:3000" },
        ],
    },
};

export default nextConfig;
