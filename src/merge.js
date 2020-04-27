/**
 * 多个对象合并
 * @param  {...object} args 待合并的对象
 */
export default function merge(...args) {
  const result = {}
  function assignValue([key, val]) {
    if (Array.isArray(result[key]) && Array.isArray(val)) {
      result[key] = Array.from(new Set(result[key].concat(val)))
    } else if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val)
    } else {
      result[key] = val
    }
  }

  for (let i = 0, l = args.length; i < l; i += 1) {
    Object.entries(args[i]).forEach(assignValue)
  }
  return result
}
