import validator from '../lib/validator'

it('validator', () => {
  const targetObj = {
    name: 'Kevin',
    age: 18,
  }
  const rules = {
    name: true,
    age: {
      validate: (val) => {
        if (val < 30) {
          return '装嫩呢'
        }
        return false
      },
    },
    height: { required: '身高必填哦' },
  }
  expect(validator(targetObj, rules).first()).toBe('装嫩呢')
  expect(validator(targetObj, rules).first(2)).toBe('身高必填哦')
})
