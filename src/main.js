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

import DTable from '@xuanmo/d-table'
Vue.use(DTable, {
  tableConfig: {
    border: true
  },
  props: {
    total: 'count',
    pageSize: 'limit'
  }
})

// 引入scss
import './assets/scss/index.scss'

// 引入svg-icon组件
import './components/XSvgIcon'

Vue.config.productionTip = false

// 全局方法
Vue.prototype.$_Dcommon = {
  showLoading: utils.showLoading,
  hideLoading: utils.hideLoading,
  showMessage: utils.showMessage,
  confirm: utils.confirm
}

document.querySelector('html').setAttribute('data-theme', localStorage.getItem('mode'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
