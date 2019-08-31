const packageJsonMeta = {
  version: '0.1.0',
  author: '',
  license: '',
  main: 'index.js',
  scripts: {
    dev: 'webpack-dev-server --config ./webpack/webpack.dev.js',
    build: 'webpack --watch --config ./webpack/webpack.prod.js',
  }
}

module.exports = {
  packageJsonMeta,
}