export default function merge(...args) {
  const result = {}
  function assignValue([key, val]) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
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
