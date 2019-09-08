import axios from '@/utils/axios'

export default {
  getDashboardInit (data) {
    return axios({
      url: '/dashboard/init',
      method: 'POST',
      data
    })
  }
}
