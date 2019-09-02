const inquirer = require("inquirer")
const path = require('path')
const fs = require('fs-extra')
const { spawn } = require('child_process')
const questions = require('./questions')
const Generator = require('./generator')
const { log, getPkgManager } = require('./util')

const REGISTY = 'https://registry.npm.taobao.org'
/**
 * 创建新的项目
 */
module.exports = function (options) {
  const baseDir = options.target ? options.target : process.cwd()
  const sourceDir = path.resolve(__dirname, '../template/default')

  inquirer.prompt(questions.configQuestion)
    .then(answers => {
      const { name } = answers
      const targetDir = path.resolve(baseDir, name)

      if (options.force) {
        fs.removeSync(targetDir)
      }

      if (fs.existsSync(targetDir)) {
        console.error('创建失败, 目录已存在')
        return
      }

      // write template files to target path
      const generator = new Generator(sourceDir, targetDir, answers)
      generator.generate()

      // install dependencies
      if (options.setup) {
        log('开始安装依赖...')
        const pkgManager = getPkgManager()
        const cmd = pkgManager === 'yarn' ? '' : `install --registy=${REGISTY}`
        const exe = spawn(pkgManager, [cmd], {
          cwd: targetDir,
          shell: true,
          stdio: 'inherit',
        })
        exe.on('close', (code) => {
          if (code === 0) {
            log('依赖安装成功')
          }
        })
      }
    })
}
