#!/usr/bin/env node
const program = require("commander")

const pkgJson = require("../package.json")
const init = require("../lib/cli-init")
const { getCmdOptions } = require('../lib/util')

// pre-setting
program.version(pkgJson.version)

program.command("init")
  .description("Generate a new project")
  .option('-t, --target <path>', 'Set target directory')
  .option('-s, --setup', 'Setup dependencies after project generated')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((cmd) => {
    init(getCmdOptions(cmd))
  })

program.command("use")
  .description("Choose a template")
  .action(() => {
    console.warn('暂不支持模板选择')
  })

program.arguments('<command>')
  .action(cmd => {
    program.outputHelp()
  })


// 解析命令行
program.parse(process.argv)
