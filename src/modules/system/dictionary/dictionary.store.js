import API from '@/api'
const SET_TREE = 'SET_TREE'
const tree = JSON.parse(sessionStorage.getItem('dictionary')) || []

const dictionary = {
  state: {
    tree
  },
  getters: {
    getDictionary: state => key => {
      const obj = {}
      const deep = arr => {
        arr.map(item => {
          if (item.children.length) deep(item.children)
          obj[item.code] = item
        })
        return arr
      }
      deep(state.tree)
      return obj[key] ? obj[key].children : []
    }
  },
  mutations: {
    [SET_TREE] (state, data) {
      state.tree = data
    }
  },
  actions: {
    async getTree ({ commit }) {
      try {
        let { data } = await API.getDictionaryTree()
        commit(SET_TREE, data.data)
        sessionStorage.setItem('dictionary', JSON.stringify(data.data))
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async save (context, reqData) {
      try {
        let { data } = await API.saveDictionary(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async del (context, reqData) {
      try {
        let { data } = await API.delDictionary(reqData)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default dictionary
