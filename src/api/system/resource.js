import request from '@/request'
export default {
  // 获取资源树
  getResourceTree (data) {
    return request({
      url: '/system/resource/tree',
      data
    })
  },

  // 获取资源列表
  getResourceList (data) {
    return request({
      url: '/system/resource/list',
      data
    })
  },

  // 保存资源
  saveResource (data) {
    return request({
      url: '/system/resource/save',
      method: 'POST',
      data
    })
  },

  // 删除资源
  delResource (data) {
    return request({
      url: '/system/resource/del',
      method: 'POST',
      data
    })
  }
}
