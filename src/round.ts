/**
 * 近视保留小数位数
 * @param num
 * @param precision 精度，默认 2
 */
export default function round(num: number | string = 0, precision = 2): number {
  if (isNaN(num as number)) {
    throw new TypeError('num 必须是一个数字');
  }
  const idx = 10 ** precision;
  return Math.round(+num * idx) / idx;
}
