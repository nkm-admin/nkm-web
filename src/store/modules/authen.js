import API from '@/api'
import { AESHelper } from '@/utils/crypto'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'

// 加载本地数据
const userInfo = JSON.parse(AESHelper.decrypt(sessionStorage.getItem('userInfo')) || '{}')

const authen = {
  state: {
    ...userInfo
  },
  mutations: {
    [LOGIN] (state, data) {
      for (const [_key, _value] of Object.entries(data)) {
        state[_key] = _value
      }
      sessionStorage.setItem('userInfo', AESHelper.encrypt(data))
    },
    [LOGOUT] (state) {
      state.userInfo = {}
      state.menu = []
      state.menuUrls = []
      state.token = ''
      state.btnCodes = []
      sessionStorage.clear()
    },
    [UPDATE] (state, data) {
      for (let [key, value] of Object.entries(data)) {
        state.userInfo[key] = value
      }
      sessionStorage.setItem('userInfo', AESHelper.encrypt({
        ...state,
        userInfo: {
          ...state.userInfo,
          ...data
        }
      }))
    }
  },
  actions: {
    async login ({ commit }, reqData) {
      try {
        let { data } = await API.login(reqData)
        commit(LOGIN, data)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async getCaptcha (context, params) {
      try {
        let { data } = await API.getCaptcha(params)
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

export default authen
