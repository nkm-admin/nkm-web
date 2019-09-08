export default {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登录'
  },
  component: () => import( /* webpackChunkName: "login" */ './index.vue')
}
