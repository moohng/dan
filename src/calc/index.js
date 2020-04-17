/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
function toInteger(floatNum) {
  const ret = { times: 1, num: 0 }
  if (Number.isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  const strfi = String(floatNum)
  const dotPos = strfi.split('.')[1] || ''
  const len = dotPos.length
  const times = 10 ** len
  const intNum = parseInt(floatNum * times + 0.5, 10)
  ret.times = times
  ret.num = intNum
  return ret
}

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
function operation(a, b, op) {
  const o1 = toInteger(a)
  const o2 = toInteger(b)
  const n1 = o1.num
  const n2 = o2.num
  const t1 = o1.times
  const t2 = o2.times
  const max = t1 > t2 ? t1 : t2
  let result = null
  switch (op) {
  case '+':
    if (t1 === t2) {
      // 两个小数位数相同
      result = n1 + n2
    } else if (t1 > t2) {
      // o1 小数位 大于 o2
      result = n1 + n2 * (t1 / t2)
    } else {
      // o1 小数位 小于 o2
      result = n1 * (t2 / t1) + n2
    }
    return result / max
  case '-':
    if (t1 === t2) {
      result = n1 - n2
    } else if (t1 > t2) {
      result = n1 - n2 * (t1 / t2)
    } else {
      result = n1 * (t2 / t1) - n2
    }
    return result / max
  case '*':
    result = (n1 * n2) / (t1 * t2)
    return result
  case '/':
    result = (n1 / n2) * (t2 / t1)
    return result
  default:
    return 0
  }
}

export default {
  add(a, b) {
    return operation(a, b, '+')
  },
  subtract(a, b) {
    return operation(a, b, '-')
  },
  multiply(a, b) {
    return operation(a, b, '*')
  },
  divide(a, b) {
    return operation(a, b, '/')
  },
}
