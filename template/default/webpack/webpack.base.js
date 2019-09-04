/* webpack基础配置 */
const path = require('path');
const webpack = require('webpack');
const template = path.resolve(__dirname, '../public/index.html');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index')
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [// 将es6编译成es5
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,  // 不编译某个目录下的文件
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
          }, // 生产环境将css提成单独的文件
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            }
          }
        ]
      }, {
        test: /\.less$/,
        use: 'less-loader',
      }, {
        test: /\.(sc|sa)ss$/,
        use: 'sass-loader',
      }, {
        test: /\.styl(us)?$/,
        use: 'stylus-loader',
      }, {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: 'file-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 删除dist
    new HtmlWebpackPlugin({
      template,
      filename: 'index.html'
    })
  ]
}
