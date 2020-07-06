import API from '@/api'

export default {
  state: {},
  mutations: {},
  actions: {
    // 更新用户信息
    async updateInfo (context, reqData) {
      try {
        let { data } = await API.personalCenter.updateInfo(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    // 上传头像
    async upload (context, reqData) {
      try {
        const formData = new FormData()
        for (let [key, value] of Object.entries(reqData)) {
          formData.append(key, value)
        }
        let { data } = await API.upload(formData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async modifyPassword (context, reqData) {
      try {
        let { data } = await API.personalCenter.modifyPassword(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}
