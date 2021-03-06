const inquirer = require("inquirer")
const path = require('path')
const questions = require('./questions')

/**
 * 选择模板创建新的项目
 */
module.exports = function() {
  const baseDir = process.cwd()
  const sourceDir = path.resolve(__dirname, '../template/default')

  inquirer.prompt(questions.templateQuestion)
    .then(answers => {
      const { name } = answers
    })
}
