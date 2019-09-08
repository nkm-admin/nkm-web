export default {
  path: 'role',
  name: 'Role',
  meta: {
    title: '角色管理',
    loading: {
      isShow: false,
      text: '正在加载角色...'
    }
  },
  component: () => import( /* webpackChunkName: "system" */ './index.vue')
}
