const inquirer = require("inquirer")
const path = require('path')
const { log } = require('./util')
const questions = require('./questions')
const Generator = require('./generator')

/**
 * 创建新的项目
 */
module.exports = function() {
  const baseDir = process.cwd()
  const sourceDir = path.resolve(__dirname, '../template/default')

  inquirer.prompt(questions.configQuestion)
    .then(answers => {
      const { name } = answers
      const targetDir = path.resolve(baseDir, name)
      const generator = new Generator(sourceDir, targetDir, answers)
      generator.generate()
    })
}


