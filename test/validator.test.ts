import validator, { Rule, Pattern } from '../lib/validator';

it('validator', () => {
  const targetObj = {
    name: 'Kevin',
    age: 18,
    height: '',
    phone: '11244445555',
    email: 'mm@333.com',
    idCard: '43121421451245x',
  }
  const rules: Rule<typeof targetObj>[] = [
    { key: 'name', length: [1, 10] },
    { key: 'age', validate:(val) => {
        if (val < 30) {
          return '装嫩呢';
        }
        return false;
      },
    },
    { key: 'height', required: '身高必填哦' },
    { key: 'phone', pattern: Pattern.phone },
    { key: 'email', pattern: Pattern.email },
    { key: 'idCard', pattern: Pattern.idCard, message: '身份证输入不正确' },
  ]

  expect(validator(targetObj, rules).first()).toBe('装嫩呢');
  expect(validator(targetObj, rules).first(1)).toBe('身高必填哦');
  expect(validator(targetObj, rules).first(2)).toBe('身份证输入不正确');
});
