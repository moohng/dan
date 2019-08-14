const queryStringify = require('../lib/queryStringify')

it('queryStringify', () => {
  const query = {
    name: 'Kevin',
    age: 108,
    love: ['girl', 'beautifull girl'],
  }
  expect(queryStringify(query)).toEqual('name=Kevin&age=108&love=girl&love=beautifull girl')
})
