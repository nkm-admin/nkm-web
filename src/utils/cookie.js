// TODO 剩余功能待完善
// 对cookie的封装
class Cookie {
  get (key) {
    const cookies = {}
    document.cookie.split(';').forEach(item => {
      const { key, value } = /(?<key>\S+)=(?<value>\S+)/.exec(item).groups
      cookies[key] = decodeURIComponent(value)
    })
    return cookies[key]
  }

  set (key, value) {
    document.cookie = `${key}=${value}`
  }
}

export default new Cookie()
