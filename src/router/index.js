import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { DEFAULT_INDEX_ROUTER, APP_TITLE } from '@/config'
import { pathToRegexp } from 'path-to-regexp'

Vue.use(Router)

// 遍历所有路由
const getRoutesModules = () => {
  const context = require.context('../modules', true, /\.router\.js$/)
  const routesModules = []
  context.keys().forEach(routerPath => {
    const router = context(routerPath).default
    Array.isArray(router) ? router.map(item => routesModules.push(item)) : routesModules.push(router)
  })
  return routesModules
}
const getBaseRoutesModules = () => {
  const context = require.context('../pages', true, /\.router\.js$/)
  const routesModules = []
  context.keys().forEach(routerPath => {
    const router = context(routerPath).default
    Array.isArray(router) ? router.map(item => routesModules.push(item)) : routesModules.push(router)
  })
  return routesModules
}

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        title: '主页',
        loading: {
          isShow: false
        }
      },
      redirect: '/dashboard',
      component: () => import( /* webpackChunkName: "login" */ '../pages/main/index.vue'),
      children: getRoutesModules()
    },
    ...getBaseRoutesModules(),
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 路由全局拦截-进入页面前
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || APP_TITLE

  if (to.name === 'Login') {
    // 如果已经登录跳转至默认首页
    return store.state.authen.token ? next({ name: DEFAULT_INDEX_ROUTER.name }) : next()
  }

  if (!store.state.authen) {
    return next({ name: 'Login' })
  }

  try {
    // 判断是否有页面访问权限
    const isPermission = store.state.authen.menuUrls.findIndex(path => pathToRegexp(path).test(to.path)) === -1
    if (isPermission && to.name !== 'NoPermissiom') {
      window.common.hideLoading()
      return next({ name: 'NoPermissiom' })
    }

    next()
    to.meta.loading
      && to.meta.loading.isShow
      && window.common.showLoading(to.meta.loading.text || '加载中...')
  } catch (error) {
    next({ name: 'Login' })
  }
})

export default router
