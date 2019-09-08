import axios from '@/utils/axios'
export default {
  // 获取资源树
  getResourceTree (data) {
    return axios({
      url: '/system/resource/tree',
      method: 'POST',
      data
    })
  },

  // 保存资源
  saveResource (data) {
    return axios({
      url: '/system/resource/save',
      method: 'POST',
      data
    })
  },

  // 删除资源
  delResource (data) {
    return axios({
      url: '/system/resource/del',
      method: 'POST',
      data
    })
  }
}
