import mul from './mul'

/**
 * 加
 * @param {number} a a
 * @param {number} b b
 */
export default function add(a, b) {
  let timesA = 0
  let timesB = 0
  try {
    timesA = a.toString().split('.')[1].length
  } catch (e) {
    //
  }
  try {
    timesB = b.toString().split('.')[1].length
  } catch (e) {
    //
  }
  const times = 10 ** Math.max(timesA, timesB)
  return (mul(a, times) + mul(b, times)) / times
}
