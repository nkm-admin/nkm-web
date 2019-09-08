import Vue from 'vue'
import DateJS from '@/utils/date'
Vue.filter('formatDate', value => {
  if (!value) return ''
  return DateJS(new Date(value)).format()
})
