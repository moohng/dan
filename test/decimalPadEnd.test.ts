import { decimalPadEnd } from '../lib';

test('decimalPadEnd', () => {
  expect(decimalPadEnd(123, 4)).toBe('123.0000');
  expect(decimalPadEnd(123.1120, 2)).toBe('123.11');
  expect(decimalPadEnd(123.2200, 3)).toBe('123.220');
  expect(decimalPadEnd(123.1, 5)).toBe('123.10000');
});
