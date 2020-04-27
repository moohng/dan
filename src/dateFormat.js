/**
 * 格式化日期
 * @param {date} date Date
 * @param {stirng} fmt 格式化
 */
export default function dateFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(date)
  const y = date.getFullYear()
  // 不合法日期处理
  if (Number.isNaN(y)) {
    return fmt.replace(/YYYY|yyyy|MM|DD|dd|HH|hh|mm|ss/g, '--')
  }
  let m = date.getMonth() + 1
  m = m < 10 ? `0${m}` : m
  let d = date.getDate()
  d = d < 10 ? `0${d}` : d
  let h = date.getHours()
  h = h < 10 ? `0${h}` : h
  let minute = date.getMinutes()
  minute = minute < 10 ? `0${minute}` : minute
  let second = date.getSeconds()
  second = second < 10 ? `0${second}` : second
  return fmt.replace(/YYYY|yyyy|MM|DD|dd|HH|hh|mm|ss/g, match => {
    if (match === 'YYYY' || match === 'yyyy') return y
    if (match === 'MM') return m
    if (match === 'DD' || match === 'dd') return d
    if (match === 'HH' || match === 'hh') return h
    if (match === 'mm') return minute
    if (match === 'ss') return second
    return ''
  })
}
