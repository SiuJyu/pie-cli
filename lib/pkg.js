/* package */
module.exports = {
  required: [{
    name: 'react',
    version: '^16.9.0',
  }, {
    name: 'react-dom',
    version: '^16.9.0',
  }, {
    name: 'react-router',
    version: '^5.0.1',
  }, {
    name: 'react-router-dom',
    version: '^5.0.1',
  }],
  webpack: [{
    name: 'webpack',
    version: '^4.39.3',
  }, {
    name: 'webpack-dev-server',
    version: '^3.8.0',
  }, {
    name: 'webpack-cli',
    version: '^3.3.7',
  }, {
    name: 'webpack-merge',
    version: '^4.2.2',
  }, {
    name: 'mini-css-extract-plugin',
    version: '^0.8.0'
  }, {
    name: 'html-webpack-plugin',
    version: '^3.2.0'
  }, {
    name: 'clean-webpack-plugin',
    version: '^3.0.0'
  }, {
    name: 'url-loader',
    version: '^2.1.0'
  }],
  babel: [{
    name: '@babel/core',
    version: '^7.5.5',
  }, {
    name: '@babel/preset-env',
    version: '^7.5.5',
  }, {
    name: '@babel/preset-react',
    version: '^7.0.0',
  }, {
    name: '@babel/runtime',
    version: '^7.5.5',
  }, {
    name: '@babel/plugin-transform-runtime',
    version: '^7.5.5',
  }, {
    name: 'babel-loader',
    version: '^8.0.6',
  }],
  eslint: [{
    name: 'eslint',
    version: '^6.2.2'
  }, {
    name: 'eslint-loader',
    version: '^3.0.0'
  }, {
    name: 'babel-eslint',
    version: '^10.0.3'
  }, {
    name: 'eslint-plugin-react',
    version: '^7.14.3'
  }],
  prettier: [{
    name: 'prettier',
    version: '1.18.2',
  }, {
    name: 'prettier',
    version: '',
  }],
  typescript: [{
    name: 'typescript',
    version: '^3.6.2'
  }, {
    name: 'ts-loader',
    version: '^6.0.4'
  }, {
    name: '@typescript-eslint/parser',
    version: '^2.0.0',
  }, {
    name: '@typescript-eslint/eslint-plugin',
    version: '^2.0.0',
  }],
  css: [{
    name: 'css-loader',
    version: '^3.2.0',
  }, {
    name: 'style-loader',
    version: '^1.0.0',
  }, {
    name: 'postcss-loader',
    version: '^3.0.0',
  }, {
    name: 'postcss-preset-env',
    version: '^6.7.0',
  }],
  sass: [{
    name: 'node-sass',
    version: '^4.12.0'
  }, {
    name: 'sass-loader',
    version: '^8.0.0'
  }],
  less: [{
    name: 'less',
    version: '^3.10.3'
  }, {
    name: 'less-loader',
    version: '^5.0.0'
  }],
  stylus: [{
    name: 'stylus',
    version: '^0.54.7'
  }, {
    name: 'stylus-loader',
    version: '^3.0.2'
  }],
  gulp: [{
    name: 'gulp',
    version: '^4.0.2',
  }, {
    name: 'webpack-stream',
    version: '^5.2.1',
  }],
  test: [{
    name: 'jest',
    version: '^24.9.0',
  }],
  types: [{
    name: '@types/node',
    version: '^12.7.4',
  }, {
    name: '@types/react',
    version: '^16.9.2',
  }, {
    name: '@types/react-dom',
    version: '^16.9.0',
  }, {
    name: '@types/react-router',
    version: '^5.0.3',
  }, {
    name: '@types/react-router-dom',
    version: '^4.3.5',
  }, {
    name: '@types/jest',
    version: '^24.0.18'
  }],
  features: [{
    name: '@babel/plugin-proposal-class-properties', // class中可以使用箭头函数
    version: '^7.5.5',
  }, {
    name: '@babel/plugin-proposal-decorators', // 装饰器
    version: '^7.6.0',
  }],
}