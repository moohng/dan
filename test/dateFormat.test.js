const dateFormat = require('../lib/dateFormat')

it('dateFormat', () => {
  const date = new Date(2020, 10, 22)
  expect(dateFormat(date)).toBe('2020-11-22 00:00:00')
  expect(dateFormat(date, 'YY年MM月DD日')).toBe('20年11月22日')
  expect(dateFormat(date, 'HH:mm')).toBe('00:00')
  const date2 = new Date(1990, 8, 17, 19, 2, 50)
  expect(dateFormat(date2, 'YY-M-D HH:m:s')).toBe('90-9-7 19:2:0')
})
