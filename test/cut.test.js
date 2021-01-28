import cut from '../esm/cut'

it('cut', () => {
  expect(cut(12.3330)).toBe(12.33)
  expect(cut('0.00102', 4)).toBe(0.001)
  expect(cut(13.555666, 4)).toBe(13.5556)
})
