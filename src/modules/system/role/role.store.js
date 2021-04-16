import API from '@/api'
const UPDATE_ROLE_LIST = 'UPDATE_ROLE_LIST'

const role = {
  state: {
    list: []
  },
  mutations: {
    [UPDATE_ROLE_LIST] (state, data) {
      state.list = data
    }
  },
  actions: {
    async getRoleList ({ commit }) {
      try {
        let { data } = await API['system/role'].getRoleList()
        commit(UPDATE_ROLE_LIST, data)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async saveRole (context, reqData) {
      try {
        let { data } = await API['system/role'].saveRole(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async delRole (context, reqData) {
      try {
        let { data } = await API['system/role'].delRole(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default role
