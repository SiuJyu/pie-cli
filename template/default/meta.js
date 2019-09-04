const packageJsonMeta = {
  version: '0.1.0',
  author: '',
  license: 'MIT',
  main: 'index.js',
  scripts: {
    dev: 'NODE_ENV=development webpack-dev-server --config ./webpack/webpack.dev.js',
    build: 'NODE_ENV=production webpack --progress --config ./webpack/webpack.prod.js',
  }
}

const fileMeta = [{
  file: 'tsconfig.json',
  when(options) {
    return options['language'] === 'ts'
  }
}, {
  file: '.eslintrc.js',
}, {
  file: 'package.json',
}]

module.exports = {
  packageJsonMeta,
  fileMeta,
}