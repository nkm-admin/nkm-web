export default {
  path: 'dictionary',
  name: 'Dictionary',
  meta: {
    title: '数据字典'
  },
  component: () => import( /* webpackChunkName: "system" */ './index.vue')
}
