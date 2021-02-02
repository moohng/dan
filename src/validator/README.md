**校验的方式：通过一个函数接收两个参数（目标集合，校验规则）返回校验的结果**。

这样实现的好处在于：十分灵活、可适用于任何地方、耦合性低、可扩展性强，不仅十分轻量，还能满足大多数的校验场合。

```js
const { validator } = require('@moohng/validator')

// 定义每个字段的校验规则
const rules = [
  {
    key: 'name',
    alias: '姓名',   // 字段别名，用于默认提示信息的字段名称，省略则为当前字段的 key
    /**
     * 为空判断：字段为 null、undefined、[]、''、{} 时认为是空
     * required 可为 Boolean 类型或 String 类型，当为字符串时，则表示为空时提示的文本信息，否则为默认提示信息
     */
    required: true,
    trim: false, // 校验之前是否去掉字符串的首位空格，默认为 true
  },
  {
    key: 'email',
    required: '请输入邮箱哦',
    pattern: /\w+@\w+\.com/,  // 必须是一个正则表达式
    message: '您输入的邮箱不正确', // 正则校验不通过时的提示文本信息，省略则提示默认信息
  },
  {
    key: 'age',
    /**
     * 自定义校验规则
     * 该函数接收 当前校验的值 和 当前校验的所有值的集合 两个参数
     * 返回校验的结果：
     * 若为 true 或 非字符串，则校验通过
     * 若为 false，则校验不通过，提示信息为 message，若 message 不存在，则提示默认信息
     * 若为字符串，则认为校验不通过，并且将该字符串作为提示文本信息
     */
    validate: (val, target) => {
      return parseInt(val, 10) > 10 || '年龄必须大于10岁'
    }
  }
]

/**
 * 第一个参数是要校验字段的集合（必须是一个对象）
 * 第二个参数是校验的规则数组
 * 校验的结果是一个包含所有校验不通过的字段的提示文本的一个对象数组
 * 比如：[{ key: 'name', email: '您输入的邮箱不正确' }]
 */
const result = validator({
  name: '',
  email: 'ewrwerw@',
  age: 8
}, rules)

/**
 * result.hasError  => 校验结果是否有错（只要有一个字段校验不通过，则为 true）
 * result.first()   => 返回校验结果的第一个提示信息（一般对于表单校验，我们可能从上到下提示错误信息）
 * first(1) 可指定参数，分别返回第 n - 1 个结果信息
 */
console.log('校验结果，是否有错', result.hasError)

if (result.hasError) {
  console.log('第1个错误提示', result.first())
  console.log('第2个错误提示', result.first(1))
}
```
