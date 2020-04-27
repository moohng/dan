const unique = require('../lib/unique')

it('unique', () => {
  expect(unique([0, 3, 2, 3, 2, 3, 0])).toEqual([0, 3, 2])
  expect(unique(['我', '你', '他', '你'])).toEqual(['我', '你', '他'])
})
