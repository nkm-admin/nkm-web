import Axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import cookie from '@/utils/cookie'

const option = {
  timeout: 20000,
  baseURL: process.env.VUE_APP_BASE_REQUEST_API,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: (data, headers) => {
    if (headers['Content-Type'].search('application/json') !== -1) {
      return JSON.stringify(data)
    } else if (headers['Content-Type'].search('multipart/form-data') !== -1) {
      return data
    } else {
      return qs.stringify(data)
    }
  }
}

const axios = Axios.create(option)

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 请求时设置token
  config.headers.token = store.state.authen.token

  config.headers['x-csrf-token'] = cookie.get('csrfToken')
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 * 接口返回参数定义格式:
 * @return {Object}
 * data：接口返回的数据
 * success：定义请求是否成功（boolean）
 * message：定义请求的错误提示信息
 * code：定义请求返回码
 */
axios.interceptors.response.use(response => {
  // 错误拦截判断
  if (response.data && !response.data.success) {
    window.common.hideLoading()
    window.common.showMessage({
      message: response.data.message,
      type: 'error',
      onClose: () => {
        /* eslint-disable */
        switch (response.data.code) {
          // 登录已过期
          case '10002':
            store.commit('authen/LOGOUT')
            router.push({
              name: 'Login',
              query: {
                redirect: `${location.pathname}${location.search}`
              }
            })
            break
        }
        /* eslint-disable */
      }
    })
    return Promise.reject(response.data)
  }
  return {
    data: response.data,
    status: response.status,
    headers: response.headers,
    statusText: response.statusText
  }
}, error => {
  window.common.hideLoading()
  const errMsg = error.message
  if (errMsg.indexOf('timeout') !== -1) {
    window.common.showMessage({
      message: '请求超时！',
      type: 'error'
    })
  } else {
    window.common.showMessage({
      message: error.message || '请求失败',
      type: 'error'
    })
  }
  return Promise.reject(error)
})

export default axios
