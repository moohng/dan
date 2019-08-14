export default function decimalPadEnd(value, len) {
  const valueStr = String(value)
  const valueArr = valueStr.split('.')
  if (valueArr[1]) {
    valueArr[1] = valueArr[1].padEnd(len, '0')
  }
  return valueArr.join('.')
}
