import {
  Message,
  MessageBox
} from 'element-ui'
const widget = {
  namespaced: false,
  state: {
    loading: {
      show: false,
      text: '加载中...',
      background: 'rgba(255, 255, 255, 0.6)'
    },
    message (config) {
      return Message({
        message: config.message,
        type: config.type,
        iconClass: config.iconClass,
        duration: config.duration,
        showClose: config.showClose,
        center: config.center,
        onClose: config.onClose
      })
    },
    confirm (config) {
      return MessageBox({
        title: config.title,
        message: config.message,
        type: config.type,
        callback: config.callback,
        showClose: config.showClose,
        showCancelButton: config.showCancelButton,
        showConfirmButton: config.showConfirmButton,
        cancelButtonText: config.cancelButtonText,
        confirmButtonText: config.confirmButtonText
      })
    }
  },

  mutations: {
    showLoading (state, config) {
      state.loading = {
        ...state.loading,
        ...config
      }
    },

    hideLoading (state) {
      state.loading.show = false
    },

    showMessage (state, config) {
      let toastConfig = {
        type: 'info',
        duration: 2000,
        center: false,
        onClose: () => {}
      }
      state.message(Object.assign({}, toastConfig, config))
    },

    showConfirm (state, config) {
      let confirmConfig = {
        title: '标题',
        message: '',
        type: '',
        callback () {},
        showClose: true,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }
      state.confirm(Object.assign({}, confirmConfig, config))
    }
  },

  actions: {
    showLoading ({ commit }, config) {
      let loadingConfig = {}
      if (typeof config === 'string') {
        loadingConfig = {
          text: config,
          show: true
        }
      } else {
        loadingConfig = {
          ...config,
          show: true
        }
      }
      commit('showLoading', loadingConfig)
    },

    hideLoading ({ commit }) {
      commit('hideLoading')
    },

    showMessage ({ commit }, config) {
      let toastConfig = {
        show: true
      }
      if (typeof config === 'string') {
        toastConfig.message = config
      } else if (typeof config === 'object') {
        toastConfig = {
          ...toastConfig,
          ...config
        }
      } else {
        throw Error('"message"传入参数类型错误')
      }
      commit('showMessage', toastConfig)
    },

    showConfirm ({ commit }, config) {
      commit('showConfirm', config)
    }
  }
}

export default widget
