import Vue from 'vue'
import XSvgIcon from './index.vue'
Vue.component(XSvgIcon.name, XSvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg-icon', false, /\.svg$/)
requireAll(req)
