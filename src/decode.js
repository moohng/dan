/**
 * 解析被编码的URL字符串
 * @param {string} input 字符串
 */
export default function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '))
  } catch (e) {
    return null
  }
}
