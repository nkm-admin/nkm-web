import request from '@/request'
export default {
  // 获取用户列表
  getUserList (data) {
    return request({
      url: '/system/user/list',
      data
    })
  },

  // 修改用户状态
  modifystatus (data) {
    return request({
      url: '/system/user/modify',
      method: 'POST',
      data
    })
  },

  // 重置密码
  resetPassword (data) {
    return request({
      url: '/system/user/reset-password',
      method: 'POST',
      data
    })
  },

  // 分配角色
  allocationRole (data) {
    return request({
      url: '/system/user/modify-role',
      method: 'POST',
      data
    })
  },

  // 注册用户
  registered (data) {
    return request({
      url: '/system/user/registered',
      method: 'POST',
      data
    })
  }
}
