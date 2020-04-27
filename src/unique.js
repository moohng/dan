/**
 * 数组去重
 * @param {Array} arr 数组
 */
export default function unique(arr) {
  // return Array.from(new Set(arr))
  return arr.filter((a, idx, self) => self.indexOf(a) === idx) // 性能更优
}
