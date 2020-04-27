import encode from './encode'

/**
 * 将query对象转成字符串
 * @param {object} query query对象
 * @param {string} prefix 前缀
 */
export default function querystringify(query, prefix) {
  prefix = prefix || ''
  if (typeof prefix !== 'string') {
    prefix = '?'
  }
  const pairs = []

  function assign(k, v) {
    if (k !== null && v !== null) {
      pairs.push(`${k}=${v}`)
    }
  }

  Object.keys(query).forEach(key => {
    let val = query[key]
    if (val === null || val === undefined || Number.isNaN(val)) {
      val = ''
    }

    key = encode(key)

    if (Array.isArray(val)) {
      val.forEach(v => {
        v = encode(v)
        assign(key, v)
      })
    } else {
      val = encode(val)
      assign(key, val)
    }
  })

  return pairs.length ? prefix + pairs.join('&') : ''
}
