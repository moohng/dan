/**
 * 乘
 * @param {number} a a
 * @param {number} b b
 */
export default function mul(a, b) {
  let times = 0
  const c = a.toString()
  const d = b.toString()
  try {
    times += c.split('.')[1].length
  } catch (e) {
    //
  }
  try {
    times += d.split('.')[1].length
  } catch (e) {
    //
  }
  return (Number(c.replace('.', '')) * Number(d.replace('.', ''))) / (10 ** times)
}
