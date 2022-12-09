const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { buildID, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    images: {
      layoutRaw: true
    }
  },
  images: {
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
