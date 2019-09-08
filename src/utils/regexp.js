/**
 * 校验账号，包含数字与字母
 * @param {String} str 需要被校验的字符串
 */
export const matchLoginName = str => /^[a-z\d]+$/i.test(str)

/**
 * 校验名称
 * @param {String} str
 */
export const matchName = str => /^[a-z\d\u2E80-\u9FFF]+$/i.test(str)

/**
 * 校验是否纯中文
 * @param {String} str
 */
export const matchCname = str => /^[\u2E80-\u9FFF]+$/.test(str)

/**
 * 密码校验
 * @param {String} str
 */
export const matchPassword = str => /^[a-z\d,./!@#$*&]+$/i.test(str)

/**
 * 校验邮箱
 * @param {String} str
 */
export const matchEmail = str => /^(\w+|\w+(\.\w+))+@(\w+\.)+\w+$/.test(str)

/**
 * 校验是否为纯数字
 * @param {String} str
 */
export const matchNumber = str => /^\d+$/.test(str)

/**
 * 校验浮点数
 * @param {String} str
 */
export const matchFloatNumber = str => /^\d+(\.\d+)?$/.test(str)
