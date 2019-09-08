import Vue from 'vue'
import './SvgIcon'
const context = require.context('./', true, /index\.vue$/)

context.keys().forEach(componentPath => {
  Vue.component(context(componentPath).default.name, context(componentPath).default)
})
