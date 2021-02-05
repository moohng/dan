import { flat } from '../lib/index';

test('flat', () => {
  expect(flat([0, 1, [2, 3, [4, 5], 6, [7, 8]], 9, [0]])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  expect(flat<unknown>([true, ['hello', [], 2], 3, [{}]])).toEqual([true, 'hello', 2, 3, {}]);
});
