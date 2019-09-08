import axios from '@/utils/axios'

const context = require.context('./', true, /\.js/)
let apiArr = {}
context.keys().forEach(apiPath => {
  apiArr = Object.assign({}, context(apiPath).default, apiArr)
})

export default {
  // 登录
  login (data) {
    return axios({
      url: '/login',
      method: 'POST',
      data
    })
  },

  // 退出
  logout () {
    return axios({
      url: '/login-out',
      method: 'POST'
    })
  },

  // 获取验证码
  getCaptcha (params) {
    return axios({
      url: '/captcha',
      params
    })
  },

  ...apiArr
}
