import querystring from '../src/querystring'

it('querystring', () => {
  const qs = 'https://qq.com:520/a/b/12/3-g_d?name=Kevin&age=18&height=&end&love=girl&love=beautifull girl'

  expect(querystring(qs)).toEqual({
    name: 'Kevin',
    age: '18',
    height: '',
    end: '',
    love: ['girl', 'beautifull girl'],
  })
})
