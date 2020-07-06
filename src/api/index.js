// 生成项目中所有的请求，并使用命名空间的形式注入
// 如获取用户列表(getUserList)，api路径：system/user.js  =>  [system/user].getUserList

import request from '@/request'

const context = require.context('./', true, /\.js/)
let apiModules = {}
context.keys().forEach(path => {
  if (path !== './index.js') {
    const module = path.replace('.js', '').match(/[a-z]+/ig).join('/')
    apiModules[module] = context(path).default || {}
  }
})

const APIS = {
  ...apiModules,

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
  }
}

if (process.env.NODE_ENV === 'development') {
  console.group('项目中所有的api请求')
  console.log(APIS)
  console.groupEnd()
}

export default APIS
