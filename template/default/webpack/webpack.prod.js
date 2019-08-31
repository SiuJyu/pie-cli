/* webpack生产环境 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge.smart(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
          },
          { loader: '{{css-precessor-loader}}' }
        ]
      }
    ]
  },
})