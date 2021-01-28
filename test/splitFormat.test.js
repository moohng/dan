import splitFormat from '../esm/splitFormat'

it('splitFormat', () => {
  const cardNo = '6217002940000643352'
  expect(splitFormat(cardNo, 4)).toBe('6217 0029 4000 0643 352')
  expect(splitFormat(cardNo, ',')).toBe('621,700,294,000,064,335,2')
  expect(splitFormat(cardNo, true)).toBe('6 217 002 940 000 643 352')
  expect(splitFormat(cardNo, { per: 3, separator: ',', reverse: true })).toBe('6,217,002,940,000,643,352')
})
