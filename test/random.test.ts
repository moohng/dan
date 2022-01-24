import random from '../lib/random'


it('random', () => {
  expect(random(12)).toHaveLength(12)
  expect(random(10, 20)).toBeGreaterThanOrEqual(10)
  expect(random(10, 20)).toBeLessThanOrEqual(20)
  expect([0, 1, 2, 3, 4, 5]).toContain(random(0, 5, true))
})
