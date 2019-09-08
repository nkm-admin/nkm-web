import API from '@/api'
const UPDATE_TREE = 'UPDATE_TREE'

const resource = {
  state: {
    tree: []
  },
  mutations: {
    [UPDATE_TREE] (state, data) {
      state.tree = data
    }
  },
  actions: {
    async getResourceTree ({ commit }) {
      try {
        let { data } = await API.getResourceTree()
        commit(UPDATE_TREE, data.data)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async saveResource (context, reqData) {
      try {
        let { data } = await API.saveResource(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async delResource (context, reqData) {
      try {
        let { data } = await API.delResource(reqData)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default resource
