export default {
  path: '/dashboard',
  name: 'Dashboard',
  meta: {
    title: '仪表盘'
  },
  component: () => import( /* webpackChunkName: "dashboard" */ './index.vue')
}
