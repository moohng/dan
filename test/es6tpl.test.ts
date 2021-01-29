import { es6tpl } from '../lib'

it('es6tpl', () => {
  expect(es6tpl('Hello ${name}', { name: 'World' })).toBe('Hello World')
  expect(es6tpl('Hello ${name}, You\'r ${age} years old.', { age: 18 })).toBe('Hello ${name}, You\'r 18 years old.')
})
