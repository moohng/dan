/**
 * 等待函数
 * @param {Number} duration 等待毫秒数
 * @param {Function} fn 结束回调
 */
export default function sleep(duration, fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(typeof fn === 'function' ? fn() : undefined)
    }, duration)
  })
}
