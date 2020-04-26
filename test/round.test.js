const round = require('../lib/round')

it('round', () => {
  expect(round(12.3330)).toEqual(12.33)
  expect(round('0.00102', 4)).toEqual(0.001)
})
