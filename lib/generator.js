const fs = require('fs-extra')
const path = require('path')
const { log, DependencyHelper } = require('./util')

class Generator {
  static META_FILE = 'meta.js'
  static SRC = 'src'

  constructor(src, dest, options) {
    this.src = src
    this.dest = dest
    this.options = options
  }

  generate() {
    // check & create directory
    fs.mkdirSync(this.dest)
    log(`开始创建${this.dest}`)

    // copy
    const filenames = fs.readdirSync(this.src)
    const meta = require(path.resolve(this.src, Generator.META_FILE))

    filenames
      .filter(name => name !== Generator.META_FILE)
      .filter(fileFilter(meta.fileFilters, this.options))
      .forEach(filename => {
        const sourcePath = path.join(this.src, filename)
        const targetPath = path.join(this.dest, filename)

        const stat = fs.statSync(sourcePath)
        if (stat.isFile()) {
          fs.copySync(sourcePath, targetPath)
        } else if (stat.isDirectory()) {
          if (filename === Generator.SRC) {
            fs.copySync(path.join(sourcePath, this.options['language']), targetPath)
          } else {
            fs.copySync(sourcePath, targetPath)
          }
        } else {
          // ignore
        }
      })

    generatePackageJson(meta.packageJsonMeta, {
      src: this.src,
      dest: this.dest,
    }, this.options)

    log(`创建完毕`)
  }
}

function fileFilter(list = [], options) {
  const filelist = list.reduce((arr, { name, when }) => {
    const names = []
    if (typeof name === 'string') {
      names.push(name)
    } else if (Array.isArray(name)) {
      names.push(...name)
    }
    if (when && typeof when === 'function' && !when(options)) {
      arr.push(...names)
    }
    return arr
  }, [])
  return function (filename) {
    return !filelist.find(o => o === filename)
  }
}

function generatePackageJson(meta, conf, options) {
  const { name, description } = options
  const json = {
    name,
    description,
    ...meta,
  }
  // filter dependencies
  const helper = new DependencyHelper()
  helper.add(['required'])
  helper.add([
    'babel',
    'webpack',
    'eslint',
    'css',
    'features',
    options['preprocessor'],
  ], true)

  if (options['language'] === 'ts') {
    helper.add([
      'typescript',
      'types',
    ], true)
  }

  const o = {
    ...json,
    ...helper.generate(),
  }

  fs.writeFileSync(path.join(conf.dest, 'package.json'), JSON.stringify(o, null, 2))
}


module.exports = Generator