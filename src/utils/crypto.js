import CryptoJS from 'crypto-js'
import MD5 from 'crypto-js/md5'
import AES from 'crypto-js/aes'
import { SECRET_KEY } from '@/settings'
import { isObject } from '@xuanmo/javascript-utils'

export const md5 = (value) => MD5(`${value}${SECRET_KEY}`).toString()

class AESHandle {
  SECRET_KEY = md5(SECRET_KEY).toString()

  encrypt(data) {
    if (!data) return ''
    return AES.encrypt(isObject(data) ? JSON.stringify(data) : data, this.SECRET_KEY).toString()
  }

  decrypt(cipherText) {
    if (!cipherText) return ''
    return AES.decrypt(cipherText, this.SECRET_KEY).toString(CryptoJS.enc.Utf8)
  }
}

export const AESHelper = new AESHandle()
