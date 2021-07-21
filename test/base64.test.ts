import { Base64 } from '../lib';

test('base64', () => {
  const a = 'abc';
  const a_64 = 'YWJj';

  const b = '你好，世界！';
  const b_64 = 'JUU0JUJEJUEwJUU1JUE1JUJEJUVGJUJDJThDJUU0JUI4JTk2JUU3JTk1JThDJUVGJUJDJTgx';

  expect(Base64.encode(a)).toBe(a_64);
  expect(Base64.encode(b)).toBe(b_64);

  expect(Base64.decode(a_64)).toBe(a);
  expect(Base64.decode(b_64)).toBe(b);
});
