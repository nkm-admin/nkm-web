import store from '@/store'

export const showLoading = config => store.dispatch('showLoading', config)

export const hideLoading = () => store.dispatch('hideLoading')

export const showMessage = config => store.dispatch('showMessage', config)

export const showConfirm = config => store.dispatch('showConfirm', config)

// 获取查询参数
export const getQueryParams = params => {
  const obj = {}
  const _params = window.decodeURIComponent(params)
  _params.split('&').map(item => {
    item.replace(/([^?&]*)=([^?&]*)/, (match, $1, $2) => {
      obj[$1] = $2
    })
  })
  return obj
}

// 深拷贝
export const deepCopy = obj => {
  let result = Array.isArray(obj) ? [] : {}
  for (let [key, value] of Object.entries(obj)) {
    result[key] = typeof value === 'object' ? deepCopy(value) : value
  }
  return result
}

// 倒计时
export function countDown (during, duringCallback, endCallback, timer) {
  during = +during
  if (during > 0) {
    duringCallback(during)
    during--
    window[timer] = setTimeout(() => {
      countDown(during, duringCallback, endCallback, timer)
    }, 1000)
  } else {
    clearTimeout(window[timer])
    endCallback()
  }
}
