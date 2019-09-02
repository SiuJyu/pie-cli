const fs = require('fs-extra')
const { execSync } = require('child_process')
const pkg = require('./pkg')

function log(...args) {
  console.log(...args)
}

function getCmdOptions(cmd) {
  const options = {}
  cmd.options.forEach(o => {
    const k = o.long.replace(/^--/, '')
    options[k] = cmd[k]
  })
  return options
}

function getPkgManager() {
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return 'yarn'
  } catch(e) {
    return 'npm'
  }
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

module.exports = {
  log,
  DependencyHelper,
  getCmdOptions,
  getPkgManager,
}