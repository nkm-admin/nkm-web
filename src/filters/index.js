import Vue from 'vue'
import DateJS from '@xuanmo/datejs'
Vue.filter('formatDate', value => {
  if (!value) return ''
  return DateJS(new Date(value)).format()
})
