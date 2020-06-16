import axios from '@/request'

export default {
  updateInfo (data) {
    return axios({
      url: '/system/user/update-info',
      method: 'POST',
      data
    })
  },

  // 修改密码
  modifyPassword (data) {
    return axios({
      url: '/system/user/modify-password',
      method: 'POST',
      data
    })
  }
}
