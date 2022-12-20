/* eslint-disable no-undef */
// const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

const { EnvironmentPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "safran",
    projectName: "header-app",
    webpackConfigEnv,
    argv,
  });

  const finalConfig = {
    ...defaultConfig,

    devServer: {
      ...defaultConfig.devServer,
      port: 3002,
    },
    // Be careful! You must add any library that you want to add in shared dependencies to "externals"
    externals: ["react", "react-dom", "axios", "@safran/utilities"],
    module: {
      rules: [
        {
          test: /\.(js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.svg/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 4096,
                name: "[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.join(__dirname, "./postcss.config.js"),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new EnvironmentPlugin({
      //   PLATFORM: process.env.PLATFORM || "prod",
      //   NODE_ENV: "development",
      // }),
    ],
  };

  return finalConfig;
};
