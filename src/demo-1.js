const validator = require('../dist/validator.min')

const rules = {
  name: {
    alias: '姓名',
    required: true
  },
  email: {
    required: '请输入邮箱哦',
    // pattern: /\w+@\w+\.com/,
    validate(value) {
      return 'hell打发第三方斯蒂芬是否'
    }
  }
}

const result = validator({
  name: '',
  email: 'ewrwerw@'
}, rules)

console.log('校验结果对象', result)
console.log('校验结果，是否有错', result.hasError())

if (result.hasError()) {
  console.log('第1个错误提示', result.first())
  console.log('第2个错误提示', result.first(2))
}
