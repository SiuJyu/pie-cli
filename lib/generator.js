const fs = require('fs-extra')
const path = require('path')
const { DependencyHelper } = require('./util')

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
    console.log(`创建${this.dest}`)

    // copy
    const filenames = fs.readdirSync(this.src)
    let meta = {}

    filenames.forEach(filename => {
      const sourcePath = path.join(this.src, filename)
      const targetPath = path.join(this.dest, filename)

      const stat = fs.statSync(sourcePath)
      if (stat.isFile()) {
        if (filename === Generator.META_FILE) {
          meta = require(sourcePath)
        } else {
          fs.copySync(sourcePath, targetPath)
        }
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
    
    generatePackageJson(meta, {
      src: this.src,
      dest: this.dest,
    }, this.options)

    console.log(`${this.dest} 创建完毕`)
  }
}

function generatePackageJson(meta, conf, options) {
  const { name, description } = options
  const json = { 
    name,
    description,
    ...meta ,
  }
  // filter dependencies
  const helper = new DependencyHelper()
  helper.add(['required'])
  helper.add([
    'babel',
    'eslint',
    'css',
    options['preprocessor'],
  ], true)

  if (options['language'] === 'ts') {
    helper.add('typescript', true)
  }

  const o = {
    ...json,
    ...helper.generate(),
  }

  fs.writeFileSync(path.join(conf.dest, 'package.json'), JSON.stringify(o, null, 2))
}


module.exports = Generator