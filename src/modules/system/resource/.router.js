export default {
  path: 'resource',
  name: 'Resource',
  meta: {
    title: '资源管理',
    loading: {
      isShow: true,
      text: '资源加载中...'
    }
  },
  component: () => import( /* webpackChunkName: "system" */ './index.vue')
}
