const fs = require('fs-extra')
const path = require('path')
const pkg = require('./pkg')
const { getDependencies } = require('./util')

class Generator {
  constructor(src, dest, options, filters) {
    this.src = src
    this.dest = dest
    this.options = options
    this.filters = filters
  }

  generate() {
    // check & create directory
    if (fs.existsSync(this.dest)) {
      console.error('目录已存在')
      return
    }

    fs.mkdirSync(this.dest)
    console.log(`创建${this.dest}`)

    // copy
    const filenames = fs.readdirSync(this.src)
    filenames.forEach(filename => {
      const sourcePath = path.join(this.src, filename)
      const targetPath = path.join(this.dest, filename)

      const stat = fs.statSync(sourcePath)
      if (stat.isFile()) {
        fs.copySync(sourcePath, targetPath)
      } else if (stat.isDirectory()) {
        if (filename === 'src') {
          fs.copySync(path.join(sourcePath, this.options['language']), targetPath)
        } else {
          fs.copySync(sourcePath, targetPath)
        }
      } else {
        // ignore
      }
    })
    generatePackageJson({
      src: this.src,
      dest: this.dest,
    }, this.options)

    console.log(`${this.dest}创建完毕`)
  }
}

function generatePackageJson(conf, options) {
  const { name, description } = options
  const json = {
    name: name,
    version: '0.1.0',
    description: description,
    author: '',
    license: '',
    main: 'index.js',
    dependencies: {},
    devDependencies: {},
  }
  json.dependencies = getDependencies(pkg.required)
  const devDependencies = [...pkg['babel'], ...pkg['eslint'], ...pkg[options['preprocessor']]]
  if (options['language'] === 'ts') {
    devDependencies.push(pkg['typescript'])
  }

  json.devDependencies = getDependencies(devDependencies)
  fs.writeFileSync(path.join(conf.dest, 'package.json'), JSON.stringify(json, null, 2))
}


module.exports = Generator