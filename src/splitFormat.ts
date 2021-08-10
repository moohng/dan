interface Options {
  per?: number,
  separator?: string,
  reverse?: boolean,
}

/**
 * 分隔字符串
 * @param value 待处理的值
 * @param per 分隔长度
 * @param separator 分隔符
 * @param reverse 是否反向（从右到左）
 */
export default function splitFormat(value: string | number, options: Options | number | string | boolean): string {
  if (typeof value !== 'number' && typeof value !== 'string') return '';
  let per = 3;
  let separator = ' ';
  let reverse = false;
  if (typeof options === 'number') per = options;
  else if (typeof options === 'string') separator = options;
  else if (typeof options === 'boolean') reverse = options;
  else {
    per = options?.per || per;
    separator = options?.separator || separator;
    reverse = options?.reverse || reverse;
  }
  let newValue = String(value);
  if (!newValue) return newValue;
  newValue = reverse ? newValue : newValue.split('').reverse().join('');
  newValue = newValue.replace(new RegExp(`\\B(?=(.{${per}})+$)`, 'g'), separator);
  return reverse ? newValue : newValue.split('').reverse().join('');
}
