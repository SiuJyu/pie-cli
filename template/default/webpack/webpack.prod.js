/* webpack生产环境 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge.smart(base, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css',
      chunkFilename: 'styles/[name].[contenthash:8].chunk.css',
    }),
  ],
})