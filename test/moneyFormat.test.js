const moneyFormat = require('../lib/moneyFormat')

it('moneyFormat', () => {
  const num = 1234567.4050006
  expect(moneyFormat(num)).toEqual('1,234,567.4050006')
  expect(moneyFormat(num, 2)).toEqual('1,234,567.41')
  expect(moneyFormat(num, 2, true)).toEqual('1,234,567.40')
  expect(moneyFormat(num, 5)).toEqual('1,234,567.40500')
  expect(moneyFormat(num, 8)).toEqual('1,234,567.40500060')
  const num2 = 123000
  expect(moneyFormat(num2, 2)).toEqual('123,000.00')
})
