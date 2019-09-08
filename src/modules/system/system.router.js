import store from '@/store'
import User from './user/.router'
import Resource from './resource/.router'
import Role from './role/.router'
import Dictionary from './dictionary/.router'

export default {
  path: 'system',
  name: 'System',
  meta: {
    title: '系统管理'
  },
  async beforeEnter (to, name, next) {
    window.common.showLoading('正在加载系统资源...')
    await store.dispatch('/system/resource/getResourceTree')
    await store.dispatch('/system/role/getRoleList')
    next()
  },
  component: {
    render () {
      return (<router-view/>)
    }
  },
  children: [
    ...User,
    Resource,
    Role,
    Dictionary
  ]
}
