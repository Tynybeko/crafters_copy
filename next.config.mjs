/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        formats: ['image/webp', 'image/avif'],
        domains: ['back.crafters.asia'],
    },
};

export default nextConfig;
