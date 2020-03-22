/**
 * 近视保留小数位数
 * @param {number} num
 * @param {number} fixed
 */
export default function round(num = 0, fixed = 2) {
  const idx = 10 ** fixed
  return Math.round(num * idx) / idx
}
