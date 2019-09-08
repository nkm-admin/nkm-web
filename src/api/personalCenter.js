import axios from '@/utils/axios'

export default {
  updateInfo (data) {
    return axios({
      url: '/personal-center/update-info',
      method: 'POST',
      data
    })
  },

  // 修改密码
  modifyPassword (data) {
    return axios({
      url: '/personal-center/modify-password',
      method: 'POST',
      data
    })
  }
}
