const packageJsonMeta = {
  version: '0.1.0',
  author: '',
  license: 'MIT',
  main: 'index.js',
  scripts: {
    dev: 'webpack-dev-server --config ./webpack/webpack.dev.js',
    build: 'webpack --watch --config ./webpack/webpack.prod.js',
  }
}

const fileMeta = {

}

module.exports = {
  packageJsonMeta,
  fileMeta,
}