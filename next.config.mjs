import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // ANALYZE 환경변수로 활성화 여부 결정
})({
  reactStrictMode: true,
  swcMinify: true,
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
    // 기기의 너비 중단점 목록
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // 이미지 가로 너비(px) 목록,
    // deviceSizes 배열과 연결되어 이미지 srcset 생성하는데 사용
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
});

export default nextConfig;
