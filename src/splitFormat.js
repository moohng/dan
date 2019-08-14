/**
 * 分隔字符串
 * @param {String|Number} value 待处理的值
 * @param {Number} per 分隔长度
 * @param {String} separator 分隔符
 * @param {Boolean} reverse 是否反向（从右到左）
 */
export default function formatSplit(value, options) {
  if (typeof value !== 'number' && typeof value !== 'string') return ''
  let per = 3
  let separator = ' '
  let reverse = false
  if (typeof options === 'number') per = options
  if (typeof options === 'string') separator = options
  if (typeof options === 'boolean') reverse = options
  if (typeof options === 'object') {
    per = options.per || per
    separator = options.separator || separator
    reverse = options.reverse || reverse
  }
  let newValue = String(value)
  if (!newValue) return value
  newValue = reverse ? newValue : newValue.split('').reverse().join('')
  newValue = newValue.replace(new RegExp(`\\B(?=(.{${per}})+$)`, 'g'), separator)
  return reverse ? newValue : newValue.split('').reverse().join('')
}
