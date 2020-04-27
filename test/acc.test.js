const acc = require('../lib/acc')

it('acc', () => {
  expect(acc.add(0.1, 0.2)).toBe(0.3)
  expect(acc.add(12345, 54321)).toBe(66666)

  expect(acc.sub(0.4, 0.3)).toBe(0.1)
  expect(acc.sub(100, 200)).toBe(-100)

  expect(acc.mul(0.1, 0.4)).toBe(0.04)
  expect(acc.mul(99, 99)).toBe(9801)

  expect(acc.div(0.3, 0.2)).toBe(1.5)
  expect(acc.div(100, 20)).toBe(5)
})
