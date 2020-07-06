import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import { DEFAULT_PAGE_LIMIT } from '@/utils/const'

Vue.use(Vuex)

class StoreModules {
  storeModulesContext () {
    return require.context('../modules', true, /\.store\.js$/)
  }

  storeBaseModulesContext () {
    return require.context('./modules', true, /\.js$/)
  }

  getStoreModules () {
    const modules = {}
    const context = this.storeModulesContext()
    context.keys().forEach(modulePath => {
      // 按目录名+文件名作为模块名，不包含.store.js后缀
      const moduleName = modulePath.replace(/\.?((\/[a-z]+)+)\/([a-z]+)?\.store\.js$/i, '$1').replace('/', '')
      const storeModule = context(modulePath).default
      // 是否开启命名空间
      if (storeModule.namespaced !== false) storeModule.namespaced = true
      modules[moduleName] = storeModule
    })
    return modules
  }

  getBaseStoreModules () {
    const modules = {}
    const context = this.storeBaseModulesContext()
    context.keys().forEach(modulePath => {
      // 按目录名+文件名作为模块名，不包含.store.js后缀
      const moduleName = modulePath.replace(/\.?\/([a-z]+)\.js$/i, '$1')
      const storeModule = context(modulePath).default
      // 是否开启命名空间
      if (storeModule.namespaced !== false) storeModule.namespaced = true
      modules[moduleName] = storeModule
    })
    return modules
  }

  // 合并所有模块
  getBaseModules () {
    const storeModules = this.getStoreModules()
    const baseStoreModules = this.getBaseStoreModules()
    Object.keys(storeModules).forEach(moduleName => {
      if (baseStoreModules[moduleName]) {
        throw new Error(`store模块${moduleName}已被注册！`)
      } else {
        baseStoreModules[moduleName] = storeModules[moduleName]
      }
    })
    return baseStoreModules
  }
}
const storeModules = new StoreModules()

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: storeModules.getBaseModules(),
  state: {
    DEFAULT_PAGE_LIMIT
  },
  getters
})
