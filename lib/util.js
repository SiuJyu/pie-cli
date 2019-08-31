const fs = require('fs-extra')
const pkg = require('./pkg')

function getDependencies(list = []) {
  const o = {}
  list.forEach(n => {
    const pkgList = pkg[n]
    pkgList.forEach(({ name, version }) => {
      o[name] = version
    })
  })
  return o
}

class DependencyHelper {
  constructor() {
    this.dependencies = []
    this.devDependencies = []
  }

  add(list = [], isDev = false) {
    if (isDev) {
      this.devDependencies.push(...list)
    } else {
      this.dependencies.push(...list)
    }
  }

  generate() {
    return {
      dependencies: getDependencies(this.dependencies),
      devDependencies: getDependencies(this.devDependencies),
    }
  }
}
module.exports = {
  DependencyHelper,
}