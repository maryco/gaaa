const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    background: path.join(__dirname, "src/background.ts"),
    content: path.join(__dirname, "src/content.ts"),
    "content-style": path.join(__dirname, "assets/sass/content.scss"),
  },
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "js/[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
              sourceMap: false,
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ dry: false, }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CopyPlugin({
      patterns: [
        {
          from: ".",
          to: "../dist",
          context: "assets",
          globOptions: {
            ignore: ["**/sass/**"],
          }
        }
      ],
    })
  ],
};
