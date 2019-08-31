/* webpack基础配置 */
const path = require('path');
const webpack = require('webpack');
const template = path.resolve(__dirname, '../public/index.html');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [// 将es6编译成es5
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,  // 不编译某个目录下的文件
        include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
        use: [
          "babel-loader",
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
        use: 'ts-loader',
      }],
  },
  plugins: [
    new CleanWebpackPlugin(), // 删除dist
    new HtmlWebpackPlugin({
      template,
      filename: 'index.html'
    })
  ]
}

