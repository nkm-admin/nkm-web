import store from '@/store'
import User from './user/.router'
import Resource from './resource/.router'
import Role from './role/.router'
import Dictionary from './dictionary/.router'
import { showLoading } from '@/utils'

export default {
  path: 'system',
  name: 'System',
  meta: {
    title: '系统管理'
  },
  async beforeEnter (to, name, next) {
    showLoading('正在加载系统资源...')
    to.name !== 'Resource' && await store.dispatch('system/resource/getResourceTree')
    to.name !== 'Role' && await store.dispatch('system/role/getRoleList')
    next()
  },
  component: {
    render () {
      return (<router-view />)
    }
  },
  children: [
    ...User,
    Resource,
    Role,
    Dictionary
  ]
}
