/**
 * 格式化日期
 * @param {date} date Date
 * @param {stirng} fmt 格式化
 */
export default function dateFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(date)
  const obj = {
    '[yY]{1,4}': date.getFullYear(),
    'M+': date.getMonth() + 1,
    '[Dd]+': date.getDate(),
    '[Hh]+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }

  let result = fmt
  Object.keys(obj).forEach(exp => {
    if (new RegExp(`(${exp})`).test(fmt)) {
      const res = obj[exp].toString()
      const s = RegExp.$1
      result = result.replace(s, `0000${res}`.substr(res.length + 4 - s.length))
    }
  })
  return result
}
