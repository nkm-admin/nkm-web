import request from '@/request'

export default {
  getDictionaryTree (data) {
    return request({
      url: '/system/dictionary/tree',
      data
    })
  },

  saveDictionary (data) {
    return request({
      url: '/system/dictionary/save',
      method: 'POST',
      data
    })
  },

  delDictionary (data) {
    return request({
      url: '/system/dictionary/del',
      method: 'POST',
      data
    })
  }
}
