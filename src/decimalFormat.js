// 精度处理
export default function decimalFormat(value, precision = 2, isCut) {
  if (typeof precision === 'boolean') {
    isCut = precision
    precision = 2
  }
  const newValue = parseFloat(value)
  if (!Number.isNaN(newValue)) {
    precision = 10 ** precision
    let output = Math.round(newValue * precision) / precision
    if (isCut) {
      output = Math.floor(newValue * precision) / precision
    }
    return output
  }
  return value
}
