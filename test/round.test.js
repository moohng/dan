import round from '../lib/round'

it('round', () => {
  expect(round(12.3330)).toBe(12.33)
  expect(round('0.00102', 4)).toBe(0.001)
})
