/**
 * 时间格式化
 * @param millisecond 毫秒数
 * @param format 默认 'hh:mm:ss'
 */
export default function timeFormat(millisecond: number, format = 'hh:mm:ss'): string {
  millisecond = +millisecond;
  if (isNaN(millisecond)) {
    throw new TypeError('millisecond 必须是一个数字');
  }
  const hours = Math.floor(millisecond / (1000 * 3600));
  const minutes = Math.floor((millisecond % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor(millisecond / 1000) - hours * 3600 - minutes * 60;
  return format.replace(/HH|hh|mm|ss/g, matched => {
    switch (matched) {
    case 'HH':
    case 'hh':
      return hours.toString().padStart(2, '0');
    case 'mm':
      return minutes.toString().padStart(2, '0');
    case 'ss':
      return seconds.toString().padStart(2, '0');
    default:
      return '';
    }
  });
}
