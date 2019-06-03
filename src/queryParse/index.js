/**
 * 解析 qs 字符串到 query 对象
 * @param {string} qs qs 字符串
 */
export default function queryParse(qs) {
  if (typeof qs !== 'string') return {}
  const startIndex = qs.lastIndexOf('?')
  if (startIndex < 0) return {}
  return qs.slice(startIndex + 1).match(/[^&]+/g).reduce((query, matched) => {
    const t = matched.match(/[^=]+/g)
    const value = t[1]
    if (typeof value === 'undefined') return query
    const hasKey = query[t[0]]
    if (hasKey !== undefined) {
      return { ...query, [t[0]]: [].concat(hasKey, value) }
    }
    return { ...query, [t[0]]: value }
  }, {})
}
