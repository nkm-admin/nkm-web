import CryptoJS from 'crypto-js'

const SECRET_KEY = CryptoJS.MD5('@$!nkm-123456').toString()

class AES {
  encrypt (data) {
    if (!data) return ''
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  }
  decrypt (cipherText) {
    if (!cipherText) return ''
    return CryptoJS.AES.decrypt(cipherText, SECRET_KEY).toString(CryptoJS.enc.Utf8)
  }
}

export const AESHelper = new AES()
