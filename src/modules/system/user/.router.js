export default [
  {
    path: 'user',
    name: 'User',
    meta: {
      title: '用户管理'
    },
    component: () => import( /* webpackChunkName: "system" */ './index.vue')
  }
]
