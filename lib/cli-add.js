const inquirer = require("inquirer")
const path = require('path')
const questions = require('./questions')

/**
 * 添加模板
 */
module.exports = function() {
  const baseDir = process.cwd()
  const sourceDir = path.resolve(__dirname, '../template/default')

  inquirer.prompt(questions.addQuestion)
    .then(answers => {
      const { name } = answers
    })
}
