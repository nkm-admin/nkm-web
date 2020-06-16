import Vue from 'vue'
import './XSvgIcon'
const context = require.context('./', true, /\.vue$/)

context.keys().forEach(componentPath => {
  const module = context(componentPath)
  !module.__ignore && module.default && Vue.component(module.default.name, module.default)
})
