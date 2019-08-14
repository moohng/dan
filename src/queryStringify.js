export default function queryStringify(query) {
  return Object.keys(query).reduce((s, key) => {
    const val = query[key]
    if (val == null) {
      return s
    }
    if (Array.isArray(val)) {
      if (!val.length) return s
      const tempS = val.filter(v => v != null).map(v => `${key}=${v}`).join('&')
      return `${s}&${tempS}`
    }
    return `${s}&${key}=${val}`
  }, '').slice(1)
}
