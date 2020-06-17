export default {
  path: 'resource',
  name: 'Resource',
  meta: {
    title: '资源管理'
  },
  component: () => import( /* webpackChunkName: "system" */ './index.vue')
}
