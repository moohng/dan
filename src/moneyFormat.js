import splitFormat from './splitFormat'

/**
 * 格式化金额，按千分位以逗号分隔
 * @param {string|number} value
 * @param {function} precision 精度
 * @param {boolean} isCut 是否截取
 */
export default function moneyFormat(value, precision, isCut) {
  const num = +value
  if (Number.isNaN(num)) return value
  const [integer, float = 0] = String(num).split('.')
  // 处理整数部分
  const formatedInteger = splitFormat(integer, { separator: ',', reverse: true })
  // 处理小数部分
  if (typeof precision === 'number') {
    let formatedFloat = parseFloat(`0.${float}`).toFixed(isCut ? precision + 1 : precision).split('.')[1]
    if (isCut) {
      formatedFloat = formatedFloat.substr(0, precision)
    }
    return `${formatedInteger}.${formatedFloat}`
  }
  if (float) {
    return `${formatedInteger}.${float}`
  }
  return formatedInteger
}
