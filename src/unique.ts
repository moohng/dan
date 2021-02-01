/**
 * 数组、字符串去重
 * @param list
 */
export default function unique<T>(list: T[] | string): T[] | string {
  if (typeof list === 'string') {
    const arr = unique<string>(list.split(''));
    return (arr as string[]).join?.('');
  }
  return list.filter((a, idx, self) => self.indexOf(a) === idx); // 性能更优
}
