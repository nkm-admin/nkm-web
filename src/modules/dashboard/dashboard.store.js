import API from '@/api'
const SET_MUTATION = 'SET_MUTATION'

const dashboard = {
  state: {
    test: {}
  },
  mutations: {
    [SET_MUTATION] (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    async getTest ({ commit }, reqData) {
      try {
        let { data } = await API.getDashboardInit(reqData)
        commit(SET_MUTATION, {
          key: 'test',
          value: data.data
        })
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default dashboard
