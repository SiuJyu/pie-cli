const packageJsonMeta = {
  version: '0.1.0',
  author: '',
  license: 'MIT',
  main: 'index.js',
  scripts: {
    dev: 'NODE_ENV=development webpack-dev-server --config ./webpack/webpack.dev.js',
    build: 'NODE_ENV=production webpack --config ./webpack/webpack.prod.js',
  }
}

const fileFilters = [{
  name: ['tsconfig.json', 'types'],
  when(options) {
    return options['language'] === 'ts'
  }
}]

module.exports = {
  packageJsonMeta,
  fileFilters,
}