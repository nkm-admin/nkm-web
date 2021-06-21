import store from '@/store'

export { isObject, isEmpty, deepCopy, searchParams } from '@xuanmo/javascript-utils'

export const showLoading = config => store.dispatch('showLoading', config)

export const hideLoading = () => store.dispatch('hideLoading')

export const showMessage = config => store.dispatch('showMessage', config)

export const confirm = config => store.dispatch('showConfirm', config)

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
