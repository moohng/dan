const querystringify = require('../lib/querystringify')

it('querystringify', () => {
  const query = {
    name: 'Kevin',
    age: 108,
    love: ['girl', 'beautifull girl'],
  }
  expect(querystringify(query)).toBe('name=Kevin&age=108&love=girl&love=beautifull%20girl')
})
