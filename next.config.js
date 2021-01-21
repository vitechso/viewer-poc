const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@ql/components',
  '@ql/assets',
  '@ql/config',
  '@ql/lib',
  '@ql/ui',
  '@ql/redux',
  '@ql/containers',
]);
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack: (config) => {
    return config
  },
  env: {
    BACKEND_URL: 'https://localhost:3000',
  },
  compress: true
};

module.exports = withPlugins(
  [
    withTM,
    withOptimizedImages,
    withFonts,
    withSass,
    withCSS,
    withBundleAnalyzer
  ],
  nextConfig
);
