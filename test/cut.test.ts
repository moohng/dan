// import cut from '../lib/cut'
const dan = require('../dist/dan.common')

test('cut', () => {
  expect(dan.cut(12.3330)).toBe(12.33)
  // expect(cut('0.00102', 4)).toBe(0.001)
  expect(dan.cut(13.555666, 4)).toBe(13.5556)
})
