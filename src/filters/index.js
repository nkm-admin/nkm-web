import Vue from 'vue'
import { formatDate } from '@/utils'
Vue.filter('formatDate', value => {
  if (!value) return ''
  return formatDate(new Date(value))
})
