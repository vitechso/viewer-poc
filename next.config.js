const CustomFunctionsMetadataPlugin = require("custom-functions-metadata-plugin");
//const CopyPlugin = require("copy-webpack-plugin");
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@iso/components',
  '@iso/assets',
  '@iso/config',
  '@iso/lib',
  '@iso/ui',
  '@iso/redux',
  '@iso/containers',
]);
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        
        //config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
        // config.plugins.push(new CustomFunctionsMetadataPlugin({
        //     output: "functions.json",
        //     input: "./Components/excel/functions.ts",
        //   }))
        // // config.plugins.push( new CopyPlugin({
        //     patterns: [
        //       { from: "./functions.json", to: "./public/scripts/functions.json" }]}))

        // Important: return the modified config
        return config
      },
    env: {
    BACKEND_URL: 'https://localhost:8800',
  },
//   devtool: "source-map",
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
