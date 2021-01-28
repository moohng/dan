/**
 * 近视保留小数位数
 * @param num
 * @param precision 精度，默认 2
 */
export default function round(num = 0, precision = 2): number {
  const idx = 10 ** precision;
  return Math.round(num * idx) / idx;
}
