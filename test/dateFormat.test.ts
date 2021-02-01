import dateFormat from '../lib/dateFormat'

it('dateFormat', () => {
  const date = new Date(2020, 10, 22)
  expect(dateFormat(date)).toBe('2020-11-22 00:00:00')
  expect(dateFormat(date, 'YYYY年MM月DD日')).toBe('2020年11月22日')
  expect(dateFormat(date, 'HH:mm')).toBe('00:00')
})
