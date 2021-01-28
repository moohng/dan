/**
 * 小数位数补齐
 * @param value 值
 * @param len 小数长度
 */
export default function decimalPadEnd(value: number, len: number): string {
  const valueStr = String(value);
  const valueArr = valueStr.split('.');
  if (len > 0) {
    valueArr[1] = valueArr[1] ?? '';
    valueArr[1] = valueArr[1].padEnd(len, '0');
  }
  return valueArr.join('.');
}
