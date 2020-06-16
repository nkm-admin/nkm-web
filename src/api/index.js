import request from '@/request'

const context = require.context('./', true, /\.js/)
let apiArr = {}
context.keys().forEach(apiPath => {
  apiArr = Object.assign({}, context(apiPath).default, apiArr)
})

export default {
  // 登录
  login (data) {
    return request({
      url: '/login',
      method: 'POST',
      data
    })
  },

  // 退出
  logout () {
    return request({
      url: '/login-out',
      method: 'POST'
    })
  },

  // 获取验证码
  getCaptcha (params) {
    return request({
      url: '/captcha',
      params
    })
  },

  // 上传文件
  upload (data) {
    return request({
      url: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data;'
      },
      data,
      method: 'POST'
    })
  },

  ...apiArr
}
