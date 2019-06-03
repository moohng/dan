/**
 * 转换query对象到字符串
 * @param {object} query query对象
 */
export default function queryStringify(query = {}) {
  return Object.keys(query)
    .reduce((s, key) => {
      const value = query[key]
      let result = `&${key}=${value}`
      if (Array.isArray(value)) {
        result = value.reduce((q, v) => `${q}&${key}=${v}`, '')
      }
      return s + result
    }, '')
    .slice(1)
}
