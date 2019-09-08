import axios from '@/utils/axios'

export default {
  getRoleList (data) {
    return axios({
      url: '/system/role/list',
      method: 'POST',
      data
    })
  },
  saveRole (data) {
    return axios({
      url: '/system/role/save',
      method: 'POST',
      data
    })
  },
  delRole (data) {
    return axios({
      url: '/system/role/del',
      method: 'POST',
      data
    })
  }
}
