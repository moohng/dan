// import validator from '../lib/validator'
const validator = require('@moohng/validator')

console.log('------', validator);

const rules = {
  name: {
    alias: '姓名',
    required: true
  },
  email: {
    required: '请输入邮箱哦',
    pattern: /\w+@\w+\.com/
  }
}

const result = validator.validator({
  name: '',
  email: 'ewrwerw@'
}, rules)

console.log('校验结果，是否有错', result.hasError())

if (result.hasError()) {
  console.log('第1个错误提示', result.first())
  console.log('第2个错误提示', result.first(1))
}
