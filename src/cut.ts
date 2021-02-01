/**
 * 截取小数位数
 * @param num
 * @param precision 默认2
 */
export default function cut(num: number | string = 0, precision = 2): number {
  if (isNaN(num as number)) {
    throw new TypeError('num 必须是一个数字');
  }
  const idx = 10 ** precision;
  return Math.floor(+num * idx) / idx;
}
