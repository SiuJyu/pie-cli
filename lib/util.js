const fs = require('fs-extra')

function getDependencies(list = []) {
  const o = {}
  list.forEach(({name, version}) => {
    o[name] = version
  })
  return o
}
module.exports = {
  getDependencies,
}