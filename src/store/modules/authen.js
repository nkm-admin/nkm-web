import API from '@/api'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'

// 加载本地数据
const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
const { menu, menuUrlList, token, btnList } = userInfo

const authen = {
  state: {
    userInfo,
    menu,
    menuUrlList,
    token,
    btnList
  },
  mutations: {
    [LOGIN] (state, userInfo) {
      state.userInfo = userInfo
      state.menu = userInfo.menu
      state.menuUrlList = userInfo.menuUrlList
      state.token = userInfo.token
      state.btnList = userInfo.btnList
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    [LOGOUT] (state) {
      state.userInfo = {}
      state.menu = []
      state.menuUrlList = []
      state.token = ''
      state.btnList = []
      sessionStorage.clear()
    },
    [UPDATE] (state, data) {
      for (let [key, value] of Object.entries(data)) {
        state.userInfo[key] = value
        sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      }
    }
  },
  actions: {
    async login ({ commit }, reqData) {
      try {
        let { data: { data } } = await API.login(reqData)
        commit(LOGIN, data)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async getCaptcha (context, params) {
      try {
        let { data } = await API.getCaptcha(params)
        return Promise.resolve(data.data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default authen
