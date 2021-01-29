import validator, { Rule } from '../lib/validator'

it('validator', () => {
  const targetObj = {
    name: 'Kevin',
    age: 18,
    height: '',
  }
  const rules: Rule<typeof targetObj>[] = [
    { name: 'name', length: [1, 10] },
    { name: 'age', validate:(val) => {
        if (val < 30) {
          return '装嫩呢'
        }
        return false
      },
    },
    {
      name: 'height',
      required: '身高必填哦'
    },
  ]

  expect(validator(targetObj, rules).first()).toBe('装嫩呢')
  expect(validator(targetObj, rules).first(1)).toBe('身高必填哦')
})
