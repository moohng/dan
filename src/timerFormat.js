/**
 * 格式化计时器
 * @param {number} millisecond 毫秒数
 */
export default function timerFormat(millisecond, format = 'hh:mm:ss') {
  millisecond = +millisecond
  if (Number.isNaN(millisecond)) return format
  const hours = Math.floor(millisecond / (1000 * 3600))
  const minutes = Math.floor((millisecond % (1000 * 3600)) / (1000 * 60))
  const seconds = Math.floor(millisecond / 1000) - hours * 3600 - minutes * 60
  return format.replace(/HH|hh|mm|ss/g, matched => {
    switch (matched) {
    case 'HH':
    case 'hh':
      return hours.toString().padStart(2, '0')
    case 'mm':
      return minutes.toString().padStart(2, '0')
    case 'ss':
      return seconds.toString().padStart(2, '0')
    default:
      return ''
    }
  })
}
