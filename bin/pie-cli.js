#!/usr/bin/env node
const program = require("commander")

const pkgJson = require("../package.json")
const init = require("../lib/cli-init")

// pre-setting
program.version(pkgJson.version)

program.command("init")
  .description("Generate a new project")
  .action(init)
program.command("use")
  .description("Choose a template")
  .action(() => {
    console.warn('暂不支持模板选择')
  })
program.command("[command]").action(() => {
})

// 解析命令行
program.parse(process.argv)
