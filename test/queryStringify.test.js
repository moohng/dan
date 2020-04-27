const queryStringify = require('../lib/queryStringify')

it('queryStringify', () => {
  const query = {
    name: 'Kevin',
    age: 108,
    love: ['girl', 'beautifull girl'],
  }
  expect(queryStringify(query)).toBe('name=Kevin&age=108&love=girl&love=beautifull%20girl')
})
