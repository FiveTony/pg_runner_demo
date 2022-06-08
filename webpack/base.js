const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // чистит папку dist

module.exports = {
  context: path.resolve(__dirname, "../src"),
  mode: "development",
  devtool: "eval-source-map", // сборка : самая медленная, пересборка : хорошо
  entry: {
    entry: ["babel-polyfill", "../prod/index.js"],
  },
  devServer: {
    port: 8080,
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "../prod/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, //если встречает css в import - использовать этот loader
        use: ["style-loader", "css-loader"], // работает справа-налево
      },
      {
        test: /\.(png|jpeg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
