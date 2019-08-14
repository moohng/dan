const queryParse = require('../lib/queryParse')

it('queryParse', () => {
  const qs = 'https://qq.com:520/a/b/12/3-g_d?name=Kevin&age=18&height=&end&love=girl&love=beautifull girl'

  expect(queryParse(qs)).toEqual({
    name: 'Kevin',
    age: '18',
    love: ['girl', 'beautifull girl'],
  })
})
