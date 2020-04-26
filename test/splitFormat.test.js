var splitFormat = require('../lib/splitFormat')

it('splitFormat', () => {
  var cardNo = '6217002940000643352'
  expect(splitFormat(cardNo, 4)).toEqual('6217 0029 4000 0643 352')
  expect(splitFormat(cardNo, ',')).toEqual('621,700,294,000,064,335,2')
  expect(splitFormat(cardNo, true)).toEqual('6 217 002 940 000 643 352')
  expect(splitFormat(cardNo, { per: 3, separator: ',', reverse: true })).toEqual('6,217,002,940,000,643,352')
})
