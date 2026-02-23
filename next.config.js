'use strict';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Specify your domains for images
  },
  experimental: {
    appDir: true,
  },
  env: {
    WEB3_API_KEY: process.env.WEB3_API_KEY, // Add your Web3 API key here
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2)$/, // Add support for fonts
      loader: 'file-loader'
    });
    return config;
  },
}

module.exports = nextConfig;