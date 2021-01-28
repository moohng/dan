import { round, cut } from '../esm'

it('dan', () => {
  const num = 1234.123456
  expect(round(num, 0)).toBe(1234)
  expect(cut(num, 4)).toBe(1234.1234)
})
