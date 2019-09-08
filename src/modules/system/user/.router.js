export default [
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户管理',
      loading: {
        isShow: true,
        text: '用户列表加载中...'
      }
    },
    component: () => import( /* webpackChunkName: "system" */ './index.vue')
  }
]
