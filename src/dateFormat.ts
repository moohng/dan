/**
 * 格式化日期
 * @param date Date
 * @param fmt 格式化
 */
export default function dateFormat(date: string | number | Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string {
  date = new Date(date);
  // 不合法日期处理
  if (date.toString() === 'Invalid Date') {
    return fmt.replace(/YYYY|yyyy|MM|DD|dd|HH|hh|mm|ss/g, '--');
  }
  const y = date.getFullYear();
  let m: string | number = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d: string | number = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h: string | number = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute: string | number = date.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  let second: string | number = date.getSeconds();
  second = second < 10 ? `0${second}` : second;
  return fmt.replace(/YYYY|yyyy|MM|DD|dd|HH|hh|mm|ss/g, match => {
    if (match === 'YYYY' || match === 'yyyy') return y.toString();
    if (match === 'MM') return m.toString();
    if (match === 'DD' || match === 'dd') return d.toString();
    if (match === 'HH' || match === 'hh') return h.toString();
    if (match === 'mm') return minute.toString();
    if (match === 'ss') return second.toString();
    return '';
  });
}
