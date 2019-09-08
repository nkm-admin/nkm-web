export default {
  path: 'personal-center',
  name: 'PersonalCenter',
  meta: {
    title: '个人中心'
  },
  component: () => import(/* webpackChunkName: "personalCenter" */ './index.vue')
}
