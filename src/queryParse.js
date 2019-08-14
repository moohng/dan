export default function queryParse(qs = '') {
  return qs.match(/[^&]+/g).reduce((query, matched) => {
    const t = matched.match(/[^=?]+/g)
    const hasKey = query[t[0]]
    if (hasKey !== undefined) {
      return { ...query, [t[0]]: [].concat(hasKey, t[1]) }
    }
    return { ...query, [t[0]]: t[1] }
  }, {})
}
