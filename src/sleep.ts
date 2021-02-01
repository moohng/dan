/**
 * 等待函数
 * @param {Number} duration 等待毫秒数
 * @param {Function} fn 结束回调
 */
export default function sleep<T>(duration: number, fn?: () => T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(typeof fn === 'function' ? fn() : undefined);
    }, duration);
  });
}
