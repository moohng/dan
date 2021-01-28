import random from '../esm/random'


it('random', () => {
  expect(random(12)).toHaveLength(12)
  expect(random(10, 20)).toBeGreaterThanOrEqual(10)
  expect(random(10, 20)).toBeLessThanOrEqual(20)
  expect([10, 11, 12, 13, 14, 15]).toContain(random(10, 15, true))
})
