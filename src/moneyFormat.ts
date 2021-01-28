import splitFormat from './splitFormat';
import cut from './cut';
import round from './round';
import decimalPadEnd from './decimalPadEnd';

/**
 * 格式化金额，按千分位以逗号分隔
 * @param value
 * @param precision 精度
 * @param isCut 是否截取
 */
export default function moneyFormat(value: string | number, precision: number, isCut: boolean): string | number {
  const num = +value;
  if (Number.isNaN(num)) return value;
  const [integer, float] = String(num).split('.');
  // 处理整数部分
  const formattedInteger = splitFormat(integer, { separator: ',', reverse: true });
  // 处理小数部分
  if (typeof precision === 'number') {
    let floatStr = float ? Number([0, float].join('.')) : 0;
    floatStr = isCut ? cut(floatStr, precision) : round(floatStr, precision);
    const formattedFloat = decimalPadEnd(floatStr, precision).split('.')[1];
    return `${formattedInteger}.${formattedFloat}`;
  }
  if (float) {
    return `${formattedInteger}.${float}`;
  }
  return formattedInteger;
}
