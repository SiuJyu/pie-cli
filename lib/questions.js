const validate = require('validate-npm-package-name')

const baseQuestion = [{
  name: "type",
  type: "list",
  message: "选择创建方式",
  choices: [
    {
      name: "配置",
      value: "config",
    }
  ]
}]

const configQuestion = [
  {
    name: "name",
    type: "input",
    message: "请输入项目名称",
    validate: function (name) {
      const result = validate(name)
      if (!result.validForNewPackages) {
        return '名称错误'
      }
      return true
    },
  }, {
    name: "description",
    type: "input",
    message: "请输入项目描述",
  }, {
    name: "language",
    type: "list",
    message: "选择项目语言",
    choices: [{
      name: "Javascript",
      value: "js",
    }, {
      name: "Typescript",
      value: "ts",
    }],
    default: 0,
  }, {
    name: "preprocessor",
    type: "list",
    message: "选择CSS预处理器",
    choices: [{
      name: 'Less',
      value: 'less',
    }, {
      name: 'Sass',
      value: 'sass',
    }, {
      name: 'Stylus',
      value: 'stylus',
    }],
  }, {
    name: "lint",
    type: "list",
    message: "lint规则",
    choices: ["default", "airbnb", "prettier"],
    default: 0,
  }
]

const templateQuestion = [{
  name: 'local',
  type: 'list',
  message: '使用本地模板/远程模板?',
  choices: [{
    name: '本地',
    value: 'local',
  }, {
    name: '远程',
    value: 'remote',
  }]
}]

module.exports = {
  baseQuestion,
  configQuestion,
  templateQuestion,
}

/*
  {
    name: "preset",
    type: "checkbox",
    message: "预置包",
    choices: ["axios", "lodash", "rxjs", "antd", "moment"]
  }
  {
    name: "feature",
    type: "checkbox",
    message: "选择配置",
    choices: [{
      name: "babel",
      checked: true,
    }, {
      name: "router",
      checked: true,
    }, {
      name: "eslint",
      checked: true,
    }, {
      name: "gulp",
    }, ],
  }
*/

/*
1. framework: react/vue
2. language: javascript/typescript
3. linter: airbnb, prettier, default
4. preset: babel, react, react-dom, react-router,
5. css pre-precessor: Sass/SCSS, Less, Stylus
6. test: 
*/