export default [
  {
    path: '/403',
    name: 'NoPermissiom',
    meta: {
      title: 'Forbidden'
    },
    component: () => import( /* webpackChunkName: "error" */ './forbidden.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: '404'
    },
    component: () => import( /* webpackChunkName: "error" */ './notFound.vue')
  }
]
