import decode from './decode'

/**
 * 解析query字符串到query对象
 * @param {string} qs query字符串
 */
export default function querystring(qs = '') {
  if (typeof qs !== 'string') return {}
  const index = qs.indexOf('?')
  if (index > 0) {
    qs = qs.substring(index)
  }
  const parser = /([^=?&]+)=?([^&]*)/g
  const result = {}

  let part = parser.exec(qs)
  while (part) {
    const key = decode(part[1])
    const value = decode(part[2])
    if (!(key === null || value == null)) {
      result[key] = key in result ? [].concat(result[key], value) : value
      part = parser.exec(qs)
    }
  }

  return result
}
