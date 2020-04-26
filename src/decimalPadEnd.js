/**
 * 小数位数补齐
 * @param {Number} value 值
 * @param {number} len 小数长度
 */
export default function decimalPadEnd(value, len) {
  const valueStr = String(value)
  const valueArr = valueStr.split('.')
  if (len > 0) {
    valueArr[1] = valueArr[1] ?? ''
    valueArr[1] = valueArr[1].padEnd(len, '0')
  }
  return valueArr.join('.')
}
