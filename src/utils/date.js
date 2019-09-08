class DateJS {
  constructor (date = Date.now()) {
    this.date = new Date(date)
  }

  // 小于10的填充0补位
  _paddingZero (n) {
    return n < 10 ? `0${n}` : n
  }

  format (fmt = 'yyyy-MM-dd HH:mm:ss') {
    const cweek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    const obj = {
      'y+': this.date.getFullYear(),
      'M{2}': this._paddingZero(this.date.getMonth() + 1),
      'd{2}': this._paddingZero(this.date.getDate()),
      'H{2}': this._paddingZero(this.date.getHours()),
      'h{2}': this._paddingZero(this.date.getHours() % 12),
      'm{2}': this._paddingZero(this.date.getMinutes()),
      's{2}': this._paddingZero(this.date.getSeconds()),
      'M': this.date.getMonth() + 1,
      'd': this.date.getDate(),
      'H': this.date.getHours(),
      'h': this.date.getHours() % 12,
      'm': this.date.getMinutes(),
      's': this.date.getSeconds(),
      'W': this.date.getDay(),
      'cw': cweek[this.date.getDay() - 1]
    }
    for (let [key] of Object.entries(obj)) {
      const regexp = new RegExp(`(${key})([^a-zA-Z])?`)
      if (regexp.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, obj[key])
      }
    }
    return fmt
  }
}

export default date => new DateJS(date)
