import { timeFormat } from '../lib';

test('time format', () => {

  expect(timeFormat(3730 * 1000)).toBe('01:02:10');
  expect(timeFormat(630 * 1000, 'mm:ss')).toBe('10:30');
});
