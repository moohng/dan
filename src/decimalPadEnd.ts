/**
 * 小数位数补齐
 * @param value 值
 * @param len 小数长度
 */
export default function decimalPadEnd(value: number, len: number): string {
  const valueStr = String(value);
  if (isNaN(value)) {
    return valueStr;
  }
  const valueArr = valueStr.split('.');
  if (len > 0) {
    let decimal = valueArr[1] ?? '';
    if (decimal.length > len) {
      decimal = decimal.substr(0, len);
    } else if (decimal.length < len) {
      while(decimal.length < len) {
        decimal += '0';
      }
    }
    valueArr[1] = decimal;
  }
  return valueArr.join('.');
}
