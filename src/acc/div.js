import mul from './mul'

/**
 * 除以
 * @param {number} a a
 * @param {number} b b
 */
export default function div(a, b) {
  let timesA = 0
  let timesB = 0
  const c = a.toString()
  const d = b.toString()
  try {
    timesA = c.split('.')[1].length
  } catch (e) {
    //
  }
  try {
    timesB = d.split('.')[1].length
  } catch (e) {
    //
  }
  const times = 10 ** (timesB - timesA)
  return mul(Number(c.replace('.', '')) / Number(d.replace('.', '')), times)
}
