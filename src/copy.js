/**
 * 复制文本
 * @param {String} text 文本字符串
 */
export default function copy(text) {
  if (text == null) {
    return false
  }

  const $textNode = document.createElement('textarea')
  $textNode.value = text
  $textNode.style.width = '0'
  $textNode.style.height = '0'

  document.body.appendChild($textNode)
  $textNode.select()

  let result = false
  try {
    result = document.execCommand('copy')
  } catch (err) {
    // 浏览器不支持，请手动长按文本复制
    console.error('浏览器不支持，请手动长按文本复制')
  }
  $textNode.remove()

  return result
}
