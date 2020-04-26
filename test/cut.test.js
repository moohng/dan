const cut = require('../lib/cut')

it('cut', () => {
  expect(cut(12.3330)).toEqual(12.33)
  expect(cut('0.00102', 4)).toEqual(0.001)
  expect(cut(13.555666, 4)).toEqual(13.5556)
})
