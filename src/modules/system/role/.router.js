export default {
  path: 'role',
  name: 'Role',
  meta: {
    title: '角色管理'
  },
  component: () => import( /* webpackChunkName: "system" */ './index.vue')
}
