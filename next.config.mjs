/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.com',
      },
      {
        protocol: 'https',
        hostname: '*.com',
      },
      {
        protocol: 'https',
        hostname: '*.kr',
      },
    ],
    // loader: 'imgix',
    // path: '/',
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
