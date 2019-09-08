import axios from '@/utils/axios'
export default {
  // 获取用户列表
  getUserList (data) {
    return axios({
      url: '/system/user/list',
      method: 'POST',
      data
    })
  },

  // 修改用户状态
  modifystatus (data) {
    return axios({
      url: '/system/user/modify',
      method: 'POST',
      data
    })
  },

  // 重置密码
  resetPassword (data) {
    return axios({
      url: '/system/user/reset-password',
      method: 'POST',
      data
    })
  },

  // 分配角色
  allocationRole (data) {
    return axios({
      url: '/system/user/allocation-role',
      method: 'POST',
      data
    })
  },

  // 注册用户
  registered (data) {
    return axios({
      url: '/registered',
      method: 'POST',
      data
    })
  }
}
