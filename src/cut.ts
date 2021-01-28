/**
 * 截取小数位数
 * @param num
 * @param precision 默认2
 */
export default function cut(num = 0, precision = 2): number {
  const idx = 10 ** precision;
  return Math.floor(num * idx) / idx;
}
