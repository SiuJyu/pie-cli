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

    filenames.forEach(filename => {
      const sourcePath = path.join(this.src, filename)
      const targetPath = path.join(this.dest, filename)

      const stat = fs.statSync(sourcePath)
      if (stat.isFile() && filename !== Generator.META_FILE) {
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