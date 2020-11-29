import store from '@/store'

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export { isObject }

export const showLoading = config => store.dispatch('showLoading', config)

export const hideLoading = () => store.dispatch('hideLoading')

export const showMessage = config => store.dispatch('showMessage', config)

export const confirm = config => store.dispatch('showConfirm', config)

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
export const deepCopy = data => {
  if (typeof data === 'object') {
    let result = Array.isArray(data) ? [] : {}
    for (const i in data) {
      result[i] = deepCopy(data[i])
    }
    return result
  }
  return data
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

/**
 * 一维数组转换为树形结构
 * @param {Array} arr 需要被转换的一维数组
 * @return {Array} 树形数据
 */
export function deepTree (arr) {
  const deepTree = (arr, parentId = 0) => {
    const result = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].parentId === parentId) {
        arr[i].children = deepTree(arr, arr[i].id)
        result.push(arr[i])
      }
    }
    return result
  }
  return deepTree(arr)
}

/**
 * 对数组进行排序
 * @param {Array} arr 需要被排序的树形数组
 * @return {Array} 处理后的数组
 */
export function sortTreeArr (arr) {
  function sortArr (arr) {
    arr.map((item) => {
      if (item.children.length) item.children = sortArr(item.children)
      return item
    })
    return arr.sort((a, b) => a.sort - b.sort)
  }

  return sortArr(arr)
}

/**
 * 判断是否为空
 * @param {*} value 数据源
 * @return {boolean}
 */
export function isEmpty (value) {
  if (Array.isArray(value)) return value.length === 0

  if (isObject(value)) return JSON.stringify(value) === '{}'

  return [null, undefined, ''].includes(value)
}
