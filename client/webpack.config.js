const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "Webpack Plugin",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A simple text editor",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "./",
        publicPath: "./",
        fingerprints: false,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            filename: "icon_[width]x[height].[ext]",
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /favicon\.ico$/,
          type: "asset/resource",
          generator: {
            filename: "[name].[ext]",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ["babel-loader"],
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-object-rest-spread",
            ],
          },
        },
      ],
    },
  };
};
