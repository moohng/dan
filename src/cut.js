/**
 * 截取小数位数
 * @param {number} num
 * @param {number} fixed
 */
export default function cut(num = 0, fixed = 2) {
  const idx = 10 ** fixed
  return Math.floor(num * idx) / idx
}
