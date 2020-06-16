import request from '@/request'

export default {
  getRoleList (data) {
    return request({
      url: '/system/role/list',
      data
    })
  },
  saveRole (data) {
    return request({
      url: '/system/role/save',
      method: 'POST',
      data
    })
  },
  delRole (data) {
    return request({
      url: '/system/role/del',
      method: 'POST',
      data
    })
  }
}
