/**
 * 待编码的字符串
 * @param {string} input 字符串
 */
export default function encode(input) {
  try {
    return encodeURIComponent(input)
  } catch (e) {
    return null
  }
}
