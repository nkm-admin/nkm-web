import axios from '@/utils/axios'

export default {
  getDictionaryTree (data) {
    return axios({
      url: '/system/dictionary/tree',
      method: 'POST',
      data
    })
  },

  saveDictionary (data) {
    return axios({
      url: '/system/dictionary/save',
      method: 'POST',
      data
    })
  },

  delDictionary (data) {
    return axios({
      url: '/system/dictionary/del',
      method: 'POST',
      data
    })
  }
}
