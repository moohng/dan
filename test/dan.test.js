const dan = require('../lib/dan')

it('dan', () => {
  const num = 1234.123456
  expect(dan.round(num, 0)).toBe(1234)
  expect(dan.cut(num, 4)).toBe(1234.1234)
})
