import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './components'
import './directive'
import * as utils from '@/utils'

// 引入element-ui
import ElementUI from 'element-ui'
import './assets/scss/index.scss'
Vue.use(ElementUI, {
  size: 'small'
})

// 引入scss
import './assets/scss/index.scss'

// 引入svg-icon组件
import './components/SvgIcon'

Vue.config.productionTip = false

// 全局方法
window.common = {
  showLoading: utils.showLoading,
  hideLoading: utils.hideLoading,
  showMessage: utils.showMessage,
  showConfirm: utils.showConfirm
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
