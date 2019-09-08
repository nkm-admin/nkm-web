import API from '@/api'

const user = {
  state: {},
  mutations: {},
  actions: {
    async getUserList () {
      try {
        let { data } = await API.getUserList()
        data.data.map(item => {
          item.btnLoading = false
        })
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async modifyStatus (context, reqData) {
      try {
        let { data } = await API.modifystatus(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async resetPassword (context, reqData) {
      try {
        let { data } = await API.resetPassword(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async allocationRole (context, reqData) {
      try {
        let { data } = await API.allocationRole(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async registered (context, reqData) {
      try {
        let { data } = await API.registered(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default user
