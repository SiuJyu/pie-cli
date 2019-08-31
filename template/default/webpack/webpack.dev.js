/* webpack开发环境 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge.smart(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          }, // 生产环境将css提成单独的文件
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热替换
  ]
})