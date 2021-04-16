import API from '@/api'
import { deepCopy } from '@/utils'
const UPDATE_TREE = 'UPDATE_TREE'
const UPDATE_LIST = 'UPDATE_LIST'

const resource = {
  state: {
    tree: [],
    list: []
  },
  mutations: {
    [UPDATE_TREE] (state, data) {
      state.tree = data
    },
    [UPDATE_LIST] (state, data) {
      state.list = data
    }
  },
  actions: {
    async getResourceTree ({ commit }) {
      try {
        let { data } = await API['system/resource'].getResourceTree()
        commit(UPDATE_TREE, data)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getResourceList ({ commit }) {
      try {
        let { data } = await API['system/resource'].getResourceList()
        commit(UPDATE_LIST, data)
        return Promise.resolve(deepCopy(data))
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async saveResource (context, reqData) {
      try {
        let { data } = await API['system/resource'].saveResource(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async delResource (context, reqData) {
      try {
        let { data } = await API['system/resource'].delResource(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default resource
